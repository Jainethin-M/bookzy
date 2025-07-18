import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'
import { FaComments } from 'react-icons/fa'; // Install react-icons if not already

import Products from '../Products/Products.js';
import ProfileBar from './ProfileBar.js';
import { baseURL } from '../../constant/url.js';
import logo3 from '../../assets/images/bookzy_logo.jpg'
import { aboutUs } from '../../components/DB/dummy.js';
import banner1 from '../../assets/images/bookzy_header.jpg'

const HomePage = () => {
  const [searchItem, setSearchItem] = useState('');
  const [categories, setCategories] = useState([]); // Initialize as an empty array
  const [tags, setTags] = useState([]); // Initialize as an empty array
  const [searchCategory, setSearchCategory] = useState(''); // Initialize as an empty array
  const [searchTag, setSearchTag] = useState(''); // Initialize as an empty array
  const [chatOpen, setChatOpen] = useState(false);
  const Navigate = useNavigate();

  const filter = async (field) => {
    try {
      const response = await fetch(`${baseURL}/api/admin/product/prd/filter?field=${field}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }
      return data; // This should be an array of categories
    } catch (error) {
      console.error(error);
      return []; // Return an empty array in case of error
    }
  };

  const AboutUsToast = ({ t, message }) => (
    <div
      className="p-4 shadow-md rounded-lg items-start w-96"
      style={{
        background: 'rgba(0,0,0,0.7)',      // Black with opacity
        backdropFilter: 'blur(6px)',        // Blur effect
        color: 'white',                     // White text for contrast
      }}
    >
      <button
        className="ml-4 w-full flex justify-end"
        style={{ color: '#fff' }}
        onClick={() => toast.dismiss(t.id)}
      >
        <p size={18} className='bg-red-600 text-white aspect-square min-h-7 mr-5'>X</p>
      </button>
      <p className="text-sm text-justify">{message}</p>
    </div>
  );
  

  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesData = await filter('category');
      setCategories(categoriesData); // Set the fetched categories
      const tagData = await filter('tag');
      setTags(tagData); // Set the fetched categories
    };

    fetchCategories();
    
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  return (
    <div className="bg-grey-200 text-white">
      {/* Navbar */}
      <nav className="h-52 p-4" style={{
            backgroundImage: `url(${banner1})`,
    backgroundRepeat: 'no-repeat', // Prevent repeat
    backgroundSize: 'cover',
    backgroundPosition: 'top', // Center the background image

          }}>
        <div className="flex justify-between ">
          <div>
            <a onClick={() => {Navigate('user/contact')}} className="btn btn-ghost normal-case text-xl">BOOKZY 
            <img src={logo3} className='max-h-10'></img></a>
          </div>
          <div className='flex justify-evenly items-center'>
  <button
    onClick={() => {
      toast.custom((t) => <AboutUsToast t={t} message={aboutUs}/> , { duration: Infinity })
    }}
    className='mx-2 px-4 py-2 rounded bg-black bg-opacity-60 text-white underline hover:shadow-yellow-800 hover:shadow-lg transition'
    style={{ backdropFilter: 'blur(2px)' }}
  >
    About us
  </button>
  <button
    onClick={() => {Navigate('user/contact')}}
    className='mx-2 px-4 py-2 rounded bg-black bg-opacity-60 text-white underline hover:shadow-yellow-800 hover:shadow-lg transition'
    style={{ backdropFilter: 'blur(2px)' }}
  >
    Contact us
  </button>
</div>
        </div>
          <div className='flex justify-between'>
        <div className="flex  ">
          {/* Search */}
          <input
            type="text"
            placeholder="Search for products..."
            value={searchItem}
            onChange={(e) => setSearchItem(e.target.value)}
            className="mb-1 input input-bordered w-full max-w-xs text-black flex-grow-1 md:min-w-60"
          />
          {/* Category */}
          <select className="mb-1 select select-bordered md:min-w-60  max-w-xs flex-grow-1 text-black" onChange={(e) => {setSearchCategory(e.target.value)}}>
              <option value=''>category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
          {/* Tags */}
          <select className="mb-1 select select-bordered w-full max-w-xs flex-grow-1 md:min-w-60 text-black" onChange={(e) => {setSearchTag(e.target.value)}}>
              <option value=''>tag</option>
            {tags.map((tag, index) => (
              <option key={index} value={tag}>
                {tag}
              </option>
            ))}
          </select>
          </div>
          {/* Account */}
          <div className="flex justify-center items-center max-w-10 md:mr-10 flex-grow-0">

          <ProfileBar  />
        </div>
        </div>
      </nav>

      

      {/* Product List */}
      <Products 
        searchItem={searchItem} 
        searchCategory={searchCategory} 
        searchTag={searchTag} 
      />

      {/* Floating Chatbot Icon */}
      <button
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg p-4 z-50 flex items-center justify-center"
        style={{ width: 56, height: 56 }}
        aria-label="Open chatbot"
      >
        <FaComments size={28} />
      </button>

      {/* Floating Chat Window */}
      {chatOpen && (
        <div className="fixed bottom-20 right-6 w-80 h-96 bg-white rounded-lg shadow-2xl z-50 flex flex-col">
          <div className="flex justify-between items-center p-3 border-b bg-blue-600 rounded-t-lg">
            <span className="text-white font-semibold">Chatbot</span>
            <button
              onClick={() => setChatOpen(false)}
              className="text-white text-lg font-bold"
              aria-label="Close chatbot"
            >
              ×
            </button>
          </div>
          <div className="flex-1 p-4 text-black flex items-center justify-center">
            <span className="text-gray-400">Chatbot window (UI only)</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
