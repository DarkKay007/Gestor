import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import "../../styles/userList.css";
import { Button } from "flowbite-react";
import { DeleteModal } from "./DeleteModal"; // Importa el componente DeleteModal
import { FaUserShield } from "react-icons/fa";
const UserListTable = ({ userList, updateUser, deleteUser }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Formatea la fecha
  };

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Estado para manejar el modal de eliminación
  const [selectedUserId, setSelectedUserId] = useState(null); // Estado para almacenar el ID del usuario seleccionado
  const [selectedUserRole, setSelectedUserRole] = useState(""); // Estado para almacenar el rol seleccionado

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = userList.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDeleteUser = (userId) => {
    deleteUser(userId);
    setIsDeleteModalOpen(false); // Cierra el modal de eliminación después de eliminar
  };

  // Dentro del componente UserListTable
  const handleRoleChange = async (userId, newRole) => {
    try {
      // Aquí puedes realizar la lógica para actualizar el rol del usuario
      const updatedUser = {
        ...userList.find((user) => user.id === userId),
        rol: newRole,
      };
      await updateUser(userId, updatedUser);
      setSelectedUserId(null); // Reinicia el estado del usuario seleccionado
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  return (
    <div className="overflow-x-auto">
      <Table className="userList-Table">
        <TableHead>
          <TableHeadCell className="TableHeadCell">ID</TableHeadCell>
          <TableHeadCell className="TableHeadCell">Usuario</TableHeadCell>
          <TableHeadCell className="TableHeadCell">Nombre</TableHeadCell>
          <TableHeadCell className="TableHeadCell">Email</TableHeadCell>
          <TableHeadCell className="TableHeadCell">Rol</TableHeadCell>
          <TableHeadCell className="TableHeadCell">
            Fecha de Creación
          </TableHeadCell>
          <TableHeadCell className="TableHeadCell">Acciones</TableHeadCell>
        </TableHead>
        <TableBody className="divide-y">
          {currentUsers.map((user) => (
            <TableRow key={user.id} className="bg-white">
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.user}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell >
                {/* Si el usuario está seleccionado, muestra el menú desplegable para cambiar el rol */}
                {selectedUserId === user.id ? (
                  <select
                    value={selectedUserRole}
                    onChange={(e) => setSelectedUserRole(e.target.value)}
                    onBlur={() => handleRoleChange(user.id, selectedUserRole)} // ¡No olvides pasar el nuevo rol!
                  >
                    <option value="" disabled>
                      Seleccionar Rol 
                    </option>
                    <option value="Administrador">Administrador</option>
                    <option value="Usuario">Usuario</option>
                  </select>
                ) : (
                  // Si el usuario no está seleccionado, muestra el rol como un botón
                  <Button className="ButtonManagementRol" gradientMonochrome="teal" onClick={() => setSelectedUserId(user.id)}>
                    <FaUserShield />{user.rol}
                  </Button>
                )}
              </TableCell>
              <TableCell>{formatDate(user.date_create)}</TableCell>
              <TableCell>
                {/* Botón de eliminación */}
                <Button
                  outline
                  gradientDuoTone="pinkToOrange"
                  className="ButtonDelete"
                  onClick={() => setIsDeleteModalOpen(true)}
                >
                  Eliminar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="pagination">
        <Button
          gradientDuoTone="purpleToBlue"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </Button>
        <Button
          gradientDuoTone="purpleToBlue"
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastUser >= userList.length}
        >
          Siguiente
        </Button>
      </div>

      {/* Renderiza el componente DeleteModal */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={() => handleDeleteUser(selectedUserId)} // Pasa la función de eliminación aquí
      />
    </div>
  );
};

export default UserListTable;
