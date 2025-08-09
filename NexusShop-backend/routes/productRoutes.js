const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const {
  getProducts,
  getSellerProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
} = require("../controllers/productController");

// Public routes
router.get("/", getProducts);
// Protected routes (seller)
router.get("/seller", protect, getSellerProducts);
router.get("/:id", getProductById);
router.post("/", protect, createProduct);
router.put("/:id", protect, updateProduct);
router.delete("/:id", protect, deleteProduct);

module.exports = router;