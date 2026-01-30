import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Modal from '../components/Modal';
import { useNavigate } from 'react-router-dom';

const CreateSession = () => {
    const navigate = useNavigate();
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [formData, setFormData] = useState({
        doctorId: '',
        date: '',
        startTime: '',
        timePerPatient: 15,
        maxPatients: 10,
        roomNumber: ''
    });

    const [sessionInfo, setSessionInfo] = useState({
        endTime: '',
        totalDuration: 0,
        slots: []
    });

    const [modalConfig, setModalConfig] = useState({ isOpen: false, title: '', message: '', actions: [] });

    useEffect(() => {
        const storedDoctors = JSON.parse(localStorage.getItem('doctors') || '[]');
        setDoctors(storedDoctors.filter(d => d.status === 'Active'));
    }, []);

    const handleDoctorChange = (e) => {
        const docId = e.target.value;
        const doc = doctors.find(d => d.id.toString() === docId);
        setSelectedDoctor(doc);
        setFormData({ ...formData, doctorId: docId, roomNumber: doc ? doc.roomNumber || '' : '' });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    useEffect(() => {
        if (formData.startTime && formData.timePerPatient && formData.maxPatients) {
            calculateSession();
        }
    }, [formData.startTime, formData.timePerPatient, formData.maxPatients]);

    const calculateSession = () => {
        const totalDuration = formData.timePerPatient * formData.maxPatients;

        // Calculate End Time
        const [hours, minutes] = formData.startTime.split(':').map(Number);
        const startObj = new Date();
        startObj.setHours(hours, minutes, 0);

        const endObj = new Date(startObj.getTime() + totalDuration * 60000);
        const endTime = endObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        // Generate Slots
        const slots = [];
        for (let i = 0; i < formData.maxPatients; i++) {
            const slotStart = new Date(startObj.getTime() + i * formData.timePerPatient * 60000);
            const slotEnd = new Date(slotStart.getTime() + formData.timePerPatient * 60000);
            slots.push(`${slotStart.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${slotEnd.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`);
        }

        setSessionInfo({
            totalDuration: `${Math.floor(totalDuration / 60)}h ${totalDuration % 60}m`,
            endTime,
            slots
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedDoctor) return;

        const session = {
            ...formData,
            ...sessionInfo,
            id: Date.now(),
            doctorName: selectedDoctor.fullName,
            specialization: selectedDoctor.specialization,
            status: 'Active'
        };

        const existingSessions = JSON.parse(localStorage.getItem('sessions') || '[]');
        localStorage.setItem('sessions', JSON.stringify([...existingSessions, session]));

        setModalConfig({
            isOpen: true,
            title: '✅ Doctor session created successfully!',
            message: `Doctor: ${selectedDoctor.fullName}\nDate: ${formData.date}\nTime: ${formData.startTime} – ${sessionInfo.endTime}\nMax Patients: ${formData.maxPatients}\nRoom: ${formData.roomNumber}`,
            actions: [
                { label: 'View Sessions', type: 'primary', onClick: () => navigate('/view-sessions') },
                { label: 'Create Another', type: 'outline', onClick: () => setModalConfig({ ...modalConfig, isOpen: false }) }
            ]
        });

        // Mock Email Popup
        setTimeout(() => {
            alert(`📧 Session details emailed to doctor successfully at ${selectedDoctor.email}`);
        }, 500);
    };

    return (
        <Layout>
            <header style={{ marginBottom: '40px' }}>
                <h1 style={{ fontSize: '1.8rem' }}>Create Doctor Session</h1>
                <p style={{ color: 'var(--text-muted)' }}>Set up a new consultation session with automatic slot generation.</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '30px', alignItems: 'flex-start' }}>
                <div className="card">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Select Doctor</label>
                            <select name="doctorId" className="form-control" onChange={handleDoctorChange} required>
                                <option value="">-- Choose Active Doctor --</option>
                                {doctors.map(doc => <option key={doc.id} value={doc.id}>{doc.fullName} ({doc.specialization})</option>)}
                            </select>
                        </div>

                        {selectedDoctor && (
                            <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '8px', marginBottom: '20px', fontSize: '0.9rem' }}>
                                <p style={{ color: 'var(--primary-blue)', fontWeight: '600', marginBottom: '5px' }}>Doctor Info:</p>
                                <p><strong>Email:</strong> {selectedDoctor.email}</p>
                                <p><strong>Career:</strong> {selectedDoctor.careerDesc.substring(0, 100)}...</p>
                            </div>
                        )}

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div className="form-group">
                                <label>Select Date</label>
                                <input type="date" name="date" className="form-control" onChange={handleInputChange} required />
                            </div>
                            <div className="form-group">
                                <label>Session Start Time</label>
                                <input type="time" name="startTime" className="form-control" onChange={handleInputChange} required />
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
                            <div className="form-group">
                                <label>Time per patient (min)</label>
                                <input type="number" name="timePerPatient" className="form-control" value={formData.timePerPatient} onChange={handleInputChange} required />
                            </div>
                            <div className="form-group">
                                <label>Max Patients</label>
                                <input type="number" name="maxPatients" className="form-control" value={formData.maxPatients} onChange={handleInputChange} required />
                            </div>
                            <div className="form-group">
                                <label>Room Number</label>
                                <input type="text" name="roomNumber" className="form-control" value={formData.roomNumber} onChange={handleInputChange} required />
                            </div>
                        </div>

                        <button type="submit" className="btn btn-orange" style={{ marginTop: '20px', width: '100%', justifyContent: 'center' }}>Create Session</button>
                    </form>
                </div>

                <div className="card">
                    <h3 style={{ marginBottom: '20px', fontSize: '1.1rem' }}>Session Preview</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <div>
                            <p className="info-label">End Time (Auto)</p>
                            <p className="info-value" style={{ fontWeight: '700', color: 'var(--primary-blue)', fontSize: '1.2rem' }}>{sessionInfo.endTime || '--:--'}</p>
                        </div>
                        <div>
                            <p className="info-label">Total Duration</p>
                            <p className="info-value">{sessionInfo.totalDuration || '0'}</p>
                        </div>
                    </div>

                    <p className="info-label" style={{ marginTop: '10px' }}>Generated Slots ({sessionInfo.slots.length})</p>
                    <div style={{ maxHeight: '300px', overflowY: 'auto', paddingRight: '10px' }}>
                        {sessionInfo.slots.map((slot, i) => (
                            <div key={i} className="slot-item" style={{ marginBottom: '8px' }}>Slot {i + 1}: {slot}</div>
                        ))}
                        {!sessionInfo.slots.length && <p style={{ color: '#ccc', fontSize: '0.9rem' }}>Fill form to see slots</p>}
                    </div>
                </div>
            </div>

            <Modal
                isOpen={modalConfig.isOpen}
                title={modalConfig.title}
                message={modalConfig.message}
                actions={modalConfig.actions}
                onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
            />
        </Layout>
    );
};

export default CreateSession;
