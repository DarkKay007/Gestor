import React, { useEffect, useRef } from 'react';
import 'tui-calendar/dist/tui-calendar.css';
import Calendar from 'tui-calendar';
import axios from 'axios'; // Asegúrate de importar axios

const CalendarComponent = ({ projects }) => {
  const calendarRef = useRef(null);

  const updateProject = async (projectId, newData) => {
    try {
        const response = await axios.put(`http://localhost:666/api/projects/${projectId}`, newData);
        return response.data.message;
    } catch (error) {
        throw new Error(`Error updating project: ${error.response.data.message}`);
    }
  };

  const deleteProject = async (projectId) => {
    try {
        const response = await axios.delete(`http://localhost:666/api/projects/${projectId}`);
        return response.data.message;
    } catch (error) {
        throw new Error(`Error deleting project: ${error.response.data.message}`);
    }
  };

  useEffect(() => {
    if (!calendarRef.current) {
      calendarRef.current = new Calendar('#calendar', {
        defaultView: 'month',
        useDetailPopup: true,
        taskView: false,
        template: {
            popupEdit: () => '<button type="button" class="btn-edit">Editar</button>',
            popupDelete: () => '<button type="button" class="btn-delete">Eliminar</button>',
        },
        onClickSchedule: async (event) => {
            const action = event.clickEvent.target.classList.contains('btn-edit')? 'edit' : 'delete';
            const projectId = event.schedule.id; // Suponiendo que el ID del proyecto está almacenado en el campo "id" del evento
        
            try {
                if (action === 'edit') {
                    // Lógica para editar el proyecto
                    const newData = { /* Datos actualizados del proyecto */ };
                    await updateProject(projectId, newData);
                } else if (action === 'delete') {
                    // Lógica para eliminar el proyecto
                    await deleteProject(projectId);
                }
                // Recargar los eventos del calendario después de actualizar o eliminar el proyecto
                calendarRef.current.clear();
                calendarRef.current.createSchedules(await fetchEvents());
            } catch (error) {
                console.error(error.message);
                // Manejar errores de actualización o eliminación del proyecto
            }
        },
      });
    }
    

    const events = projects.map(project => ({
      id: project.ID.toString(),
      calendarId: 'project',
      title: project.Nombre,
      start: project.FechaInicio,
      end: project.FechaFin,
      category: 'allday',
      body: project.Descripcion,
    }));

    calendarRef.current.clear();
    calendarRef.current.createSchedules(events);
  }, [projects]);

  return <div id="calendar" style={{ height: '100%', width: '100%', overflow: 'hidden' }}></div>;
};

export default CalendarComponent;