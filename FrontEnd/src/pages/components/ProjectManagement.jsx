import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/projectShow.css"
const fetchProjects = async (token) => {
  try {
    const response = await axios.get('http://localhost:666/api/projects', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error; // Puedes manejar el error como mejor te parezca en tu aplicación
  }
};

const ProjectManagement = ({ token }) => {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    Nombre: "",
    Descripcion: "",
    FechaInicio: "",
    FechaFin: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectsData = await fetchProjects(token);
        setProjects(projectsData);
      } catch (error) {
        // Maneja el error aquí según lo necesites
      }
    };

    fetchData();
  }, [token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateProject = async () => {
    try {
      await axios.post("http://localhost:666/api/projects", formData);
      const updatedProjects = await fetchProjects(token);
      setProjects(updatedProjects);
      setFormData({
        Nombre: "",
        Descripcion: "",
        FechaInicio: "",
        FechaFin: "",
      });
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  const handleEditProject = async (id) => {
    console.log("Editing project with id:", id);
    console.log("Form data:", formData);
  
    try {
      const response = await axios.put(`http://localhost:666/api/projects/${id}`, formData);
      console.log("Response from API:", response);
  
      const updatedProjects = await fetchProjects(token);
      setProjects(updatedProjects);
      setFormData({
        Nombre: "",
        Descripcion: "",
        FechaInicio: "",
        FechaFin: "",
      });
    } catch (error) {
      console.error("Error editing project:", error);
    }
  };

  const handleDeleteProject = async (id) => {
    try {
      await axios.delete(`http://localhost:666/api/projects/${id}`);
      const updatedProjects = await fetchProjects(token);
      setProjects(updatedProjects);
      
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  return (
    <div className="ContentProjectMAnagement">
      <div className="FormProjectManagement">
      <form>
        <input
          type="text"
          name="Nombre"
          placeholder="Nombre del proyecto"
          value={formData.Nombre}
          onChange={handleChange}
        />
        <input
          type="text"
          name="Descripcion"
          placeholder="Descripción del proyecto"
          value={formData.Descripcion}
          onChange={handleChange}
        />
        <input
          type="date"
          name="FechaInicio"
          value={formData.FechaInicio}
          onChange={handleChange}
        />
        <input
          type="date"
          name="FechaFin"
          value={formData.FechaFin}
          onChange={handleChange}
        />
        <button type="button" onClick={handleCreateProject}>
          Crear Proyecto
        </button>
      </form>
      </div>
     <div className="ListProjectManagement">
     <ul className="ulProjectManagement">
        {Array.isArray(projects) &&
          projects.map((project) => (
            <li key={project.ID}>
              <div>
                <h3>{project.Nombre}</h3>
                <p>{project.Descripcion}</p>
                <p>Fecha de inicio: {project.FechaInicio}</p>
                <p>Fecha de fin: {project.FechaFin}</p>
              </div>
              <div>
                <button onClick={() => handleEditProject(project.ID)}>
                  Editar
                </button>
                <button onClick={() => handleDeleteProject(project.ID)}>
                  Eliminar
                </button>
              </div>
            </li>
          ))}
      </ul>
     </div>
    </div>
  );
};

export default ProjectManagement;
