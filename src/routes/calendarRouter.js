const express = require("express");
const router = express.Router();
const Calendar = require("../models/calendar");
const logger = require("../config/logger");

router.post("/me", async (req, res) => {
  try {
    const calendar = await Calendar.find({ user: req.body.id });
    res.send(calendar);
  } catch (error) {
    logger("error", `${error}`);
  }
});

module.exports = router;
