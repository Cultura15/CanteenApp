import React from 'react';
import { useNavigate } from 'react-router-dom';

const SunnySideupEgg = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1); // This will go back to the previous route
    };

    return (
        <div className="food-detail">
            <h2>Sunny Sideup Egg</h2>
            <img src="/assets/egg.png" alt="Sunny Sideup Egg" />
            <p>Description of Sunny Sideup Egg...</p>
            <button onClick={handleBack}>Back to Menu</button>
        </div>
    );
};

export default SunnySideupEgg;
