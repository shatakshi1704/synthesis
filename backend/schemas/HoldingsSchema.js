const mongoose = require("mongoose");
const { Schema } = mongoose;

const HoldingsSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: { type: String, required: true },
  qty: { type: Number, default: 0 },
  avg: { type: Number, default: 0 },
  price: { type: Number, default: 0 },
  net: { type: String, default: "0%" },
  day: { type: String, default: "0%" },
});

const HoldingsModel = mongoose.model("holding", HoldingsSchema);
module.exports = { HoldingsModel };