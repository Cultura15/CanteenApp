import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import SunnySideupEgg from '../Foods/SunnySudeupEgg';
import HotdugBun from '../Foods/HotdogBun';
import GrilledChicken from '../Foods/GrilledChicken';
import Sandwich from '../Foods/Sandwhich';
import Spaghetti from '../Foods/Spaghetti';
import HotCoffee from '../Foods/HotCoffee';
import IceCream from '../Foods/IceCream';

import './Canteen1.css'

const Canteen1 = () => {
    const location = useLocation();
    const navigate = useNavigate(); 
    const searchParams = new URLSearchParams(location.search);
    const initialCategory = searchParams.get('category') || 'breakfast';
    const [activeMenu, setActiveMenu] = useState(initialCategory);

    useEffect(() => {
        setActiveMenu(initialCategory);
    }, [initialCategory]);

    const handleItemClick = (item) => {
        const formattedName = item.name.toLowerCase().replace(/\s+/g, '-');
        const route = `/canteen1/${activeMenu}/${formattedName}`;
        navigate(route);
    };

    const Header = () => {
        return (
            <>
                <header className="header">
                    <div className="logo">LOGO</div>
                    <nav className="nav-links">
                     <Link to="/canteen1/">Menu</Link>
                        <Link to="/canteen1/cart">Cart</Link> 
                        <a href="#account">Account</a>
                    </nav>
                    <div className="canteen">Canteen 1</div>
                </header>
                <div className="horizontal-line"></div> {/* Add this line */}
                {/* Add text below the horizontal line */}
           
             
            </>
        );
    };

    const SubMenuNav = () => (
        <nav className="sub-menu-nav">
            {['breakfast', 'lunch', 'snacks', 'drinks', 'dessert'].map((category) => (
                <Link
                    key={category}
                    to={`?category=${category}`}
                    className={activeMenu === category ? 'active' : ''}
                    onClick={() => setActiveMenu(category)}
                >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                </Link>
            ))}
        </nav>
    );

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
