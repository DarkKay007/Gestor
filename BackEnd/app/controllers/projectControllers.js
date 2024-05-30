import { collection as projectCollection, ObjectId } from '../models/projectModels.js';

// Obtener todos los proyectos
const getAllProjects = async (req, res) => {
  try {
    const projects = await projectCollection.find().toArray();
    res.json(projects);
  } catch (error) {
    console.error(`Error getting projects: ${error}`);
    res.status(500).send('Internal Server Error');
  }
};

// Obtener un proyecto por su ID
const getProjectById = async (req, res) => {
  const { id } = req.params;

  try {
    const project = await projectCollection.findOne({ _id: new ObjectId(id) });
    if (!project) {
      return res.status(404).send('Project not found');
    }
    res.json(project);
  } catch (error) {
    console.error(`Error getting project by ID: ${error}`);
    res.status(500).send('Internal Server Error');
  }
};

// Crear un nuevo proyecto
const createProject = async (req, res) => {
  const projectData = req.body;

  try {
    const result = await projectCollection.insertOne(projectData);
    res.status(201).json(result.ops[0]);
  } catch (error) {
    console.error(`Error creating project: ${error}`);
    res.status(500).send('Internal Server Error');
  }
};

// Actualizar un proyecto
const updateProject = async (req, res) => {
  const { id } = req.params;
  const updatedProjectData = req.body;

  try {
    const result = await projectCollection.updateOne({ _id: new ObjectId(id) }, { $set: updatedProjectData });
    if (result.modifiedCount === 0) {
      return res.status(404).send('Project not found');
    }
    res.status(200).send('Project updated successfully');
  } catch (error) {
    console.error(`Error updating project: ${error}`);
    res.status(500).send('Internal Server Error');
  }
};

// Eliminar un proyecto
const deleteProject = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await projectCollection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return res.status(404).send('Project not found');
    }
    res.status(200).send('Project deleted successfully');
  } catch (error) {
    console.error(`Error deleting project: ${error}`);
    res.status(500).send('Internal Server Error');
  }
};

export { getAllProjects, getProjectById, createProject, updateProject, deleteProject };
