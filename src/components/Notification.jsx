import React from 'react';
import PropTypes from 'prop-types';

const Notification = ({ message, icon, onDismiss }) => {
    return (
        <div className="notification-wrapper">
            <div className="notification-content">
                <i className={`fas fa-${icon}`}></i>
                <span>{message}</span>
                <button onClick={onDismiss} className="notification-dismiss">
                    <i className="fas fa-times"></i>
                </button>
            </div>
        </div>
    );
};

Notification.propTypes = {
    message: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    onDismiss: PropTypes.func.isRequired
};

Notification.defaultProps = {
    icon: 'info-circle'
};

export default Notification;