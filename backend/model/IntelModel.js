
const mongoose = require("mongoose");

const IntelSchema = new mongoose.Schema({
  title: String,
  snippet: String,
  url: String,
  source: String,
  sentiment: { type: String, default: "NEUTRAL" },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Intel", IntelSchema);