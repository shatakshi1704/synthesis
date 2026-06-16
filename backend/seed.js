require("dotenv").config();
const mongoose = require("mongoose");
const { HoldingsModel } = require("./model/HoldingsModel");

// 1. Import ObjectId here
const { ObjectId } = mongoose.Types;

// 2. Yahan apna 24-character wala actual user _id daalo (Compass se copy karo)
const MY_USER_ID = new ObjectId("6a2d943eff2a7d6350c9b93a"); // <--- APNA ACTUAL ID YAHAN PASTE KARO

const seedData = [
  { user: MY_USER_ID, name: "HDFCBANK", qty: 250, avg: 1500, price: 1600, net: "+6.6%", day: "+1.2%" },
  { user: MY_USER_ID, name: "INFY", qty: 200, avg: 1400, price: 1550, net: "+10.7%", day: "+0.8%" },
  { user: MY_USER_ID, name: "TATAMOTORS", qty: 400, avg: 600, price: 650, net: "+8.3%", day: "+2.1%" }
];

async function seedDB() {
  await mongoose.connect(process.env.MONGO_URL);
  
  // Ab yeh "shats" ki jagah valid ObjectId use karega
  await HoldingsModel.deleteMany({ user: MY_USER_ID }); 
  await HoldingsModel.insertMany(seedData);
  
  console.log("Database seeded successfully!");
  mongoose.disconnect();
}

seedDB();