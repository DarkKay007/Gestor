import React from 'react';
import DashboardNav from './components/dashboard-nav';
import "../styles/dashboard.css"
const Dashboard = () => {
    return (
        <div className="dashboard">
            <header className='dashboard-header'>
                <h1>Kuro</h1>
            </header>
            <nav className='dashboard-nav'>
                <DashboardNav />
            </nav>
            <main className='dashboard-main'>
                <h2>Bienvenido al Dashboard</h2>
                <img src="https://www.creativefabrica.com/wp-content/uploads/2021/09/29/Dashboard-Charts-Graphics-18046690-1-1-580x387.jpg" alt="" width={500}/>
                <p>Selecciona una opción del menú de navegación para comenzar.</p>
            </main>
        </div>
    );
}

export default Dashboard;
