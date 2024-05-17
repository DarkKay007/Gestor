import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

// Crear el contexto
const UserContext = createContext();

// Crear un proveedor de contexto
export const UserProvider = ({ children }) => {
  const [userList, setUserList] = useState([]);
  const [message, setMessage] = useState("");
  const [token, setToken] = useState(Cookies.get('token') || "");

  // Método para obtener la lista de usuarios
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

  // Método para crear un nuevo usuario
  const createUser = async ({ user, name, password, email, rol }) => {
    if (!token) {
      setMessage("Token no disponible. Por favor, inicia sesión.");
      return;
    }

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

  // Método para eliminar un usuario
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

  // Método para autenticar un usuario
  const loginUser = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:666/api/login', { email, password });
      const newToken = response.data.token;
      Cookies.set('token', newToken);
      setToken(newToken);
      setMessage("Inicio de sesión exitoso");
      fetchUserList();
    } catch (error) {
      console.error('Error logging in:', error);
      setMessage("Error al iniciar sesión. Por favor, verifica tus credenciales.");
    }
  };

  // Método para cerrar sesión
  const logoutUser = () => {
    Cookies.remove('token');
    setToken("");
    setUserList([]);
    setMessage("Sesión cerrada");
  };

  return (
    <UserContext.Provider value={{ userList, createUser, updateUser, deleteUser, loginUser, logoutUser, message, token }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook para usar el contexto
export const useUser = () => {
  return useContext(UserContext);
};
