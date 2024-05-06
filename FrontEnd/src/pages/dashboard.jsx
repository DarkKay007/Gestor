import React from 'react';
import { Link } from '../Links';
import '../styles/dashboard.css'
const Dashboard = () => {
    return (
        <div className="dashboard">
            <header>
                <h1>Kuro</h1>
            </header>
            <nav>
                <div>
                    <button><Link to="/dashboard/UserList">Lista de Usuarios</Link></button>
                    <button><Link to="/search">Buscar</Link></button>
                </div>
            </nav>
            <main>
               
            </main>
            <footer>
                <p>© 2024 Tu Compañía. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
}

export default Dashboard;
