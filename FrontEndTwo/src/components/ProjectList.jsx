import React, { useState } from "react";
import { Button, Card, Modal, Pagination } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import axios from "axios";

const ProjectList = ({ projects, token, onProjectDeleted, onProjectUpdated }) => {
  const [openModal, setOpenModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [projectIdToDelete, setProjectIdToDelete] = useState(null);

  const handleDeleteButtonClick = (projectId) => {
    setProjectIdToDelete(projectId);
    setOpenModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:666/api/projects/${projectIdToDelete}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      onProjectDeleted();
      setOpenModal(false);
      setProjectIdToDelete(null);
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const usersPerPage = 5;
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentProjects = projects.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="ListProjectManagement">
      <span className="TitlePRojectManagement">Listado de Proyectos</span>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
        {currentProjects.map((project) => (
          <Card key={project.ID} className="bg-yellow-400 w-80">
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
            <div className="flex justify-between">
              <Button
                outline
                gradientDuoTone="purpleToBlue"
                onClick={() => onProjectUpdated(project.ID)}
              >
                Editar
              </Button>
              <Button
                outline
                gradientDuoTone="pinkToOrange"
                onClick={() => handleDeleteButtonClick(project.ID)}
              >
                Eliminar
              </Button>
            </div>
          </Card>
        ))}
      </div>
      <div className="flex overflow-x-auto sm:justify-center mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(projects.length / usersPerPage)}
          onPageChange={paginate}
        />
      </div>
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              ¿Estás seguro de que deseas eliminar este proyecto?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleConfirmDelete}>
                Sí, estoy seguro
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancelar
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ProjectList;
