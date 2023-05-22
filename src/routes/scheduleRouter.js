const express = require("express");
const router = express.Router();
const {
  send,
  receive,
  approve,
  ignore,
  remove,
  edit,
} = require("../controllers/scheduleController");

router.post("/send", send);
router.post("/receive", receive);
router.post("/approve", approve);
router.post("/ignore", ignore);
router.post("/remove", remove);
router.post("/edit", edit);

module.exports = router;
