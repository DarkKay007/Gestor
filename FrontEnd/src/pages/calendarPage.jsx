import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CalendarComponent from './components/calendar';
import DashboardNav from './components/dashboard-nav';

const CalendarPage = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get('http://localhost:666/api/projects');
                setProjects(response.data);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };

        fetchProjects();
    }, []);

    return (
        
        <div className="dashboard">
            <link rel="stylesheet" href="https://uicdn.toast.com/calendar/latest/toastui-calendar.min.css" />
            <script src="https://uicdn.toast.com/calendar/latest/toastui-calendar.min.js"></script>
            <header className='dashboard-header'>
                <h1>Kuro</h1>
            </header>
            <nav className='dashboard-nav'>
                <DashboardNav />
            </nav>
            <main className='dashboard-main'>
                <CalendarComponent projects={projects} />
            </main>
        </div>
    );
};

export default CalendarPage;
