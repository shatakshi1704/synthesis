require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { faker } = require('@faker-js/faker');
const { GoogleGenerativeAI } = require("@google/generative-ai");

// MODELS
const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");
const UserModel = require("./model/UserModel");
const { WatchlistModel } = require("./model/WatchlistModel");
const IntelModel = require("./model/IntelModel");

// AI INITIALIZATION 🧠
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const app = express();

// 1. DYNAMIC PORT FOR RENDER
const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

// 2. PRODUCTION CORS SETUP
const allowedOrigins = [
  "https://synthesis-mmdv.vercel.app", 
  "https://synthesis-peach.vercel.app", 
  "chrome-extension://ichegomlijmeiejhmekinokmbkollmmj" 
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
  optionsSuccessStatus: 200 
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

// 📈 WATCHLIST (WITH DYNAMIC FAKER PRICES)
app.get("/allWatchlist", async (req, res) => {
  try {
    const allStocks = await WatchlistModel.find({}).lean();
    
    const stocksWithLivePrices = allStocks.map(stock => {
      const randomPrice = parseFloat(faker.finance.amount(100, 5000, 2));
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

// 🧠 SYNTHESIS ALPHA INTEL - AI SENTIMENT RECEIVER
// 2. AI BRAIN AT WORK 🧠 (Sentiment Analysis)
    let aiSentiment = "NEUTRAL"; // Default value
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      // Prompt ko aur zyada clear aur strict kar diya hai
      const prompt = `Analyze the financial news title and snippet below. Determine if the stock market sentiment is BULLISH, BEARISH, or NEUTRAL. You must reply with ONLY ONE WORD from these choices: BULLISH, BEARISH, NEUTRAL. Do not include any punctuation, explanation, or extra spaces.\n\nTitle: ${title}\nSnippet: ${snippet}`;
      
      const result = await model.generateContent(prompt);
      const responseText = result.response.text().trim().toUpperCase();
      console.log("Raw Gemini Response:", responseText); // Debugging ke liye log

      // Improved matching logic
      if (responseText.includes("BULLISH")) {
        aiSentiment = "BULLISH";
      } else if (responseText.includes("BEARISH")) {
        aiSentiment = "BEARISH";
      } else {
        // Fallback keyword check agar model ne thoda lamba ya alag word diya ho
        if (title.toLowerCase().includes("surge") || title.toLowerCase().includes("jump") || title.toLowerCase().includes("profit") || title.toLowerCase().includes("record")) {
          aiSentiment = "BULLISH";
        } else if (title.toLowerCase().includes("loss") || title.toLowerCase().includes("crash") || title.toLowerCase().includes("fall") || title.toLowerCase().includes("slump")) {
          aiSentiment = "BEARISH";
        } else {
          aiSentiment = "NEUTRAL";
        }
      }
      
    } catch (aiError) {
      console.error("AI Analysis failed, using default NEUTRAL:", aiError);
    }

// 📡 SYNTHESIS ALPHA INTEL - SEND DATA TO FRONTEND
app.get("/api/alpha-intel", async (req, res) => {
  try {
    const allIntels = await IntelModel.find({}).sort({ date: -1 });
    res.json(allIntels);
  } catch (error) {
    console.error("Error fetching Alpha Intel:", error);
    res.status(500).json({ message: "Failed to fetch intel data" });
  }
});

// 💸 NEW ORDER (WITH WALLET & SELL LOGIC)
app.post("/newOrder", verifyUser, async (req, res) => {
  try {
    const tradeQty = parseInt(req.body.qty);
    const tradePrice = parseFloat(req.body.price);
    const tradeTotalAmount = tradeQty * tradePrice; 

    const user = await UserModel.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found!" });

    // 🔴 SELL LOGIC
    if (req.body.mode === "SELL") {
      let holding = await HoldingsModel.findOne({ user: req.userId, name: req.body.name });
      
      if (!holding) {
        return res.status(400).json({ message: "You don't own any shares of this stock to sell!" });
      }
      
      if (holding.qty < tradeQty) {
        return res.status(400).json({ message: `Insufficient quantity! You only have ${holding.qty} shares.` });
      }

      holding.qty -= tradeQty;
      if (holding.qty === 0) {
        await HoldingsModel.deleteOne({ _id: holding._id });
      } else {
        await holding.save();
      }

      user.balance = (user.balance || 0) + tradeTotalAmount;
      await user.save();
    } 
    
    // 🟢 BUY LOGIC
    else if (req.body.mode === "BUY") {
      if ((user.balance || 0) < tradeTotalAmount) {
        return res.status(400).json({ message: `Insufficient funds! Margin required is ₹${tradeTotalAmount.toFixed(2)} but your balance is ₹${(user.balance || 0).toFixed(2)}.` });
      }

      user.balance -= tradeTotalAmount;
      await user.save();

      let holding = await HoldingsModel.findOne({ user: req.userId, name: req.body.name });
      if (holding) {
        holding.qty += tradeQty;
        holding.price = tradePrice; 
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

app.use("/", require("./routes/AuthRoute"));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}!`);
  mongoose.connect(uri)
    .then(() => console.log("DB connected!"))
    .catch((err) => console.error("DB connection error:", err));
});