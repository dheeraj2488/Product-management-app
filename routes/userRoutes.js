const express = require("express");
const {
  loginController,
  registerController,
  verify,
} = require("../controller/userControllers");
const { verifyUser } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/login", loginController);
router.post("/register", registerController);
router.get("/verify", verifyUser, verify);

module.exports = router;
