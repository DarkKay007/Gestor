import React, { useState } from "react";
import { Button, Card, Pagination } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import axios from "axios";

const ProjectList = ({
  projects,
  token,
  onProjectDeleted,
  onProjectUpdated,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [projectIdToDelete, setProjectIdToDelete] = useState(null);

  const handleDeleteButtonClick = (projectId) => {
    setProjectIdToDelete(projectId);
    setOpenModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:666/api/projects/${projectIdToDelete}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onProjectDeleted();
      setOpenModal(false);
      setProjectIdToDelete(null);
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const usersPerPage = 4;
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentProjects = projects.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="ListProjectManagement">
      <span className="TitlePRojectManagement">Listado de Proyectos</span>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentProjects.map((project) => (
          <Card key={project.ID} className="bg-yellow-400 w-80 cardProjects">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {project.Nombre}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              {project.Descripcion}
            </p>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Inicio: {new Date(project.FechaInicio).toLocaleDateString()}
            </p>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Fin: {new Date(project.FechaFin).toLocaleDateString()}
            </p>
            <div className="flex justify-between ButtonCardProjects">
              <Button
                className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                onClick={() => onProjectUpdated(project.ID)}
              >
                Editar
              </Button>
              <Button
                className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                onClick={() => handleDeleteButtonClick(project.ID)}
              >
                Eliminar
              </Button>
            </div>
          </Card>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <Pagination
          className="flex flex-row"
          currentPage={currentPage}
          totalPages={Math.ceil(projects.length / usersPerPage)}
          onPageChange={paginate}
        />
      </div>

      {/* Nuevo modal */}
      <div
        id="popup-modal"
        className={`${
          openModal ? "flex" : "hidden"
        } fixed top-0 left-0 right-0 bottom-0 z-50 justify-center items-center bg-gray-900 bg-opacity-50`}
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={() => setOpenModal(false)}
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
                  d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-4 md:p-5 text-center">
              <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                ¿Estás seguro de que deseas eliminar este proyecto?
              </h3>
              <button
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                onClick={handleConfirmDelete}
              >
                Sí, estoy seguro
              </button>
              <button
                className="py-2.5 px-5 ml-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                onClick={() => setOpenModal(false)}
              >
                No, cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectList;
