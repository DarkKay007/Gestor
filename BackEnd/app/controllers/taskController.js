// controllers/taskController.js
import { collection as taskCollection, ObjectId } from '../models/taskModels.js';
import { collection as projectCollection } from '../models/projectModels.js';

// Obtener todas las tareas
const getAllTasks = async (req, res) => {
  try {
    const tasks = await taskCollection.find().toArray();
    res.json(tasks);
  } catch (error) {
    console.error(`Error getting tasks: ${error}`);
    res.status(500).send('Internal Server Error');
  }
};

// Obtener una tarea por su ID
const getTaskById = async (req, res) => {
  const { id } = req.params;
  
  try {
    const task = await taskCollection.findOne({ _id: new ObjectId(id) });
    if (!task) {
      return res.status(404).send('Task not found');
    }
    res.json(task);
  } catch (error) {
    console.error(`Error getting task by ID: ${error}`);
    res.status(500).send('Internal Server Error');
  }
};

// Crear una nueva tarea
const createTask = async (req, res) => {
  const taskData = req.body;

  try {
    // Verificar que el proyecto exista
    const project = await projectCollection.findOne({ _id: new ObjectId(taskData.ID_Proyecto) });
    if (!project) {
      return res.status(404).send('Project not found');
    }

    // Añadir la fecha de creación a los datos de la tarea
    const taskWithDate = {
      ...taskData,
      date_create: new Date(),
    };

    const result = await taskCollection.insertOne(taskWithDate);
    const newTask = result.ops[0];
    res.status(201).json(newTask);
  } catch (error) {
    console.error(`Error creating task: ${error}`);
    res.status(500).send('Internal Server Error');
  }
};
// Actualizar una tarea
const updateTask = async (req, res) => {
  const { id } = req.params;
  const updatedTaskData = req.body;

  try {
    // Verificar que el proyecto exista
    if (updatedTaskData.ID_Proyecto) {
      const project = await projectCollection.findOne({ _id: new ObjectId(updatedTaskData.ID_Proyecto) });
      if (!project) {
        return res.status(404).send('Project not found');
      }
    }

    const result = await taskCollection.updateOne({ _id: new ObjectId(id) }, { $set: updatedTaskData });
    if (result.modifiedCount === 0) {
      return res.status(404).send('Task not found');
    }
    res.status(200).send('Task updated successfully');
  } catch (error) {
    console.error(`Error updating task: ${error}`);
    res.status(500).send('Internal Server Error');
  }
};

// Eliminar una tarea
const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await taskCollection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return res.status(404).send('Task not found');
    }
    res.status(200).send('Task deleted successfully');
  } catch (error) {
    console.error(`Error deleting task: ${error}`);
    res.status(500).send('Internal Server Error');
  }
};

export { getAllTasks, getTaskById, createTask, updateTask, deleteTask };
