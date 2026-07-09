require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { faker } = require('@faker-js/faker');

// MODELS
const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");
const UserModel = require("./model/UserModel");
const { WatchlistModel } = require("./model/WatchlistModel");
const IntelModel = require("./model/IntelModel");

const app = express();

// 1. DYNAMIC PORT FOR RENDER
const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

// 2. PRODUCTION CORS SETUP
// 2. PRODUCTION CORS SETUP
// 2. PRODUCTION CORS SETUP
const allowedOrigins = [
  "https://synthesis-mmdv.vercel.app", // Tumhara Frontend
  "https://synthesis-peach.vercel.app", // Tumhara Dashboard
  "chrome-extension://ichegomlijmeiejhmekinokmbkollmmj" // Extension ki VIP entry
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200 // Preflight success response code
};

app.use(cookieParser());
app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));

app.use(bodyParser.json());

// 🛡️ SECURITY LAYER
const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, process.env.TOKEN_KEY, (err, decodedData) => {
    if (err) return res.status(401).json({ message: "Invalid token" });
    req.userId = decodedData.id || decodedData._id; 
    next();
  });
};

// 🔒 SECURE PROFILE ROUTE
app.get("/user/profile", verifyUser, async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ username: user.username || user.name || "USER" });
  } catch (err) {
    res.status(500).json({ message: "Error fetching profile" });
  }
});

// 🔒 DATA ROUTES
app.get("/allHoldings", verifyUser, async (req, res) => {
  try {
    const allHoldings = await HoldingsModel.find({ user: req.userId });
    res.json(allHoldings);
  } catch (error) { res.status(500).json({ message: "Error" }); }
});

app.get("/allOrders", verifyUser, async (req, res) => {
  try {
    const allOrders = await OrdersModel.find({ user: req.userId });
    res.json(allOrders);
  } catch (error) { res.status(500).json({ message: "Server Error" }); }
});

app.get("/allPositions", verifyUser, async (req, res) => {
  try {
    const allPositions = await PositionsModel.find({ user: req.userId });
    res.json(allPositions);
  } catch (error) { res.status(500).json({ message: "Server Error" }); }
});

// 📈 WATCHLIST
// 📈 WATCHLIST (WITH DYNAMIC FAKER PRICES)
// 📈 WATCHLIST (WITH DYNAMIC FAKER PRICES)
app.get("/allWatchlist", async (req, res) => {
  try {
    // .lean() use karne se object modify karna aasan ho jata hai
    const allStocks = await WatchlistModel.find({}).lean();
    
    // Har stock pe loop lagao aur faker se naya price generate karo
    const stocksWithLivePrices = allStocks.map(stock => {
      // 100 se 5000 ke beech random price
      const randomPrice = parseFloat(faker.finance.amount(100, 5000, 2));
      
      // Random percentage change
      const randomPercent = parseFloat(faker.finance.amount(0.1, 5, 2));
      const isDown = Math.random() > 0.5;

      return {
        ...stock,
        price: randomPrice,
        percent: randomPercent,
        isDown: isDown
      };
    });

    res.json(stocksWithLivePrices);
  } catch (error) { 
    res.status(500).json({ message: "Server Error" }); 
  }
});

// 💸 NEW ORDER
// 💸 NEW ORDER (WITH WALLET & SELL LOGIC)
app.post("/newOrder", verifyUser, async (req, res) => {
  try {
    const tradeQty = parseInt(req.body.qty);
    const tradePrice = parseFloat(req.body.price);
    const tradeTotalAmount = tradeQty * tradePrice; // Total trade value

    // User ka data fetch karo taaki uska balance check kar sakein
    const user = await UserModel.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found!" });

    // 🔴 SELL LOGIC
    if (req.body.mode === "SELL") {
      let holding = await HoldingsModel.findOne({ user: req.userId, name: req.body.name });
      
      // Validation: Kya stock hai?
      if (!holding) {
        return res.status(400).json({ message: "You don't own any shares of this stock to sell!" });
      }
      
      // Validation: Kya itne shares hain jitne bech rahe ho?
      if (holding.qty < tradeQty) {
        return res.status(400).json({ message: `Insufficient quantity! You only have ${holding.qty} shares.` });
      }

      // Stock minus karo
      holding.qty -= tradeQty;
      if (holding.qty === 0) {
        await HoldingsModel.deleteOne({ _id: holding._id });
      } else {
        await holding.save();
      }

      // 💰 Wallet mein paise add karo
      user.balance = (user.balance || 0) + tradeTotalAmount;
      await user.save();
    } 
    
    // 🟢 BUY LOGIC
    else if (req.body.mode === "BUY") {
      // Validation: Kya wallet mein paise hain?
      if ((user.balance || 0) < tradeTotalAmount) {
        return res.status(400).json({ message: `Insufficient funds! Margin required is ₹${tradeTotalAmount.toFixed(2)} but your balance is ₹${(user.balance || 0).toFixed(2)}.` });
      }

      // 💰 Wallet se paise kaato
      user.balance -= tradeTotalAmount;
      await user.save();

      // Stock ko DB mein add ya update karo
      let holding = await HoldingsModel.findOne({ user: req.userId, name: req.body.name });
      if (holding) {
        holding.qty += tradeQty;
        holding.price = tradePrice; // Update current price
        await holding.save();
      } else {
        const newHolding = new HoldingsModel({
          user: req.userId,
          name: req.body.name,
          qty: tradeQty,
          avg: tradePrice,
          price: tradePrice,
        });
        await newHolding.save();
      }
    }

    // Order History Save Karo
    const newOrder = new OrdersModel({
      user: req.userId,
      name: req.body.name,
      qty: tradeQty,
      price: tradePrice,
      mode: req.body.mode,
      date: new Date().toLocaleDateString(),
    });
    await newOrder.save();

    res.status(201).json({ message: "Order executed successfully!" });
  } catch (error) { 
    console.error("Order Error:", error);
    res.status(500).json({ message: "Error saving order" }); 
  }
});

// 🧠 SYNTHESIS ALPHA INTEL - NEWS RECEIVER
app.post("/api/alpha-intel", async (req, res) => {
  try {
    const { title, snippet, url, source } = req.body;
    
    // Duplicates rokne ke liye URL check karte hain
    const existingIntel = await IntelModel.findOne({ url: url });
    if (existingIntel) {
      return res.status(200).json({ message: "Intel already exists!" });
    }

    // Naya data save karo
    const newIntel = new IntelModel({
      title,
      snippet,
      url,
      source
    });
    
    await newIntel.save();
    console.log("🔥 New Alpha Intel Saved:", title);
    
    res.status(201).json({ message: "Intel saved successfully!" });
  } catch (error) {
    console.error("Alpha Intel Error:", error);
    res.status(500).json({ message: "Failed to save intel" });
  }
});

app.use("/", require("./routes/AuthRoute"));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}!`);
  mongoose.connect(uri)
    .then(() => console.log("DB connected!"))
    .catch((err) => console.error("DB connection error:", err));
});