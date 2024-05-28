// Logout.jsx

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
    <div>
      <h2>Logout</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
