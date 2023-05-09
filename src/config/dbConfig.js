require("dotenv").config();
const env = process.env;
const mongoose = require('mongoose');

const mongoUri = env.MONGODB_URI;

const connectDB = async () => {
    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('connected to MongoDB'))
    .catch(err => console.log(`Error connecting to MongoDB: ${err}`));
};

module.exports = connectDB;