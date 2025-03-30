const express = require("express");
const router = express.Router();

const { addProduct, getallProducts, updateProduct, deleteProduct } = require("../controller/productController");


router.post("/add", addProduct);
router.post("/all", getallProducts);
router.post("/update", updateProduct);
router.post("/delete", deleteProduct);

module.exports = router;