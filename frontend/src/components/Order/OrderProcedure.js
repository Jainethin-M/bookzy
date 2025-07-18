import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useParams , Link} from "react-router-dom";
import { baseURL } from "../../constant/url";

const BuyNow = () => {
  const queryClient = useQueryClient();
  const [step, setStep] = useState(1);
  const [contact, setContact] = useState({
    doorNumber: "",
    street: "",
    district: "",
    city: "",
    phoneNumber: "",
  });
  const { prdid } = useParams();

  const handleContactSubmit = () => {
    if (
      !contact.doorNumber.trim() ||
      !contact.street.trim() ||
      !contact.district.trim() ||
      !contact.city.trim() ||
      !contact.phoneNumber.trim()
    ) {
      alert("Please fill out all contact fields!");
      return;
    }
    setStep(2);
  };

  const { mutate: handleOrderConfirm } = useMutation({
    mutationFn: async () => {
      try {
        const response = await fetch(`${baseURL}/api/order/${prdid}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ contact }),
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["authUser"],
      });
      setStep(3);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {step === 1 && (
        <div className="card w-96 bg-white shadow-md p-5">
          <h2 className="text-2xl font-bold mb-4">Enter Contact Details</h2>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Door Number:</span>
            </label>
            <input
              type="text"
              name="doorNumber"
              placeholder="Enter door number"
              className="input input-bordered w-full"
              value={contact.doorNumber}
              onChange={handleChange}
            />
            <label className="label">
              <span className="label-text">Street:</span>
            </label>
            <input
              type="text"
              name="street"
              placeholder="Enter street"
              className="input input-bordered w-full"
              value={contact.street}
              onChange={handleChange}
            />
            <label className="label">
              <span className="label-text">City:</span>
            </label>
            <input
              type="text"
              name="city"
              placeholder="Enter city"
              className="input input-bordered w-full"
              value={contact.city}
              onChange={handleChange}
            />
            <label className="label">
              <span className="label-text">District:</span>
            </label>
            <input
              type="text"
              name="district"
              placeholder="Enter district"
              className="input input-bordered w-full"
              value={contact.district}
              onChange={handleChange}
            />
            <label className="label">
              <span className="label-text">Phone Number:</span>
            </label>
            <input
              type="text"
              name="phoneNumber"
              placeholder="Enter phone number"
              className="input input-bordered w-full"
              value={contact.phoneNumber}
              onChange={handleChange}
            />
          </div>
          <button
            className="btn btn-primary w-full mt-4"
            onClick={handleContactSubmit}
          >
            Submit
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="card w-96 bg-white shadow-md p-5">
          <h2 className="text-2xl font-bold mb-4">Confirm Order</h2>
          <p>Your order will be shipped to:</p>
          <p className="font-bold mt-2">
            {contact.doorNumber}, {contact.street}, {contact.city},{" "}
            {contact.district}
          </p>
          <p>Phone Number: {contact.phoneNumber}</p>
          <button
            className="btn btn-primary w-full mt-4"
            onClick={handleOrderConfirm}
          >
            Confirm Order
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="card w-96 bg-white shadow-md p-5">
            <nav className="bg-yellow-500 text-neutral-content p-4 flex justify-between items-center">
        <Link to= {`/product/${prdid}`}>
          <button className="btn btn-ghost text-lg">❮ Back</button>
        </Link>

      </nav>
          <h2 className="text-2xl font-bold mb-4">Order Confirmed</h2>
          <p>Thank you for your order! Your order will be shipped to:</p>
          <p className="font-bold mt-2">
            {contact.doorNumber}, {contact.street}, {contact.city},{" "}
            {contact.district}
          </p>
          <p>Phone Number: {contact.phoneNumber}</p>
        </div>
      )}
    </div>
  );
};

export default BuyNow;
