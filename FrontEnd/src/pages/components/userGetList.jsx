import React, { useState, useEffect } from 'react';
import DashboardNav from './dashboard-nav';
import UserListTable from '../../js/userlist';
import axios from "axios"
import Cookies from 'js-cookie';

const UserList = () => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const token = Cookies.get('token'); // Obtener el token de las cookies

        const response = await axios.get('http://localhost:666/api/usuario', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Incluir el token en el encabezado de autorización
          }
        });

        setUser(response.data);
      } catch (error) {
        console.error('Error fetching UserList:', error);
      }
    };

    fetchUserList();
  }, []);

  return (
    <div className="dashboard">
      <header className='dashboard-header'>
        <h1>Lista De Usuarios</h1>
      </header>
      <nav className='dashboard-nav'>
        <DashboardNav />
      </nav>
      <main className='dashboard-main'>
        <UserListTable userList={user} /> {/* Pasar user en lugar de UserList */}
      </main>
    </div>
  );
};

export default UserList;
