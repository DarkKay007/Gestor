import React from 'react';
import DashboardNav from './components/dashboard-nav';
import "../styles/dashboard.css";
import ProjectComponent from './components/projectShow'

const DashboardProjectShow = () => {
    return (
        <div className="dashboard">
            <nav className='dashboard-nav'>
                <DashboardNav />
            </nav>
            <main className='dashboard-main-projectsShow'>
                <ProjectComponent />
            </main>
        </div>
    );
}

export default DashboardProjectShow;
