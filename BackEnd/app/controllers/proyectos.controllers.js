import { pool } from "../config/bd-mysql.js";
import { getCurrentDateTime } from '../util/dateHelper.js';

export const showProject = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM proyectos");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message, message: "Error en la consulta Get de proyectos" });
  }
};

export const postProject = async (req, res) => {
  const { Nombre, Descripcion, FechaInicio, FechaFin } = req.body;
  const date_create = getCurrentDateTime();

  try {
    const [result] = await pool.query(
      "INSERT INTO proyectos (Nombre, Descripcion, FechaInicio, FechaFin, date_create) VALUES (?, ?, ?, ?, ?)",
      [Nombre, Descripcion, FechaInicio, FechaFin, date_create]
    );

    if (result.affectedRows > 0) {
      res.json({ message: "Proyecto creado exitosamente" });
    } else {
      res.status(400).json({ message: "Error al crear proyecto" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message, message: "Error al crear proyecto" });
  }
};

export const putProject = async (req, res) => {
  const { Nombre, Descripcion, FechaInicio, FechaFin } = req.body;
  const ID = req.params.id;

  try {
    const [result] = await pool.query(
      "UPDATE proyectos SET Nombre = ?, Descripcion = ?, FechaInicio = ?, FechaFin = ? WHERE ID = ?",
      [Nombre, Descripcion, FechaInicio, FechaFin, ID]
    );

    if (result.affectedRows > 0) {
      res.json({ message: "Proyecto actualizado exitosamente" });
    } else {
      res.status(404).json({ message: "Proyecto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message, message: "Error al actualizar proyecto" });
  }
};

export const delProject = async (req, res) => {
  const ID = req.params.id;

  try {
    const [result] = await pool.query("DELETE FROM proyectos WHERE ID = ?", [ID]);

    if (result.affectedRows > 0) {
      res.json({ message: "Proyecto eliminado exitosamente" });
    } else {
      res.status(404).json({ message: "Proyecto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message, message: "Error al eliminar proyecto" });
  }
};

export const getProject = async (req, res) => {
  const ID = req.params.id;

  try {
    const [rows] = await pool.query('SELECT * FROM proyectos WHERE ID = ?', [ID]);
    
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ message: "Proyecto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message, message: "Error en la consulta Get de proyecto" });
  }
};
