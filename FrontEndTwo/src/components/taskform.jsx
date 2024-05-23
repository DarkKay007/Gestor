import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../store/taskSlice";

const TaskForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    ID: "", // Clave primaria
    ID_Proyecto: "",
    Nombre: "",
    Descripcion: "",
    FechaInicio: "",
    FechaFin: "",
    Estado: "",
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [proyectos, setProyectos] = useState([]);

  useEffect(() => {
  
    fetch("http://localhost:666/api/projects") 
      .then((response) => response.json())
      .then((data) => setProyectos(data))
      .catch((error) => console.error("Error fetching projects:", error));
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTask(formData));
    setModalOpen(false);
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <>
      <button
        
        onClick={toggleModal}
        className="block text-gray-900 bg-yellow-500 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
      >
        Crear tarea
      </button>

      {modalOpen && (
        <div
          id="crud-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            {/* Modal content */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Create New Task
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={toggleModal}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* Modal body */}
              <form className="p-4 md:p-5" onSubmit={handleSubmit}>
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2">
                    <label
                      htmlFor="ID_Proyecto"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Proyecto
                    </label>
                    <select
                      id="ID_Proyecto"
                      name="ID_Proyecto"
                      value={formData.ID_Proyecto}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    >
                      <option value="">Seleccione un proyecto</option>
                      {proyectos.map((proyecto) => (
                        <option key={proyecto.ID} value={proyecto.ID}>
                          {proyecto.Nombre}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="Nombre"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Nombre
                    </label>
                    <input
                      name="Nombre"
                      value={formData.Nombre}
                      onChange={handleChange}
                      placeholder="Nombre"
                      type="text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    />
                  </div>
                  <div className="col-span-2">
                    <label
                      htmlFor="Descripcion"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Descripción
                    </label>
                    <input
                      name="Descripcion"
                      value={formData.Descripcion}
                      onChange={handleChange}
                      placeholder="Descripción"
                      type="text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="FechaInicio"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Fecha Inicio
                    </label>
                    <input
                      name="FechaInicio"
                      value={formData.FechaInicio}
                      onChange={handleChange}
                      placeholder="Fecha Inicio"
                      type="date"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="FechaFin"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Fecha Fin
                    </label>
                    <input
                      name="FechaFin"
                      value={formData.FechaFin}
                      onChange={handleChange}
                      placeholder="Fecha Fin"
                      type="date"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    />
                  </div>
                  <div className="col-span-2">
                    <label
                      htmlFor="Estado"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Estado
                    </label>
                    <input
                      name="Estado"
                      value={formData.Estado}
                      onChange={handleChange}
                      placeholder="Estado"
                      type="text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <svg
                    className="me-1 -ms-1 w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Add new task
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskForm;
