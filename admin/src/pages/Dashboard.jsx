import React from 'react';
import Layout from '../components/Layout';
import {
    Users,
    Stethoscope,
    CalendarCheck,
    TrendingUp,
    Clock
} from 'lucide-react';

const Dashboard = () => {
    return (
        <Layout>
            <header style={{ marginBottom: '40px' }}>
                <h1 style={{ fontSize: '1.8rem' }}>Admin Overview</h1>
                <p style={{ color: 'var(--text-muted)' }}>Real-time statistics for Wellmaid Hospital Chain.</p>
            </header>

            <div className="card-grid">
                <div className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                        <div>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '10px' }}>Total Doctors</p>
                            <h2 style={{ fontSize: '2.5rem' }}>42</h2>
                        </div>
                        <div style={{ background: '#e6f0ff', color: 'var(--primary-blue)', padding: '10px', borderRadius: '12px' }}>
                            <Stethoscope size={24} />
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                        <div>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '10px' }}>Total Sessions</p>
                            <h2 style={{ fontSize: '2.5rem' }}>156</h2>
                        </div>
                        <div style={{ background: '#fff0e6', color: 'var(--cta-orange)', padding: '10px', borderRadius: '12px' }}>
                            <Clock size={24} />
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                        <div>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '10px' }}>Total Bookings</p>
                            <h2 style={{ fontSize: '2.5rem' }}>1,284</h2>
                        </div>
                        <div style={{ background: '#e6f4ea', color: '#1e7e34', padding: '10px', borderRadius: '12px' }}>
                            <TrendingUp size={24} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="card" style={{ marginTop: '30px', textAlign: 'left' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h3>Upcoming Sessions</h3>
                    <button style={{ color: 'var(--primary-blue)', background: 'none', border: 'none', fontWeight: '600', cursor: 'pointer' }}>View All</button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Doctor Name</th>
                            <th>Specialization</th>
                            <th>Date</th>
                            <th>Time Slot</th>
                            <th>Room</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Dr. Saman Perera</td>
                            <td>Cardiology</td>
                            <td>Oct 24, 2026</td>
                            <td>09:00 AM - 10:00 AM</td>
                            <td>Room 101</td>
                            <td><span style={{ padding: '4px 12px', background: '#e6f4ea', color: '#1e7e34', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '600' }}>Active</span></td>
                        </tr>
                        <tr>
                            <td>Dr. Nilmini Silva</td>
                            <td>General Physician</td>
                            <td>Oct 24, 2026</td>
                            <td>10:00 AM - 11:00 AM</td>
                            <td>Room 204</td>
                            <td><span style={{ padding: '4px 12px', background: '#e6f4ea', color: '#1e7e34', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '600' }}>Active</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Layout>
    );
};

export default Dashboard;
