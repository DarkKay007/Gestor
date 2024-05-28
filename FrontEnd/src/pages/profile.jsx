// Profile.jsx

import React, { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [updatedUserData, setUpdatedUserData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Obtener el token de localStorage y decodificarlo
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.id);
    } else {
      console.error('No token found');
    }
  }, []);

  useEffect(() => {
    if (!userId) return;

    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://localhost:666/api/profile/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
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
      await axios.put(`http://localhost:666/api/profile/${userId}`, updatedUserData);
      // Actualizar el estado del usuario con los datos actualizados
      setUser((prevUser) => ({ ...prevUser, ...updatedUserData }));
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (!user) return <p>User not found</p>;

  return (
    <div>
      <h2>User Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={updatedUserData.name || user.name} onChange={handleInputChange} />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={updatedUserData.email || user.email} onChange={handleInputChange} />
        </label>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default Profile;
