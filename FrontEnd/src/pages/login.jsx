import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Button } from "flowbite-react";
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false); 

    // Verificar el token al cargar el componente
    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogout = () => {
        // Eliminar la cookie de sesión
        Cookies.remove('token');
        // Actualizar el estado de isLoggedIn a falso
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
            console.log(data);

            if (response.ok) {
                setIsLoggedIn(true);
                
                Cookies.set('token', data.token, { expires: 1 });
            } else {
                setError(data.respuesta); 
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            setError('Error al iniciar sesión. Por favor, intenta de nuevo.');
        }
    };

    
    if (isLoggedIn) {
        return (
            <div className="login-container">
            <div className="login-container-form">
                <h2>Bienvenido, Usuario!</h2>
                <Button outline gradientDuoTone="pinkToOrange" onClick={handleLogout}>Cerrar Sesión</Button>
            </div>
            </div>
        );
    }

    
    return (
        <div className="login-container">
           <div className='login-container-form'>
           <button className="link-button">
</button>
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
        </div>
    );
}

export default Login;
