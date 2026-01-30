import React, { useState } from 'react';
import { ShieldAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [modalConfig, setModalConfig] = useState({ isOpen: false, title: '', message: '', actions: [] });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleLogin = (e) => {
        e.preventDefault();

        // Permanent Credentials Check
        if (formData.username === 'admin' && formData.password === 'Admin@123') {
            setModalConfig({
                isOpen: true,
                title: 'Login Successful ✅',
                message: 'Welcome Admin. Redirecting to dashboard.',
                actions: [{
                    label: 'Continue',
                    type: 'primary',
                    onClick: () => navigate('/dashboard')
                }]
            });
            // Auto redirect after 2 seconds if they don't click
            setTimeout(() => navigate('/dashboard'), 2000);
        } else {
            setModalConfig({
                isOpen: true,
                title: 'Invalid Credentials ❌',
                message: 'Please check username and password.',
                actions: [{
                    label: 'Retry',
                    type: 'orange',
                    onClick: () => setModalConfig({ ...modalConfig, isOpen: false })
                }]
            });
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#001b3a' }}>
            <div style={{ width: '100%', maxWidth: '450px', padding: '20px' }}>
                <div className="card" style={{ textAlign: 'left', borderTop: '5px solid var(--cta-orange)' }}>
                    <div className="card-icon" style={{ background: '#fff0e6', color: 'var(--cta-orange)' }}>
                        <ShieldAlert size={30} />
                    </div>
                    <h2 style={{ marginBottom: '10px' }}>Wellmaid Admin Portal</h2>
                    <p style={{ marginBottom: '30px', color: 'var(--text-muted)' }}>Secure access for hospital administrators.</p>

                    <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div className="form-group">
                            <label>Username</label>
                            <input
                                type="text"
                                name="username"
                                placeholder="Enter Username"
                                className="form-control"
                                value={formData.username}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter Password"
                                className="form-control"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-orange" style={{ justifyContent: 'center', width: '100%' }}>Enter Dashboard</button>
                    </form>
                </div>
            </div>

            <Modal
                isOpen={modalConfig.isOpen}
                title={modalConfig.title}
                message={modalConfig.message}
                actions={modalConfig.actions}
                onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
            />
        </div>
    );
};

export default Login;
