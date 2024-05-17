import { FaHome } from "react-icons/fa";
import { PiUserListBold } from "react-icons/pi";
import { GrProjects } from "react-icons/gr";
/**
 * ! Iconos
 */
import React from "react";
import { Link } from "../routes/Links";
import "../styles/navBar.css";
const NavLinks = () => {
  return (
    <div className="navBar-content">
      <Link
        to={"/"}
        className="sidebar-link px-4 py-2 text-2x2 text-yellow-400  border-t border-l border-b border-gray-200 hover:bg-gray-700 hover:text-red-700 focus:z-10 focus:ring-2 focus:ring-red-700 focus:text-red-700 "
      >
        <FaHome />
      </Link>
      <Link
        to={"/dashboard/UserList"}
        className="sidebar-link px-4 py-2 text-2x2  text-yellow-400  border-t border-b border-gray-200 hover:bg-gray-700 hover:text-red-700 focus:z-10 focus:ring-2 focus:ring-red-700 focus:text-red-700 "
      >
        <PiUserListBold />
      </Link>
      <Link
        to={"/dashboard/ProjectManagement"}
        className="sidebar-link px-4 py-2 text-2x2  text-yellow-400  border-t border-b border-gray-200 hover:bg-gray-700 hover:text-red-700 focus:z-10 focus:ring-2 focus:ring-red-700 focus:text-red-700 "
      >
        <GrProjects />
      </Link>
    </div>
  );
};
export default NavLinks;
