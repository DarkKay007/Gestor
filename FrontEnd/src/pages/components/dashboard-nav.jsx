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



const DashboardNav = () => {
    return (
       <div className="SideBar">
        <Link to={"/"}><IoHome />Home</Link>
        <Link to={"/dashboard"}><MdSpaceDashboard />DashBoard</Link>
        <h3>Usuarios</h3>
        <Link to={"/dashboard/UserList"}><PiUserListFill />Lista de Usuarios</Link>
        <Link to={"/dashboard/UserFormPost"}><FaUserPlus />Agregar Usuarios</Link>
        <h3>Proyectos</h3>
        <Link to={"/dashboard/Projects"}><RiTeamFill />Proyectos</Link>
        <Link to={"/dashboard/tasks"}><FaTasks />Tareas</Link>
        <Link to={"/dashboard/asignaciones"}><MdAssignmentAdd />Asignaciones</Link>
        <h3>Calendario</h3>
        <Link to={"/dashboard/calendar"}><BsCalendar2CheckFill />Agenda</Link>
        
    </div>
    );
}

export default DashboardNav;