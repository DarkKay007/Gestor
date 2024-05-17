import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Button, Modal } from "flowbite-react";
import "../styles/login.css";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            setIsLoggedIn(true);
        } else {
            setShowModal(true);
        }
    }, []);

    const handleLogout = () => {
        Cookies.remove('token');
        setIsLoggedIn(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:666/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                setIsLoggedIn(true);
            } else {
                setError(data.respuesta); // Mostrar mensaje de error del servidor
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            setError('Error al iniciar sesión. Por favor, intenta de nuevo.');
        }
    };

    return (
        <div className="login-container">
            <div className='login-container-form'>
                <h2>Iniciar sesión en Kuro Gestor</h2>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Correo Electrónico</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Contraseña</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(e) => setPassword(e.target.value)} />
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
                <div className="login-container-form">
                    <h2>Bienvenido, Usuario!</h2>
                    <Button outline gradientDuoTone="pinkToOrange" onClick={handleLogout}>Cerrar Sesión</Button>
                </div>
            )}
        </div>
    );
}

export default Login;
