import React, { useEffect, useState } from 'react';
import { Button, Modal, TextInput, Label } from 'flowbite-react';
import useProjectStore from '../store/useProjectStore';

const ProjectComponent = () => {
  const { projects, fetchProjects, updateProject, deleteProject } = useProjectStore();
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 9; 
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(projects.length / projectsPerPage);

  const handleOpenUpdateModal = (project) => {
    setSelectedProject(project);
    setShowUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setSelectedProject(null);
    setShowUpdateModal(false);
  };

  const handleUpdateProject = () => {
    // Aquí podrías realizar una validación para asegurarte de que las fechas estén en el formato deseado
    updateProject(selectedProject._id, selectedProject);
    handleCloseUpdateModal();
  };

  const handleOpenDeleteModal = (project) => {
    setSelectedProject(project);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setSelectedProject(null);
    setShowDeleteModal(false);
  };

  const handleDeleteProject = () => {
    deleteProject(selectedProject._id);
    handleCloseDeleteModal();
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div className="container mx-auto p-4">
      <ul className="projectList">
        {Array.isArray(currentProjects) &&
          currentProjects.map((project) => (
            <li key={project._id} className="projectListUl bg-yellow-400">
              <div>
                <h2 className="text-lg font-semibold text-white">{project.Nombre}</h2>
                <p className="text-gray-900">{project.Descripcion}</p>
              </div>
              <div>
                <Button className="w-24" color="light" onClick={() => handleOpenUpdateModal(project)}>
                  Update
                </Button>
                <Button className="w-24" color="failure" onClick={() => handleOpenDeleteModal(project)}>
                  Delete
                </Button>
              </div>
            </li>
          ))}
      </ul>

      <div className="flex justify-between mt-4">
        <Button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </Button>
        <span className="text-white">Page {currentPage} of {totalPages}</span>
        <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </Button>
      </div>

      {showUpdateModal && (
        <Modal show={showUpdateModal} onClose={handleCloseUpdateModal}>
          <Modal.Header className="bg-gray-900 text-yellow-500">Update Project</Modal.Header>
          <Modal.Body className="bg-gray-800">
            <div className="space-y-4">
              <Label className="text-white">Nombre</Label>
              <TextInput
                placeholder="Nombre"
                value={selectedProject?.Nombre}
                onChange={(e) => setSelectedProject({ ...selectedProject, Nombre: e.target.value })}
                color="dark"
              />
              <Label className="text-white">Descripcion</Label>
              <TextInput
                placeholder="Descripcion"
                value={selectedProject?.Descripcion}
                onChange={(e) => setSelectedProject({ ...selectedProject, Descripcion: e.target.value })}
                color="dark"
              />
              <Label className="text-white">Fecha Inicio</Label>
              <TextInput
                type="date"
                placeholder="yyyy-MM-dd"
                value={selectedProject?.FechaInicio}
                onChange={(e) => setSelectedProject({ ...selectedProject, FechaInicio: e.target.value })}
                color="dark"
              />
              <Label className="text-white">Fecha Fin</Label>
              <TextInput
                type="date"
                placeholder="yyyy-MM-dd"
                value={selectedProject?.FechaFin}
                onChange={(e) => setSelectedProject({ ...selectedProject, FechaFin: e.target.value })}
                color="dark"
              />
            </div>
          </Modal.Body>
          <Modal.Footer className="bg-gray-900">
            <Button onClick={handleUpdateProject} className="bg-yellow-500 text-black">
              Update
            </Button>
            <Button onClick={handleCloseUpdateModal} color="gray">
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {showDeleteModal && (
        <Modal show={showDeleteModal} onClose={handleCloseDeleteModal}>
          <Modal.Header className="bg-gray-900 text-yellow-500">Delete Project</Modal.Header>
          <Modal.Body className="bg-gray-800 text-center">
            <svg
              className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure?</h3>
            <Button onClick={handleDeleteProject} className="bg-red-600 hover:bg-red-800 text-white">
              Yes, I'm sure
            </Button>
            <Button onClick={handleCloseDeleteModal} color="gray" className="ml-3">
              No, cancel
            </Button>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default ProjectComponent;
