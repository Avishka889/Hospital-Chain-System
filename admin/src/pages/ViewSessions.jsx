import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';

const ViewSessions = () => {
    const [sessions, setSessions] = useState([]);

    useEffect(() => {
        const storedSessions = JSON.parse(localStorage.getItem('sessions') || '[]');
        setSessions(storedSessions);
    }, []);

    return (
        <Layout>
            <header style={{ marginBottom: '40px' }}>
                <h1 style={{ fontSize: '1.8rem' }}>All Scheduled Sessions</h1>
                <p style={{ color: 'var(--text-muted)' }}>Monitor active and completed doctor sessions.</p>
            </header>

            <div className="card">
                {sessions.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Doctor Name</th>
                                <th>Specialization</th>
                                <th>Date</th>
                                <th>Time Slot</th>
                                <th>Room</th>
                                <th>Max Bookings</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sessions.map(session => (
                                <tr key={session.id}>
                                    <td>{session.doctorName}</td>
                                    <td>{session.specialization}</td>
                                    <td>{session.date}</td>
                                    <td>{session.timeSlot}</td>
                                    <td>{session.roomNumber}</td>
                                    <td>{session.maxBooking}</td>
                                    <td>
                                        <span style={{
                                            padding: '4px 12px',
                                            background: session.status === 'Active' ? '#e6f4ea' : '#eee',
                                            color: session.status === 'Active' ? '#1e7e34' : '#666',
                                            borderRadius: '20px',
                                            fontSize: '0.8rem',
                                            fontWeight: '600'
                                        }}>
                                            {session.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                        <p>No sessions scheduled yet.</p>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default ViewSessions;
