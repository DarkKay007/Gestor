import express from "express";
import { login, logoutUser, register } from "../controllers/authController.js";
import { getUserById, updateUserOne } from "../controllers/userControllers.js";

const loginRoute = express.Router();

loginRoute.post("/login", login);
loginRoute.post("/register", register);
loginRoute.get("/logout", logoutUser);
loginRoute.get("/profile/:id", async (req, res) => {
  const userId = req.params.id;
  const user = await getUserById(userId);
  res.render("profile", { user }); // Renderizar la vista de perfil con los datos del usuario
});

loginRoute.post("/profile/:id", async (req, res) => {
  const userId = req.params.id;
  const updatedUserData = req.body; // Datos actualizados del usuario
  await updateUserOne(userId, updatedUserData); // Actualizar los datos del usuario
  res.redirect(`/profile/${userId}`); // Redireccionar al perfil del usuario después de la actualización
});
export default loginRoute;
