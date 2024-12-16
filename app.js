const express = require("express");
const { menuRouter } = require("./routes/menuAdd");
const { dbconnect } = require("./dbConnection");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

app.use("/", menuRouter);

const serverStart = async () => {
  try {
    await dbconnect();
    app.listen(7000, () => {
      console.log("server started");
    });
  } catch (err) {
    console.log(err);
  }
};

serverStart();
