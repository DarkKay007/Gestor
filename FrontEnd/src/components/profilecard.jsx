// src/components/ProfileCard.js
import React, { useState } from 'react';
import { Card, Dropdown, Button, Modal } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import useUserStore from '../store/userStore';

export function ProfileCard({ user }) {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openRoleModal, setOpenRoleModal] = useState(false);
  const [newRole, setNewRole] = useState(user.rol);
  const { deleteUser, updateUser } = useUserStore();

  const handleDelete = () => {
    deleteUser(user._id);
    setOpenDeleteModal(false);
  };

  const handleRoleChange = () => {
    updateUser(user._id, { ...user, rol: newRole });
    setOpenRoleModal(false);
  };

  return (
    <>
      <Card className="w-80 h-74 bg-yellow-400 rounded-xl hover:bg-yellow-200">
        <Button className=" w-12 bg-yellow-700 text-gray-900">
          <Dropdown inline label="">
            <Dropdown.Item onClick={() => setOpenRoleModal(true)}>
              Cambiar Rol
            </Dropdown.Item>
            <Dropdown.Item className="bg-red-700" onClick={() => setOpenDeleteModal(true)}>
              Eliminar
            </Dropdown.Item>
          </Dropdown>
        </Button>
        
        <div className="flex flex-col items-center pb-10">
          <img
            alt={user.name}
            src={`https://unavatar.io/github/${user.user}`}
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
                className="form-select mt-1 block w-full py-2 px-3 border text-gray-900 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-900"
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
