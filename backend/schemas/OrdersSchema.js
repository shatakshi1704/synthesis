const { Schema, model } = require("mongoose");

const OrdersSchema = new Schema({
  name: String,
  qty: Number,
  price: Number,
  mode: String,
  user: {
    type: Schema.Types.ObjectId, 
    ref: "User",
  },
});

const OrdersModel = model("order", OrdersSchema); 

module.exports = { OrdersModel };