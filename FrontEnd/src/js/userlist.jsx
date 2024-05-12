import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import axios from "axios";

const UserListTable = ({ userList, updateUser, deleteUser }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Esto muestra solo la fecha en formato local
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHead>
          <TableHeadCell>ID</TableHeadCell>
          <TableHeadCell>Usuario</TableHeadCell>
          <TableHeadCell>Nombre</TableHeadCell>
          <TableHeadCell>Email</TableHeadCell>
          <TableHeadCell>Rol</TableHeadCell>
          <TableHeadCell>Fecha de Creación</TableHeadCell>
          <TableHeadCell>Acciones</TableHeadCell>
        </TableHead>
        <TableBody className="divide-y">
          {userList.map(user => (
            <TableRow key={user.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{user.id}</TableCell>
              <TableCell>{user.user}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.rol}</TableCell>
              <TableCell>{formatDate(user.date_create)}</TableCell>
              <TableCell>
                <button onClick={() => updateUser(user)}>Editar</button>
                <button onClick={() => deleteUser(user.id)}>Eliminar</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserListTable;
