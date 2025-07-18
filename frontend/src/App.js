import React, { createContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { baseURL } from './constant/url.js';
import Signup from './pages/auth/Signup.js';
import Login from './pages/auth/Login.js';
import HomePage from './pages/home/HomePage.js';
import Product from './pages/Products/Product.js';
import MyCart from './components/User/MyCart.js';
import MyOrder from './components/User/MyOrder.js'
import ProfilePage from './components/User/ProfilePage.js';
import OrderProcedure from './components/Order/OrderProcedure.js'
import CreateProduct from './pages/Products/CreateProduct.js'
import UpdateProduct from './pages/Products/UpdateProduct.js'
import Contactus from './pages/home/Contactus.js';
import Test from './Test.js';
import banner1 from './assets/images/bookzy_theme.jpg'; // Add this import at the top

export const userContext = createContext(null);
const App = () => {
  const { data: authUser, isLoading, error } = useQuery({
    queryKey: ['authUser'],
    queryFn: async () => {
      try {
        const res = await fetch(`${baseURL}/api/auth/me`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const resData = await res.json();

        if (!res.ok) {
          throw new Error(resData.error || 'Something went wrong');
        }
        // console.log('data : ', resData);
        return resData;
      } catch (err) {
        console.log('error in app.js :', err.message);
        return null;
      }
    },
    retry: false,
  });

  // Show a loading spinner or skeleton screen while data is being fetched
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Handle error state if necessary
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <userContext.Provider value={authUser}>
      <div
        style={{
          minHeight: '100vh',
          width: '100vw',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: -1,
          backgroundImage: `url(${banner1})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh' }}>
        <Routes>
          <Route
            path="/login"
            element={!authUser ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!authUser ? <Signup /> : <Navigate to="/" />}
          />
          <Route
            path="/product/:prdid"
            element={authUser ? <Product /> : <Navigate to="/login" />}
          />
          <Route
            path="/product/:prdid/update"
            element={authUser ? <UpdateProduct /> : <Navigate to="/login" />}
          />
          <Route
            path="/user/return"
            element={authUser ? <h1>No Returns Made</h1> : <Navigate to="/login" />}
          />
          <Route
            path="/createproduct"
            element={authUser ? <CreateProduct /> : <Navigate to="/login" />}
          />
          <Route
            path="/order/:prdid"
            element={authUser ? <OrderProcedure /> : <Navigate to="/login" />}
          />
          <Route
            path="/user/cart"
            element={authUser ? <MyCart /> : <Navigate to="/login" />}
          />
          <Route
            path="/user/profile"
            element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/user/contact"
            element={authUser ? <Contactus /> : <Navigate to="/login" />}
          />
          <Route
            path="/user/orders"
            element={authUser ? <MyOrder/> : <Navigate to="/login" />}
          />
          <Route
            path="/"
            element={authUser ? <HomePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/test"
            element={<Test/>}
          />
          <Route path="/*" element={<h1>Page not ready</h1>} />
        </Routes>
        <Toaster/>
      </div>
    </userContext.Provider>
  );
};

export default App;
