import React, { useContext, useState } from 'react';
import { userContext } from '../../App.js';
import BackToHome from '../Fixed/BackToHome.js';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { baseURL } from '../../constant/url.js';


const ProfilePage = () => {
  const authUser = useContext(userContext);
    const queryClient = useQueryClient();
  
  // console.log(authUser)
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    username: authUser.username || '',
    email: authUser.email || '',
    phone: authUser.phone || '',
    address: authUser.address || '',
    profileImage: authUser.profileImage,
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

 

  const {mutate : updateProfile } = useMutation({
    mutationKey: ['updateProfile'],
    mutationFn: async () => {

      const res = await fetch(`${baseURL}/api/auth/updateProfile`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          },
          credentials : 'include',
        body : JSON.stringify({...userData,_id :authUser._id})
          
      })
      console.log(res.json())
      return res.json()
    }
  })

  const handleImageChange = (e) => {
    if(e.target.files[0]==undefined){
      return
    }
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = () => {
				setUserData({ ...userData , profileImage: reader.result });
			};
			reader.readAsDataURL(file);
		}
	};

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userData)
    
    updateProfile();
    queryClient.invalidateQueries({
      queryKey: ['authUser'],
    })
    setIsEditing(false);
    // Here, you can make an API call to save updated user data
  };

  return (
    <>
      <BackToHome />
      <div className="flex justify-center items-center min-h-screen bg-yellow-100">
        <div className="card w-96 bg-white shadow-xl p-5">
          <div className="flex flex-col items-center">
            <div className="avatar mb-4">
              <div className="w-24 h-24 rounded-full ring ring-yellow-400 ring-offset-2 overflow-hidden">
                <img src={userData.profileImage} alt="Profile" className="object-cover w-full h-full" />
              </div>
            </div>
            {isEditing ? (
              <form  className="w-full flex flex-col gap-2">
                <input type="file" accept="image/*" onChange={handleImageChange} className="border p-2" />
                <input type="text" name="username" value={userData.username} onChange={handleChange} placeholder="Name" className="border p-2" required />
                <input type="email" name="email" value={userData.email} onChange={handleChange} placeholder="Email" className="border p-2" required />
                <input type="text" name="phone" value={userData.phone} onChange={handleChange} placeholder="Phone" className="border p-2" required />
                <input type="text" name="address" value={userData.address} onChange={handleChange} placeholder="Address" className="border p-2" required />
                <button onClick={handleSubmit} className="btn btn-primary mt-2">Save</button>
                <button onClick={() => {setIsEditing(false);setUserData({
                    username: authUser.username || '',
                    email: authUser.email || '',
                    phone: authUser.phone || '',
                    address: authUser.address || '',
                    profileImage: authUser.profileImage,
                  })}} className="btn btn-primary mt-2">Cancel</button>
              </form>
            ) : (
              <>
                <h2 className="text-3xl font-semibold text-yellow-600">{userData.name}</h2>
                <p className="text-lg text-gray-600 mt-2"><span className="font-bold">Username: </span>{userData.username}</p>
                <p className="text-lg text-gray-600 mt-2"><span className="font-bold">Email: </span>{userData.email}</p>
                <p className="text-lg text-gray-600 mt-2"><span className="font-bold">Phone: </span>{userData.phone}</p>
                <p className="text-lg text-gray-600 mt-2"><span className="font-bold">Address: </span>{userData.address}</p>
                <button className="btn btn-primary mt-4 w-full" onClick={() => setIsEditing(true)}>Edit Profile</button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
