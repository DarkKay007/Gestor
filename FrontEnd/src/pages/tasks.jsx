import { Button } from "flowbite-react";
import DashboardNav from "./components/dashboard-nav";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import ".././styles/tasks.css";

const convertToLocalDate = (utcDate) => {
  const date = new Date(utcDate); // Convertir la fecha UTC a objeto Date
  const localDateString = date.toLocaleDateString(); // Obtener la fecha en formato local
  return localDateString; // Devolver solo la fecha en formato local
};

const TasksComponent = () => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]); // Nuevo estado para almacenar los proyectos
  const [newTask, setNewTask] = useState({
    ID_Proyecto: "",
    Nombre: "",
    Descripcion: "",
    FechaInicio: "",
    FechaFin: "",
    Estado: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(7); // Numero de elementos a mostrar por paginas

  useEffect(() => {
    fetchTasks();
    fetchProjects(); // Llamar a la función para obtener los proyectos al cargar el componente
  }, []);

  const getToken = () => {
    return Cookies.get("token");
  };

  const fetchTasks = async () => {
    try {
      const token = getToken();
      const response = await axios.get("http://localhost:666/api/tareas", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const fetchProjects = async () => {
    try {
      const token = getToken();
      const response = await axios.get("http://localhost:666/api/projects", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };
  const handlePagination = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = getToken();
      await axios.post("http://localhost:666/api/tareas", newTask, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      fetchTasks();
      setNewTask({
        ID_Proyecto: "",
        Nombre: "",
        Descripcion: "",
        FechaInicio: "",
        FechaFin: "",
        Estado: "",
      });
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewTask({ ...newTask, [name]: value });
  };
  const handleProjectChange = (event) => {
    const selectedProjectId = event.target.value;
    setNewTask({ ...newTask, ID_Proyecto: selectedProjectId });
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Kuro</h1>
      </header>
      <nav className="dashboard-nav">
        <DashboardNav />
      </nav>
      <main className="dashboard-main">
        <div className="main-tasks">
          <div className="list-tasks">
            <div>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>ID Proyecto</th>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Fecha de Inicio</th>
                    <th>Fecha de Fin</th>
                    <th>Fecha de Creación</th>
                    <th>Estado</th>
                    <th>Nombre del Proyecto</th>
                  </tr>
                </thead>
                <tbody>
                  {currentTasks.map((task) => (
                    <tr key={task.ID}>
                      <td>{task.ID}</td>
                      <td>{task.ID_Proyecto}</td>
                      <td>{task.Nombre}</td>
                      <td>{task.Descripcion}</td>
                      <td>{convertToLocalDate(task.FechaInicio)}</td>
                      <td>{convertToLocalDate(task.FechaFin)}</td>
                      <td>{convertToLocalDate(task.date_create)}</td>
                      <td>{task.Estado}</td>
                      <td>
                        {projects.find(
                          (project) => project.ID === task.ID_Proyecto
                        )?.Nombre || "Proyecto no encontrado"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="pagination">
              {Array.from(
                { length: Math.ceil(tasks.length / tasksPerPage) },
                (_, i) => (
                  <Button
                    outline
                    gradientDuoTone="tealToLime"
                    key={i}
                    onClick={() => handlePagination(i + 1)}
                  >
                    {i + 1}
                  </Button>
                )
              )}
            </div>
          </div>

          <div className="form-task">
            <form onSubmit={handleSubmit}>
              <div>
                <label>Proyecto:</label>
                <select
                  name="ID_Proyecto"
                  value={newTask.ID_Proyecto}
                  onChange={handleProjectChange}
                >
                  <option value="">Seleccione un proyecto</option>
                  {projects.map((project) => (
                    <option key={project.ID} value={project.ID}>
                      {project.Nombre} (ID: {project.ID})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label>Nombre:</label>
                <input
                  type="text"
                  name="Nombre"
                  value={newTask.Nombre}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Descripción:</label>
                <input
                  type="text"
                  name="Descripcion"
                  value={newTask.Descripcion}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Fecha de Inicio:</label>
                <input
                  type="date"
                  name="FechaInicio"
                  value={newTask.FechaInicio}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label>Fecha de Fin:</label>
                <input
                  type="date"
                  name="FechaFin"
                  value={newTask.FechaFin}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label>Estado:</label>
                <input
                  type="text"
                  name="Estado"
                  value={newTask.Estado}
                  onChange={handleInputChange}
                />
              </div>
              <button type="submit">Crear Tarea</button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TasksComponent;
