const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const logger = require("./src/config/logger");
const express = require("express");
require("dotenv").config();
const env = process.env;
const { requireAuth } = require("./src/middleware/authMiddleware");
const authRouter = require("./src/routes/authRouter");
const userRouter = require("./src/routes/userRouter");
const emailRouter = require("./src/routes/emailRouter");
const calendarRouter = require("./src/routes/calendarRouter");
const scheduleRouter = require("./src/routes/scheduleRouter");
const feedbackRouter = require("./src/routes/feedbackRouter");
//handel unexpected exceptions or unhandled rejections
require("./src/startup/errorHandler")();

// Create instance of Express
const app = express();

// Set up middleware
require("./src/startup/middleware")(app);

// Connect to MongoDB database
require("./src/config/dbConfig")();

// Define routes
app.use("/api/auth", authRouter);
// app.use('/api/users', userRouter);
// app.use('/api/emails', emailRouter);
app.use("/api/calendar", calendarRouter);
app.use("/api/schedule", scheduleRouter);
app.use("/api/feedback", feedbackRouter);
app.use("/api/mail", userRouter);
// Start the server
const PORT = env.PORT || 5000;
app.listen(PORT, () => {
  logger("info", `Server started on port ${PORT}`);
});
