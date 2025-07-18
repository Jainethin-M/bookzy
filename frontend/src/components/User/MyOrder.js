import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query';

import ProductsTemplate from '../../pages/Products/ProductsTemplate';
import { baseURL } from '../../constant/url';

const MyOrder = () => {

  const { data: products = [], isLoading,  error } = useQuery({
    queryKey : ['products'],
    queryFn : async () => {
      try {
        const response = await fetch(`${baseURL}/api/user/order`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials : 'include'
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Handle error state if necessary
  if (error) {
    return <div>Error: {error.message}</div>;
  }


  return (
    <div >
        <nav className="bg-yellow-500 text-neutral-content p-4 flex justify-between items-center">
        <Link to="/">
          <button className="btn btn-ghost text-white">❮ Home</button>
        </Link>

      </nav>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-5">

      { 
      !products.length ? <div>nothing ordered</div>:
       
        products.map((product, index) => (
          product?.productID ? (
            <ProductsTemplate key={index} product={product.productID} status={product.status} />
          ) : (
            <div key={index}></div> // Handle missing productID case
          )
        ))
      }

      </div>
    </div>
  )
}

export default MyOrder