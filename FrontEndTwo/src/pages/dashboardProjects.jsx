import React, { useState, useEffect } from "react";
import axios from "axios";
import ProjectForm from "../components/ProjectForm";
import ProjectList from "../components/ProjectList";
import "../styles/projectShow.css";
import NavLinks from "../components/nav-links";
import { IoSettings } from "react-icons/io5";
const DashboardProject = ({ token }) => {
  const [projects, setProjects] = useState([]);

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

  const handleProjectCreated = async () => {
    const updatedProjects = await fetchProjects(token);
    setProjects(updatedProjects);
  };

  const handleProjectDeleted = async () => {
    const updatedProjects = await fetchProjects(token);
    setProjects(updatedProjects);
  };

  const handleProjectUpdated = async (projectId) => {
    // Lógica para editar un proyecto
  };

  return (
    <div className="container-dashboard">
    <div className="header-dashboard">
        <div className="ico-dashboard"></div>
        <h1>Home    </h1>
        <div className="settings-dashboard"><h1><IoSettings /></h1></div>
    </div>
    <div className="nav-dashboard">
        <NavLinks></NavLinks>
    </div>
    <div className="main-dashboard">
    <div className="ContentProjectMAnagement">
      <ProjectForm token={token} onProjectCreated={handleProjectCreated} />
      <ProjectList
        projects={projects}
        token={token}
        onProjectDeleted={handleProjectDeleted}
        onProjectUpdated={handleProjectUpdated}
      />
    </div>
    </div>
</div>
  );
};

export default DashboardProject;
