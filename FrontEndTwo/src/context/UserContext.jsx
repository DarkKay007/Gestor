import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

// Crear el contexto
const UserContext = createContext();

// Crear un proveedor de contexto
export const UserProvider = ({ children }) => {
  const [userList, setUserList] = useState([]);
  const [message, setMessage] = useState("");

  const token = Cookies.get('token');

  // Método para obtener la lista de usuarios
  const fetchUserList = async () => {
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
    }
  };

  useEffect(() => {
    fetchUserList();
  }, []);

  // Método para crear un nuevo usuario
  const createUser = async ({ user, name, password, email, rol }) => {
    try {
      const response = await axios.post('http://localhost:666/api/usuario', {
        user, name, password, email, rol
      }, {
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

  // Método para actualizar un usuario
  const updateUser = async (id, updatedUser) => {
    try {
      const response = await axios.put(`http://localhost:666/api/usuario/${id}`, updatedUser, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const updatedUserList = userList.map(user => user.id === id ? response.data : user);
      setUserList(updatedUserList);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  // Método para eliminar un usuario
  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:666/api/usuario/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const updatedUserList = userList.filter(user => user.id !== id);
      setUserList(updatedUserList);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <UserContext.Provider value={{ userList, createUser, updateUser, deleteUser, message }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook para usar el contexto
export const useUser = () => {
  return useContext(UserContext);
};
