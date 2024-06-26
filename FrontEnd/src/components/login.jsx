import React, { useState, useEffect } from 'react';
import { FaHome } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { Button, Modal } from "flowbite-react";
import useAuthStore from '../store/authStore';
import useUserStore from '../store/userStore';
import "../styles/LoginPage.css";

const LoginForm = ({ onSubmit, setEmail, setPassword, email, password, error, message }) => (
  <div className='login-form-container'>
    <h2>Iniciar sesión en Kuro Gestor</h2>
    {error && <p className="error-message">{error}</p>}
    {message && <p className="error-message">{message}</p>}
    <form onSubmit={onSubmit}>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Correo Electrónico</label>
        <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Contraseña</label>
        <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div className="form-check mb-3">
        <input type="checkbox" className="form-check-input" id="rememberMe" />
        <label className="form-check-label" htmlFor="rememberMe">Recordarme</label>
      </div>
      <button type="submit" className="button-submit">Iniciar Sesión</button>
    </form>
  </div>
);

const RegisterForm = ({ onSubmit, setEmail, setPassword, email, password, error, message }) => (
  <div className='login-form-container'>
    <h2>Registrarse en Kuro Gestor</h2>
    {error && <p className="error-message">{error}</p>}
    {message && <p className="error-message">{message}</p>}
    <form onSubmit={onSubmit}>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Correo Electrónico</label>
        <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Contraseña</label>
        <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button type="submit" className="button-submit">Registrarse</button>
    </form>
  </div>
);

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const { isLoggedIn, login, logout, error: authError, message: authMessage, initializeAuth } = useAuthStore();
  const { fetchUserList } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    initializeAuth();
    if (isLoggedIn) {
      fetchUserList();
    }
  }, [isLoggedIn, initializeAuth, fetchUserList]);

  const handleSubmitLogin = async (event) => {
    event.preventDefault();
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError('Error al iniciar sesión. Por favor, intenta de nuevo.');
    }
  };

  const toggleRegister = () => {
    setIsRegistering(!isRegistering);
  };

  return (
    <div className="login-page">
      {!isLoggedIn ? (
        <div className='login-container-form'>
          {isRegistering ? (
            <RegisterForm
              onSubmit={handleSubmitLogin} // Cambiar por registro cuando esté listo
              setEmail={setEmail}
              setPassword={setPassword}
              email={email}
              password={password}
              error={authError}
              message={authMessage}
            />
          ) : (
            <LoginForm
              onSubmit={handleSubmitLogin}
              setEmail={setEmail}
              setPassword={setPassword}
              email={email}
              password={password}
              error={authError}
              message={authMessage}
            />
          )}
          <p className="mt-3">
            {isRegistering ? '¿Ya tienes una cuenta?' : '¿No tienes una cuenta?'}{' '}
            <span className="link" onClick={toggleRegister}>
              {isRegistering ? 'Iniciar Sesión' : 'Registrarse'}
            </span>
          </p>
        </div>
      ) : (
        <Modal show={isLoggedIn} size="md" onClose={() => logout()}>
          <Modal.Header>Bienvenido, Usuario!</Modal.Header>
          <Modal.Body>
            <div className="flex flex-col items-center">
              <Link to="/dashboard" className="button-link">
                <FaHome /> Ir al Panel de Control
              </Link>
              <Button outline gradientDuoTone="pinkToOrange" onClick={logout}>
                Cerrar Sesión
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      )}
      {authError && (
        <Modal show={!isLoggedIn} onClose={() => setError('')} size="md">
          <Modal.Header>Login Incorrecto</Modal.Header>
          <Modal.Body>
            <p>Tu sesión ha expirado o tus credenciales son incorrectas. Por favor, inicia sesión nuevamente.</p>
            <Button onClick={() => setError('')}>Cerrar</Button>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
}

export default Login;
