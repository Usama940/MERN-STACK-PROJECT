const mongoose = require("mongoose");

// MongoDB Connection
async function connectMongoDb(url) {
  try {
    const conn = await mongoose.connect(url);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }
}

module.exports = connectMongoDb;
