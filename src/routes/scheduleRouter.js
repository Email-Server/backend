const express = require("express");
const router = express.Router();
const {
  send,
  receive,
  approve,
  ignore,
  remove,
} = require("../controllers/scheduleController");

router.post("/send", send);
router.post("/receive", receive);
router.post("/approve", approve);
router.post("/ignore", ignore);
router.post("/remove", remove);

module.exports = router;
