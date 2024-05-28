import express from 'express';
import { authorize } from '../middleware/authMiddleware.js';
import { createProject, deleteProject, getAllProjects, getProjectById, updateProject } from '../controllers/projectControllers.js';

const projectRoutes = express.Router();

projectRoutes.post('/projects', createProject);
projectRoutes.get('/projects', getAllProjects);
projectRoutes.get('/projects/:id', authorize(['Administrador']), getProjectById);
projectRoutes.put('/projects/:id', authorize(['Administrador']), updateProject);
projectRoutes.delete('/projects/:id', authorize(['Administrador']), deleteProject);





export default projectRoutes;
