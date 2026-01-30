import React, { useState } from 'react';
import Layout from '../components/Layout';
import Modal from '../components/Modal';
import { Camera } from 'lucide-react';

const AddDoctor = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        dob: '',
        age: '',
        contact: '',
        address: '',
        email: '',
        specialization: 'General Physician',
        careerDesc: '',
        status: 'Active',
        photo: null
    });

    const [photoPreview, setPhotoPreview] = useState(null);
    const [modalConfig, setModalConfig] = useState({ isOpen: false, title: '', message: '', actions: [] });

    const calculateAge = (dobString) => {
        if (!dobString) return '';
        const today = new Date();
        const birthDate = new Date(dobString);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        let updatedData = { ...formData, [name]: value };

        if (name === 'dob') {
            updatedData.age = calculateAge(value);
        }

        setFormData(updatedData);
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreview(reader.result);
                setFormData({ ...formData, photo: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleReset = () => {
        setFormData({
            fullName: '',
            dob: '',
            age: '',
            contact: '',
            address: '',
            email: '',
            specialization: 'General Physician',
            careerDesc: '',
            status: 'Active',
            photo: null
        });
        setPhotoPreview(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const existingDoctors = JSON.parse(localStorage.getItem('doctors') || '[]');
        const newDoctor = { ...formData, id: Date.now() };
        localStorage.setItem('doctors', JSON.stringify([...existingDoctors, newDoctor]));

        setModalConfig({
            isOpen: true,
            title: '✅ Doctor added successfully!',
            message: `${formData.fullName} is now registered in the hospital registry.`,
            actions: [{
                label: 'OK',
                type: 'primary',
                onClick: () => {
                    setModalConfig({ ...modalConfig, isOpen: false });
                    handleReset();
                }
            }]
        });
    };

    return (
        <Layout>
            <header style={{ marginBottom: '40px' }}>
                <h1 style={{ fontSize: '1.8rem' }}>Add New Doctor</h1>
                <p style={{ color: 'var(--text-muted)' }}>Fill in the details to register a new specialist.</p>
            </header>

            <div className="card" style={{ maxWidth: '900px' }}>
                <form onSubmit={handleSubmit}>
                    <div style={{ display: 'flex', gap: '40px', marginBottom: '30px', alignItems: 'flex-start' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <label className="info-label">Doctor Photo</label>
                            <div className="photo-upload" onClick={() => document.getElementById('photo-input').click()}>
                                {photoPreview ? (
                                    <img src={photoPreview} alt="Preview" />
                                ) : (
                                    <>
                                        <Camera size={30} color="#6B778C" />
                                        <span style={{ fontSize: '0.8rem', color: '#6B778C', marginTop: '10px' }}>Upload Photo</span>
                                    </>
                                )}
                            </div>
                            <input
                                id="photo-input"
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={handlePhotoChange}
                            />
                        </div>

                        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div className="form-group">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    placeholder="Ex: Dr. Saman Perera"
                                    className="form-control"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="doctor@wellmaid.com"
                                    className="form-control"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Date of Birth</label>
                                <input
                                    type="date"
                                    name="dob"
                                    className="form-control"
                                    value={formData.dob}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Age (Auto-calculated)</label>
                                <input
                                    type="text"
                                    name="age"
                                    className="form-control"
                                    value={formData.age}
                                    readOnly
                                    style={{ background: '#f0f2f5' }}
                                />
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
                        <div className="form-group">
                            <label>Contact Number</label>
                            <input
                                type="text"
                                name="contact"
                                placeholder="+94 77 XXX XXXX"
                                className="form-control"
                                value={formData.contact}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Specialization</label>
                            <select
                                name="specialization"
                                className="form-control"
                                value={formData.specialization}
                                onChange={handleInputChange}
                            >
                                <option value="Cardiology">Cardiology</option>
                                <option value="Neurology">Neurology</option>
                                <option value="Pediatrics">Pediatrics</option>
                                <option value="Orthopedic">Orthopedic</option>
                                <option value="General Physician">General Physician</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Status</label>
                            <select
                                name="status"
                                className="form-control"
                                value={formData.status}
                                onChange={handleInputChange}
                            >
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Address</label>
                        <input
                            type="text"
                            name="address"
                            placeholder="Enter full address"
                            className="form-control"
                            value={formData.address}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Career Description</label>
                        <textarea
                            name="careerDesc"
                            placeholder="Brief professional background..."
                            className="form-control"
                            rows="4"
                            value={formData.careerDesc}
                            onChange={handleInputChange}
                            required
                        ></textarea>
                    </div>

                    <div style={{ display: 'flex', gap: '15px', marginTop: '30px' }}>
                        <button type="submit" className="btn btn-primary" style={{ padding: '12px 40px' }}>Save Doctor</button>
                        <button type="button" onClick={handleReset} className="btn btn-outline" style={{ padding: '12px 40px' }}>Reset Form</button>
                    </div>
                </form>
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

export default AddDoctor;
