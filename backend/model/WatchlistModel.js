const mongoose = require("mongoose");
const { Schema } = mongoose;

const WatchlistSchema = new Schema({
  name: String,
  price: Number,
  percent: String,
  isDown: Boolean,
});

const WatchlistModel = mongoose.model("watchlist", WatchlistSchema);
module.exports = { WatchlistModel };