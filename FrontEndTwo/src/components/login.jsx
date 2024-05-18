import { FaHome } from "react-icons/fa";
import { Link } from "../routes/Links";
import React, { useState, useEffect } from 'react';
import { Button, Modal } from "flowbite-react";
import { useAuth } from '../context/authContext';
import { useUser } from '../context/userContext';
import "../styles/LoginPage.css";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { isLoggedIn, handleLogout } = useAuth();
  const { loginUser, message } = useUser();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      setShowModal(true);
    }
  }, [isLoggedIn]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await loginUser(email, password);
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError('Error al iniciar sesión. Por favor, intenta de nuevo.');
    }
  };

  return (
    <div className="login-container flex text-gray-800">
      <div className='login-container-form '>
        <h2>Iniciar sesión en Kuro Gestor</h2>
        {error && <p className="error-message text-gray-800">{error}</p>}
        {message && <p className="error-message text-gray-800">{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label ">Correo Electrónico</label>
            <input type="email" className="form-control text-gray-800" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Contraseña</label>
            <input type="password" className="form-control text-gray-800" id="exampleInputPassword1" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="form-check mb-3">
            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
            <label className="form-check-label" htmlFor="exampleCheck1">Recordarme</label>
          </div>
          <button type="submit" className="Button-Sing-In">Iniciar Sesión</button>
        </form>
      </div>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <h2>Login Incorrecto</h2>
        <p>Tu sesión ha expirado o tus credenciales son incorrectas. Por favor, inicia sesión nuevamente.</p>
      </Modal>
      {isLoggedIn && (
        <div className="login-container-form bg-gradient-to-br bg-gray-100">
          <h2>Bienvenido, Usuario!</h2>
          <Link
        to={"/dashboard"}
        className="sidebar-link px-4 py-2 text-2x2 text-yellow-400  border-t  border-b border-gray-200 hover:bg-gray-700 hover:text-red-700 focus:z-10 focus:ring-2 focus:ring-red-700 focus:text-red-700 "
      >
        <FaHome />
      </Link>
          <Button outline gradientDuoTone="pinkToOrange" onClick={handleLogout}>Cerrar Sesión</Button>
        </div>
      )}
    </div>
  );
}

export default Login;
