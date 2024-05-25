import React from "react";
import ProjectComponent from "../components/projectStore";
import "../styles/projectShow.css";
import NavLinks from "../components/nav-links";
import { IoSettings } from "react-icons/io5";

import AddProjectButton from "../components/addProjectButton";
function DashboardProject() {



  return (
    <div className="container-dashboard">
    <div className="header-dashboard">
        <div className="ico-dashboard"></div>
        <h1>Proyectos</h1>
        <div className="settings-dashboard"><h1><IoSettings /></h1></div>
    </div>
    <div className="nav-dashboard">
        <NavLinks></NavLinks>
    </div>
    <div className="main-dashboard-settings">
      <AddProjectButton/>
    </div>
    <div className="main-dashboard">
    <div className="ContentProjectMAnagement">
    <ProjectComponent/>
    </div>
    </div>
</div>
  );
};

export default DashboardProject;
