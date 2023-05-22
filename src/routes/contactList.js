const express = require("express");
const router = express.Router();
const {
  add,
  get,
  remove,
  edit,
} = require("../controllers/conactsListController");

router.post("/add", add);
router.post("/get", get);
router.post("/remove", remove);
router.post("/edit", edit);

module.exports = router;
