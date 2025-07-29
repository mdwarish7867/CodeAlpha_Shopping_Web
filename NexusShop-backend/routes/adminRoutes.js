// routes/adminRoutes.js
const express = require("express");
const router = express.Router();
const { authorize } = require("../middleware/auth");
const adminController = require("../controllers/adminController");

// Admin protected routes
router.get("/users", authorize("admin"), adminController.getUsers);
router.delete("/users/:id", authorize("admin"), adminController.deleteUser);

router.get("/products", authorize("admin"), adminController.getAllProducts);
router.delete(
  "/products/:id",
  authorize("admin"),
  adminController.deleteProduct
);

module.exports = router;
