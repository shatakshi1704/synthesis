require("dotenv").config();
const mongoose = require("mongoose");
const { HoldingsModel } = require("./model/HoldingsModel");
const { WatchlistModel } = require("./model/WatchlistModel");
const { faker } = require('@faker-js/faker');

const MY_USER_ID = "6a2d948edf2c2a6e11a24069"; 

const seedHoldings = [
  { user: MY_USER_ID, name: "HDFCBANK", qty: 250, avg: 1500, price: 1600, net: "+6.6%", day: "+1.2%" },
  { user: MY_USER_ID, name: "INFY", qty: 200, avg: 1400, price: 1550, net: "+10.7%", day: "+0.8%" },
  { user: MY_USER_ID, name: "TATAMOTORS", qty: 400, avg: 600, price: 650, net: "+8.3%", day: "+2.1%" }
];

async function seedDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB...");

    await HoldingsModel.deleteMany({ user: MY_USER_ID }); 
    await HoldingsModel.insertMany(seedHoldings);
    console.log("Holdings seeded successfully!");

    await WatchlistModel.deleteMany({});
    const watchlist = Array.from({ length: 10 }, () => ({
      name: faker.string.alpha({ length: 4, casing: 'upper' }), 
      price: parseFloat(faker.finance.amount({ min: 100, max: 5000 })),
      percent: (Math.random() * 4 - 2).toFixed(2) + "%",
      isDown: Math.random() < 0.5
    }));
    await WatchlistModel.insertMany(watchlist);
    console.log("Watchlist seeded successfully!");

    mongoose.disconnect();
    console.log("Database disconnected.");
  } catch (err) {
    console.error("Error seeding database:", err);
  }
}

seedDB();