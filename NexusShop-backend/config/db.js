const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");

    // Seed initial categories
    await seedCategories();
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};

const seedCategories = async () => {
  try {
    const Category = require("../models/Category");
    const count = await Category.countDocuments();

    if (count === 0) {
      const categories = [
        "Electronics",
        "Fashion",
        "Home & Kitchen",
        "Beauty",
        "Books",
        "Sports",
        "Toys",
        "Automotive",
        "Health",
        "Grocery",
        "Jewelry",
        "Tools",
        "Baby",
        "Pet Supplies",
        "Office",
        "Movies & TV",
        "Music",
        "Video Games",
        "Garden",
        "Furniture",
      ];

      await Category.insertMany(categories.map((name) => ({ name })));
      console.log("Categories seeded successfully");
    }
  } catch (err) {
    console.error("Category seeding error:", err.message);
  }
};

module.exports = connectDB;
