import { Router } from "express";
import { delProject, getProject, postProject, showProject, putProject } from "../controllers/proyectos.controllers.js";

const routerProjects = Router();

routerProjects.get("/project/:id", getProject);
routerProjects.get("/projects", showProject);
routerProjects.post("/projects", postProject);
routerProjects.put("/projects/:id", putProject);
routerProjects.delete("/projects/:id", delProject);

export default routerProjects;
