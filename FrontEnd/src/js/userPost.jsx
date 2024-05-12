import React, { useState } from "react";
import DashboardNav from "../pages/components/dashboard-nav";
import Cookies from 'js-cookie';

const CreateUserForm = () => {
  const [user, setUser] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [rol, setRol] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const token = Cookies.get('token');
        if (!token) {
          throw new Error('No se encontró un token en las cookies');
        }
      const response = await fetch("http://localhost:666/api/usuario", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ user, name, password, email, rol }),
      });

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error("Usuario Creado Con éxito:", error);
      setMessage("Error al crear usuario. Por favor, intenta de nuevo.");
    }
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Crear Usuario</h1>
      </header>
      <nav className="dashboard-nav">
        <DashboardNav />
      </nav>
      <main className="dashboard-main">
        {message && <p>{message}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="user">UserName:</label>
            <input
              type="text"
              id="user"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="name">Nombre:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="rol">Rol:</label>
            <select
              id="rol"
              value={rol}
              onChange={(e) => setRol(e.target.value)}
              required
            >
              <option value="Usuario">Usuario</option>
              <option value="Administrador">Administrador</option>
            </select>
          </div>

          <button type="submit">Crear Usuario</button>
        </form>
      </main>
    </div>
  );
};

export default CreateUserForm;
