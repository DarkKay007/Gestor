import express from "express";
import { login, logoutUser, register } from "../controllers/authController.js";


const loginRoute = express.Router();

loginRoute.post("/login", login);
loginRoute.post("/register", register);
loginRoute.get("/logout", logoutUser);

export default loginRoute;
