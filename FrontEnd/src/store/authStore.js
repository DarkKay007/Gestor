import { create } from 'zustand';
import axios from 'axios';
import Cookies from 'js-cookie';

const useAuthStore = create((set) => ({
  isLoggedIn: false,
  token: null,
  error: '',
  message: '',
  initializeAuth: () => {
    const tokenFromCookies = Cookies.get('token');
    if (tokenFromCookies) {
      set({ token: tokenFromCookies, isLoggedIn: true });
    }
  },
  login: async (email, password) => {
    try {
      const response = await axios.post('http://localhost:666/api/login', { email, password });
      const newToken = response.data.token;
      Cookies.set('token', newToken);
      set({ token: newToken, isLoggedIn: true, message: 'Inicio de sesión exitoso', error: '' });
    } catch (error) {
      console.error('Error logging in:', error);
      set({ error: 'Error al iniciar sesión. Por favor, verifica tus credenciales.' });
    }
  },
  logout: () => {
    Cookies.remove('token');
    set({ isLoggedIn: false, token: null, message: 'Sesión cerrada' });
  }
}));

export default useAuthStore;
