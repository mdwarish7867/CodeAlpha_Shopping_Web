const mongoose = require("mongoose");
const Product = require("../models/Product");
const Category = require("../models/Category");


// @desc    Get seller's products
// @route   GET /api/products/seller
// Update getSellerProducts function
const getSellerProducts = async (req, res) => {
  try {
    console.log("[getSellerProducts] Start");
    console.log(`[getSellerProducts] User: ${JSON.stringify(req.user)}`);

    if (!req.user || req.user.userType !== "seller") {
      return res
        .status(403)
        .json({ message: "Forbidden: Seller access required" });
    }

    const sellerId = req.user.id;
    console.log(`[getSellerProducts] Seller ID: ${sellerId}`);

    if (!mongoose.Types.ObjectId.isValid(sellerId)) {
      console.log("[getSellerProducts] Invalid seller ID format");
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    const objectId = new mongoose.Types.ObjectId(sellerId);
    console.log(`[getSellerProducts] Converted to ObjectId: ${objectId}`);

    // Find products without populate first
    const products = await Product.find({ seller: objectId })
      .select("name description price images stock categories")
      .lean();

    console.log(`[getSellerProducts] Found ${products.length} products`);

    // Manually populate categories
    const populatedProducts = await Promise.all(
      products.map(async (product) => {
        const categories = await Category.find({
          _id: { $in: product.categories },
        }).select("name");
        return {
          ...product,
          categories: categories.map((cat) => cat.name),
        };
      })
    );

    console.log("[getSellerProducts] Success");
    res.json(populatedProducts);
  } catch (error) {
    console.error("[getSellerProducts] ERROR:", error);
    console.error(error.stack);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Other controller functions remain the same...

// @desc    Get all products
// @route   GET /api/products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({})
      .populate("categories", "name")
      .populate("seller", "username");
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get all categories
// @route   GET /api/categories
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({}, "name");
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Create a product
// @route   POST /api/products
const createProduct = async (req, res) => {
  try {
    const { name, description, price, categories, images, stock } = req.body;

    if (!name || !description || !price || !categories || !stock) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!Array.isArray(categories) || categories.length === 0) {
      return res
        .status(400)
        .json({ message: "At least one category is required" });
    }

    const categoriesExist = await Category.find({ _id: { $in: categories } });
    if (categoriesExist.length !== categories.length) {
      return res
        .status(400)
        .json({ message: "One or more categories are invalid" });
    }

    const sellerId = new mongoose.Types.ObjectId(
      req.user.userId || req.user.id
    );

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

    const userId = req.user.userId || req.user.id;
    if (product.seller.toString() !== userId) {
      return res
        .status(401)
        .json({ message: "Not authorized to update this product" });
    }

    if (categories) {
      if (!Array.isArray(categories) || categories.length === 0) {
        return res
          .status(400)
          .json({ message: "At least one category is required" });
      }
      const categoriesExist = await Category.find({ _id: { $in: categories } });
      if (categoriesExist.length !== categories.length) {
        return res
          .status(400)
          .json({ message: "One or more categories are invalid" });
      }
    }

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price ? parseFloat(price) : product.price;
    product.categories = Array.isArray(categories)
      ? categories
      : product.categories;
    product.images = Array.isArray(images)
      ? images
      : images
      ? [images]
      : product.images;
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

// @desc    Get single product by ID
// @route   GET /api/products/:id
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("categories", "name")
      .populate("seller", "_id username");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({
      ...product._doc,
      seller: {
        _id: product.seller._id.toString(),
        username: product.seller.username,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getSellerProducts,
  getProducts,
  getCategories,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
};