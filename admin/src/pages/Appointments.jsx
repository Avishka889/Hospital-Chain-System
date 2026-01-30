import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { Search } from 'lucide-react';

const Appointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [filter, setFilter] = useState({ doctor: '', date: '', status: '' });

    useEffect(() => {
        // Generate some mock appointments
        const mockData = [
            { id: 1, patient: 'Kamal Perera', doctor: 'Dr. Saman Perera', date: '2026-02-15', slot: '09:00 AM - 09:15 AM', room: '101', status: 'Confirmed' },
            { id: 2, patient: 'Nimal Silva', doctor: 'Dr. Nilmini Silva', date: '2026-02-15', slot: '10:00 AM - 10:15 AM', room: '204', status: 'Pending' },
            { id: 3, patient: 'Sarath Fonseka', doctor: 'Dr. Saman Perera', date: '2026-02-16', slot: '09:15 AM - 09:30 AM', room: '101', status: 'Completed' },
        ];
        setAppointments(mockData);
    }, []);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilter({ ...filter, [name]: value });
    };

    const filteredData = appointments.filter(app => {
        return (
            (filter.doctor === '' || app.doctor.toLowerCase().includes(filter.doctor.toLowerCase())) &&
            (filter.date === '' || app.date === filter.date) &&
            (filter.status === '' || app.status === filter.status)
        );
    });

    return (
        <Layout>
            <header style={{ marginBottom: '40px' }}>
                <h1 style={{ fontSize: '1.8rem' }}>Appointments</h1>
                <p style={{ color: 'var(--text-muted)' }}>Manage and monitor patient bookings.</p>
            </header>

            <div className="card" style={{ marginBottom: '30px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', alignItems: 'flex-end' }}>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                        <label>Filter by Doctor</label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type="text"
                                name="doctor"
                                placeholder="Search name..."
                                className="form-control"
                                value={filter.doctor}
                                onChange={handleFilterChange}
                                style={{ paddingLeft: '40px' }}
                            />
                            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#6B778C' }} />
                        </div>
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                        <label>Date</label>
                        <input
                            type="date"
                            name="date"
                            className="form-control"
                            value={filter.date}
                            onChange={handleFilterChange}
                        />
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                        <label>Status</label>
                        <select name="status" className="form-control" value={filter.status} onChange={handleFilterChange}>
                            <option value="">All Statuses</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Pending">Pending</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="card">
                <table>
                    <thead>
                        <tr>
                            <th>Patient Name</th>
                            <th>Doctor Name</th>
                            <th>Date</th>
                            <th>Time Slot</th>
                            <th>Room</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map(app => (
                            <tr key={app.id}>
                                <td style={{ fontWeight: '600' }}>{app.patient}</td>
                                <td>{app.doctor}</td>
                                <td>{app.date}</td>
                                <td>{app.slot}</td>
                                <td>{app.room}</td>
                                <td>
                                    <span className={`badge-${app.status === 'Completed' ? 'active' : app.status === 'Pending' ? 'orange' : 'primary'}`} style={{
                                        background: app.status === 'Confirmed' ? '#e6f0ff' : '',
                                        color: app.status === 'Confirmed' ? 'var(--primary-blue)' : ''
                                    }}>
                                        {app.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                        {filteredData.length === 0 && (
                            <tr>
                                <td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                                    No appointments match your filters.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
};

export default Appointments;
