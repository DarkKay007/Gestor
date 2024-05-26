import React, { useState, useEffect } from 'react';
import NavLinks from "../components/nav-links";
import { IoSettings } from "react-icons/io5";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import useProjectStore from '../store/useProjectStore';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasks } from '../store/taskSlice';
import "../styles/dashboard.css";

function Dashboard() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedProject, setSelectedProject] = useState(null);
  const { projects, fetchProjects, updateProject } = useProjectStore();
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchProjects();
    dispatch(fetchTasks());
  }, [fetchProjects, dispatch]);

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

  // Filtrar proyectos y tareas por la fecha seleccionada
  const filteredProjects = projects.filter((project) =>
    new Date(project.FechaInicio) <= selectedDate && new Date(project.FechaFin) >= selectedDate
  );

  const filteredTasks = tasks.filter((task) =>
    new Date(task.FechaInicio) <= selectedDate && new Date(task.FechaFin) >= selectedDate
  );

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
      <div className="main-dashboard-settings"></div>
      <div className="main-dashboard">
        {/* Componente de calendario */}
        <Calendar className="w-full" onChange={handleDateChange} value={selectedDate} />
        <div className="data-container">
          {/* Lista de proyectos */}
          <h2>Proyectos</h2>
          <ul>
            {filteredProjects.map((project) => (
              <li key={project.ID} onClick={() => handleProjectSelection(project)}>
                {project.Nombre}
              </li>
            ))}
          </ul>
          {/* Lista de tareas */}
          <h2>Tareas</h2>
          <ul>
            {filteredTasks.map((task) => (
              <li key={task.ID}>{task.Nombre}</li>
            ))}
          </ul>
          {/* Botón para actualizar el proyecto seleccionado */}
          {selectedProject && (
            <button onClick={handleProjectUpdate}>Actualizar Proyecto</button>
          )}
        </div>
        <center>otros datos</center>
      </div>
    </div>
  );
}

export default Dashboard;
