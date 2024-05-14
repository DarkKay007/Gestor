import React from 'react';
import DashboardNav from './components/dashboard-nav';
import ProjectManagement from './components/ProjectManagement';
const DashboardProjectsManagement = () => {
    return (
        <div className="dashboard">
            <header className='dashboard-header'>
                <h1>Kuro</h1>
            </header>
            <nav className='dashboard-nav'>
                <DashboardNav />
            </nav>
            <main className='dashboard-main'>
               <ProjectManagement/>
            </main>
        </div>
    );
}

export default DashboardProjectsManagement;