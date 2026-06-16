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
const UserModel = require("./model/UserModel"); // 🔥 IMPORT FIXED: No curly braces
const { WatchlistModel } = require("./model/WatchlistModel"); // Yeh line check kar lena

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;
const authRoute = require("./routes/AuthRoute");

const app = express();

app.use(cookieParser());
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:3001"],
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

    const nameToReturn = user.username || user.name || "USER";
    res.json({ username: nameToReturn });
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
  } catch (error) { 
    console.error("Orders Fetch Error:", error);
    res.status(500).json({ message: "Server Error" }); 
  }
});

// 🔒 POSITIONS ROUTE
app.get("/allPositions", verifyUser, async (req, res) => {
  try {
    const allPositions = await PositionsModel.find({ user: req.userId });
    res.json(allPositions);
  } catch (error) { 
    console.error("Positions Fetch Error:", error);
    res.status(500).json({ message: "Server Error" }); 
  }
});

app.get("/refreshWatchlist", async (req, res) => {
  try {
    await WatchlistModel.deleteMany({});
    const newWatchlist = Array.from({ length: 10 }, () => ({
      name: faker.string.alpha({ length: 4, casing: 'upper' }),
      price: parseFloat(faker.finance.amount({ min: 100, max: 5000 })),
      percent: (Math.random() * 4 - 2).toFixed(2) + "%",
      isDown: Math.random() < 0.5
    }));
    await WatchlistModel.insertMany(newWatchlist);
    res.json(newWatchlist);
  } catch (error) { res.status(500).json({ message: "Server Error" }); }
});

app.get("/allWatchlist", async (req, res) => {
  try {
    const allStocks = await WatchlistModel.find({});
    res.json(allStocks);
  } catch (error) { 
    console.error("Watchlist Fetch Error:", error);
    res.status(500).json({ message: "Server Error" }); 
  }
});

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
    res.status(201).send("Order saved!");
  } catch (error) { res.status(500).json({ message: "Error saving order" }); }
});

app.use("/", authRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}!`);
  mongoose.connect(uri)
    .then(() => console.log("DB connected!"))
    .catch((err) => console.error("DB connection error:", err));
});