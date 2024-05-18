import { pool } from "../config/bd-mysql.js";
import { tokenSign } from '../middlewares/usuarios.middlewares.js';
import { config } from 'dotenv';
import { getCurrentDateTime } from "../util/dateHelper.js";

config();

export const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query("SELECT * FROM usuarios WHERE id = ?", [id]);
    res.json(result);
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "Error en la consulta Get",
    });
  }
};

export const userList = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM usuarios");
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message, message: "Error en la consulta Get" });
  }
};

export const postUser = async (req, res) => {
  const { user, name, password, email, rol } = req.body;
  const date_create = new Date().toISOString().slice(0, 19).replace("T", " ");
  try {
    await pool.query(
      "INSERT INTO usuarios (user, name, password, email, rol, date_create) VALUES (?, ?, ?, ?, ?, ?)",
      [user, name, password, email, rol, date_create]
    );
    res.json({ message: "Usuario creado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: error.message, message: "Error al crear usuario" });
  }
};

export const putUser = async (req, res) => {
  const { id, user, name, password, email, rol } = req.body;
  const date_create = getCurrentDateTime();
  try {
    await pool.query(
      "UPDATE usuarios SET user = ?, name = ?, password = ?, email = ?, rol = ?, date_create = ? WHERE id = ?",
      [user, name, password, email, rol, date_create, id]
    );
    res.json({ message: "Usuario actualizado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: error.message, message: "Error al actualizar usuario" });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM usuarios WHERE id = ?", [id]);
    res.json({ message: "Usuario eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: error.message, message: "Error al eliminar usuario" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await pool.query(
      "SELECT email FROM usuarios WHERE email = ? AND password = ?",
      [email, password]
    );

    if (rows.length === 0) {
      res.status(401).json({
        respuesta: 'Usuario o contraseña incorrectos',
        estado: false,
      });
    } else {
      const token = tokenSign({ email, password });
      res.json({
        respuesta: 'Inicio de sesión exitoso',
        estado: true,
        token,
      });
    }
  } catch (error) {
    res.status(500).json({
      respuesta: 'Error en el login',
      type: error.message,
    });
    console.error(error);
  }
};
