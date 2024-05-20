// src/features/tasks/TaskForm.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../store/taskSlice';

const TaskForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    ID_Proyecto: '',
    Nombre: '',
    Descripcion: '',
    FechaInicio: '',
    FechaFin: '',
    Estado: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTask(formData));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="ID_Proyecto" value={formData.ID_Proyecto} onChange={handleChange} placeholder="ID Proyecto" />
      <input name="Nombre" value={formData.Nombre} onChange={handleChange} placeholder="Nombre" />
      <input name="Descripcion" value={formData.Descripcion} onChange={handleChange} placeholder="Descripción" />
      <input name="FechaInicio" value={formData.FechaInicio} onChange={handleChange} placeholder="Fecha Inicio" />
      <input name="FechaFin" value={formData.FechaFin} onChange={handleChange} placeholder="Fecha Fin" />
      <input name="Estado" value={formData.Estado} onChange={handleChange} placeholder="Estado" />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
