import React, { useState } from "react";
import { Button } from "flowbite-react";
import axios from "axios";

const ProjectForm = ({ token, onProjectCreated }) => {
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
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  return (
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
  );
};

export default ProjectForm;
