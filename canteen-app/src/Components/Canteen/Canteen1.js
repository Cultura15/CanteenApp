import React, { useState } from 'react';
import SunnySideupEgg from '../Foods/SunnySudeupEgg';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Canteen1 = () => {
    const [activeMenu, setActiveMenu] = useState('breakfast'); // Track the active menu
    const navigate = useNavigate(); 

    const Header = () => {
        return (
            <header className="header">
                <div className="logo">LOGO</div>
                <nav className="nav-links">
                    <a href="#menu">Menu</a>
                    <a href="#cart">Cart</a>
                    <a href="#account">Account</a>
                </nav>
                <div className="canteen">Canteen 1</div>
            </header>
        );
    };

    const SubMenuNav = () => {
        return (
            <nav className="sub-menu-nav">
                <a href="#breakfast" className={activeMenu === 'breakfast' ? 'active' : ''} onClick={() => setActiveMenu('breakfast')}>Breakfast</a>
                <a href="#lunch" className={activeMenu === 'lunch' ? 'active' : ''} onClick={() => setActiveMenu('lunch')}>Lunch</a>
                <a href="#snacks" className={activeMenu === 'snacks' ? 'active' : ''} onClick={() => setActiveMenu('snacks')}>Snacks</a>
                <a href="#drinks" className={activeMenu === 'drinks' ? 'active' : ''} onClick={() => setActiveMenu('drinks')}>Drinks</a>
                <a href="#dessert" className={activeMenu === 'dessert' ? 'active' : ''} onClick={() => setActiveMenu('dessert')}>Dessert</a>
            </nav>
        );
    };

    const Sidebar = () => {
        return (
            <div className="sidebar">
                <h3>Viand</h3>
                <ul>
                    <li onClick={() => handleItemClick({ name: 'Sunny Sideup Egg', imgSrc: 'sunny_side_up.png', component: SunnySideupEgg })}>Sunny Sideup Egg</li>
                    <li>Hotdog</li>
                    <li>Pancakes</li>
                    <li>Sandwich</li>
                </ul>
                <h3>Morning Drinks</h3>
                <ul>
                    <li>Hot Milo</li>
                    <li>Hot Coffee</li>
                    <li>Distilled Water</li>
                </ul>
                <h3>Combo</h3>
                <ul>
                    <li>Combo 1</li>
                    <li>Combo 2</li>
                    <li>Combo 3</li>
                </ul>
            </div>
        );
    };

    const MenuGrid = () => {
        const menuItems = {
            breakfast: [
                { name: 'Sunny Sideup Egg', imgSrc: 'sunny_side_up.png', component: SunnySideupEgg },
            ],
            // Other categories...
        };

        const items = menuItems[activeMenu];

        return (
            <div className="menu-grid">
                <h2>{activeMenu.charAt(0).toUpperCase() + activeMenu.slice(1)} Menu</h2>
                <div className="menu-items">
                    {items.map((item, index) => (
                        <div key={index} className="menu-item" onClick={() => handleItemClick(item)}>
                            <img src={`/path/to/images/${item.imgSrc}`} alt={item.name} />
                            <span>{item.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const handleItemClick = (item) => {
        // Use navigate to go to the food item route
        navigate('/food/sunny-side-up');
    };

    return (
        <div className="app-container">
            <Header />
            <div className="separator" /> {/* Long horizontal line */}
            <SubMenuNav />
            <div className="separator" /> {/* Another long horizontal line */}
            <div className="content-container">
                <Sidebar />
                <MenuGrid />
            </div>
        </div>
    );
};

export default Canteen1;
