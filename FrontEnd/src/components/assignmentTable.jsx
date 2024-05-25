// src/components/AssignmentTable.jsx
import React, { useEffect, useState } from 'react';
import useAssignmentStore from '../store/assignmentStore';
import AssignmentForm from './AssignmentForm';
import Cookies from 'js-cookie';
import axios from 'axios';

const AssignmentTable = () => {
  const { assignments, userNames, projectDetails, loading, fetchAssignments } = useAssignmentStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAssignment, setCurrentAssignment] = useState(null);

  useEffect(() => {
    fetchAssignments();
  }, []);

  const convertToLocalDate = (utcDate) => {
    const date = new Date(utcDate);
    const localDateString = date.toLocaleDateString();
    return localDateString;
  };

  const openModal = (assignment) => {
    setCurrentAssignment(assignment);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setCurrentAssignment(null);
    setIsModalOpen(false);
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h2>Tabla de Asignaciones</h2>
      <button onClick={() => openModal(null)}>Crear Nueva Asignación</button>
      <table>
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Proyecto Asignado</th>
            <th>Fecha de Creación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map(assignment => (
            <tr key={assignment.ID}>
              <td>{userNames[assignment.ID_Usuario] || "Usuario no encontrado"}</td>
              <td>{projectDetails[assignment.ID_Proyecto]?.Nombre || "Nombre de Proyecto no encontrado"}</td>
              <td>{convertToLocalDate(assignment.date_create)}</td>
              <td>
                <button onClick={() => openModal(assignment)}>Editar</button>
                <button onClick={async () => {
                  const token = Cookies.get('token');
                  try {
                    await axios.delete(`http://localhost:666/api/asignaciones`, {
                      headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                      },
                      data: { ID: assignment.ID }
                    });
                    fetchAssignments();
                  } catch (error) {
                    console.error('Error deleting assignment:', error);
                  }
                }}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && <AssignmentForm assignment={currentAssignment} onClose={closeModal} />}
    </div>
  );
};

export default AssignmentTable;
