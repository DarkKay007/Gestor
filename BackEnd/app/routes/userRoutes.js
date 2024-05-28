import express from 'express';
import { createUser, getUser, updateUser, deleteUser, getAllUsers } from '../controllers/userControllers.js';
import { authorize } from '../middleware/authMiddleware.js';

const userRoutes = express.Router();

userRoutes.post('/users', createUser);
userRoutes.get('/users',authorize(['Administrador']), getAllUsers);
userRoutes.get('/users/:id', authorize(['Administrador']), getUser);
userRoutes.put('/users/:id', authorize(['Administrador']), updateUser);
userRoutes.delete('/users/:id', authorize(['Administrador']), deleteUser);

export default userRoutes;
