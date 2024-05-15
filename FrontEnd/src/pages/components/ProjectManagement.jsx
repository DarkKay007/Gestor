import { Button, Modal, Table, TableBody, TableCell, TableRow, Pagination } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/projectShow.css";

const ProjectManagement = ({ token }) => {
  const [openModal, setOpenModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    Nombre: "",
    Descripcion: "",
    FechaInicio: "",
    FechaFin: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectsData = await fetchProjects(token);
        setProjects(projectsData);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchData();
  }, [token]);

  const fetchProjects = async (token) => {
    try {
      const response = await axios.get("http://localhost:666/api/projects", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching projects:", error);
      throw error;
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateProject = async () => {
    try {
      await axios.post("http://localhost:666/api/projects", formData);
      const updatedProjects = await fetchProjects(token);
      setProjects(updatedProjects);
      setFormData({
        Nombre: "",
        Descripcion: "",
        FechaInicio: "",
        FechaFin: "",
      });
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  const handleEditProject = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:666/api/projects/${id}`,
        formData
      );
      const updatedProjects = await fetchProjects(token);
      setProjects(updatedProjects);
      setFormData({
        Nombre: "",
        Descripcion: "",
        FechaInicio: "",
        FechaFin: "",
      });
    } catch (error) {
      console.error("Error editing project:", error);
    }
  };

  const handleDeleteProject = async (id) => {
    try {
      await axios.delete(`http://localhost:666/api/projects/${id}`);
      const updatedProjects = await fetchProjects(token);
      setProjects(updatedProjects);
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const usersPerPage = 5;
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentProjects = projects.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const [projectIdToDelete, setProjectIdToDelete] = useState(null);

const handleDeleteButtonClick = (projectId) => {
  setProjectIdToDelete(projectId);
  setOpenModal(true);
};

const handleConfirmDelete = async () => {
  try {
    await handleDeleteProject(projectIdToDelete);
    setOpenModal(false);
    // Limpia el state projectIdToDelete después de la eliminación
    setProjectIdToDelete(null);
  } catch (error) {
    console.error("Error deleting project:", error);
  }
};
  

  return (
    <div className="ContentProjectMAnagement">
      <div className="FormProjectManagement">
        <span className="TitlePRojectManagement">Cree un nuevo Proyecto</span>
        <form className="form-container">
          <input
            className="form-input"
            type="text"
            name="Nombre"
            placeholder="Nombre del proyecto"
            value={formData.Nombre}
            onChange={handleChange}
          />
          <input
            className="form-input"
            type="text"
            name="Descripcion"
            placeholder="Descripción del proyecto"
            value={formData.Descripcion}
            onChange={handleChange}
          />
          <input
            className="form-input"
            type="date"
            name="FechaInicio"
            value={formData.FechaInicio}
            onChange={handleChange}
          />
          <input
            className="form-input"
            type="date"
            name="FechaFin"
            value={formData.FechaFin}
            onChange={handleChange}
          />
          <Button
            outline
            gradientDuoTone="purpleToPink"
            type="button"
            onClick={handleCreateProject}
          >
            Crear Proyecto
          </Button>
        </form>
      </div>
      <div className="ListProjectManagement">
        <span className="TitlePRojectManagement">Listado de Proyectos</span>
        <Table className="tableProjectManagement">
          <TableBody>
            {currentProjects.map((project) => (
              <TableRow key={project.ID}>
                <TableCell>{project.Nombre}</TableCell>
                <TableCell>{project.Descripcion}</TableCell>
                <TableCell>
                  {new Date(project.FechaInicio).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {new Date(project.FechaFin).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Button
                    outline
                    gradientDuoTone="purpleToBlue"
                    onClick={() => handleEditProject(project.ID)}
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

                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex overflow-x-auto sm:justify-center">
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
    </div>
  );
};

export default ProjectManagement;
