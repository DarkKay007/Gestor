import React from "react";
import { Link } from "./Links";
import "../../styles/sidebar.css"

/**
 * ! Iconos Mover Después
 */
import { IoHome } from "react-icons/io5";
import { RiTeamFill } from "react-icons/ri";
import { MdSpaceDashboard, MdAssignmentAdd } from "react-icons/md";
import { PiUserListFill } from "react-icons/pi";
import { FaUserPlus } from "react-icons/fa6";
import { BsCalendar2CheckFill } from "react-icons/bs";
import { FaTasks } from "react-icons/fa";
import { GrProjects } from "react-icons/gr";
const DashboardNav = () => {
    return (
        <div className="SideBar">
        <Link to={"/"} className="sidebar-link"><IoHome />Home</Link>
        <Link to={"/dashboard"} className="sidebar-link"><MdSpaceDashboard />DashBoard</Link>
        <h3>Usuarios</h3>
        <Link to={"/dashboard/UserList"} className="sidebar-link"><PiUserListFill />Lista de Usuarios</Link>
        <Link to={"/dashboard/UserFormPost"} className="sidebar-link"><FaUserPlus />Agregar Usuarios</Link>
        <h3>Proyectos</h3>
        <Link to={"/dashboard/Projects"} className="sidebar-link"><RiTeamFill />Proyectos</Link>
        <Link to={"/dashboard/tasks"} className="sidebar-link"><FaTasks />Tareas</Link>
        <Link to={"/dashboard/asignaciones"} className="sidebar-link"><MdAssignmentAdd />Asignaciones</Link>
        <Link to={"/dashboard/ProjectsManagement"} className="sidebar-link"><GrProjects />Administrar</Link>
        <h3>Calendario</h3>
        <Link to={"/dashboard/calendar"} className="sidebar-link"><BsCalendar2CheckFill />Agenda</Link>
    </div>
    
    );
}

export default DashboardNav;