import React, { useState , useRef, use, useEffect } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineWarning } from "react-icons/ai";
import { useMutation , useQuery, useQueryClient } from "@tanstack/react-query";
import {baseURL} from '../../constant/url.js'
import { useParams } from "react-router-dom";
const UpdateProduct = () => {
  const {prdid } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    tag: "",
    category: "",
    price: "",
    inStock: "Out of Stock",
    description: "",
    // productImage: null,
  });
  const imgRef = useRef();
	const [img, setImg] = useState(null);

  // fetching product data
  const { data: product, isLoading: isProductLoading, } = useQuery({
    queryKey : ['updateproduct'],
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


  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: name === "inStock" ? (checked ? "In Stock" : "Out of Stock") : value,
    });
  };

  const handleImgChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = () => {
				setImg(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};

  

  const { mutate: updateProduct, isPending, error } = useMutation({
    mutationFn: async () => {
      const data = {
        name : formData.name,
        tag : formData.tag, 
        category : formData.category, 
        inStock : formData.inStock, 
        description : formData.description, 
        price : formData.price,
        productImage : img 
       }
       try {
        const res = await fetch(`${baseURL}/api/admin/product/prd/${prdid}`, {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data ),
        });
        if (!res.ok) throw new Error("Failed to update product");
        console.log(res);
       } catch (error) {
          console.log(error)
       }
     
    },
    onError: () => {
      toast.error("Error: " + error?.message);
    },
    onSuccess: () => {
      toast.success("Product updated successfully!");
    },
  });

  const handleSubmit = async(e) => {
    e.preventDefault();

    // Check for empty fields
    if (!formData.name) {
      toast.error("Please fill out the product name.", {
        icon: <AiOutlineWarning size={20} className="text-red-500" />,
      });
      document.querySelector("input[name='name']").focus();
      return;
    }
    if (!formData.category) {
      toast.error("Please fill out the category.", {
        icon: <AiOutlineWarning size={20} className="text-red-500" />,
      });
      document.querySelector("input[name='category']").focus();
      return;
    }
    if (!formData.price) {
      toast.error("Please fill out the price.", {
        icon: <AiOutlineWarning size={20} className="text-red-500" />,
      });
      document.querySelector("input[name='price']").focus();
      return;
    }
    console.log(formData)
    await updateProduct();
  };

  useEffect(() => {
    setFormData({
      name: product?.name||"",
      tag: product?.tag||"",
      category: product?.category||"",
      price: product?.price||"",
      inStock: product?.inStock||"Out of Stock",
      description: product?.description||"",
    })
  },[product])

  if(isProductLoading){
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit} className="bg-base-200 p-6 rounded-lg shadow-md space-y-4">
        <h2 className="text-2xl font-bold">Update Product</h2>

        {/* Name Input */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Product Name</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter product name"
            className="input input-bordered"
            required
          />
        </div>

        {/* Tag Input */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Tag</span>
          </label>
          <input
            type="text"
            name="tag"
            value={formData.tag}
            onChange={handleChange}
            placeholder="Enter product tag"
            className="input input-bordered"
          />
        </div>

        {/* Category Input */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Category</span>
          </label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Enter product category"
            className="input input-bordered"
            required
          />
        </div>

        {/* Price Input */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Price</span>
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter product price"
            className="input input-bordered"
            min="0"
            required
          />
        </div>

        {/* In Stock Display */}
        <div className="form-control flex flex-row gap-7">
          <label className="label">
            <span className="label-text">Stock Status : </span>
          </label>
          
          <input
            type="checkbox"
            name="inStock"
            checked={formData.inStock === 'In Stock'}
            onChange={handleChange}
            className="toggle toggle-primary mt-2"
          />
        </div>

        {/* Description Textarea */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter product description"
            className="textarea textarea-bordered"
          ></textarea>
        </div>

        {/* Product Image Upload */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Product Image</span>
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImgChange}
            ref = {imgRef}
            className="file-input file-input-bordered"
          />
        </div>

        {/* Submit Button */}
        <div className="form-control mt-4">
          <button type="submit" className={`btn btn-primary ${isPending ? "loading" : ""}`} disabled={isPending}>
            {isPending ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default UpdateProduct
