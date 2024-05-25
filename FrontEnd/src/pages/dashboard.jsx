import React, { useState } from 'react';
import NavLinks from "../components/nav-links";
import { IoSettings } from "react-icons/io5";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import useProjectStore from '../store/useProjectStore';

import "../styles/dashboard.css";

function Dashboard() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedProject, setSelectedProject] = useState(null);
  const { projects, fetchProjects, updateProject } = useProjectStore();

  // Manejar el cambio de fecha en el calendario
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // Manejar la selección de un proyecto para edición
  const handleProjectSelection = (project) => {
    setSelectedProject(project);
  };

  // Manejar la actualización de un proyecto
  const handleProjectUpdate = () => {
    if (selectedProject) {
      updateProject(selectedProject.ID, selectedProject);
      setSelectedProject(null);
    }
  };

  return (
    <div className="container-dashboard">
      <div className="header-dashboard">
        <div className="ico-dashboard"></div>
        <h1>Dashboard</h1>
        <div className="settings-dashboard"><h1><IoSettings /></h1></div>
      </div>
      <div className="nav-dashboard">
        <NavLinks />
      </div>
      <div className="main-dashboard-settings">
        </div>
        <div className="main-dashboard">
        {/* Componente de calendario */}
        <Calendar className="w-full"
          onChange={handleDateChange}
          value={selectedDate}
        />
        {/* Lista de proyectos */}
        <ul>
          {projects.map((project) => (
            <li key={project.ID} onClick={() => handleProjectSelection(project)}>
              {project.Nombre}
            </li>
          ))}
        </ul>
        {/* Botón para actualizar el proyecto seleccionado */}
        {selectedProject && (
          <button onClick={handleProjectUpdate}>Actualizar Proyecto</button>
        )}
        <center>otros datos</center>
      </div>
    </div>
  );
}

export default Dashboard;
