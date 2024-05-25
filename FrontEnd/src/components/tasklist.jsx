import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, deleteTask, updateTask } from '../store/taskSlice';
import useProjectStore from '../store/useProjectStore';

import '../styles/taskList.css';

const TaskList = () => {
  const dispatch = useDispatch();

  const tasks = useSelector(state => state.tasks.tasks);
  const taskStatus = useSelector(state => state.tasks.status);
  const taskError = useSelector(state => state.tasks.error);

  const { projects, fetchProjects } = useProjectStore();

  const [editingTask, setEditingTask] = useState(null);
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;

  useEffect(() => {
    if (taskStatus === 'idle') {
      dispatch(fetchTasks());
    }
  }, [taskStatus, dispatch]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setTaskName(task.Nombre);
    setTaskDescription(task.Descripcion);
  };

  const handleUpdate = (task) => {
    dispatch(updateTask({ 
      ID: task.ID, 
      Nombre: taskName || task.Nombre, 
      Descripcion: taskDescription || task.Descripcion, 
      ID_Proyecto: task.ID_Proyecto 
    }));
    setEditingTask(null);
  };

  // Get current tasks
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  let content;

  if (taskStatus === 'loading') {
    content = <div>Loading...</div>;
  } else if (taskStatus === 'succeeded') {
    content = currentTasks.map(task => {
      const project = projects.find(proyecto => proyecto.ID === task.ID_Proyecto);
      return (
        <div key={task.ID} className="task-card bg-yellow-400">
          {editingTask && editingTask.ID === task.ID ? (
            <>
              <input
                type="text"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
              />
              <input
                type="text"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
              />
              <button onClick={() => handleUpdate(task)}>Update</button>
            </>
          ) : (
            <>
              <h3>{task.Nombre}</h3>
              <p>{task.Descripcion}</p>
              <p>{project ? project.Nombre : 'No Project'}</p>
              <button onClick={() => handleDelete(task.ID)}>Delete</button>
              <button onClick={() => handleEdit(task)}>Edit</button>
            </>
          )}
        </div>
      );
    });
  } else if (taskStatus === 'failed') {
    content = <div>{taskError}</div>;
  }

  return (
    <div className="task-list">
      {content}
      <div className="pagination">
        {[...Array(Math.ceil(tasks.length / tasksPerPage)).keys()].map(number => (
          <button key={number + 1} onClick={() => paginate(number + 1)}>
            {number + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
