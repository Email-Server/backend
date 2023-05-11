const logger = require("./src/config/logger");
const express = require("express");
require("dotenv").config();
const env = process.env;
const { requireAuth } = require("./src/middleware/authMiddleware");
const authRouter = require("./src/routes/authRouter");
const userRouter = require("./src/routes/userRouter");
const emailRouter = require("./src/routes/emailRouter");
const calendarRouter = require("./src/routes/calendarRouter");

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
app.get("/7masa", requireAuth, (req, res) =>
  res.json({
    message: "ahlen 7mada",
  })
);
// app.use('/api/users', userRouter);
// app.use('/api/emails', emailRouter);
// app.use('/api/calendar', calendarRouter);

// Start the server
const PORT = env.PORT || 5000;
app.listen(PORT, () => {
  logger("info", `Server started on port ${PORT}`);
});
