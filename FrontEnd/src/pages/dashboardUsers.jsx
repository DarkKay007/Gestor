// src/components/DashboardUsers.js
import React, { useState } from "react";
import { Modal, Button } from "flowbite-react";
import { IoSettings } from "react-icons/io5";
import NavLinks from "../components/nav-links";
import UserList from "../components/userList";
import useUserStore from "../store/userStore";
import "../styles/dashboard.css";

function DashboardUsers() {
  const [openAddUserModal, setOpenAddUserModal] = useState(false);
  const [newUser, setNewUser] = useState({
    user: "",
    name: "",
    password: "",
    email: "",
    rol: "Usuario",
  });
  const { createUser, fetchUserList } = useUserStore();

  const handleAddUser = async () => {
    await createUser(newUser);
    setOpenAddUserModal(false);
    fetchUserList(); 
  };

  return (
    <>
      <div className="container-dashboard">
        <div className="header-dashboard">
          <div className="ico-dashboard"></div>
          <h1>Usuarios</h1>
          <div className="settings-dashboard">
            <h1>
              <IoSettings />
            </h1>
          </div>
        </div>
        <div className="nav-dashboard">
          <NavLinks />
        </div>
        <div className="main-dashboard-settings">
          <button
            className="bg-yellow-500 w-48 h-6 rounded-xl text-gray-900"
            onClick={() => setOpenAddUserModal(true)}
          >
            Agregar Usuario
          </button>
        </div>
        <div className="main-dashboard">
          <div className="App">
            <UserList />
          </div>
        </div>
      </div>

      {/* Modal para Agregar Usuario */}
      <Modal
        show={openAddUserModal}
        size="md"
        onClose={() => setOpenAddUserModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <h3 className="mb-5 text-lg font-normal text-gray-900 dark:text-gray-900">
              Agregar Nuevo Usuario
            </h3>
            <div className="flex flex-col items-center gap-4">
              <input
                type="text"
                placeholder="Nombre de usuario"
                value={newUser.user}
                onChange={(e) =>
                  setNewUser({ ...newUser, user: e.target.value })
                }
                className="form-input mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-900 text-gray-900"
              />
              <input
                type="text"
                placeholder="Nombre"
                value={newUser.name}
                onChange={(e) =>
                  setNewUser({ ...newUser, name: e.target.value })
                }
                className="form-input mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-900 text-gray-900"
              />
              <input
                type="password"
                placeholder="Contraseña"
                value={newUser.password}
                onChange={(e) =>
                  setNewUser({ ...newUser, password: e.target.value })
                }
                className="form-input mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-900 text-gray-900"
              />
              <input
                type="email"
                placeholder="Email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
                className="form-input mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-900 text-gray-900"
              />
              <select
                value={newUser.rol}
                onChange={(e) =>
                  setNewUser({ ...newUser, rol: e.target.value })
                }
                className="form-select mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-900 text-gray-900"
              >
                <option value="Usuario">Usuario</option>
                <option value="Administrador">Administrador</option>
              </select>
              <Button
                onClick={handleAddUser}
                className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Agregar Usuario
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DashboardUsers;
