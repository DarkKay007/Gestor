import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Logout from "./logout";
import { Modal, Button } from "flowbite-react";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [updatedUserData, setUpdatedUserData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Obtener el token de localStorage y decodificarlo
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.id);
    } else {
      console.error("No token found");
    }
  }, []);

  useEffect(() => {
    if (!userId) return;

    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:666/api/profile/${userId}`
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
      setIsLoading(false);
    };
    fetchUser();
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUserData({ ...updatedUserData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `http://localhost:666/api/profile/${userId}`,
        updatedUserData
      );
      // Actualizar el estado del usuario con los datos actualizados
      setUser((prevUser) => ({ ...prevUser, ...updatedUserData }));
      setIsModalOpen(false); // Cerrar el modal después de la actualización
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (!user) return <p>User not found</p>;

  return (
    <>
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-yellow-400 rounded-lg shadow-lg">
        <div className="flex flex-col items-center">
          <img
            alt={user.name}
            src={`https://unavatar.io/github/${user.user}`}
            className="mb-3 h-24 w-24 rounded-full shadow-lg"
          />
          <h1>{user.user}</h1>
          <h2 className="text-3xl font-bold mb-2">{user.name}</h2>
          <p className="text-gray-600 mb-6">{user.email}</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
        >
          Edit Profile
        </button>
        <div className="mt-8">
          <Logout />
        </div>
      </div>

      <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Modal.Header>Edit Profile</Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit} className="w-full">
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Name:
                <input
                  type="text"
                  name="name"
                  value={updatedUserData.name || user.name}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Email:
                <input
                  type="email"
                  name="email"
                  value={updatedUserData.email || user.email}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Password:
                <input
                  type="password"
                  name="password"
                  value={updatedUserData.password || ''}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Confirm Password:
                <input
                  type="password"
                  name="confirmPassword"
                  value={updatedUserData.confirmPassword || ''}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                />
              </label>
            </div>
            <Button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
            >
              Save
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Profile;