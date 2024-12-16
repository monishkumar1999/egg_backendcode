require('dotenv').config();
const mongoose = require("mongoose");
const dbAtles = process.env.DBCONNECT; 
const dbconnect = async () => {
  try {
    await mongoose.connect(dbAtles);
    console.log("DB connected successfully!");
  } catch (err) {
    console.error("Error connecting to DB:", err);
  }
};

module.exports = {
  dbconnect
};
