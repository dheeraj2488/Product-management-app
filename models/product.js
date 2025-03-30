const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({

  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: String, required: true },
  userId: { type: String, required: true }, // Associate product with user
});
const product = mongoose.model("Product", ProductSchema);
module.exports = product;
