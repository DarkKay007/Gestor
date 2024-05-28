// Logout.jsx

import React from 'react';
import { unstable_HistoryRouter } from 'react-router-dom';
import useUserStore from '../store/userStore'; // Asegúrate de que la ruta sea correcta

const Logout = () => {
  const history = unstable_HistoryRouter();
  const logoutUser = useUserStore(state => state.logoutUser);

  const handleLogout = () => {
    logoutUser();
    history.push('/'); // Redirige al home después de cerrar sesión
  };

  return (
    <div>
      <h2>Logout</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
