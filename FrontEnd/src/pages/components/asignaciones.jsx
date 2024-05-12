import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const convertToLocalDate = (utcDate) => {
  const date = new Date(utcDate);
  const localDateString = date.toLocaleDateString();
  return localDateString;
};

const AssignmentTable = () => {
  const [assignments, setAssignments] = useState([]);
  const [userNames, setUserNames] = useState({});
  const [projectDetails, setProjectDetails] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const token = Cookies.get('token');
      const response = await axios.get("http://localhost:666/api/asignaciones", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });
      setAssignments(response.data);
      fetchUserNames(response.data);
      fetchProjectDetails(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching assignments:", error);
    }
  };

  const fetchUserNames = async (data) => {
    try {
      const userIds = data.map((assignment) => assignment.ID_Usuario);
      const token = Cookies.get('token');
      const response = await axios.get("http://localhost:666/api/usuario", {
        params: {
          id: userIds.join(",") // Convertir el array de IDs a una cadena separada por comas
        },
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });
      // Organizar los nombres de usuario en un objeto usando el ID como clave
      const userNamesMap = {};
      response.data.forEach(user => {
        userNamesMap[user.id] = user.user;
      });
      setUserNames(userNamesMap);
    } catch (error) {
      console.error("Error fetching user names:", error);
    }
  };

  const fetchProjectDetails = async (data) => {
    try {
      const projectIds = data.map((assignment) => assignment.ID_Proyecto);
      const token = Cookies.get('token');
      const response = await axios.get("http://localhost:666/api/projects", {
        params: {
          ID: projectIds.join(",") // Convertir el array de IDs a una cadena separada por comas
        },
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });
      // Organizar los detalles del proyecto en un objeto usando el ID como clave
      const projectDetailsMap = {};
      response.data.forEach(project => {
        projectDetailsMap[project.ID] = project;
      });
      setProjectDetails(projectDetailsMap);
    } catch (error) {
      console.error("Error fetching project details:", error);
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h2>Tabla de Asignaciones</h2>
      <table>
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Proyecto Asignado</th>
            <th>Fecha de Creación</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map(assignment => (
            <tr key={assignment.ID}>
              <td>{userNames[assignment.ID_Usuario] || "Usuario no encontrado"}</td>
              <td>{projectDetails[assignment.ID_Proyecto]?.Nombre || "Nombre de Proyecto no encontrado"}</td>
              <td>{convertToLocalDate(assignment.date_create)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssignmentTable;
