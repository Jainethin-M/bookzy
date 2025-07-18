import React, { useState , useContext} from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import petimg1 from '../../assets/images/petimg1.jpg'
import { userContext } from '../../App.js';


import { baseURL } from "../../constant/url";

const SidebarWithButton = () => {
    const authUser = useContext(userContext)
  
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const navigate = useNavigate();
  
  const toggleSidebar = () => {
    setSidebarVisible((prev) => !prev);
  };

  const handleClickCart = () => {
    navigate('/user/cart'); // Correct path for cart
  };

  const handleClickProfile = () => {
    navigate('/user/profile'); // Correct path for profile
  };
  const handleClickContactus = () => {
    navigate('/user/contact'); // Correct path for profile
  };

  const handleClickOrders = () => {
    navigate('/user/orders'); // Correct path for orders
  };

  const queryClient = useQueryClient();
  const handleClickLogout = async() => {
    try {
       const response = await fetch(`${baseURL}/api/auth/logout`, {
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
              console.log(data)
              queryClient.invalidateQueries({
                queryKey : ['authUser']
              });
    } catch (error) {
      console.log('logout' ,error)
    }
  }

  return (
    <div className="  z-10 text-black">
      {/* Button */}
      <button
        className="btn btn-circle hover:bg-opacity-25 ml-2 overflow-hidden"
        onClick={toggleSidebar}
      >
        <img
          className="object-cover mix-blend-multiply w-full h-full"
          src={authUser?.profileImage||petimg1}
          alt="Icon"
        />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-lg border-l border-gray-200 transform ${
          isSidebarVisible ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 w-64`}
      >
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Menu</h2>
          
          <div
            className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
            onClick={handleClickProfile} // Updated navigation for profile
          >
            Profile
          </div>
          
          <div
            className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
            onClick={handleClickCart} // Updated navigation for my cart
          >
            My Cart
          </div>
          
          <div
            className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
            onClick={handleClickOrders} // Updated navigation for orders
          >
            My Orders
          </div>
          <div
            className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
            onClick={handleClickOrders} // Updated navigation for orders
          >
            My Returns
          </div>
          <div
            className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
            onClick={handleClickContactus} // Updated navigation for orders
          >
            Contact us
          </div>
          
          <div
            className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
            onClick={handleClickLogout} // Updated navigation for logout
          >
            Logout
          </div>
          
          <button
            className="mt-4 btn btn-primary w-full"
            onClick={toggleSidebar}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SidebarWithButton;
