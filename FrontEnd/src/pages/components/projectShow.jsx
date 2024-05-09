import React, { useState, useEffect } from "react";
import axios from "axios";
import DashboardNav from "./dashboard-nav";
import "../../styles/dashboard.css"
const ProjectComponent = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:666/api/projects");
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="dashboard">
      <header className='dashboard-header'>
        <h1>Lista De Usuarios</h1>
      </header>
      <nav className='dashboard-nav'>
        <DashboardNav />
      </nav>
      <main className='dashboard-main'>
        <table>
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
                <td>{project.FechaInicio}</td>
                <td>{project.FechaFin}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default ProjectComponent;
