const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const verifyUser = async (req, res, next) => {
  try {
    // console.log("Middleware verifyUser is running...");

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, error: "Token not provided" });
    }

    const token = authHeader.split(" ")[1];
    // console.log("Token:", token);


    jwt.verify(token, process.env.JWT_KEY, async (err, decoded) => {
      if (err) {
        // console.log( err.message);
        return res.status(401).json({ success: false, error: "Token not valid" });
      }

      const user = await User.findById(decoded._id).select("-password");
      if (!user) {
        // console.log("User not found in DB");
        return res.status(404).json({ success: false, error: "User not found" });
      }

      req.user = user;
      next();
    });
  } catch (error) {
    
    return res.status(500).json({ success: false, error: "Server error" });
  }
};

module.exports = { verifyUser };
