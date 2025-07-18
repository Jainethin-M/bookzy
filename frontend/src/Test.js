import { useState } from "react";
import { FaEdit, FaSave } from "react-icons/fa";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    username: "johndoe",
    email: "johndoe@example.com",
    phone: "123-456-7890",
    password: "password123",
    profileImage: "https://via.placeholder.com/150",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 to-purple-200">
      <div className="card w-96 bg-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="card-body p-6 space-y-5">
          <div className="flex flex-col items-center">
            <img
              src={user.profileImage || 'https://placehold.co/400'}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-blue-500 transition-all duration-300 ease-in-out hover:scale-105"
            />
            {isEditing ? (
              <input
                type="text"
                name="profileImage"
                value={user.profileImage}
                onChange={handleChange}
                className="input input-bordered mt-3 w-full max-w-xs text-center"
                placeholder="Profile Image URL"
              />
            ) : null}
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-lg font-semibold text-gray-700">Username:</label>
              <input
                type="text"
                name="username"
                value={user.username}
                onChange={handleChange}
                disabled={!isEditing}
                className="input input-bordered w-full"
                placeholder="Enter your username"
              />
            </div>
            <div>
              <label className="block text-lg font-semibold text-gray-700">Email:</label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                disabled={!isEditing}
                className="input input-bordered w-full"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-lg font-semibold text-gray-700">Phone:</label>
              <input
                type="text"
                name="phone"
                value={user.phone}
                onChange={handleChange}
                disabled={!isEditing}
                className="input input-bordered w-full"
                placeholder="Enter your phone number"
              />
            </div>
            <div>
              <label className="block text-lg font-semibold text-gray-700">Password:</label>
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                disabled={!isEditing}
                className="input input-bordered w-full"
                placeholder="Enter your password"
              />
            </div>
          </div>
          <div className="mt-5 flex justify-center space-x-4">
            <button
              className="btn btn-primary w-32 py-2 rounded-lg shadow-md transform hover:scale-105 transition-all duration-300"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? (
                <>
                  <FaSave className="inline mr-2" /> Save
                </>
              ) : (
                <>
                  <FaEdit className="inline mr-2" /> Edit
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
