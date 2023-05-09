const jwt = require('jsonwebtoken');
require('dotenv').config();
const env = process.env;

const requireAuth = (req, res, next) => {

    const token = req.cookies.jwt;

    // check if jwt exists & verified 
    if (token) {
        jwt.verify(token, env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.redirect('/login');
            }
            else {
                console.log(decodedToken);
                next();
            }
        })
    }
    else {
        res.redirect('/login')
    }
};

module.exports = { requireAuth };