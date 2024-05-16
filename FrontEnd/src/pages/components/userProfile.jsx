import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const UserProfile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = Cookies.get('token');
  
        const response = await axios.get('http://localhost:666/api/usuario', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
          }
        });
  
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
    fetchUserData();
  }, []);

  return (
    <div>
      {userData ? (
        <div>
          <h2>Perfil de Usuario</h2>
          <p>Nombre: {userData.user}</p>
          <p>Correo Electrónico: {userData.email}</p>
          {/* Otros datos del usuario */}
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

export default UserProfile;
