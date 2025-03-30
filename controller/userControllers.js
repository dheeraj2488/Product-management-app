const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const router = express.Router();

// User Signup
const registerController =  async (req, res) => {

  const {name ,email, password } = req.body;
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Please enter all required fields." });
  }

  try {

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ success: false , message: "User already exists" });

    const salt  = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


    const newUser = new User({ name , email, password: hashedPassword });
    const savedUser = await newUser.save();

    res.status(201).json({success: true,  message: "User registered successfully" , userId: savedUser._id });
    
  } catch (error) {

    res.status(500).json({ message: "Server error. Please try again later." });

  }
};

// User Login
const loginController =  async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Please provide email and password.",
      });
  }

  try {
    
    const user = await User.findOne({ email });
    // console.log(user);
    if (!user) 
        return res.status(400).json({ success: false , message: "User not found" });

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch)
         return res.status(400).json({ success: false , message: "Invalid credentials" });

    const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY, { expiresIn: "1h" });

    return res.status(200).json({ 
        success: true ,
        token,
        message: "Login successful" ,
        user: { _id: user._id, name: user.name, email: user.email,}
    });

  } catch (error) {

    console.log(error);
    res.status(400).json({ success: false , message: "Login failed" });

  }
};

const verify = async(req, res) => {
  // console.log("mai bhi chala hu " ,req.user);
    return res.status(200).json({ success: true, user: req.user})
  }

module.exports = { registerController, loginController ,verify };
