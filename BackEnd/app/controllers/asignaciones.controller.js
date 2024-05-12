import { pool } from "../config/bd-mysql.js";
import { getCurrentDateTime } from '../util/dateHelper.js';

// Obtener todas las asignaciones
export const getAllAssignments = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM asignaciones");
    res.json(result[0]);
  } catch (error) {
    res.status(500).json({ error: error.message, message: "Error en la consulta GET de asignaciones" });
  }
};

// Obtener una asignación por su ID
export const getAssignmentById = async (req, res) => {
  const ID = req.params.id;

  try {
    const result = await pool.query('SELECT * FROM asignaciones WHERE ID = ?', [ID]);
    res.json(result[0]);
  } catch (error) {
    res.status(500).json({ error: error.message, message: "Error en la consulta GET de asignación por ID" });
  }
};

// Crear una nueva asignación
export const createAssignment = async (req, res) => {
  const { ID_Proyecto, ID_Usuario } = req.body;
  const date_create = getCurrentDateTime();

  try {
    const result = await pool.query(
      "INSERT INTO asignaciones (ID_Proyecto, ID_Usuario, date_create) VALUES (?, ?, ?)",
      [ID_Proyecto, ID_Usuario, date_create]
    );

    if (result.affectedRows > 0) {
      res.json({ message: "Asignación creada exitosamente" });
    } else {
      res.json({ message: "Error al crear asignación" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message, message: "Error al crear asignación" });
  }
};

// Actualizar una asignación existente
export const updateAssignment = async (req, res) => {
  const { ID, ID_Proyecto, ID_Usuario } = req.body;
  const date_create = getCurrentDateTime();

  try {
    await pool.query(
      "UPDATE asignaciones SET ID_Proyecto = ?, ID_Usuario = ?, date_create = ? WHERE ID = ?",
      [ID_Proyecto, ID_Usuario, date_create, ID]
    );

    res.json({ message: "Asignación actualizada exitosamente" });
  } catch (error) {
    res.status(500).json({ error: error.message, message: "Error al actualizar asignación" });
  }
};

// Eliminar una asignación
export const deleteAssignment = async (req, res) => {
  const ID = req.body.ID;

  try {
    await pool.query("DELETE FROM asignaciones WHERE ID = ?", [ID]);
    res.json({ message: "Asignación eliminada exitosamente" });
  } catch (error) {
    res.status(500).json({ error: error.message, message: "Error al eliminar asignación" });
  }
};
