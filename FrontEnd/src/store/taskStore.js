// useTaskStore.js
import { create } from 'zustand';
import axios from 'axios';

const useTaskStore = create((set) => ({
  tasks: [],
  proyectos: [],
  fetchTasks: async () => {
    try {
      const response = await axios.get('http://localhost:666/api/tasks', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      set({ tasks: response.data });
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  },
  addTask: async (taskData) => {
    try {
      const response = await axios.post('http://localhost:666/api/tasks', taskData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      set((state) => ({ tasks: [...state.tasks, response.data] }));
    } catch (error) {
      console.error('Error adding task:', error);
    }
  },
  updateTask: async (id, taskData) => {
    try {
      await axios.put(`http://localhost:666/api/tasks/${id}`, taskData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      set((state) => ({
        tasks: state.tasks.map((task) =>
          task._id === id ? { ...task, ...taskData } : task
        ),
      }));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  },
  deleteTask: async (id) => {
    try {
      await axios.delete(`http://localhost:666/api/tasks/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      set((state) => ({
        tasks: state.tasks.filter((task) => task._id !== id),
      }));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  },
  fetchProjects: async () => {
    try {
      const response = await axios.get('http://localhost:666/api/projects', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      set({ proyectos: response.data });
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  },
}));

export default useTaskStore;
