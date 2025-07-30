// Example: routes/authRoutes.js - Fixed
const express = require("express");
const router = express.Router(); // Fixed: Use express.Router() directly
const authController = require("../controllers/authController");

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.post("/logout", authController.logoutUser);

module.exports = router;
