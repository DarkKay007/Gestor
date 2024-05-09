import React from 'react';
import DashboardNav from './components/dashboard-nav';
import '../styles/dashboard.css'
const DashboardUserGetList = () => {
    return (
        <div className="dashboard">
            <header className='dashboard-header'>
                <h1>Kuro</h1>
            </header>
            <nav className='dashboard-nav'>
                <DashboardNav />
            </nav>
            <main className='dashboard-main'>
               
            </main>
        </div>
    );
}

export default DashboardUserGetList;