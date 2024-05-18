// src/components/ProfileCard.jsx
import React, { useState } from 'react';
import { Card, Dropdown, Button, Modal } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { useUser } from '../context/UserContext';

export function ProfileCard({ user }) {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openRoleModal, setOpenRoleModal] = useState(false);
  const [newRole, setNewRole] = useState(user.rol);
  const { deleteUser, updateUser } = useUser();

  const handleDelete = () => {
    deleteUser(user.id);
    setOpenDeleteModal(false);
  };

  const handleRoleChange = () => {
    updateUser(user.id, { ...user, rol: newRole });
    setOpenRoleModal(false);
  };

  return (
    <>
      <Card className="w-80 h-64 bg-yellow-400 rounded-xl hover:bg-yellow-200">
        <div className="flex justify-end px-20 pt-4 text-gray-900">
          <Dropdown inline label="">
            <Dropdown.Item onClick={() => setOpenRoleModal(true)}>
              Cambiar Rol
            </Dropdown.Item>
            <Dropdown.Item className="bg-red-700" onClick={() => setOpenDeleteModal(true)}>
              Eliminar
            </Dropdown.Item>
          </Dropdown>
        </div>
        <div className="flex flex-col items-center pb-10">
          <img
            alt={user.name}
            src="https://cdn-icons-png.freepik.com/256/4140/4140037.png?semt=ais_hybrid"
            className="mb-3 h-24 w-24 rounded-full shadow-lg"
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {user.name}
          </h5>
          <span className="text-sm text-gray-900 dark:text-gray-400">
            {user.email}
          </span>
          <span className="text-sm text-gray-900 dark:text-gray-400">
            {user.rol}
          </span>
        </div>
      </Card>

      {/* Modal para Eliminar */}
      <Modal show={openDeleteModal} size="md" onClose={() => setOpenDeleteModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              ¿Estás seguro que quieres eliminar este usuario?
            </h3>
            <div className="flex justify-center gap-4">
              <Button className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={handleDelete}>
                Sí, estoy seguro
              </Button>
              <Button className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900" onClick={() => setOpenDeleteModal(false)}>
                No, cancelar
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* Modal para Cambiar Rol */}
      <Modal show={openRoleModal} size="md" onClose={() => setOpenRoleModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <h3 className="mb-5 text-lg font-normal text-gray-900 dark:text-gray-900">
              Cambiar Rol de Usuario
            </h3>
            <div className="flex flex-col items-center gap-4">
              <select
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                className="form-select mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-900"
              >
                <option value="Usuario">Usuario</option>
                <option value="Administrador">Administrador</option>
              </select>
              <Button onClick={handleRoleChange} className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                Cambiar Rol
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
