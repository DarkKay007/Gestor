import { pool } from "../config/bd-mysql.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { tokenSign } from "../middlewares/usuarios.middlewares.js";
import { getCurrentDateTime } from "../util/dateHelper.js "; // Importa una función para obtener la fecha y hora actual

export const getUser = async (req, res) => {
  let id = req.params.id;
  try {
    const resultado = await pool.query("SELECT * FROM usuarios WHERE id = ?", [
      id,
    ]);
    res.json(resultado[0]);
  } catch (error) {
    res.json({
      error: error,
      message: "Error en la consulta Get",
    });
  }
};
export const UserList = async (req, res) => {
  try {
    // Aquí puedes leer cookies de la solicitud si es necesario

    // Realiza la consulta a la base de datos
    const resultado = await pool.query("select * from usuarios");

    // Devuelve los resultados y establece una cookie de respuesta si es necesario

    res.json(resultado[0]); // Devuelve los resultados al cliente
  } catch (error) {
    res.status(500).json({ error: error, message: "Error en la consulta Get" });
  }
};
export const postUser = async (req, res) => {
  const { user, name, password, email, rol } = req.body;
  const date_create = new Date().toISOString().slice(0, 19).replace("T", " "); // Obtenemos la fecha actual en el formato deseado

  try {
    const resultado = await pool.query(
      "INSERT INTO usuarios (user, name, password, email, rol, date_create) VALUES (?, ?, ?, ?, ?, ?)",
      [user, name, password, email, rol, date_create]
    );

    if (resultado.affectedRows > 0) {
      res.json({ message: "Usuario creado exitosamente" });
    } else {
      res.json({ message: "Error al crear usuario" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message, message: "Error al crear usuario" });
  }
};

export const putUser = async (req, res) => {
  const { id, user, name, password, email, rol } = req.body;

  // Obtiene la fecha y hora actual
  const date_create = getCurrentDateTime();

  try {
    await pool.query(
      "UPDATE usuarios SET user = ?, name = ?, password = ?, email = ?, rol = ?, date_create = ? WHERE id = ?",
      [user, name, password, email, rol, date_create, id]
    );

    res.json({ message: "Usuario actualizado exitosamente" });
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message, message: "Error al actualizar usuario" });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.body.id;

  try {
    await pool.query("DELETE FROM usuarios WHERE id = ?", [id]);

    res.json({ message: "Usuario eliminado exitosamente" });
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message, message: "Error al eliminar usuario" });
  }
};

/**
 * ! Sin funcionar
 * 
 */

export const loginUser = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password ? String(req.body.password) : '';


  // Validación de datos
  if (!email ||!password) {
    return res.status(400).json({ error: "Los campos de correo electrónico y contraseña son obligatorios" });
  }

  try {
    // Realiza una consulta para obtener el ID del usuario a partir del correo electrónico y la contraseña
    const usuario = await pool.query('SELECT ID, password FROM usuarios WHERE email =?', [email]);

    if (usuario.length === 0) {
      // Si no se encuentra ningún usuario con las credenciales proporcionadas, devuelve un error
      return res.status(400).json({ error: "Usuario no encontrado o contraseña incorrecta" });
    }

    // Comprueba que la contraseña proporcionada coincida con la contraseña almacenada en la base de datos
    const match = await bcrypt.compare(password, usuario[0].password);

    if (!match) {
      return res.status(400).json({ error: "Contraseña incorrecta" });
    }

    // Obtiene el ID del usuario
    const user_id = usuario[0].ID;

    // Genera un token de sesión con el ID del usuario
    const token = jwt.sign({ email: email, user_id: user_id }, 'secret_key', { expiresIn: '1h' });

    // Inserta el token en la tabla tokens
    await pool.query('INSERT INTO tokens (user_id, token) VALUES (?,?)', [user_id, token]);

    // Envía el token al cliente como respuesta
    res.json({ message: "Usuario iniciado exitosamente", token: token });

  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ error: error.message });
  }
};