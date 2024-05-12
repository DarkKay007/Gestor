import { Router } from "express";

import { validarPermiso } from "../middlewares/usuarios.middlewares.js";
import { delProject, getProject, postProject, showProject } from "../controllers/proyectos.controllers.js";
import { putUser } from "../controllers/usuarios.controllers.js";
const routerProjects = Router();

routerProjects.get("/project/:id", validarPermiso, getProject);
routerProjects.get("/projects", showProject);
routerProjects.post("/projects", postProject);
routerProjects.put("/projects/:id",  putUser);
routerProjects.delete("/projects/:id",  delProject);



export default routerProjects;
