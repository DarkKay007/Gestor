import { Router } from "express";

import { validarPermiso } from "../middlewares/usuarios.middlewares.js";
import { delProject, getProject, postProject, showProject } from "../controllers/proyectos.controllers.js";
import { putUser } from "../controllers/usuarios.controllers.js";
const routerProjects = Router();

routerProjects.get("/project/:id",  getProject);
routerProjects.post("/projects", postProject);
routerProjects.put("/projects", validarPermiso, putUser);
routerProjects.delete("/projects", validarPermiso, delProject);
routerProjects.get("/projects", showProject);



export default routerProjects;
