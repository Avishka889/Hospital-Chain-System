import React from 'react';
import {
    LayoutDashboard,
    Stethoscope,
    CalendarClock,
    List,
    LogOut,
    UserPlus,
    ClipboardList
} from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';

const Layout = ({ children }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/login');
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#f0f2f5' }}>
            {/* Sidebar */}
            <div style={{ width: '280px', background: 'var(--text-dark)', color: '#fff', padding: '30px 20px', position: 'fixed', height: '100vh', zIndex: 100 }}>
                <h2 style={{ marginBottom: '40px', color: 'var(--cta-orange)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    Wellmaid Admin
                </h2>

                <nav style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <NavLink to="/dashboard" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                        <LayoutDashboard size={20} />
                        <span>Dashboard</span>
                    </NavLink>

                    <div style={{ margin: '15px 0 5px', fontSize: '0.75rem', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', fontWeight: '700' }}>Doctor Management</div>
                    <NavLink to="/add-doctor" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                        <UserPlus size={20} />
                        <span>Add Doctor</span>
                    </NavLink>

                    <NavLink to="/manage-doctors" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                        <Stethoscope size={20} />
                        <span>Manage Doctors</span>
                    </NavLink>

                    <div style={{ margin: '15px 0 5px', fontSize: '0.75rem', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', fontWeight: '700' }}>Session & Booking</div>
                    <NavLink to="/create-session" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                        <CalendarClock size={20} />
                        <span>Create Session</span>
                    </NavLink>

                    <NavLink to="/view-sessions" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                        <List size={20} />
                        <span>View Sessions</span>
                    </NavLink>

                    <NavLink to="/appointments" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                        <ClipboardList size={20} />
                        <span>Appointments</span>
                    </NavLink>

                    <div
                        onClick={handleLogout}
                        className="sidebar-link"
                        style={{ marginTop: 'auto', color: '#ff4d4d' }}
                    >
                        <LogOut size={20} />
                        <span>Logout</span>
                    </div>
                </nav>
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, padding: '40px', marginLeft: '280px' }}>
                {children}
            </div>
        </div >
    );
};

export default Layout;
