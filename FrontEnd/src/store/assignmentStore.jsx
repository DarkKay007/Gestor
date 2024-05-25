// src/store/assignmentStore.js
import { create } from 'zustand';
import axios from 'axios';
import Cookies from 'js-cookie';

const useAssignmentStore = create((set) => ({
  assignments: [],
  userNames: {},
  projectDetails: {},
  loading: true,
  fetchAssignments: async () => {
    set({ loading: true });
    try {
      const token = Cookies.get('token');
      const response = await axios.get("http://localhost:666/api/asignaciones", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });
      const assignments = response.data;
      set({ assignments });
      useAssignmentStore.getState().fetchUserNames(assignments);
      useAssignmentStore.getState().fetchProjectDetails(assignments);
      set({ loading: false });
    } catch (error) {
      console.error("Error fetching assignments:", error);
      set({ loading: false });
    }
  },
  fetchUserNames: async (data) => {
    try {
      const userIds = data.map((assignment) => assignment.ID_Usuario);
      const token = Cookies.get('token');
      const response = await axios.get("http://localhost:666/api/usuario", {
        params: { id: userIds.join(",") },
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });
      const userNames = {};
      response.data.forEach(user => {
        userNames[user.id] = user.user;
      });
      set({ userNames });
    } catch (error) {
      console.error("Error fetching user names:", error);
    }
  },
  fetchProjectDetails: async (data) => {
    try {
      const projectIds = data.map((assignment) => assignment.ID_Proyecto);
      const token = Cookies.get('token');
      const response = await axios.get("http://localhost:666/api/projects", {
        params: { ID: projectIds.join(",") },
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });
      const projectDetails = {};
      response.data.forEach(project => {
        projectDetails[project.ID] = project;
      });
      set({ projectDetails });
    } catch (error) {
      console.error("Error fetching project details:", error);
    }
  },
}));

export default useAssignmentStore;
