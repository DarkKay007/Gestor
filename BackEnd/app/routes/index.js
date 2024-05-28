import express from 'express';
import userRoutes from './userRoutes.js';
import projectRoutes from './projectsRoutes.js';
import taskRoutes from './taskRoutes.js';
import assignmentsRoutes from './assignmentRoutes.js';
import loginRoute from './authRoutes.js';
const routes = express();

routes.use('/', userRoutes);
routes.use('/', projectRoutes);
routes.use('/', taskRoutes);
routes.use('/', assignmentsRoutes)
routes.use('/auth', loginRoute);


export default routes;
