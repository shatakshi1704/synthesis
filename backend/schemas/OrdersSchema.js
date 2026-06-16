const { Schema, model } = require("mongoose");

const OrdersSchema = new Schema({
  name: String,
  qty: Number,
  price: Number,
  mode: String,
  user: {
    type: Schema.Types.ObjectId, // 🔥 Yeh field add karna mandatory hai
    ref: "User",
  },
});

const OrdersModel = model("order", OrdersSchema); // Yahan model define karo

module.exports = { OrdersModel };