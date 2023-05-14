


const express = require("express");
const router = express.Router();
const mail = require('../controllers/userController');

router.post('/send', mail.sendMail);
router.post('/recive', mail.receiveMail);

module.exports = router