const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const {
  getCart,
  addToCart,
  removeFromCart,
  updateCartItem,
} = require("../controllers/cartController");

router.get("/", protect, getCart);
router.post("/", protect, addToCart);
router.delete("/:productId", protect, removeFromCart);
router.put("/:productId", protect, updateCartItem);

module.exports = router;
