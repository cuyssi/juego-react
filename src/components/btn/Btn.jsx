import React from 'react';
import './Btn.css';

const Btn = ({ onClick, text, className }) => {
    return (<button onClick={onClick} className={className}>{text}</button>);
};

export default Btn;
