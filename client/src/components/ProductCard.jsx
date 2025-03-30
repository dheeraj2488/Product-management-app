import React from "react";
import { Button } from "antd";

const ProductCard = ({ product, onEdit, onDelete }) => {
  return (
    
    <div className="border rounded-lg p-4 shadow-lg bg-white">
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-gray-700">{product.description}</p>
      <p className="text-sm font-medium text-gray-500">
        Category: {product.category}
      </p>
      <p className="text-green-600 font-bold">Price: ₹{product.price}</p>
      <p className="text-yellow-500">⭐ {product.rating}</p>

      <div className="flex gap-2 mt-4">
        <Button className="bg-gray-800 text-white" onClick={() => onEdit(product)}>
          Edit
        </Button>
        <Button className="bg-red-500" onClick={() => onDelete(product)}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
