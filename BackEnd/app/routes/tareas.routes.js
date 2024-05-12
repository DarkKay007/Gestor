import { Router } from "express";
import { validarPermiso } from "../middlewares/usuarios.middlewares.js";
import { createTask, deleteTask, getAllTasks, getTaskById, updateTask } from "../controllers/tareas.controllers.js";
const routerTareas = Router();

routerTareas.get("/tarea/:id", validarPermiso, getTaskById);
routerTareas.get("/tareas",validarPermiso,getAllTasks );
routerTareas.post("/tareas",validarPermiso, createTask);
routerTareas.put("/tareas", validarPermiso, updateTask);
routerTareas.delete("/tareas", validarPermiso, deleteTask);



export default routerTareas;
