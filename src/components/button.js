import React from 'react';
import './button.css'; // Assuming you have a separate CSS file for button styles

const Button = ({ label, onClick, className }) => {
    return (
        <button className={`custom-button ${className}`} onClick={onClick}>
            {label}
        </button>
    );
};

export default Button;