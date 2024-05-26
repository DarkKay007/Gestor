import { create } from 'zustand';
import axios from 'axios';
import useAuthStore from './authStore';

const useUserStore = create((set) => ({
  userList: [],
  loading: false,
  error: '',
  message: '',
  fetchUserList: async () => {
    const { token } = useAuthStore.getState();
    if (!token) {
      set({ message: 'Token no disponible. Por favor, inicia sesión.' });
      return;
    }

    try {
      set({ loading: true });
      const response = await axios.get('http://localhost:666/api/usuario', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      set({ userList: response.data, loading: false });
    } catch (error) {
      console.error('Error fetching UserList:', error);
      set({ error: 'Error al obtener la lista de usuarios. Por favor, intenta de nuevo.', loading: false });
    }
  },
  createUser: async (user) => {
    const { token } = useAuthStore.getState();
    if (!token) {
      set({ message: 'Token no disponible. Por favor, inicia sesión.' });
      return;
    }

    try {
      const response = await axios.post('http://localhost:666/api/usuario', user, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      set((state) => ({ userList: [...state.userList, response.data], message: 'Usuario creado con éxito' }));
    } catch (error) {
      console.error('Error creating user:', error);
      set({ error: 'Error al crear usuario. Por favor, intenta de nuevo.' });
    }
  },
  updateUser: async (id, updatedUser) => {
    const { token } = useAuthStore.getState();
    if (!token) {
      set({ message: 'Token no disponible. Por favor, inicia sesión.' });
      return;
    }

    try {
      const response = await axios.put(`http://localhost:666/api/usuario/${id}`, updatedUser, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      set((state) => ({
        userList: state.userList.map(user => user.id === id ? response.data : user),
        message: 'Usuario actualizado con éxito'
      }));
    } catch (error) {
      console.error('Error updating user:', error);
      set({ error: 'Error al actualizar usuario. Por favor, intenta de nuevo.' });
    }
  },
  deleteUser: async (id) => {
    const { token } = useAuthStore.getState();
    if (!token) {
      set({ message: 'Token no disponible. Por favor, inicia sesión.' });
      return;
    }

    try {
      await axios.delete(`http://localhost:666/api/usuario/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      set((state) => ({
        userList: state.userList.filter(user => user.id !== id),
        message: 'Usuario eliminado con éxito'
      }));
    } catch (error) {
      console.error('Error deleting user:', error);
      set({ error: 'Error al eliminar usuario. Por favor, intenta de nuevo.' });
    }
  }
}));

export default useUserStore;
