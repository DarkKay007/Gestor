import { Router } from "express";
import { validarPermiso } from "../middlewares/usuarios.middlewares.js";
import { createAssignment, deleteAssignment, getAllAssignments, getAssignmentById, updateAssignment } from "../controllers/asignaciones.controller.js";
const routerAsignaciones = Router();

routerAsignaciones.get("/asignacion/:id", validarPermiso, getAssignmentById);
routerAsignaciones.get("/asignaciones",validarPermiso, getAllAssignments);
routerAsignaciones.post("/asignaciones",validarPermiso, createAssignment);
routerAsignaciones.put("/asignaciones", validarPermiso, updateAssignment);
routerAsignaciones.delete("/asignaciones", validarPermiso, deleteAssignment);



export default routerAsignaciones;
