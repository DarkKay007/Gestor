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
import { GiWolfHowl } from "react-icons/gi";
const DashboardNav = () => {
    return (
        <div className="SideBar">
            <div className="icoSideBar"><GiWolfHowl /></div>
        
        <Link to={"/dashboard"} className="sidebar-link"><MdSpaceDashboard /></Link>
        <h3></h3>
        <Link to={"/dashboard/UserList"} className="sidebar-link"><PiUserListFill /></Link>
        <Link to={"/dashboard/UserFormPost"} className="sidebar-link"><FaUserPlus /></Link>
        <h3></h3>
        <Link to={"/dashboard/Projects"} className="sidebar-link"><RiTeamFill /></Link>
        <Link to={"/dashboard/ProjectsManagement"} className="sidebar-link"><GrProjects /></Link>
        <Link to={"/dashboard/tasks"} className="sidebar-link"><FaTasks /></Link>
        <Link to={"/dashboard/asignaciones"} className="sidebar-link"><MdAssignmentAdd /></Link>
        <h3></h3>
        <Link to={"/dashboard/calendar"} className="sidebar-link"><BsCalendar2CheckFill /></Link>
    </div>
    
    );
}

export default DashboardNav;