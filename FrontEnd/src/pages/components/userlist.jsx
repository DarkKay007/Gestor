import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import "../../styles/userList.css";

import { Button } from "flowbite-react";

const UserListTable = ({ userList, updateUser, deleteUser }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Esto muestra solo la fecha en formato local
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = userList.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="overflow-x-auto">
      <Table className='userList-Table'>
        <TableHead>
          <TableHeadCell className='TableHeadCell'>ID</TableHeadCell>
          <TableHeadCell className='TableHeadCell'>Usuario</TableHeadCell>
          <TableHeadCell className='TableHeadCell'>Nombre</TableHeadCell>
          <TableHeadCell className='TableHeadCell'>Email</TableHeadCell>
          <TableHeadCell className='TableHeadCell'>Rol</TableHeadCell>
          <TableHeadCell className='TableHeadCell'>Fecha de Creación</TableHeadCell>
          <TableHeadCell className='TableHeadCell'>Acciones</TableHeadCell>
        </TableHead>
        <TableBody className="divide-y">
          {currentUsers.map(user => (
            <TableRow key={user.id} className="bg-white">
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.user}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.rol}</TableCell>
              <TableCell>{formatDate(user.date_create)}</TableCell>
              <TableCell>
                <Button outline gradientDuoTone="purpleToBlue"onClick={() => updateUser(user)}>Editar</Button>
                <Button outline gradientDuoTone="pinkToOrange" className='ButtonDelete' onClick={() => {
                  if (window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
                    deleteUser(user.id);
                  }
                }}>Eliminar</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="pagination">
        <Button gradientDuoTone="purpleToBlue" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Anterior</Button>
        <Button gradientDuoTone="purpleToBlue" onClick={() => paginate(currentPage + 1)} disabled={indexOfLastUser >= userList.length}>Siguiente</Button>
      </div>
    </div>
  );
};

export default UserListTable;
