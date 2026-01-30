import React from 'react';

const Modal = ({ isOpen, title, message, actions, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2 className="modal-title">{title}</h2>
                <div className="modal-message">
                    {message && message.split('\n').map((line, i) => (
                        <p key={i} style={{ marginBottom: '8px' }}>{line}</p>
                    ))}
                    {children}
                </div>
                <div className="modal-actions">
                    {actions.map((action, index) => (
                        <button
                            key={index}
                            className={`btn ${action.type === 'primary' ? 'btn-primary' : action.type === 'orange' ? 'btn-orange' : 'btn-outline'}`}
                            onClick={action.onClick}
                            style={{ flex: 1 }}
                        >
                            {action.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Modal;
