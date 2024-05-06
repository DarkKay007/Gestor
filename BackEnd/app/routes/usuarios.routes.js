import { Router } from "express";
import { UserList, deleteUser, getUser, loginUser, postUser, putUser } from "../controllers/usuarios.controllers.js";
import { validarPermiso } from "../middlewares/usuarios.middlewares.js";
const routerUser = Router();

routerUser.post("/login",loginUser)

routerUser.get("/usuario/:id",  getUser);
routerUser.post("/usuario", postUser);
routerUser.put("/usuario", validarPermiso, putUser);
routerUser.delete("/usuario", validarPermiso, deleteUser);
routerUser.get("/usuario", UserList);


export default routerUser;
