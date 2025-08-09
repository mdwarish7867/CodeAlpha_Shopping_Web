const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
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
    images: [
      {
        type: String,
        default: [],
      },
    ],
    stock: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    // Additional fields as needed
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret.__v;
        return ret;
      },
    },
    toObject: { virtuals: true },
  }
);

// Indexes for better performance
productSchema.index({ seller: 1 });
productSchema.index({ categories: 1 });
productSchema.index({ name: "text", description: "text" });

// Virtual for populated category data
productSchema.virtual("populatedCategories", {
  ref: "Category",
  localField: "categories",
  foreignField: "_id",
  justOne: false,
});

// Pre hook to auto-populate categories in queries
productSchema.pre(/^find/, function (next) {
  this.populate({
    path: "populatedCategories",
    select: "name",
  });
  next();
});

module.exports = mongoose.model("Product", productSchema);
