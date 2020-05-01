import React from 'react';
import loader from '../../assets/animations/loader-b.svg';

const Button = ({ disabled, name, onClick, color, classes, loading, text }) => {
    return (
        <button 
        disabled={disabled ? true : false} 
        name={name} 
        onClick={onClick} 
        className={`button ${disabled ? 'button__disabled' : ''} button--${color} ${classes ? classes : ''}`}>
            {loading ? <img src={loader} alt="loader" /> : text}
        </button>
    );
}

export default Button;