import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query';

import ProductsTemplate from '../../pages/Products/ProductsTemplate';
import { baseURL } from '../../constant/url';
import BackToHome from '../Fixed/BackToHome';

const MyCart = () => {

  const { data: products = [], isLoading,  error } = useQuery({
    queryKey : ['products'],
    queryFn : async () => {
      try {
        const response = await fetch(`${baseURL}/api/user/cart`, {
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
        <BackToHome/>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-5">

        {
          products.map(product => (<ProductsTemplate product={product} />))
        }
      </div>
    </div>
  )
}

export default MyCart