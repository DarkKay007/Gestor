import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import '../../styles/projectShow.css';

const ProjectComponent = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = Cookies.get('token'); // Obtener el token de las cookies

        const response = await axios.get('http://localhost:666/api/projects', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Esto muestra solo la fecha en formato local
  };

  return (
    <div className="project-grid">
      {projects.map((project) => (
        <div className="project-card" key={project.ID}>
          <h3>{project.Nombre}</h3>
          <p>{project.Descripcion}</p>
          <p><strong>Fecha de Inicio:</strong> {formatDate(project.FechaInicio)}</p>
          <p><strong>Fecha de Fin:</strong> {formatDate(project.FechaFin)}</p>
        </div>
      ))}
    </div>
  );
};

export default ProjectComponent;
