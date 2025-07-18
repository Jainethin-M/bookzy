import React, { useContext, useEffect } from 'react';
import { useParams , useNavigate } from 'react-router-dom';
import { useMutation, useQuery ,useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { baseURL } from '../../constant/url.js';
import BackToHome from '../../components/Fixed/BackToHome.js'
import ProductsTemplate from './ProductsTemplate.js';
import { userContext } from '../../App.js';

const Product = () => {
  const { prdid } = useParams();
  const authUser = useContext(userContext)
  const queryClient = useQueryClient();

  // Fetch single product based on prdid
  const { data: product, isLoading: isProductLoading, isError: isProductError, error: productError ,refetch : refetchProduct } = useQuery({
    queryKey : ['product'],
    queryFn :async () => {
      const response = await fetch(`${baseURL}/api/admin/product/prd/${prdid}`, {
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
    },
    
      enabled: !!prdid, // Ensures the query runs only if prdid is available
      }
    
  );

  // Fetch all products for the "other products" section
  const { data: products = [], isLoading: isProductsLoading, isError: isProductsError, error: productsError } = useQuery({
    queryKey : ['products'],
    queryFn : async () => {
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
    }
  });
  useEffect(()=> {
    refetchProduct();
    // console.log()

  },[prdid])

  const {mutate : handleCart} = useMutation({
    mutationFn : async() => {
      try {
        
        const response = await fetch(`${baseURL}/api/user/cart/${prdid}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials : 'include'
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || 'Something went wrong');
        }
        // console.log(data)
        toast.success('added to cart')
      } catch (error) {
        // console.log(error)
        toast.error('can\'t adding to cart now\ntry again')
      }
    },onSuccess : () => {
      queryClient.invalidateQueries({
        queryKey : ['authUser']
      })
    }
  })

  const navigate = useNavigate();
  const handleOrder = () => {
    navigate(`/order/${prdid}`)
  }
  
  // Filter out the current product from the list of all products
  const otherProducts = products.filter(product => {return product._id !== prdid}) ;

  if (isProductLoading || isProductsLoading) {
    return <div>Loading...</div>;
  }

  if (isProductError || isProductsError) {
    return <div>Error: {productError?.message || productsError?.message}</div>;
  }

  return (
    <div className="bg-base-200 min-h-screen">
      {/* Navbar */}
      <BackToHome/>

      {/* Product Details */}
      <div className="flex flex-col lg:flex-row items-center  lg:items-start gap-10 p-5 lg:p-20">
      <img
        src={product?.productImage || 'https://placehold.co/400'}
        alt={product.name || 'Product Image'}
        className="w-auto h-[500px] max-w-sm lg:max-w-md rounded-lg shadow-md border-2 border-black"
      />

        <div className="flex flex-col gap-6 max-w-md">
          <h1 className="text-3xl lg:text-5xl font-bold text-center lg:text-left">{product.name || 'Product Name'}</h1>
          <p className="text-lg lg:text-xl text-center lg:text-left">{product.description || 'Product Description'}</p>
          <p className="text-2xl lg:text-3xl font-semibold text-center lg:text-left">₹ {product.price || 'Product Price'}</p>
          <div className=''>
            
          <button className="btn btn-primary w-full lg:w-auto self-center lg:self-start m-1" onClick={handleOrder}>Buy Now</button>
          { !authUser.myCart.includes(prdid) &&
            <button className="btn btn-primary w-full lg:w-auto self-center lg:self-start m-1" onClick={handleCart}>To Cart</button>}
          </div>
        </div>
      </div>

      {/* Other Products */}
      <div className="overflow-x-auto whitespace-nowrap">
        <div className="flex gap-6">
          {/* Product Cards */}
          {otherProducts.map((product) => (
            <ProductsTemplate key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
