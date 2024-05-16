import { FaHome } from "react-icons/fa";
import { PiUserListBold } from "react-icons/pi";
/**
 * ! Iconos
*/
import React from "react";
import { Link } from "../routes/Links"
import "../styles/navBar.css"
const NavLinks = () => {
    return (
        <div className="navBar-content">  
            <Link to={"/"} className="sidebar-link"><FaHome /></Link>
            <Link to={"/dashboard/UserList"} className="sidebar-link" ><PiUserListBold/></Link>
            
        </div>
    )}
    export default NavLinks