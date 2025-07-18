import React from 'react'

import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { contactus } from '../../components/DB/dummy';

const ContactUs = () => {

    const shopTimings = {
        openingHour: 8, // 9 AM
        closingHour: 21, // 9 PM
      
        isShopOpen: function () {
          const now = new Date();
          const currentHour = now.getHours();
          console.log(currentHour >= this.openingHour && currentHour < this.closingHour)
          return currentHour >= this.openingHour && currentHour < this.closingHour;
        },
      };
      
      // Example usage:
      console.log(shopTimings.isShopOpen() ? "Shop is Open" : "Shop is Closed");
      
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-200 p-6">
      <div className="card w-full max-w-md bg-white shadow-2xl p-8 rounded-3xl border border-gray-200">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Contact Us </h2>
        <div className="divider"></div>
        <p className="text-lg font-semibold text-center text-gray-700">Shop Name: <span className="text-primary">{contactus.shopName}</span></p>
        <p className={`text-center ${contactus.openStatus.isShopOpen() ?  'text-green-600' :'text-red-600'} font-medium text-lg`}>{contactus.openStatus.isShopOpen() ? `🟢 Open Now` :`🔴 Close now` }</p>
        <p className="text-center text-gray-600 text-lg">📍 {contactus.address}</p>
        <p className="text-center text-blue-600 text-lg">📧 {contactus.email}</p>
        <div className="flex justify-center gap-6 mt-6">
          <a href={`https://instagram.com/${contactus.instagram}`}   className="btn btn-outline btn-primary flex items-center gap-2 px-5 py-3 text-lg rounded-full shadow-md hover:shadow-lg transition-all">
            <FaInstagram className="text-2xl" /> Instagram
          </a>
          <a href={`https://wa.me/${contactus.whatsApp}`}   className="btn btn-outline btn-success flex items-center gap-2 px-5 py-3 text-lg rounded-full shadow-md hover:shadow-lg transition-all">
            <FaWhatsapp className="text-2xl" /> WhatsApp
          </a>
        </div>
        
      </div>
    </div>
  );
};

export default ContactUs