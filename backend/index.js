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

const app = express();

// 1. DYNAMIC PORT FOR RENDER
const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

// 2. PRODUCTION CORS SETUP
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://your-frontend-url.vercel.app", // Yahan apna live URL dalna baad mein
  "https://your-dashboard-url.vercel.app"  // Yahan apna live URL dalna baad mein
];

app.use(cookieParser());
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

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
app.get("/allWatchlist", async (req, res) => {
  try {
    const allStocks = await WatchlistModel.find({});
    res.json(allStocks);
  } catch (error) { res.status(500).json({ message: "Server Error" }); }
});

// 💸 NEW ORDER
app.post("/newOrder", verifyUser, async (req, res) => {
  try {
    const newOrder = new OrdersModel({
      user: req.userId,
      name: req.body.name,
      qty: req.body.qty,
      price: req.body.price,
      mode: req.body.mode,
      date: new Date().toLocaleDateString(),
    });
    await newOrder.save();

    if (req.body.mode === "BUY") {
      let holding = await HoldingsModel.findOne({ user: req.userId, name: req.body.name });
      if (holding) {
        holding.qty += parseInt(req.body.qty);
        holding.price = req.body.price;
        await holding.save();
      } else {
        const newHolding = new HoldingsModel({
          user: req.userId,
          name: req.body.name,
          qty: parseInt(req.body.qty),
          avg: req.body.price,
          price: req.body.price,
        });
        await newHolding.save();
      }
    }
    res.status(201).send("Order saved!");
  } catch (error) { res.status(500).json({ message: "Error saving order" }); }
});

app.use("/", require("./routes/AuthRoute"));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}!`);
  mongoose.connect(uri)
    .then(() => console.log("DB connected!"))
    .catch((err) => console.error("DB connection error:", err));
});