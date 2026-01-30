import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AddDoctor from './pages/AddDoctor';
import ManageDoctors from './pages/ManageDoctors';
import CreateSession from './pages/CreateSession';
import ViewSessions from './pages/ViewSessions';
import Appointments from './pages/Appointments';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-doctor" element={<AddDoctor />} />
        <Route path="/manage-doctors" element={<ManageDoctors />} />
        <Route path="/create-session" element={<CreateSession />} />
        <Route path="/view-sessions" element={<ViewSessions />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
