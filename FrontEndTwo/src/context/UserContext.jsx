import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useAuth } from './authContext';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { token, setIsLoggedIn } = useAuth();
  const [userList, setUserList] = useState([]);
  const [message, setMessage] = useState("");

  const fetchUserList = async () => {
    if (!token) {
      setMessage("Token no disponible. Por favor, inicia sesión.");
      return;
    }

    try {
      const response = await axios.get('http://localhost:666/api/usuario', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      setUserList(response.data);
    } catch (error) {
      console.error('Error fetching UserList:', error);
      setMessage("Error al obtener la lista de usuarios. Por favor, intenta de nuevo.");
    }
  };

  useEffect(() => {
    fetchUserList();
  }, [token]);

  const createUser = async (user) => {
    if (!token) {
      setMessage("Token no disponible. Por favor, inicia sesión.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:666/api/usuario', user, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      setUserList([...userList, response.data]);
      setMessage("Usuario creado con éxito");
    } catch (error) {
      console.error('Error creating user:', error);
      setMessage("Error al crear usuario. Por favor, intenta de nuevo.");
    }
  };

  const updateUser = async (id, updatedUser) => {
    if (!token) {
      setMessage("Token no disponible. Por favor, inicia sesión.");
      return;
    }

    try {
      const response = await axios.put(`http://localhost:666/api/usuario/${id}`, updatedUser, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const updatedUserList = userList.map(user => user.id === id ? response.data : user);
      setUserList(updatedUserList);
      setMessage("Usuario actualizado con éxito");
    } catch (error) {
      console.error('Error updating user:', error);
      setMessage("Error al actualizar usuario. Por favor, intenta de nuevo.");
    }
  };

  const deleteUser = async (id) => {
    if (!token) {
      setMessage("Token no disponible. Por favor, inicia sesión.");
      return;
    }

    try {
      await axios.delete(`http://localhost:666/api/usuario/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const updatedUserList = userList.filter(user => user.id !== id);
      setUserList(updatedUserList);
      setMessage("Usuario eliminado con éxito");
    } catch (error) {
      console.error('Error deleting user:', error);
      setMessage("Error al eliminar usuario. Por favor, intenta de nuevo.");
    }
  };

  const loginUser = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:666/api/login', { email, password });
      const newToken = response.data.token;
      Cookies.set('token', newToken);
      setIsLoggedIn(true);
      fetchUserList();
    } catch (error) {
      console.error('Error logging in:', error);
      setMessage("Error al iniciar sesión. Por favor, verifica tus credenciales.");
    }
  };

  const logoutUser = () => {
    Cookies.remove('token');
    setIsLoggedIn(false);
    setUserList([]);
    setMessage("Sesión cerrada");
  };

  return (
    <UserContext.Provider value={{ userList, createUser, updateUser, deleteUser, loginUser, logoutUser, message }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
