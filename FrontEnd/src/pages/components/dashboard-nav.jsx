import React from "react";
import { Link } from "./Links";

function DashboardNav() {
    return (
        <div>
            <button><Link to={"/"}>Home</Link></button>
            <button><Link to={"/dashboard"}>DashBoard</Link></button>
            <button><Link to={"/dashboard/UserList"}>Lista de Usuarios</Link></button>
            <button><Link to={"/dashboard/UserFormPost"}>Agregar Usuarios</Link></button>
            <button><Link to={"/search"}>Buscar</Link></button>
            <button><Link to={"/dashboard/Projects"}>ShowProjects</Link></button>
            <button><Link to={"/dashboard/calendar"}>Calendar</Link></button>
        </div>
    );
}

export default DashboardNav;
