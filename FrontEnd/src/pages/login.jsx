import React, { useState } from 'react';
import { Link } from './components/Links';
import Cookies from 'js-cookie';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para controlar si el usuario está autenticado

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
            console.log(data);

            if (response.ok) {
                setIsLoggedIn(true);
                // Guardar el token en las cookies con una fecha de caducidad
                Cookies.set('token', data.token, { expires: 1 });
            } else {
                setError(data.respuesta); // Mostrar el mensaje de error recibido del servidor
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            setError('Error al iniciar sesión. Por favor, intenta de nuevo.');
        }
    };

    // Si el usuario está autenticado, renderiza un mensaje de bienvenida en lugar del formulario de inicio de sesión
    if (isLoggedIn) {
        return (
            <div className="login-container">
                <h2>Bienvenido, Usuario!</h2>
                <button><Link to={'/dashboard'}>Ingresar A Kuro</Link></button>
            </div>
        );
    }

    // Si el usuario no está autenticado, renderiza el formulario de inicio de sesión
    return (
        <div className="login-container">
            <button><Link to="/">Home</Link></button>
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
    );
}

export default Login;
