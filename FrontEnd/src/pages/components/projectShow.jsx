import React, { useState, useEffect } from "react";
import axios from "axios";
import DashboardNav from "./dashboard-nav";
import "../../styles/projectShow.css"
import Cookies from 'js-cookie';
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
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Esto muestra solo la fecha en formato local
  };

  return (
    <div className="dashboard">
      <header className='dashboard-header'>
        <h1>Lista De Proyectos</h1>
      </header>
      <nav className='dashboard-nav'>
        <DashboardNav />
      </nav>
      <main className='dashboard-main'>
        <table className="showProjectsTable">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Fecha de Inicio</th>
              <th>Fecha de Fin</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.ID}>
                <td>{project.ID}</td>
                <td>{project.Nombre}</td>
                <td>{project.Descripcion}</td>
                <td>{formatDate(project.FechaInicio)}</td>
                <td>{formatDate(project.FechaFin)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default ProjectComponent;
