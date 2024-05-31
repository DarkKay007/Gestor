import React, { useEffect } from 'react';
import useTaskStore from '../store/taskStore';
import { useParams } from 'react-router-dom';
import "../styles/taskList.css"
const TaskList = () => {
  const { taskData } = useParams();
  const { tasks, status, fetchTasks } = useTaskStore();

  useEffect(() => {
    fetchTasks(taskData);
  }, [taskData, fetchTasks]);

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>Error fetching tasks.</p>;
  return (
    <div>
      <h2>Tasks</h2>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task._id} className="task-item">
            <div className="task-field">
              <strong>ID Proyecto:</strong> {task.ID_Proyecto}
            </div>
            <div className="task-field">
              <strong>Nombre:</strong> {task.Nombre}
            </div>
            <div className="task-field">
              <strong>Descripción:</strong> {task.Descripcion}
            </div>
            <div className="task-field">
              <strong>Fecha Inicio:</strong> {new Date(task.FechaInicio).toLocaleDateString()}
            </div>
            <div className="task-field">
              <strong>Fecha Fin:</strong> {new Date(task.FechaFin).toLocaleDateString()}
            </div>
            <div className="task-field">
              <strong>Estado:</strong> {task.Estado}
            </div>
            <div className="task-field">
              <strong>Fecha de Creación:</strong> {new Date(task.date_create).toLocaleDateString()}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
