const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: [true, "Email is required"], unique: true },
  username: { type: String, required: [true, "Username is required"] },
  password: { type: String, required: [true, "Password is required"] },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);