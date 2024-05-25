import { Router } from "express";
import { validarPermiso } from "../middlewares/usuarios.middlewares.js";
import { createTask, deleteTask, getAllTasks, getTaskById, updateTask } from "../controllers/tareas.controllers.js";
const routerTareas = Router();

routerTareas.get("/tasks/:id", getTaskById);
routerTareas.get("/tasks", getAllTasks);
routerTareas.post("/tasks", createTask);
routerTareas.put("/tasks/:id", updateTask);
routerTareas.delete("/tasks/:id", deleteTask);

export default routerTareas;
