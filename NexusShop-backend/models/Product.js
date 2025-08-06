const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
      },
    ],
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    images: [{ type: String }],
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    stock: { type: Number, required: true, default: 0 },
    createdAt: { type: Date, default: Date.now },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for populated category data
productSchema.virtual("populatedCategories", {
  ref: "Category",
  localField: "categories",
  foreignField: "_id",
  justOne: false,
});

// Pre hook to auto-populate categories in queries like find(), findOne(), etc.
productSchema.pre(/^find/, function (next) {
  this.populate({
    path: "populatedCategories",
    select: "name",
  });
  next();
});

module.exports = mongoose.model("Product", productSchema);
