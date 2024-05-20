import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, deleteTask } from '../store/taskSlice';
import TaskForm from './TaskForm';
import '../styles/taskList.css'; // Importar el archivo CSS para estilos específicos de TaskList

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks.tasks);
  const taskStatus = useSelector(state => state.tasks.status);
  const error = useSelector(state => state.tasks.error);

  useEffect(() => {
    if (taskStatus === 'idle') {
      dispatch(fetchTasks());
    }
  }, [taskStatus, dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  let content;

  if (taskStatus === 'loading') {
    content = <div>Loading...</div>;
  } else if (taskStatus === 'succeeded') {
    content = tasks.map(task => (
      <div key={task.ID} className="task-card">
        <h3>{task.Nombre}</h3>
        <p>{task.Descripcion}</p>
        <button onClick={() => handleDelete(task.ID)}>Delete</button>
      </div>
    ));
  } else if (taskStatus === 'failed') {
    content = <div>{error}</div>;
  }

  return (
    <div className="task-list">
      <TaskForm />
      {content}
    </div>
  );
};

export default TaskList;
  