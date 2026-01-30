import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Modal from '../components/Modal';
import { Eye, Edit, Trash2, User, ChevronLeft } from 'lucide-react';

const ManageDoctors = () => {
    const [doctors, setDoctors] = useState([]);
    const [view, setView] = useState('list'); // 'list' or 'profile'
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [modalConfig, setModalConfig] = useState({ isOpen: false, title: '', message: '', actions: [] });
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        const storedDoctors = JSON.parse(localStorage.getItem('doctors') || '[]');
        setDoctors(storedDoctors);
    }, []);

    const handleDeleteClick = (doc) => {
        setModalConfig({
            isOpen: true,
            title: '⚠️ Confirm Deletion',
            message: `Are you sure you want to delete ${doc.fullName}?\nThis action cannot be undone.`,
            actions: [
                { label: 'Delete', type: 'orange', onClick: () => promptPassword(doc, 'delete') },
                { label: 'Cancel', type: 'outline', onClick: () => setModalConfig({ ...modalConfig, isOpen: false }) }
            ]
        });
    };

    const handleEditClick = (doc) => {
        promptPassword(doc, 'edit');
    };

    const promptPassword = (doc, action) => {
        setModalConfig({
            isOpen: true,
            title: '🔒 Admin Verification',
            message: `Please enter Admin password to ${action} doctor.`,
            content: (
                <input
                    type="password"
                    placeholder="Admin Password"
                    className="form-control"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    style={{ marginTop: '15px' }}
                />
            ),
            actions: [
                { label: 'Confirm', type: 'primary', onClick: () => verifyAction(doc, action) },
                { label: 'Cancel', type: 'outline', onClick: () => setModalConfig({ ...modalConfig, isOpen: false }) }
            ]
        });
    };

    const verifyAction = (doc, action) => {
        if (confirmPassword === 'Admin@123') { // Hardcoded for prototype
            if (action === 'delete') {
                const updated = doctors.filter(d => d.id !== doc.id);
                setDoctors(updated);
                localStorage.setItem('doctors', JSON.stringify(updated));
                setModalConfig({
                    isOpen: true,
                    title: '✅ Deleted',
                    message: 'Doctor removed successfully.',
                    actions: [{
                        label: 'OK', type: 'primary', onClick: () => {
                            setModalConfig({ ...modalConfig, isOpen: false });
                            setView('list');
                        }
                    }]
                });
            } else {
                // Edit logic would go here
                alert('Edit mode enabled for ' + doc.fullName);
                setModalConfig({ ...modalConfig, isOpen: false });
            }
        } else {
            alert('Incorrect Password!');
        }
    };

    const viewProfile = (doc) => {
        setSelectedDoctor(doc);
        setView('profile');
    };

    if (view === 'profile' && selectedDoctor) {
        return (
            <Layout>
                <button onClick={() => setView('list')} className="btn btn-outline" style={{ marginBottom: '30px', border: 'none' }}>
                    <ChevronLeft size={18} /> Back to List
                </button>
                <div className="card">
                    <div className="profile-grid">
                        <div>
                            <img
                                src={selectedDoctor.photo || 'https://via.placeholder.com/300x400?text=No+Photo'}
                                alt={selectedDoctor.fullName}
                                style={{ width: '100%', borderRadius: '12px', boxShadow: 'var(--shadow-soft)' }}
                            />
                            <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => handleEditClick(selectedDoctor)}>Edit Doctor</button>
                                <button className="btn btn-outline" style={{ width: '100%', borderColor: '#ff4d4d', color: '#ff4d4d' }} onClick={() => handleDeleteClick(selectedDoctor)}>Delete Doctor</button>
                            </div>
                        </div>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '30px' }}>
                                <div>
                                    <h1 style={{ marginBottom: '5px' }}>{selectedDoctor.fullName}</h1>
                                    <span className={`badge-${selectedDoctor.status.toLowerCase()}`}>{selectedDoctor.status}</span>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <p className="doctor-card-spec">{selectedDoctor.specialization}</p>
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                <div>
                                    <p className="info-label">Date of Birth</p>
                                    <p className="info-value">{selectedDoctor.dob} (Age: {selectedDoctor.age})</p>
                                </div>
                                <div>
                                    <p className="info-label">Contact Number</p>
                                    <p className="info-value">{selectedDoctor.contact}</p>
                                </div>
                                <div>
                                    <p className="info-label">Email Address</p>
                                    <p className="info-value">{selectedDoctor.email}</p>
                                </div>
                                <div>
                                    <p className="info-label">Room Number</p>
                                    <p className="info-value">{selectedDoctor.roomNumber || 'Not Assigned'}</p>
                                </div>
                            </div>

                            <p className="info-label">Address</p>
                            <p className="info-value">{selectedDoctor.address}</p>

                            <p className="info-label">Career Description</p>
                            <p style={{ lineHeight: '1.8' }}>{selectedDoctor.careerDesc}</p>
                        </div>
                    </div>
                </div>

                <Modal
                    isOpen={modalConfig.isOpen}
                    title={modalConfig.title}
                    message={modalConfig.message}
                    actions={modalConfig.actions}
                    onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
                >
                    {modalConfig.content}
                </Modal>
            </Layout>
        );
    }

    return (
        <Layout>
            <header style={{ marginBottom: '40px' }}>
                <h1 style={{ fontSize: '1.8rem' }}>Manage Doctors</h1>
                <p style={{ color: 'var(--text-muted)' }}>View, edit and manage your medical staff.</p>
            </header>

            <div className="card-grid">
                {doctors.map(doc => (
                    <div key={doc.id} className="doctor-card">
                        <img src={doc.photo || 'https://via.placeholder.com/300x200?text=No+Photo'} alt={doc.fullName} className="doctor-card-img" />
                        <div className="doctor-card-body">
                            <h3 className="doctor-card-title">{doc.fullName}</h3>
                            <p className="doctor-card-spec">{doc.specialization}</p>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
                                Contact: {doc.contact}
                            </p>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                                <button className="btn btn-outline" style={{ padding: '8px' }} onClick={() => viewProfile(doc)} title="View Profile">
                                    <Eye size={18} />
                                </button>
                                <button className="btn btn-outline" style={{ padding: '8px' }} onClick={() => handleEditClick(doc)} title="Edit">
                                    <Edit size={18} />
                                </button>
                                <button className="btn btn-outline" style={{ padding: '8px', color: '#ff4d4d' }} onClick={() => handleDeleteClick(doc)} title="Delete">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {doctors.length === 0 && (
                <div style={{ textAlign: 'center', padding: '100px', background: '#fff', borderRadius: '16px' }}>
                    <User size={50} color="#ddd" />
                    <p style={{ marginTop: '20px', color: 'var(--text-muted)' }}>No doctors found. Start by adding one!</p>
                </div>
            )}

            <Modal
                isOpen={modalConfig.isOpen}
                title={modalConfig.title}
                message={modalConfig.message}
                actions={modalConfig.actions}
                onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
            >
                {modalConfig.content}
            </Modal>
        </Layout>
    );
};

export default ManageDoctors;
