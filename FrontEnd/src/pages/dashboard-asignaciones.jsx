import React from 'react';
import DashboardNav from './components/dashboard-nav';
import "../styles/dashboard.css"
import AssignmentTable from './components/asignaciones';
const DashboardAssignment = () => {
    return (
        <div className="dashboard">
            <header className='dashboard-header'>
                <h1>Asignaciones De Tareas</h1>
            </header>
            <nav className='dashboard-nav'>
                <DashboardNav />
            </nav>
            <main className='dashboard-main'>
              <AssignmentTable></AssignmentTable> 
            </main>
        </div>
    );
}

export default DashboardAssignment;
