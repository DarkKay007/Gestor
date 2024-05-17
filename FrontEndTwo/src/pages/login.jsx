import React, { useState } from 'react';
import { useUser } from '../components/UserProvider';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { loginUser, message } = useUser();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      await loginUser(email, password);
    };
  
    return (
      <div>
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Ingresar</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    );
  };
  
  export default Login;