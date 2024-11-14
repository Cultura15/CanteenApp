import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Layout.css';

const Header = () => {
    const navigate = useNavigate();
    return (
        <header className="header">
            <div className="logo">
                <img src="/assets/logo.png" alt="Logo" className="logo-image" />
            </div>
            <div className="canteen" onClick={() => navigate('/canteenSelection')} style={{ cursor: 'pointer' }}>
                Canteen
            </div>
        </header>
    );
};

const SubMenuNav = ({ activeMenu, setActiveMenu, toggleDropdown, isDropdownOpen, handleDropdownOptionClick }) => (
    <nav className="sub-menu-nav">
        <div className="menu-links">
            {['breakfast', 'lunch', 'snacks', 'drinks', 'dessert'].map((category) => (
                <a
                    key={category}
                    href={`?category=${category}`}
                    className={activeMenu === category ? 'active' : ''}
                    onClick={() => setActiveMenu(category)}
                >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                </a>
            ))}
        </div>
        <div className="profile-icon-container" onClick={toggleDropdown}>
            <img src="/assets/profile.png" alt="Profile" className="icon" />
            {isDropdownOpen && (
                <div className="dropdown-menu">
                    <ul>
                        <li onClick={() => handleDropdownOptionClick('profile')}>Profile</li>
                        <li onClick={() => handleDropdownOptionClick('display')}>Display</li>
                        <li onClick={() => handleDropdownOptionClick('logout')}>Logout</li>
                    </ul>
                </div>
            )}
        </div>
    </nav>
);

const Sidebar = () => {
    const navigate = useNavigate();
    return (
        <div className="sidebar">
            <nav>
                <ul>
                    <li onClick={() => navigate('/canteenSelection')}>Home</li>
                    <li onClick={() => navigate('/canteen1/')}>Menu</li>
                    <li onClick={() => navigate('/canteen1/account')}>Profile</li>
                    <li onClick={() => navigate('/canteen1/cart')}>Cart</li>
                </ul>
            </nav>
        </div>
    );
};

const Footer = () => (
    <footer className="footer">
        <p>&copy; 2024 Your Canteen Name. All Rights Reserved.</p>
    </footer>
);

const Layout = ({ children, activeMenu, setActiveMenu, toggleDropdown, isDropdownOpen, handleDropdownOptionClick }) => (
    <>
        <Header />
        <SubMenuNav
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
            toggleDropdown={toggleDropdown}
            isDropdownOpen={isDropdownOpen}
            handleDropdownOptionClick={handleDropdownOptionClick}
        />
        <div className="main-layout">
            <Sidebar />
            <main className="content">{children}</main>
        </div>
        <Footer />
    </>
);

export default Layout;
