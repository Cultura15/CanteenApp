import React from 'react';
import { useNavigate } from 'react-router-dom';

const GrilledChicken = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1); // This will go back to the previous route
    };

    return (
        <div className="food-detail">
            <h2>GrilledChicken</h2>
            <img src="/assets/chicken.png" alt="GrilledChicken" style={{ width: '300px', height: '200px' }} />
            <p>Description of GrilledChicken...</p>
            <button onClick={handleBack}>Back to Menu</button>
        </div>
    );
};

export default GrilledChicken;
