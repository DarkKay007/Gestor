import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

const useProjectStore = create(
  persist(
    (set) => ({
      projects: [],
      token: localStorage.getItem('token') || null,
      isLoggedIn: !!localStorage.getItem('token'),

      fetchProjects: async () => {
        try {
          const response = await axios.get('http://localhost:666/api/projects', {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
          set({ projects: response.data });
        } catch (error) {
          console.error('Error fetching projects:', error);
        }
      },

      addProject: async (projectData) => {
        try {
          const response = await axios.post('http://localhost:666/api/projects', projectData);
          set((state) => ({ projects: [...state.projects, response.data] }));
        } catch (error) {
          console.error('Error adding project:', error);
        }
      },

      updateProject: async (id, projectData) => {
        try {
          await axios.put(`http://localhost:666/api/projects/${id}`, projectData, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
          set((state) => ({
            projects: state.projects.map((project) =>
              project._id === id ? { ...project, ...projectData } : project
            ),
          }));
        } catch (error) {
          console.error('Error updating project:', error);
        }
      },

      deleteProject: async (id) => {
        try {
          await axios.delete(`http://localhost:666/api/projects/${id}`, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
          set((state) => ({
            projects: state.projects.filter((project) => project._id !== id),
          }));
        } catch (error) {
          console.error('Error deleting project:', error);
        }
      },

      loginUser: async (user, password) => {
        try {
          const response = await axios.post('http://localhost:666/api/login', { user, password });
          const newToken = response.data.token;
          localStorage.setItem('token', newToken);
          set({ token: newToken, isLoggedIn: true });
          set({ message: "Inicio de sesión exitoso" });
        } catch (error) {
          console.error('Error logging in:', error);
        }
      },

      logoutUser: () => {
        localStorage.removeItem('token');
        set({ token: null, isLoggedIn: false });
        set({ message: "Sesión cerrada" });
      },
    }),
    {
      name: 'project-storage',
    }
  )
);

export default useProjectStore;
