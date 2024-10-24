import React from 'react';
import './CanteenSelection.css'; 
import { useNavigate } from 'react-router-dom';

const CanteenSelection = ({ onSelectCanteen }) => {
    const navigate = useNavigate();

    const handleSelectCanteen = (canteen) => {
        onSelectCanteen(canteen); // Call the prop to handle selection
        navigate(`/canteen${canteen.charAt(canteen.length - 1)}`); // Navigate to the selected canteen page
    };
    
    return (
        <div className="canteen-container">
            <h1 className="app-title">CIT-U Canteen App</h1>
            <h2 className="select-location">Select Canteen Location</h2>
            <div className="button-group">
                <button className="canteen-btn" onClick={() => handleSelectCanteen('canteen1')}>Canteen 1</button>
                <button className="canteen-btn" onClick={() => handleSelectCanteen('canteen2')}>Canteen 2</button>
                <button className="canteen-btn" onClick={() => handleSelectCanteen('canteen3')}>Canteen 3</button>
            </div>
        </div>
    );
};

export default CanteenSelection;
