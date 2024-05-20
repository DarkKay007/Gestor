import React, { useState } from "react";
import { Button, Modal } from "flowbite-react";
import axios from "axios";

const ProjectForm = ({ token, onProjectCreated }) => {
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    Nombre: "",
    Descripcion: "",
    FechaInicio: "",
    FechaFin: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateProject = async () => {
    try {
      await axios.post("http://localhost:666/api/projects", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      onProjectCreated();
      setFormData({
        Nombre: "",
        Descripcion: "",
        FechaInicio: "",
        FechaFin: "",
      });
      setOpenModal(false); // Cerrar el modal después de crear el proyecto
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  return (
    <div>
      <Button onClick={() => setOpenModal(true)} className="bg-green-700">
        Crear Proyecto
      </Button>

      <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="FormProjectManagement">
            <form className="form-container flex flex-col space-y-4">
              <span className="text-gray-900 text-center">Crear un nuevo proyecto</span>
              <input
                className="form-input text-gray-700"
                type="text"
                name="Nombre"
                placeholder="Nombre del proyecto"
                value={formData.Nombre}
                onChange={handleChange}
              />
              <input
                className="form-input text-gray-700"
                type="text"
                name="Descripcion"
                placeholder="Descripción del proyecto"
                value={formData.Descripcion}
                onChange={handleChange}
              />
              <input
                className="form-input text-gray-700"
                type="date"
                name="FechaInicio"
                value={formData.FechaInicio}
                onChange={handleChange}
              />
              <input
                className="form-input text-gray-700"
                type="date"
                name="FechaFin"
                value={formData.FechaFin}
                onChange={handleChange}
              />
              <Button
                className="bg-green-700"
                type="button"
                onClick={handleCreateProject}
              >
                Crear Proyecto
              </Button>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ProjectForm;
