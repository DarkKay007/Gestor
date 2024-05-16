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
      <Card className="max-w-sm">
        <div className="flex justify-end px-4 pt-4 text-gray-700">
          <Dropdown inline label="">
            <Dropdown.Item onClick={() => setOpenRoleModal(true)}>
              Cambiar Rol
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setOpenDeleteModal(true)}>
              Eliminar
            </Dropdown.Item>
          </Dropdown>
        </div>
        <div className="flex flex-col items-center pb-10">
          <img
            alt={user.name}
            src={"https://esports.as.com/2020/01/07/Vegetta.png?hash=619afe072e4d1934a50f2e7fd1c0911b51a74e2c"}
            className="mb-3 h-24 w-24 rounded-full shadow-lg"
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {user.name}
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {user.email}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
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
              <Button color="failure" onClick={handleDelete}>
                Sí, estoy seguro
              </Button>
              <Button color="gray" onClick={() => setOpenDeleteModal(false)}>
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
                className="form-select mt-1 block w-full py-2 px-3 border border-gray-300  rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-900"
              >
                <option value="Usuario">Usuario</option>
                <option value="Administrador">Administrador</option>
              </select>
              <Button onClick={handleRoleChange}>
                Cambiar Rol
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}