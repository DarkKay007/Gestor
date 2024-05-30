import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

const useProjectStore = create(
  persist(
    (set) => ({
      projects: [],

      fetchProjects: async () => {
        try {
          const response = await axios.get('http://localhost:666/api/projects');
          set({ projects: response.data });
        } catch (error) {
          console.error('Error fetching projects:', error);
        }
      },

      addProject: async (project) => {
        try {
          const response = await axios.post('http://localhost:666/api/projects', project);
          set((state) => ({ projects: [...state.projects, response.data] }));
        } catch (error) {
          console.error('Error adding project:', error);
        }
      },

      updateProject: async (id, project) => {
        try {
          await axios.put(`http://localhost:666/api/projects/${id}`, project);
          set((state) => ({
            projects: state.projects.map((p) =>
              p._id === id ? { ...p, ...project } : p
            ),
          }));
        } catch (error) {
          console.error('Error updating project:', error);
        }
      },

      deleteProject: async (id) => {
        try {
          await axios.delete(`http://localhost:666/api/projects/${id}`);
          set((state) => ({
            projects: state.projects.filter((p) => p._id !== id),
          }));
        } catch (error) {
          console.error('Error deleting project:', error);
        }
      },
    }),
    {
      name: 'project-storage',
    }
  )
);

export default useProjectStore;
