import { pool } from "../config/bd-mysql.js";
import { getCurrentDateTime } from '../util/dateHelper.js';

// Obtener todas las tareas
export const getAllTasks = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM tareas");
    res.json(result[0]);
  } catch (error) {
    res.status(500).json({ error: error.message, message: "Error en la consulta GET de tareas" });
  }
};

// Obtener una tarea por su ID
export const getTaskById = async (req, res) => {
  const ID = req.params.id;

  try {
    const result = await pool.query('SELECT * FROM tareas WHERE ID = ?', [ID]);
    res.json(result[0]);
  } catch (error) {
    res.status(500).json({ error: error.message, message: "Error en la consulta GET de tarea por ID" });
  }
};

// Crear una nueva tarea
export const createTask = async (req, res) => {
  const { ID_Proyecto, Nombre, Descripcion, FechaInicio, FechaFin, Estado } = req.body;
  const date_create = getCurrentDateTime();

  try {
    const result = await pool.query(
      "INSERT INTO tareas (ID_Proyecto, Nombre, Descripcion, FechaInicio, FechaFin, Estado, date_create) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [ID_Proyecto, Nombre, Descripcion, FechaInicio, FechaFin, Estado, date_create]
    );

    if (result.affectedRows > 0) {
      res.json({ message: "Tarea creada exitosamente" });
    } else {
      res.json({ message: "Error al crear tarea" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message, message: "Error al crear tarea" });
  }
};

// Actualizar una tarea existente
export const updateTask = async (req, res) => {
  const { ID, ID_Proyecto, Nombre, Descripcion, FechaInicio, FechaFin, Estado } = req.body;
  const date_create = getCurrentDateTime();

  try {
    await pool.query(
      "UPDATE tareas SET ID_Proyecto = ?, Nombre = ?, Descripcion = ?, FechaInicio = ?, FechaFin = ?, Estado = ?, date_create = ? WHERE ID = ?",
      [ID_Proyecto, Nombre, Descripcion, FechaInicio, FechaFin, Estado, date_create, ID]
    );

    res.json({ message: "Tarea actualizada exitosamente" });
  } catch (error) {
    res.status(500).json({ error: error.message, message: "Error al actualizar tarea" });
  }
};

// Eliminar una tarea
export const deleteTask = async (req, res) => {
  const ID = req.body.ID;

  try {
    await pool.query("DELETE FROM tareas WHERE ID = ?", [ID]);
    res.json({ message: "Tarea eliminada exitosamente" });
  } catch (error) {
    res.status(500).json({ error: error.message, message: "Error al eliminar tarea" });
  }
};
