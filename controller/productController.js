const product = require("../models/product");

const addProduct = async (req, res) => {
  try {

    const { name, description, category, price, rating , userId} = req.body;
    

    const newProduct = new product({ name, description, category, price, rating ,userId });
    await newProduct.save();

    res.status(201).json({success : true ,  message: "Product added successfully", product: newProduct });

  } catch (error) {

    res.status(500).json({ success : false ,message: "Error adding product" });

  }
};

const getallProducts = async (req, res) => {
  try { 

    const {userId} = req.body; 
    const products = await product.find({ userId }); 

    res.status(200).json( products);

  } catch (error) {

    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal Server Error" });

  }
};

const updateProduct = async (req, res) => {
  try {
    const { id, name, description, category, price, rating } = req.body;


    const updatedProduct = await product.findByIdAndUpdate(id, { name, description, category, price, rating }, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ success : true , message: "Product updated successfully", product: updatedProduct });

  } catch (error) {
    res.status(500).json({ success : false , message: "Error updating product", error: error.message });
  }
};


const deleteProduct = async (req, res) => {
  try {
    const { id } = req.body;

    const deletedProduct = await product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error: error.message });
  }
};

module.exports = { addProduct, getallProducts, updateProduct, deleteProduct };
