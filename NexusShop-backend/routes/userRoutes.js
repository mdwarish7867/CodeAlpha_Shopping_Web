const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const { updatePassword } = require("../controllers/authController");

router.put("/update-password", protect, updatePassword);
router.get("/profile", protect, (req, res) => {
  res.json({
    id: req.user.id,
    username: req.user.username,
    email: req.user.email,
    userType: req.user.userType,
  });
});

module.exports = router;