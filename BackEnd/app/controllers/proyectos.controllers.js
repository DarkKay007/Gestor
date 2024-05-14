import { pool } from "../config/bd-mysql.js";
import { getCurrentDateTime } from '../util/dateHelper.js';

export const showProject = async (req, res) => {
  try {
    const resultado = await pool.query("SELECT * FROM proyectos");
    res.json(resultado[0]);
  } catch (error) {
    res.status(500).json({ error: error, message: "Error en la consulta Get de proyectos" });
  }
};

export const postProject = async (req, res) => {
  const { Nombre, Descripcion, FechaInicio, FechaFin } = req.body;
  const date_create = getCurrentDateTime();

  try {
    const resultado = await pool.query(
      "INSERT INTO proyectos (Nombre, Descripcion, FechaInicio, FechaFin, date_create) VALUES (?, ?, ?, ?, ?)",
      [Nombre, Descripcion, FechaInicio, FechaFin, date_create]
    );

    if (resultado.affectedRows > 0) {
      res.json({ message: "Proyecto creado exitosamente" });
    } else {
      res.json({ message: "Error al crear proyecto" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message, message: "Error al crear proyecto" });
  }
};

export const putProject = async (req, res) => {
  const { Nombre, Descripcion, FechaInicio, FechaFin } = req.body;
  
  const ID = req.params.id;

  try {
    await pool.query(
      "UPDATE proyectos SET Nombre = ?, Descripcion = ?, FechaInicio = ?, FechaFin = ?, WHERE ID = ?",
      [Nombre, Descripcion, FechaInicio, FechaFin,  ID]
    );

    res.json({ message: "Proyecto actualizado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: error.message, message: "Error al actualizar proyecto" });
  }
};

export const delProject = async (req, res) => {
  const ID = req.params.id;

  try {
    await pool.query("DELETE FROM proyectos WHERE ID = ?", [ID]);
    res.json({ message: "Proyecto eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: error.message, message: "Error al eliminar proyecto" });
  }
};

export const getProject = async (req, res) => {
  const ID = req.params.id;

  try {
    const resultado = await pool.query('SELECT * FROM proyectos WHERE ID = ?', [ID]);
    res.json(resultado[0]);
  } catch (error) {
    res.status(500).json({ error: error.message, message: "Error en la consulta Get de proyecto" });
  }
};
