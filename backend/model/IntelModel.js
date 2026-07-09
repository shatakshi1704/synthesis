const mongoose = require("mongoose");

const IntelSchema = new mongoose.Schema({
  title: String,
  snippet: String,
  url: String,
  source: String,
  sentiment: { type: String, default: "Pending AI Analysis" }, // Baad mein AI isko update karega
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("intel", IntelSchema);