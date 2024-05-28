// routes/assignmentRoutes.js
import express from 'express';
import { getAllAssignments, getAssignmentById, createAssignment, updateAssignment, deleteAssignment } from '../controllers/assignmentController.js';

const assignmentsRoutes = express.Router();

assignmentsRoutes.get('/assignments', getAllAssignments);
assignmentsRoutes.get('/assignments/:id', getAssignmentById);
assignmentsRoutes.post('/assignments', createAssignment);
assignmentsRoutes.put('/assignments/:id', updateAssignment);
assignmentsRoutes.delete('/assignments/:id', deleteAssignment);

export default assignmentsRoutes;
