const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();
const env  = process.env;


const createToken = (id) => {
    return jwt.sign({id}, env.JWT_SECRET, {
        expiresIn: 1000 * 60 * 60 * 24
    });
}
exports.register = async (req, res) => {
    try {
        const { email, password, firstName, lastName, birthdate } = req.body;

        // check if user with given email is already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "User with this email already registered"
            });
        }

        // hash password
        const salt = await bcrypt.genSalt(5);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create new user
        user = new User({
            email,
            password:hashedPassword,
            firstName,
            lastName,
            birthdate
        });
        
        // generate verification token and set it to user doc
        const token = createToken(email);
        user.verificationToken = token;
        await user.save();

        if(user) {
            res.cookie('jwt', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24});
            res.status(201).json({
                message: "User registered successfully"
            });
        };

        // // Send verification email
        // const verificationUrl = `${env.CLIENT_URL}/verify/${verificationToken}`;
        // await sendVerificationEmail(email, verificationUrl);
        
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Error registering user",
            error: err.message
        });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // find user by email
        const user = await User.findOne({ email });

        // check if user exist in DB
        if (!user) {
            return res.status(404).json({
                message: "Invalid email or password"
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7}); 
        return res.status(200).json({
            message: "User logged in successfully"
        })
    }  catch (err){
        console.log(err);
        res.status(500).json({
            message: "Error logging user in",
            error: err.message
        });
    }
};

exports.refreshToken = async (req, res) => {

};

exports.logout = async (req, res) => {

};