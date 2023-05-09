const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const connectDB = require('./src/config/dbConfig');
require('dotenv').config();
const env  = process.env;
const authRouter = require('./src/routes/authRouter');
const userRouter = require('./src/routes/userRouter');
const emailRouter = require('./src/routes/emailRouter');
const calendarRouter = require('./src/routes/calendarRouter');


// Create instance of Express
const app = express();

// Set up middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB database
connectDB();


// Define routes
// app.use('/api/auth', authRouter);
// app.use('/api/users', userRouter);
// app.use('/api/emails', emailRouter);
// app.use('/api/calendar', calendarRouter);

// Start the server
const PORT = env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});