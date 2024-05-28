// controllers/assignmentController.js
import { collection as assignmentCollection, ObjectId } from '../models/assignmentModel.js';
import { collection as projectCollection } from '../models/projectModels.js';
import { collection as userCollection } from '../models/userModels.js';

// Obtener todas las asignaciones
const getAllAssignments = async (req, res) => {
  try {
    const assignments = await assignmentCollection.find().toArray();
    res.json(assignments);
  } catch (error) {
    console.error(`Error getting assignments: ${error}`);
    res.status(500).send('Internal Server Error');
  }
};

// Obtener una asignación por su ID
const getAssignmentById = async (req, res) => {
  const { id } = req.params;

  try {
    const assignment = await assignmentCollection.findOne({ _id: new ObjectId(id) });
    if (!assignment) {
      return res.status(404).send('Assignment not found');
    }
    res.json(assignment);
  } catch (error) {
    console.error(`Error getting assignment by ID: ${error}`);
    res.status(500).send('Internal Server Error');
  }
};

// Crear una nueva asignación
const createAssignment = async (req, res) => {
  const { ID_Proyecto, ID_Usuario, date_create } = req.body;

  try {
    // Verificar si el proyecto y el usuario existen
    const project = await projectCollection.findOne({ _id: new ObjectId(ID_Proyecto) });
    const user = await userCollection.findOne({ _id: new ObjectId(ID_Usuario) });

    if (!project || !user) {
      return res.status(400).send('Project or User not found');
    }

    const assignmentData = {
      ID_Proyecto: new ObjectId(ID_Proyecto),
      ID_Usuario: new ObjectId(ID_Usuario),
      date_create: new Date(date_create)
    };

    const result = await assignmentCollection.insertOne(assignmentData);
    const newAssignment = result.ops[0];
    res.status(201).json(newAssignment);
  } catch (error) {
    console.error(`Error creating assignment: ${error}`);
    res.status(500).send('Internal Server Error');
  }
};

// Actualizar una asignación
const updateAssignment = async (req, res) => {
  const { id } = req.params;
  const updatedAssignmentData = req.body;

  try {
    const result = await assignmentCollection.updateOne({ _id: new ObjectId(id) }, { $set: updatedAssignmentData });
    if (result.modifiedCount === 0) {
      return res.status(404).send('Assignment not found');
    }
    res.status(200).send('Assignment updated successfully');
  } catch (error) {
    console.error(`Error updating assignment: ${error}`);
    res.status(500).send('Internal Server Error');
  }
};

// Eliminar una asignación
const deleteAssignment = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await assignmentCollection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return res.status(404).send('Assignment not found');
    }
    res.status(200).send('Assignment deleted successfully');
  } catch (error) {
    console.error(`Error deleting assignment: ${error}`);
    res.status(500).send('Internal Server Error');
  }
};

export { getAllAssignments, getAssignmentById, createAssignment, updateAssignment, deleteAssignment };
