import React from 'react';
import Login from '../components/login';
import '../styles/LoginPage.css'; // Importa el archivo de estilos CSS

const LoginPage = () => {
  return (
    <div className="login-page">
      <div className="login-form-container">
        <Login />
      </div>
    </div>
  );
};

export default LoginPage;
