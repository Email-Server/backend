const logger = require("../config/logger");
require("dotenv").config();
const env = process.env;
const mongoose = require("mongoose");

const mongoUri = env.MONGODB_URI;

const connectDB = async () => {
  await mongoose
    .connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => logger("info", "connected to MongoDB"))
    .catch((err) => logger("error", `Error connecting to MongoDB: ${err}`));
};

module.exports = connectDB;
