import React, { useState, useEffect } from 'react';
import DashboardNav from './dashboard-nav';
import UserListTable from './userlist';
import axios from "axios"
import Cookies from 'js-cookie';

const UserList = () => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const token = Cookies.get('token');

        const response = await axios.get('http://localhost:666/api/usuario', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
          }
        });

        setUserList(response.data);
      } catch (error) {
        console.error('Error fetching UserList:', error);
      }
    };

    fetchUserList();
  }, []);

  const updateUser = async (id, updatedUser) => {
    try {
      const token = Cookies.get('token');

      const response = await axios.put(`http://localhost:666/api/usuario/${id}`, updatedUser, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        }
      });

      const updatedUserList = userList.map(user => user.id === id ? response.data : user);
      setUserList(updatedUserList);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const deleteUser = async (id) => {
    try {
      const token = Cookies.get('token');
  
      await axios.delete(`http://localhost:666/api/usuario/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        }
      });
  
      // Create a new array with the updated user list
      const updatedUserList = [...userList].filter(user => user.id!== id);
      setUserList(updatedUserList);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  return (
    <div className="dashboard">
      <header className='dashboard-header'>
        <h1>Lista De Usuarios</h1>
      </header>
      <nav className='dashboard-nav'>
        <DashboardNav />
      </nav>
      <main className='dashboard-main'>
        <UserListTable userList={userList} updateUser={updateUser} deleteUser={deleteUser} />
      </main>
    </div>
  );
};

export default UserList;
