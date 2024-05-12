import React, { useEffect, useRef, useState } from "react";
import "tui-calendar/dist/tui-calendar.css";
import Calendar from "tui-calendar";
import axios from "axios";

const CalendarComponent = ({ projects }) => {
  const calendarRef = useRef(null);
  const [view, setView] = useState("month");

  const updateProject = async (projectId, newData) => {
    try {
      const response = await axios.put(
        `http://localhost:666/api/projects/${projectId}`,
        newData
      );
      return response.data.message;
    } catch (error) {
      throw new Error(`Error updating project: ${error.response.data.message}`);
    }
  };

  const deleteProject = async (projectId) => {
    try {
      const response = await axios.delete(
        `http://localhost:666/api/projects/${projectId}`
      );
      return response.data.message;
    } catch (error) {
      throw new Error(`Error deleting project: ${error.response.data.message}`);
    }
  };

  useEffect(() => {
    if (!calendarRef.current) {
      calendarRef.current = new Calendar("#calendar", {
        defaultView: view,
        useDetailPopup: true,
        taskView: false,
        template: {
          popupEdit: () =>
            '<button type="button" class="btn-edit">Editar</button>',
          popupDelete: () =>
            '<button type="button" class="btn-delete">Eliminar</button>',
        },
        onClickSchedule: async (event) => {
          const action = event.clickEvent.target.classList.contains("btn-edit")
            ? "edit"
            : "delete";
          const projectId = event.schedule.id;

          try {
            if (action === "edit") {
              const newData = {
                /* Datos actualizados del proyecto */
              };
              await updateProject(projectId, newData);
            } else if (action === "delete") {
              await deleteProject(projectId);
            }
            calendarRef.current.clear();
            calendarRef.current.createSchedules(await fetchEvents());
          } catch (error) {
            console.error(error.message);
          }
        },
      });
    }

    const events = projects.map((project) => ({
      id: project.ID.toString(),
      calendarId: "project",
      title: project.Nombre,
      start: project.FechaInicio,
      end: project.FechaFin,
      category: "allday",
      body: project.Descripcion,
    }));

    calendarRef.current.clear();
    calendarRef.current.createSchedules(events);
  }, [projects, view]);

  const changeView = (newView) => {
    setView(newView);
    calendarRef.current.changeView(newView);
  };

  const nextPeriod = () => {
    calendarRef.current.next();
  };

  const previousPeriod = () => {
    calendarRef.current.prev();
  };

  return (
    <div style={{ height: "90%", width: "90%" }}>
      <div id="calendar" style={{ height: "90%" }}></div>
      <div>
        <button onClick={() => changeView("day")}>Día</button>
        <button onClick={() => changeView("week")}>Semana</button>
        <button onClick={() => changeView("month")}>Mes</button>
        <button onClick={previousPeriod}>Anterior</button>
        <button onClick={nextPeriod}>Siguiente</button>
      </div>
    </div>
  );
};

export default CalendarComponent;
