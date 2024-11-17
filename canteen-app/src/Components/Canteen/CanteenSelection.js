import React, { useState } from 'react';
import './CanteenSelection.css';
import { useNavigate } from 'react-router-dom';

import Layout from '../layout';
 
const CanteenSelection = ({ onSelectCanteen }) => {
    const navigate = useNavigate();
 
    // State for managing dropdown and active menu
    const [activeMenu, setActiveMenu] = useState('breakfast');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
 
    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };
 
    const handleDropdownOptionClick = (option) => {
        setIsDropdownOpen(false);
        if (option === 'profile') navigate('/canteen1/account');
        else if (option === 'display') navigate('/canteen1/display');
        else if (option === 'logout') {
            localStorage.removeItem('user_id');
            navigate('/login');
        }
    };
 
    const handleSelectCanteen = (canteen) => {
        onSelectCanteen(canteen); // Call the prop to handle selection
        navigate(`/canteen${canteen.charAt(canteen.length - 1)}`); // Navigate to the selected canteen page
    };
 
    return (
        <Layout
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
            toggleDropdown={toggleDropdown}
            isDropdownOpen={isDropdownOpen}
            handleDropdownOptionClick={handleDropdownOptionClick}
        >
            <div className="canteen-container">
                <h1 className="app-title">CIT-U Canteen App</h1>
                <h2 className="select-location">  <img src="/assets/loading.gif" alt="Logo" className="logo-select" />         Select Canteen Location       <img src="/assets/loading.gif" alt="Logo" className="logo-select" /></h2>
                <div className="button-group">
                    <button
                        className="canteen-btn"
                        onClick={() => handleSelectCanteen('canteen1')}
                    >
                        Canteen 1
                    </button>
                    <button
                        className="canteen-btn"
                        onClick={() => handleSelectCanteen('canteen2')}
                    >
                        Canteen 2
                    </button>
                    <button
                        className="canteen-btn"
                        onClick={() => handleSelectCanteen('canteen3')}
                    >
                        Canteen 3
                    </button>
                </div>
            </div>
        </Layout>
    );
};
 
export default CanteenSelection;