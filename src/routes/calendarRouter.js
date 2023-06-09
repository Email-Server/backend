const express = require("express");
const router = express.Router();
const {
  get,
  remove,
  create,
  edit,
} = require("../controllers/calendarController");

router.post("/get", get);
router.post("/remove", remove);
router.post("/create", create);
router.post("/edit", edit);

module.exports = router;
