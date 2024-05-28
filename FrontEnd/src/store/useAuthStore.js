// src/store/useAuthStore.js
import {create} from 'zustand';

const useAuthStore = create((set) => ({
  token: localStorage.getItem('token') || null,
  isLoggedIn: !!localStorage.getItem('token'),
  setToken: (token) => {
    localStorage.setItem('token', token);
    set({ token, isLoggedIn: true });
  },
  logout: () => {
    localStorage.removeItem('token');
    set({ token: null, isLoggedIn: false });
  },
}));

export default useAuthStore;
