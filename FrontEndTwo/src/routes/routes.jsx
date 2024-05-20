import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/pageLogin';
import Dashboard from '../pages/dashboard';
import DashboardUsers from '../pages/dashboardUsers';
import DashboardProject from '../pages/dashboardProjects';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/UserList" element={<DashboardUsers />} />
      <Route path="/dashboard/ProjectManagement" element={<DashboardProject />} />
    </Routes>
  );
};

export default AppRoutes;
