// src/components/AssignmentForm.jsx
import React, { useState, useEffect } from 'react';
import useAssignmentStore from '../store/assignmentStore';

const AssignmentForm = ({ assignment, onClose }) => {
  const { fetchAssignments } = useAssignmentStore();
  const [formData, setFormData] = useState({
    ID_Usuario: '',
    ID_Proyecto: '',
    date_create: ''
  });

  useEffect(() => {
    if (assignment) {
      setFormData(assignment);
    }
  }, [assignment]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get('token');
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    };
    try {
      if (assignment) {
        await axios.put(`http://localhost:666/api/asignaciones`, formData, config);
      } else {
        await axios.post(`http://localhost:666/api/asignaciones`, formData, config);
      }
      fetchAssignments();
      onClose();
    } catch (error) {
      console.error('Error submitting assignment:', error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <label>
            Usuario:
            <input
              type="text"
              name="ID_Usuario"
              value={formData.ID_Usuario}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Proyecto:
            <input
              type="text"
              name="ID_Proyecto"
              value={formData.ID_Proyecto}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Fecha de Creación:
            <input
              type="date"
              name="date_create"
              value={formData.date_create}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit">Guardar</button>
        </form>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default AssignmentForm;
