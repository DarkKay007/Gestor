import { Router } from "express";
import { UserList, deleteUser, getUser, loginUser, postUser, putUser } from "../controllers/usuarios.controllers.js";
import { validarPermiso } from "../middlewares/usuarios.middlewares.js";
const routerUser = Router();

routerUser.post("/login", loginUser)

routerUser.get("/usuario/:id",validarPermiso,  getUser);
routerUser.post("/usuario",validarPermiso,postUser);
routerUser.put("/usuario", validarPermiso,putUser);
routerUser.delete("/usuario", validarPermiso,deleteUser);
routerUser.get("/usuario", validarPermiso,UserList);



export default routerUser;
