const Product = require("../models/Product");
const Category = require("../models/Category");

// @desc    Get seller's products
// @route   GET /api/products/seller
// controllers/productController.js
const getSellerProducts = async (req, res) => {
  try {
    // Use consistent user ID field
    const sellerId = req.user.userId || req.user.id;
    
    const products = await Product.find({ seller: sellerId })
      .populate("categories", "name")
      .populate("seller", "username");
      
    res.json(products);
  } catch (error) {
    console.error('Get seller products error:', error);
    res.status(500).json({ 
      message: "Server error",
      error: error.message
    });
  }
};

// @desc    Create a product
// @route   POST /api/products
const createProduct = async (req, res) => {
  try {
    const { name, description, price, categories, images, stock } = req.body;

    // Validate categories
    if (!Array.isArray(categories) || categories.length === 0) {
      return res
        .status(400)
        .json({ message: "At least one category is required" });
    }

    // Check if all categories exist
    const categoriesExist = await Category.find({ _id: { $in: categories } });
    if (categoriesExist.length !== categories.length) {
      return res
        .status(400)
        .json({ message: "One or more categories are invalid" });
    }

    // Use consistent user ID
    const sellerId = req.user.userId || req.user.id;

    const product = new Product({
      name,
      description,
      price: parseFloat(price),
      categories,
      seller: sellerId,
      images: Array.isArray(images) ? images : [images],
      stock: parseInt(stock),
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error("Create product error:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
const updateProduct = async (req, res) => {
  try {
    const { name, description, price, categories, images, stock } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Use consistent user ID
    const userId = req.user.userId || req.user.id;

    if (product.seller.toString() !== userId) {
      return res
        .status(401)
        .json({ message: "Not authorized to update this product" });
    }

    // Validate categories if provided
    if (categories) {
      if (!Array.isArray(categories) || categories.length === 0) {
        return res
          .status(400)
          .json({ message: "At least one category is required" });
      }

      // Check if all categories exist
      const categoriesExist = await Category.find({ _id: { $in: categories } });
      if (categoriesExist.length !== categories.length) {
        return res
          .status(400)
          .json({ message: "One or more categories are invalid" });
      }
    }

    // Update fields
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price ? parseFloat(price) : product.price;
    product.categories = Array.isArray(categories)
      ? categories
      : product.categories;
    product.images = Array.isArray(images)
      ? images
      : [images] || product.images;
    product.stock = stock ? parseInt(stock) : product.stock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    console.error("Update product error:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Use consistent user ID
    const userId = req.user.userId || req.user.id;

    if (product.seller.toString() !== userId) {
      return res
        .status(401)
        .json({ message: "Not authorized to delete this product" });
    }

    await product.deleteOne();
    res.json({ message: "Product removed" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get single product
// Update getProductById to better handle seller information
// Get single product
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("categories", "name")
      .populate("seller", "_id username"); // Ensure _id is included

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({
      ...product._doc,
      seller: {
        _id: product.seller._id.toString(),
        username: product.seller.username
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getSellerProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
};
