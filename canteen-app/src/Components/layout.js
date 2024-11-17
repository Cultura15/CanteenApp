import { useNavigate, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './layout.css';

const Header = () => {
    const navigate = useNavigate();
    return (
        <header className="header">
            <div className="logo" onClick={() => navigate('/canteenSelection')} style={{ cursor: 'pointer' }}>
                <img src="/assets/logo.png" alt="Logo" className="logo-image" />
            </div>
            <p>Canteen-App</p>
            <div className="canteen" onClick={() => navigate('/canteenSelection')} style={{ cursor: 'pointer' }}>
                Canteen
            </div>
        </header>
    );
};

const SubMenuNav = ({ activeMenu, setActiveMenu, toggleDropdown, isDropdownOpen, handleDropdownOptionClick, showMenuLinks, toggleMenuLinks }) => {
    const navigate = useNavigate(); 
    const [user, setUser] = useState(null); // To store user data
    const userId = localStorage.getItem('user_id'); // Get userId from localStorage

    useEffect(() => {
        console.log('User ID from localStorage:', userId); // Debug log for userId
        const fetchUser = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/users/id/${userId}`);
                if (response.ok) {
                    const data = await response.json();
                    console.log('Fetched user data:', data); // Log the response data
                    setUser(data); // Set user data
                } else {
                    console.error('Failed to fetch user data');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        if (userId) {
            fetchUser();
        } else {
            console.error('No user ID found in localStorage');
        }
    }, [userId]);

    useEffect(() => {
        if (user) {
            console.log('User state updated:', user); // Log the updated user state
        }
    }, [user]);


    
    return (
        <nav className="sub-menu-nav">
            {showMenuLinks && (
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
            )}

            {user ? (
                <div className="profile-icon-container" onClick={toggleDropdown}>
                    <img src="/assets/profile.png" alt="Profile" className="icon" />
                    <span className="user-greeting">Hello, {user.fname}</span>
                    {isDropdownOpen && (
                        <div className="dropdown-menu">
                            <ul>
                                <li onClick={() => handleDropdownOptionClick('profile')}>Profile</li>
                                <li onClick={() => navigate('/history')}>Order History</li> 
                                <li onClick={() => handleDropdownOptionClick('logout')}>Logout</li>
                            </ul>
                        </div>
                    )}
                </div>
            ) : (
                <div className="profile-icon-container" onClick={toggleDropdown}>
                    <img src="/assets/profile.png" alt="Profile" className="icon" />
                    <span className="user-greeting">Hello, Guest</span>
                    {isDropdownOpen && (
                        <div className="dropdown-menu">
                            <ul>
                                <li onClick={() => handleDropdownOptionClick('profile')}>Profile</li>
                                <li onClick={() => navigate('/history')}>Order History</li> 
                                <li onClick={() => handleDropdownOptionClick('logout')}>Logout</li>
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
};


const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeSidebarItem, setActiveSidebarItem] = useState('Home'); // Initialize with a default active item

    // Update active sidebar item based on the current route
    useEffect(() => {
        const pathname = location.pathname;

        if (pathname === '/canteenSelection') {
            setActiveSidebarItem('Home');
        } else if (pathname.startsWith('/canteen1/')) {
            // Check if it's one of the sub-routes under canteen1
            if (pathname === '/canteen1/') {
                setActiveSidebarItem('Menu');
            } else if (pathname === '/canteen1/account') {
                setActiveSidebarItem('Profile');
            } else if (pathname === '/canteen1/cart') {
                setActiveSidebarItem('Cart');
            }
        }
    }, [location]);

    const handleSidebarClick = (item) => {
        setActiveSidebarItem(item);
        if (item === 'Home') {
            navigate('/canteenSelection');
        } else if (item === 'Menu') {
            navigate('/canteen1/');
        } else if (item === 'Profile') {
            navigate('/canteen1/account');
        } else if (item === 'Cart') {
            navigate('/canteen1/cart');
        }
    };

    return (
        <div className="sidebar">
            <nav>
                <ul>
                    {['Home', 'Menu', 'Profile', 'Cart'].map((item) => (
                        <li
                            key={item}
                            onClick={() => handleSidebarClick(item)}
                            className={activeSidebarItem === item ? 'active-sidebar-item' : ''}
                        >
                            {item}
                        </li>
                    ))}
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

const Layout = ({ children, activeMenu, setActiveMenu, toggleDropdown, isDropdownOpen, handleDropdownOptionClick }) => {
    const [showMenuLinks, setShowMenuLinks] = useState(false); // State to control menu visibility

    const toggleMenuLinks = () => {
        setShowMenuLinks(!showMenuLinks);  // Toggle menu visibility
    };

    return (
        <>
            <Header />
            <SubMenuNav
                activeMenu={activeMenu}
                setActiveMenu={setActiveMenu}
                toggleDropdown={toggleDropdown}
                isDropdownOpen={isDropdownOpen}
                handleDropdownOptionClick={handleDropdownOptionClick}
                showMenuLinks={showMenuLinks}
                toggleMenuLinks={toggleMenuLinks}
            />
            <div className="separator" />
            <div className="main-layout">
                <Sidebar />
                <main className="content">{children}</main>
            </div>
            <Footer />
        </>
    );
};

export default Layout;
