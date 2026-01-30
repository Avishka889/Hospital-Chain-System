import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Modal from '../components/Modal';
import { Eye, Edit, Trash2, User, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ManageDoctors = () => {
    const navigate = useNavigate();
    const [doctors, setDoctors] = useState([]);
    const [view, setView] = useState('list'); // 'list' or 'profile'
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState(null); // 'delete-confirm', 'password-prompt', 'success'
    const [actionTarget, setActionTarget] = useState(null);
    const [pendingAction, setPendingAction] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [modalMessage, setModalMessage] = useState('');

    useEffect(() => {
        const storedDoctors = JSON.parse(localStorage.getItem('doctors') || '[]');
        setDoctors(storedDoctors);
    }, []);

    const handleDeleteClick = (doc) => {
        setActionTarget(doc);
        setPendingAction('delete');
        setModalType('delete-confirm');
        setModalMessage(`Are you sure you want to delete ${doc.fullName}?\nThis action cannot be undone.`);
        setIsModalOpen(true);
    };

    const handleEditClick = (doc) => {
        setActionTarget(doc);
        setPendingAction('edit');
        setConfirmPassword('');
        setModalType('password-prompt');
        setModalMessage('Please enter Admin password to edit doctor.');
        setIsModalOpen(true);
    };

    const handlePasswordConfirm = () => {
        if (confirmPassword === 'Admin@123') {
            if (pendingAction === 'delete') {
                const updated = doctors.filter(d => d.id !== actionTarget.id);
                setDoctors(updated);
                localStorage.setItem('doctors', JSON.stringify(updated));
                setModalType('success');
                setModalMessage('Doctor removed successfully.');
            } else if (pendingAction === 'edit') {
                setIsModalOpen(false);
                navigate(`/edit-doctor/${actionTarget.id}`);
            }
        } else {
            alert('Incorrect Password! Please try again.');
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
                    isOpen={isModalOpen}
                    title={modalType === 'password-prompt' ? '🔒 Admin Verification' : modalType === 'delete-confirm' ? '⚠️ Confirm Deletion' : '✅ Success'}
                    message={modalMessage}
                    actions={
                        modalType === 'password-prompt' ? [
                            { label: 'Confirm', type: 'primary', onClick: handlePasswordConfirm },
                            { label: 'Cancel', type: 'outline', onClick: () => setIsModalOpen(false) }
                        ] : modalType === 'delete-confirm' ? [
                            { label: 'Enter Password', type: 'orange', onClick: () => setModalType('password-prompt') },
                            { label: 'Cancel', type: 'outline', onClick: () => setIsModalOpen(false) }
                        ] : [
                            { label: 'OK', type: 'primary', onClick: () => { setIsModalOpen(false); setView('list'); } }
                        ]
                    }
                    onClose={() => setIsModalOpen(false)}
                >
                    {modalType === 'password-prompt' && (
                        <input
                            type="password"
                            placeholder="Admin Password"
                            className="form-control"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            style={{ marginTop: '15px' }}
                            autoFocus
                        />
                    )}
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

            <div className="card-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }}>
                {doctors.map(doc => (
                    <div key={doc.id} className="doctor-card">
                        <div className="doctor-card-header">
                            {doc.photo ? (
                                <img src={doc.photo} alt={doc.fullName} className="doctor-card-img" />
                            ) : (
                                <div className="doctor-card-img" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#e6f0ff', color: 'var(--primary-blue)' }}>
                                    <User size={40} />
                                </div>
                            )}
                        </div>
                        <div className="doctor-card-body">
                            <h3 className="doctor-card-title">{doc.fullName}</h3>
                            <p className="doctor-card-spec">{doc.specialization}</p>
                            <p className="doctor-card-desc">"{doc.careerDesc}"</p>
                        </div>
                        <div className="doctor-card-footer">
                            <button className="btn btn-outline" style={{ padding: '10px' }} onClick={() => viewProfile(doc)} title="View Profile">
                                <Eye size={18} />
                            </button>
                            <button className="btn btn-outline" style={{ padding: '10px' }} onClick={() => handleEditClick(doc)} title="Edit">
                                <Edit size={18} />
                            </button>
                            <button className="btn btn-outline" style={{ padding: '10px', color: '#ff4d4d' }} onClick={() => handleDeleteClick(doc)} title="Delete">
                                <Trash2 size={18} />
                            </button>
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
                isOpen={isModalOpen}
                title={modalType === 'password-prompt' ? '🔒 Admin Verification' : modalType === 'delete-confirm' ? '⚠️ Confirm Deletion' : '✅ Success'}
                message={modalMessage}
                actions={
                    modalType === 'password-prompt' ? [
                        { label: 'Confirm', type: 'primary', onClick: handlePasswordConfirm },
                        { label: 'Cancel', type: 'outline', onClick: () => setIsModalOpen(false) }
                    ] : modalType === 'delete-confirm' ? [
                        { label: 'Enter Password', type: 'orange', onClick: () => setModalType('password-prompt') },
                        { label: 'Cancel', type: 'outline', onClick: () => setIsModalOpen(false) }
                    ] : [
                        { label: 'OK', type: 'primary', onClick: () => { setIsModalOpen(false); setView('list'); } }
                    ]
                }
                onClose={() => setIsModalOpen(false)}
            >
                {modalType === 'password-prompt' && (
                    <input
                        type="password"
                        placeholder="Admin Password"
                        className="form-control"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        style={{ marginTop: '15px' }}
                        autoFocus
                    />
                )}
            </Modal>
        </Layout>
    );
};

export default ManageDoctors;
