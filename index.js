const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDb = require("./config/connectDB");
const morgan = require("morgan");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");

// Database Connection
dotenv.config();
connectDb();
// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Routes

app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
