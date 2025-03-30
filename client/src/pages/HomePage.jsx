import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { Button, Modal, Table } from "antd";
import Layout from "../components/layout/Layout";
import ProductCard from "../components/ProductCard";
const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState(""); 
  const [selectedCategory, setSelectedCategory] = useState(""); 
  const [minPrice, setMinPrice] = useState(""); 
  const [maxPrice, setMaxPrice] = useState("");
  const [minRating, setMinRating] = useState(""); 

  const [products, setProducts] = useState([]);
  const [editable, setEditable] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { user } = useAuth();

  const resetStates = () => {
    setName("");
    setDescription("");
    setCategory("");
    setPrice("");
    setRating("");
  };

  const fetchProducts = async () => {
    try {

      const res = await axios.post("http://localhost:8081/api/product/all", {
        userId: user._id,
      });
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editable) {
        console.log(editable);
        const response = await axios.post(
          "http://localhost:8081/api/product/update",
          {
            // transactionId: editable._id,
            id: editable._id,
            name,
            description,
            category,
            price,
            rating,
            
          }
        );
        if (response.data.success) {

          alert("Product updated successfully!");

        }
        setEditable(null);
        
      } else {
        
        const response = await axios.post(
          "http://localhost:8081/api/product/add",
          {
            name,
            description,
            category,
            price,
            rating,
            userId: user._id,
          }
        );

        // console.log(response.data);
        if (response.data.success) {
          alert("Product added successfully!");
        }
      }
      setShowModal(false);
      resetStates();
      fetchProducts(user._id);
    } catch (error) {

      console.log(error);
      alert("Error :", error.message);

      setShowModal(false);
    }
  };

  const openEditModal = (product) => {
    setEditable(product);
    setName(product.name);
    setDescription(product.description);
    setCategory(product.category);
    setPrice(product.price);
    setRating(product.rating);
    setShowModal(true);
  };

  const handleDelete = async(product) =>{

    try {

      const response = await axios.post("http://localhost:8081/api/product/delete", {
        id: product._id,
      });

      if (response.data.success) {
        alert("Product deleted successfully!");
      }
      resetStates();
      fetchProducts(user._id);
     
      
    } catch (error) {
      
      alert("Error deleting product", error.message);

    }
  };


  useEffect(() => {

    if (user._id) {
      console.log("fetching products");
      fetchProducts();

    }
  }, [user]);


  const filteredProducts = products.filter((product) => {
    
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "" || product.category === selectedCategory;

    const matchesPrice =
      (minPrice === "" || product.price >= Number(minPrice)) &&
      (maxPrice === "" || product.price <= Number(maxPrice));

    const matchesRating =
      minRating === "" || product.rating >= Number(minRating);

    return matchesSearch && matchesCategory && matchesPrice && matchesRating;
  });

  return (
    <Layout>
      <div >

        <div className="flex justify-between">
          {/* Filtering section  */}
          <div className="flex flex-wrap gap-4 p-4 ">
              
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border p-2 rounded-md w-60"
              />

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border p-2 rounded-md"
              >
                <option value="">All Categories</option>
                <option value="Electronics">Electronics</option>
                <option value="Furniture">Furniture</option>
                <option value="Grocery">Grocery</option>
                <option value="Fashion">Fashion</option>
                <option value="Automotive">Automotive & Accessories</option>
                <option value="Books">Books & Stationery</option>
              </select>

              <input
                type="number"
                placeholder="Min Price"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="border p-2 rounded-md w-24"
              />
              <input
                type="number"
                placeholder="Max Price"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="border p-2 rounded-md w-24"
              />

              <input
                type="number"
                placeholder="Min Rating (1-5)"
                value={minRating}
                onChange={(e) => setMinRating(e.target.value)}
                className="border p-2 rounded-md w-24"
              />
          </div>
          {/* Adding new product */}
          <div className="flex justify-center items-center mr-8">
            <Button
              className="text-white bg-red-500 hover:bg-red-700"
              type="primary"
              onClick={() => setShowModal(true)}
            >
              Add new
            </Button>
          </div>
        </div>

        <div>
          {/* Products */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            {filteredProducts.length > 0 ? (

              filteredProducts.map((product) => (

                <ProductCard  key={product._id}
                  product={product}
                  onEdit={openEditModal}
                  onDelete={handleDelete}/>
                
              ))

            ) : (

              <p className="text-center text-gray-500 w-full">
                No products match your filters.
              </p>

            )}
          </div>

        </div>

        <Modal
          title={editable ? "Edit Product Details" : "Add Product"}
          open={showModal}
          onCancel={() => {
            setEditable(null);
            setShowModal(false);
          }}
          footer={false}
        >
          <form
            className="space-y-6"
            onSubmit={handelSubmit}
            initialvalues={editable}
          >
            <div>
              <label htmlFor="name">Name: </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500  shadow-xl"
              />
            </div>

            <div>
              <label htmlFor="description">Description: </label>
              <input
                type="text"
                id="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500  shadow-xl"
              />
            </div>

            <div>
              <label htmlFor="category">Category: </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="border rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 shadow-xl"
              >
                <option value="Electronics">Electronics</option>
                <option value="Furniture">Furniture</option>
                <option value="Grocery">Grocery</option>
                <option value="Fashion">Fashion</option>
                <option value="Automotive">Automotive & Accessories</option>
                <option value="Books"> Books & Stationery</option>
              </select>
            </div>

            <div>
              <label htmlFor="price">Price: </label>
              <input
                type="number"
                id="price"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="border rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 shadow-xl"
              />
            </div>

            <div>
              <label htmlFor="rating">Rating: </label>
              <input
                type="text"
                id="rating"
                name="rating"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="border rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 shadow-xl"
              />
            </div>

            <button
              type="submit"
              className="w-full text-white bg-red-500 hover:bg-red-700 font-medium rounded-lg text-md px-5 py-2.5 text-center"
            >
              Save
            </button>
          </form>
        </Modal>
      </div>
    </Layout>
  );
};

export default HomePage;
