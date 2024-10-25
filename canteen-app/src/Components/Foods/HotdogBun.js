import React from 'react';
import { useNavigate } from 'react-router-dom';

const HotdugBun = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1); // This will go back to the previous route
    };

    return (
        <div className="food-detail">
            <h2>Hotdog Bun</h2>
            <img src="/assets/hotdog.png" alt="Hotdog Bun" style={{ width: '300px', height: '200px' }} />
            <p>Description of Hot Dog Bun...</p>
            <button onClick={handleBack}>Back to Menu</button>
        </div>
    );
};

export default HotdugBun;
