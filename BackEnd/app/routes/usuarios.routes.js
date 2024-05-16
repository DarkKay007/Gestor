import { Router } from "express";
import { UserList, deleteUser, getUser, loginUser, postUser, putUser } from "../controllers/usuarios.controllers.js";
import { validarPermiso } from "../middlewares/usuarios.middlewares.js";
const routerUser = Router();

routerUser.post("/login", loginUser)

routerUser.get("/usuario", UserList);
routerUser.post("/usuario",postUser);
routerUser.put("/usuario", putUser);
routerUser.delete("/usuario", deleteUser);
routerUser.get("/usuario/:id", getUser);
routerUser.put("/usuario/:id", putUser);
routerUser.delete("/usuario/:id", deleteUser);



export default routerUser;
