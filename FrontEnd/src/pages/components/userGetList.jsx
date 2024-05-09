import React, { useState, useEffect } from 'react';
import DashboardNav from './dashboard-nav';
import UserListTable from '../../js/userlist';
const UserList = () => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:666/api/usuario');
        if (!response.ok) {
          throw new Error('Error al obtener la lista de usuarios');
        }
        const data = await response.json();
        setUserList(data);
      } catch (error) {
        console.error('Error al obtener la lista de usuarios:', error);
      }
    };

    fetchData();
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
        <UserListTable userList={userList} />
      </main>
  </div>
    );
};

export default UserList;
