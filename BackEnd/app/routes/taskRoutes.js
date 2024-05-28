// routes/taskRoutes.js
import express from 'express';
import { getAllTasks, getTaskById, createTask, updateTask, deleteTask } from '../controllers/taskController.js';

const taskRoutes = express.Router();

taskRoutes.get('/tasks', getAllTasks);
taskRoutes.get('/tasks/:id', getTaskById);
taskRoutes.post('/tasks', createTask);
taskRoutes.put('/tasks/:id', updateTask);
taskRoutes.delete('/tasks/:id', deleteTask);

export default taskRoutes;
