import React from 'react';
import './CanteenSelection.css'; // Make sure the path is correct

const CanteenSelection = ({ onSelectCanteen }) => {
    return (
        <div className="canteen-container">
            <h1 className="app-title">CIT-U Canteen App</h1>
            <h2 className="select-location">Select Canteen Location</h2>
            <div className="button-group">
                <button className="canteen-btn" onClick={() => onSelectCanteen('canteen1')}>Canteen 1</button>
                <button className="canteen-btn" onClick={() => onSelectCanteen('canteen2')}>Canteen 2</button>
                <button className="canteen-btn" onClick={() => onSelectCanteen('canteen3')}>Canteen 3</button>
            </div>
        </div>
    );
};

export default CanteenSelection;
