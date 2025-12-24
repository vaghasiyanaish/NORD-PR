const mongoose = require("mongoose");

const dbconnect = () => {
    mongoose.connect("mongodb://localhost:27017/BookStoreManagement")
        .then(() => {
            console.log("Database connected successfully...");
        })
        .catch((err) => {
            console.error("Database connection error:", err);
        });
};

module.exports = dbconnect;
