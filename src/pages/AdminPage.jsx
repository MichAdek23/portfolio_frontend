import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminDashboard from '../components/AdminDashboard';
import ProjectManager from '../components/ProjectManager';

const AdminPage = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/projects" element={<ProjectManager />} />
        {/* Add more routes for Blogs and Reviews */}
      </Routes>
    </div>
  );
};

export default AdminPage;
