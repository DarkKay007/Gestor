import React, { useState } from 'react';
import useProjectStore from '../store/useProjectStore';

const AddProjectButton = () => {
  const { addProject } = useProjectStore();
  const [newProject, setNewProject] = useState({ Nombre: '', Descripcion: '', FechaInicio: '', FechaFin: '' });
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAddProject = (e) => {
    e.preventDefault();
    addProject(newProject);
    setNewProject({ Nombre: '', Descripcion: '', FechaInicio: '', FechaFin: '' });
    setShowAddModal(false);
  };

  const handleOpenAddModal = () => {
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };

  return (
    <>
      <button onClick={handleOpenAddModal} className="mb-4 bg-yellow-500 text-black px-4 py-2 rounded">
        Add New Project
      </button>

      {showAddModal && (
        <div id="crud-modal" tabIndex="-1" className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden h-full max-h-full ">
          <div className="relative w-full max-w-md p-4 max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 ">
              <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Agregar un nuevo proyecto
                </h3>
                <button onClick={handleCloseAddModal} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <form onSubmit={handleAddProject} className="p-4">
                <div className="grid gap-4 mb-4">
                  <div>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={newProject.Nombre}
                      onChange={(e) => setNewProject({ ...newProject, Nombre: e.target.value })}
                      className="bg-gray-900 border border-gray-300 text-gray-50 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Type project name"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descripcion</label>
                    <input
                      type="text"
                      name="description"
                      id="description"
                      value={newProject.Descripcion}
                      onChange={(e) => setNewProject({ ...newProject, Descripcion: e.target.value })}
                      className="bg-gray-900 border border-gray-300 text-gray-50 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Type project description"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="start-date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha Inicio</label>
                    <input
                      type="date"
                      name="start-date"
                      id="start-date"
                      value={newProject.FechaInicio}
                      onChange={(e) => setNewProject({ ...newProject, FechaInicio: e.target.value })}
                      className="bg-gray-900 border border-gray-300 text-gray-50 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="end-date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha Fin</label>
                    <input
                      type="date"
                      name="end-date"
                      id="end-date"
                      value={newProject.FechaFin}
                      onChange={(e) => setNewProject({ ...newProject, FechaFin: e.target.value })}
                      className="bg-gray-900 border border-gray-300 text-gray-50 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required
                    />
                  </div>
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Add Project
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddProjectButton;
