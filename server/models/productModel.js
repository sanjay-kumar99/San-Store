import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter product name"],
    },
    description: {
      type: String,
      required: [true, "Please enter product description"],
    },
    price: {
      type: Number,
      required: [true, "Please enter product price"],
      default: 0,
    },
    oldPrice: {
      type: Number,
      default: 0,
    },
    images: {
      type: [String], // multiple images
      default: [],
    },
    videos: {
      type: [String], // multiple video URLs
      default: [],
    },

    category: {
      type: String,
      required: [true, "Please select category"],
    },
    brand: {
      type: String,
      default: "",
    },
    sizes: {
      type: [String], // only for clothing
      default: [],
    },
    details: {
      type: Object, // flexible specs
      default: {},
    },
    countInStock: {
      type: Number,
      required: [true, "Please enter stock quantity"],
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

const Product = mongoose.model("Product", productSchema);
export default Product;
