const express = require("express");
const router = express.Router();
const { get, remove } = require("../controllers/calendarController");

router.post("/get", get);
router.post("/remove", remove);

module.exports = router;
