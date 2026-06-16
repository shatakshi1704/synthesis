const { Schema } = require("mongoose");

const HoldingsSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User", // Yeh tere UserModel ka exact naam hona chahiye
    required: true,
  },
  name: String,
  qty: Number,
  avg: Number,
  price: Number,
  net: String,
  day: String,
});

module.exports = { HoldingsSchema };