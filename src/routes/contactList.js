const express = require("express");
const router = express.Router();
const { add, get, remove } = require("../controllers/conactsListController");

router.post("/add", add);
router.post("/get", get);
router.post("/remove", remove);

module.exports = router;
