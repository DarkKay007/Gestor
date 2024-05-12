import { Router } from "express";
import { UserList, deleteUser, getUser, loginUser, postUser, putUser } from "../controllers/usuarios.controllers.js";
import { validarPermiso } from "../middlewares/usuarios.middlewares.js";
const routerUser = Router();

routerUser.post("/login", loginUser)

routerUser.get("/usuario", validarPermiso,UserList);
routerUser.post("/usuario",validarPermiso,postUser);
routerUser.put("/usuario", validarPermiso,putUser);
routerUser.delete("/usuario", validarPermiso,deleteUser);
routerUser.get("/usuario/:id",validarPermiso, getUser);
routerUser.put("/usuario/:id", validarPermiso,putUser);
routerUser.delete("/usuario/:id", validarPermiso,deleteUser);



export default routerUser;
