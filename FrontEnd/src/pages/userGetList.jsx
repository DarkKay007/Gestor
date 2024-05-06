import React, { useState, useEffect } from 'react';
import { Link } from '../Links';
import UserListTable from '../js/userlist';
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
        <header>
            <h1>Kuro</h1>
        </header>
        <nav>
            <div>
                <button><Link to="/dashboard">Atrás</Link></button>
                <button><Link to="/">Home</Link></button>   
                <button><Link to="/dashboard/UserList">Lista de Usuarios</Link></button>
            </div>
        </nav>
        <main>
        <div className="userList-container">
        <h2>Lista de Usuarios</h2>
        <UserListTable userList={userList} />
        </div>
        </main>
        <footer>
            <p>© 2024 Tu Compañía. Todos los derechos reservados.</p>
        </footer>
    </div>
    );
};

export default UserList;
