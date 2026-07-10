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

// Ensure CORS is set up at the top of your server file (before routes)
app.use(cors({
  origin: [
    "https://synthesis-peach.vercel.app", 
    "https://synthesis-mmdv.vercel.app", 
    "http://localhost:3000", 
    "http://localhost:5173"
  ],
  credentials: true
}));

// The Assistant API Endpoint
app.post("/api/assistant", async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ reply: "Please enter a valid question." });
    }

    const latestIntel = await IntelModel.find({}).sort({ date: -1 }).limit(3);

    const context = `
      Platform: Synthesis (Financial portfolio tracker, market watch, and trading guide).
      Latest Market Intel Signals: ${JSON.stringify(latestIntel)}
    `;

    // Use a verified current model ID like gemini-2.0-flash or gemini-1.5-flash
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" }); 
    const prompt = `You are an elite, highly intelligent financial and platform AI assistant for Synthesis. Give expert, precise, clear, and direct answers regarding stock searching, buying/selling mechanics, market psychology, and portfolio allocation based on the context provided. Keep it concise and professional.\n\nContext:\n${context}\n\nUser Question: ${message}`;

    const result = await model.generateContent(prompt);
    const reply = result.response.text();

    res.json({ reply });
  } catch (error) {
    console.error("Assistant Backend Error:", error);
    res.status(500).json({ reply: "I'm having trouble connecting to the intelligence core right now. Please try again shortly." });
  }
});

// 🧠 SYNTHESIS ALPHA INTEL - AI SENTIMENT RECEIVER (FIXED ROUTE WRAPPER)
app.post("/api/alpha-intel", async (req, res) => {
  try {
    const { title, snippet, url, source } = req.body;
    
    const existingIntel = await IntelModel.findOne({ url: url });
    if (existingIntel) {
      return res.status(200).json({ message: "Intel already exists!" });
    }

    let aiSentiment = "NEUTRAL"; 
    
    // 🔥 Sabse pehle keyword-based aggressive override lagate hain
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes("surge") || lowerTitle.includes("jump") || lowerTitle.includes("surges") || lowerTitle.includes("profit") || lowerTitle.includes("record") || lowerTitle.includes("dividend")) {
      aiSentiment = "BULLISH";
    } else if (lowerTitle.includes("loss") || lowerTitle.includes("crash") || lowerTitle.includes("fall") || lowerTitle.includes("slump") || lowerTitle.includes("tanks")) {
      aiSentiment = "BEARISH";
    } else {
      // Agar upar ke words match na hon, tab AI se poochho
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `Analyze the financial news title and snippet below. Determine if the stock market sentiment is BULLISH, BEARISH, or NEUTRAL. Reply with ONLY ONE WORD: BULLISH, BEARISH, NEUTRAL.\n\nTitle: ${title}\nSnippet: ${snippet}`;
        
        const result = await model.generateContent(prompt);
        const responseText = result.response.text().trim().toUpperCase();

        if (responseText.includes("BULLISH")) aiSentiment = "BULLISH";
        else if (responseText.includes("BEARISH")) aiSentiment = "BEARISH";
        else aiSentiment = "NEUTRAL";
      } catch (aiError) {
        console.error("AI Analysis failed:", aiError);
      }
    }

    const newIntel = new IntelModel({
      title,
      snippet,
      url,
      source,
      sentiment: aiSentiment
    });
    
    await newIntel.save();
    console.log(`🔥 New Alpha Intel Saved: ${title} | Sentiment: 🤖 ${aiSentiment}`);
    
    res.status(201).json({ message: "Intel and AI Sentiment saved successfully!" });
  } catch (error) {
    console.error("Alpha Intel Error:", error);
    res.status(500).json({ message: "Failed to save intel" });
  }
});

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