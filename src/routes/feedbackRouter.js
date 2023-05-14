const express = require("express");
const router = express.Router();
const feedback = require('../controllers/feedbackController');

router.patch('/msgread/:id', feedback.msgread);
//router.get('/login', feedback.login);

module.exports = router