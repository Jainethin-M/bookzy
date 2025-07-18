import React from 'react';
import { useQuery } from '@tanstack/react-query';
import ProductsTemplate from './ProductsTemplate.js';
import { baseURL } from '../../constant/url.js';

const Products = ({ searchItem , searchCategory , searchTag}) => {
  // Use useQuery for fetching data
  const { data: products = [], isLoading, isError, error } = useQuery({
    queryKey : ['products'],
    queryFn : async () => {
      try {
        const response = await fetch(`${baseURL}/api/admin/product/all`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || 'Something went wrong');
        }
        return data;
      } catch (err) {
        console.log(err)
      }
    }
  });

  // Filter products based on search term
  const filteredProducts = products.filter((product) =>
    product.name?.toLowerCase().includes(searchItem.toLowerCase()) && 
    product.category?.toLowerCase().includes(searchCategory?.toLowerCase() || '') &&
    product.tag?.toLowerCase().includes(searchTag?.toLowerCase() || '')
);

  if (isLoading) {
    return <p>Loading products...</p>;
  }

  if (isError) {
    return <p>Error loading products: {error.message}</p>;
  }

  return (
    <div>
      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-5  text-black">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductsTemplate key={product._id} product={product} />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">No products found</p>
        )}
      </div>
    </div>
  );
};

export default Products;
