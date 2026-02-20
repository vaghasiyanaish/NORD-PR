const mongoose = require("mongoose");

const dbconnection = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://app_user:Jay_0716@cluster0.2m9kulu.mongodb.net/Pure-API?retryWrites=true&w=majority"
    );
    console.log("Database connected successfully");
  } catch (err) {
    console.error("Database connection error:", err.message);
    process.exit(1);
  }
};

module.exports = dbconnection;

