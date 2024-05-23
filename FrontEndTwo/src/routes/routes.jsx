// src/AppRoutes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/pageLogin';
import Dashboard from '../pages/dashboard';
import DashboardUsers from '../pages/dashboardUsers';
import DashboardProject from '../pages/dashboardProjects';
import DashboardTask from '../pages/DashboardTask';
import Page404 from '../pages/404';
import ProjectComponent from '../components/projectStore';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/UserList" element={<DashboardUsers />} />
      <Route path="/dashboard/ProjectManagement" element={<DashboardProject />} />
      <Route path="/dashboard/Task" element={<DashboardTask />} />
      <Route path="/dashboard/ProjectManagement/ProjectStore" element={<ProjectComponent />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};

export default AppRoutes;
