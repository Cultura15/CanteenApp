import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SunnySideupEgg from '../Foods/SunnySudeupEgg';
import HotdugBun from '../Foods/HotdogBun';
import GrilledChicken from '../Foods/GrilledChicken';
import Sandwich from '../Foods/Sandwhich';
import Spaghetti from '../Foods/Spaghetti';
import HotCoffee from '../Foods/HotCoffee';
import IceCream from '../Foods/IceCream';

import './Canteen1.css'

const Canteen1 = () => {
    const [activeMenu, setActiveMenu] = useState('breakfast'); // Track the active menu
    const navigate = useNavigate(); 

    const handleBack = () => {
        navigate(-1); // Go back to the previous route
    };

    const Header = () => {
        return (
            <>
                <header className="header">
                    <div className="logo">LOGO</div>
                    <nav className="nav-links">
                        <a href="#menu">Menu</a>
                        <a href="#cart">Cart</a>
                        <a href="#account">Account</a>
                    </nav>
                    <div className="canteen">Canteen 1</div>
                </header>
                <div className="horizontal-line"></div> {/* Add this line */}
                {/* Add text below the horizontal line */}
           
            
          
            </>
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
                    <li>Egg</li>
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
                { name: 'Sunny Sideup Egg', imgSrc: 'eggs.png', component: SunnySideupEgg },
                { name: 'Hotdog', imgSrc: 'hotdog.png', component: HotdugBun }, // Added Hotdog component
            ],
            lunch: [
                { name: 'Grilled Chicken', imgSrc: 'asd.png', component: GrilledChicken },
                { name: 'Spaghetti', imgSrc: 'asd.png', component: Spaghetti },
              
            ],
            snacks: [
                { name: 'Sandwich', imgSrc: 'sandwich.png', component: Sandwich },
            
            ],
            drinks: [
                { name: 'HotCoffee', imgSrc: 'hotcoffee.png', component: HotCoffee },
              
            ],
            dessert: [
                { name: 'IceCream', imgSrc: 'icecream.png', component: IceCream },
            ],
        };

        const items = menuItems[activeMenu];

        const handleItemClick = (item) => {
            // Manually define navigation for each menu item
            if (item.name === 'Sunny Sideup Egg') {
                navigate('/canteen1/breakfast/sunny-side-up');
            } else if (item.name === 'Hotdog') {
                navigate('/canteen1/breakfast/hot-dog-bun');
            } else if (item.name === 'Grilled Chicken'){
                navigate('/canteen1/lunch/grilled-chicken');
            } else if (item.name === 'Sandwich'){
                navigate('/canteen1/snacks/sand-wich')
            } else if (item.name === 'Spaghetti'){
                navigate('/canteen1/lunch/spaghetti')
            } else if (item.name === 'HotCoffee'){
                navigate('/canteen1/drinks/hot-coffee')
            } else if (item.name === 'IceCream'){
                navigate('/canteen1/dessert/ice-cream')
            }
            // Add more conditions for other food items as needed
        };
        

        return (
            <div className="menu-grid">
                <h2>{activeMenu.charAt(0).toUpperCase() + activeMenu.slice(1)} Menu</h2>
                <div className="menu-items">
                    {items.map((item, index) => (
                        <div key={index} className="menu-item" onClick={() => handleItemClick(item)}>
                            <img className="menu-item-image" src={`/assets/${item.imgSrc}`} alt={item.name} />
                            <span>{item.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        );
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
