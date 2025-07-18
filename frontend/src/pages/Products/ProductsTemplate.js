import React from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate for navigation


const ProductsTemplate = ({ product , status = null }) => {

  const navigate = useNavigate(); // Correct usage of useNavigate
  
  const handleClick = () => {
    // Navigate to the product detail page
    navigate(`/product/${product._id}`); // Use _id if that's your product identifier
  };

  return (
    <div
      key={product._id}
      className="bg-white shadow-md rounded-lg border border-gray-200 cursor-pointer"
      onClick={handleClick}
    >
      {/* Product Image */}
      <img
        src={product?.productImage || 'https://placehold.co/400'}
        alt={product?.name}
        className="rounded-t-lg w-full h-40 object-cover border-b-2"
      />

      {/* Product Info */}
      <div className="p-4 cursor-default">
        <h2 className="card-title">{product?.name}</h2>
        <p>₹ {product?.price}</p>
        {status && <p>status : {status}</p>}
      </div>
    </div>
  );
};

export default ProductsTemplate;
