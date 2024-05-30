// src/AppRoutes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/pageLogin';
import Dashboard from '../pages/dashboard';
import DashboardUsers from '../pages/dashboardUsers';
import DashboardProject from '../pages/dashboardProjects';
import DashboardTask from '../pages/DashboardTask';
import Page404 from '../pages/404';
import DashboardAssignment from '../pages/dashboardAssignment';
import Profile from '../pages/profile';


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/UserList" element={<DashboardUsers />} />
      <Route path="/dashboard/ProjectManagement" element={<DashboardProject />} />
      <Route path="/dashboard/Task" element={<DashboardTask />} />
      <Route path="/dashboard/Assignment" element={<DashboardAssignment />} />
      
      <Route path="/logout" element={<Profile/>} />

      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};

export default AppRoutes;
