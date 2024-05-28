import {create} from 'zustand';
import axios from 'axios';

const useUserStore = create((set) => ({
  token: localStorage.getItem('token') || null,
  isLoggedIn: !!localStorage.getItem('token'),
  userList: [],
  message: "",
  loading: false,
  error: "",

  fetchUserList: async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      set({ message: "Token no disponible. Por favor, inicia sesión." });
      return;
    }

    try {
      set({ loading: true });
      const response = await axios.get('http://localhost:666/api/users', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      set({ userList: response.data, loading: false });
    } catch (error) {
      console.error('Error fetching UserList:', error);
      set({ error: "Error al obtener la lista de usuarios. Por favor, intenta de nuevo.", loading: false });
    }
  },

  createUser: async (user) => {
    const token = localStorage.getItem('token');
    if (!token) {
      set({ message: "Token no disponible. Por favor, inicia sesión." });
      return;
    }

    try {
      const response = await axios.post('http://localhost:666/api/users', user, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      set((state) => ({ userList: [...state.userList, response.data], message: "Usuario creado con éxito" }));
    } catch (error) {
      console.error('Error creating user:', error);
      set({ error: "Error al crear usuario. Por favor, intenta de nuevo." });
    }
  },

  updateUser: async (id, updatedUser) => {
    const token = localStorage.getItem('token');
    if (!token) {
      set({ message: "Token no disponible. Por favor, inicia sesión." });
      return;
    }

    try {
      const response = await axios.put(`http://localhost:666/api/users/${id}`, updatedUser, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      set((state) => ({
        userList: state.userList.map(user => user._id === id ? response.data : user),
        message: "Usuario actualizado con éxito"
      }));
    } catch (error) {
      console.error('Error updating user:', error);
      set({ error: "Error al actualizar usuario. Por favor, intenta de nuevo." });
    }
  },

  deleteUser: async (id) => {
    const token = localStorage.getItem('token');
    if (!token) {
      set({ message: "Token no disponible. Por favor, inicia sesión." });
      return;
    }

    try {
      await axios.delete(`http://localhost:666/api/users/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      set((state) => ({
        userList: state.userList.filter(user => user.id !== id),
        message: "Usuario eliminado con éxito"
      }));
    } catch (error) {
      console.error('Error deleting user:', error);
      set({ error: "Error al eliminar usuario. Por favor, intenta de nuevo." });
    }
  },

  loginUser: async (user, password) => {
    try {
      const response = await axios.post('http://localhost:666/api/login', { user, password });
      const newToken = response.data.token;
      localStorage.setItem('token', newToken);
      set({ token: newToken, isLoggedIn: true });
      await useUserStore.getState().fetchUserList(); // Llama fetchUserList después de iniciar sesión
      set({ message: "Inicio de sesión exitoso" });
    } catch (error) {
      console.error('Error logging in:', error);
      set({ error: "Error al iniciar sesión. Por favor, verifica tus credenciales." });
    }
  },

  logoutUser: () => {
    localStorage.removeItem('token');
    set({ token: null, isLoggedIn: false, userList: [], message: "Sesión cerrada" });
  },
}));

export default useUserStore;
