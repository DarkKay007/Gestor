import { Link } from "react-router-dom";// Logout.jsx

import React from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "../store/userStore"; // Asegúrate de que la ruta sea correcta

const Logout = () => {
  const navigate = useNavigate(); // Usa useNavigate en lugar de useHistory
  const logoutUser = useUserStore((state) => state.logoutUser);

  const handleLogout = () => {
    logoutUser();
    navigate("/"); // Redirige al home después de cerrar sesión
  };

  return (
    <div className="">
      <div className="bg-yellow-400 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Cerrar sección</h2>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
        >
          Si, cerrar sección
        </button><br />
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"><Link to={"/dashboard"}>no, volver  al dashboard</Link></button>
      </div>
    </div>
  );
};

export default Logout;
