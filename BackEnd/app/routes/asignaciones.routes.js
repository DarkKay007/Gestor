import { Router } from "express";
import { validarPermiso } from "../middlewares/usuarios.middlewares.js";
import { createAssignment, deleteAssignment, getAllAssignments, getAssignmentById, updateAssignment } from "../controllers/asignaciones.controller.js";
const routerAsignaciones = Router();

routerAsignaciones.get("/asignacion/:id",  getAssignmentById);
routerAsignaciones.get("/asignaciones", getAllAssignments);
routerAsignaciones.post("/asignaciones", createAssignment);
routerAsignaciones.put("/asignaciones",  updateAssignment);
routerAsignaciones.delete("/asignaciones",  deleteAssignment);



export default routerAsignaciones;
