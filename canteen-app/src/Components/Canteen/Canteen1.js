import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import SunnySideupEgg from '../Foods/SunnySudeupEgg';
import HotdugBun from '../Foods/HotdogBun';
import GrilledChicken from '../Foods/GrilledChicken';
import Sandwich from '../Foods/Sandwhich';
import Spaghetti from '../Foods/Spaghetti';
import HotCoffee from '../Foods/HotCoffee';
import IceCream from '../Foods/IceCream';
import Bacon from '../Foods/Bacon';
import Noodles from '../Foods/Noodles'
import TortangTalong from '../Foods/TortangTalong'
import Oatmeal from '../Foods/Oatmeal'
import Adobo from '../Foods/Adobo'
import SizzlingSisig from '../Foods/SizzlingSisig';
import BeefSteak from '../Foods/BeefSteak';
import ChickenCurry from '../Foods/ChickenCurry';
import BananaCue from '../Foods/BananaCute'
import CheeseBread from '../Foods/CheeseBread';
import FrenchFries from '../Foods/FrenchFries';
import Pizza from '../Foods/Pizza';
import Popcorn from '../Foods/Popcorn';
import IcedCoffee from '../Foods/IcedCoffee';
import Coke from '../Foods/Coke';
import IcedTea from '../Foods/IcedTea';
import MangoSmoothie from '../Foods/MangoSmoothie';
import PineappleJuice from '../Foods/PineappleJuice';
import CassavaCake from '../Foods/CassavaCake';
import ChocolateCake from '../Foods/ChocolateCake';
import HaloHalo from '../Foods/HaloHalo';
import LecheFlan from '../Foods/LecheFlan';
import MangoFloat from '../Foods/MangoFloat';


import './Canteen1.css'


const Footer = () => (
    <footer className="footer">
        <p>&copy; 2024 Your Canteen Name. All Rights Reserved.</p>
    </footer>
);
 

const Canteen1 = () => {
    const location = useLocation();
    const navigate = useNavigate(); 
    const searchParams = new URLSearchParams(location.search);
    const initialCategory = searchParams.get('category') || 'breakfast';
    const [activeMenu, setActiveMenu] = useState(initialCategory);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to manage dropdown visibility


    useEffect(() => {
        setActiveMenu(initialCategory);
    }, [initialCategory]);

    const toggleDropdown = () => {
        setIsDropdownOpen((prevState) => !prevState);
    };
 
    const handleDropdownOptionClick = (option) => {
        setIsDropdownOpen(false); // Close dropdown after selection
        if (option === 'profile') {
            navigate('/canteen1/account');
        } else if (option === 'display') {
            navigate('/canteen1/display');
        } else if (option === 'logout') {
            // Add logout logic here
            localStorage.removeItem("user_id");
            console.log('Logging out...');
            navigate('/login');
        }
    };

  
    const Header = () => (
        <>
            <header className="header">
                <div className="logo" onClick={() => navigate('/canteenSelection')}>
                    <img src="/assets/logo.png" alt="Logo" className="logo-image" />
                </div>
                <p>Canteen-App</p>
                <div className="canteen" onClick={() => navigate('/canteenSelection')} style={{ cursor: 'pointer' }}>
                    Canteen
                </div>
            </header>
           
        </>
    );

    const SubMenuNav = ({ showMenuLinks, toggleMenuLinks }) => {
        const [user, setUser] = useState(null);
        const userId = localStorage.getItem('user_id');

        useEffect(() => {
            const fetchUser = async () => {
                if (userId) {
                    try {
                        const response = await fetch(`http://localhost:8080/api/users/id/${userId}`);
                        if (response.ok) {
                            const data = await response.json();
                            setUser(data);
                        } else {
                            console.error('Failed to fetch user data');
                        }
                    } catch (error) {
                        console.error('Error fetching user data:', error);
                    }
                }
            };
            fetchUser();
        }, [userId]);

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

                <div className="profile-icon-container" onClick={toggleDropdown}>
                    <img src="/assets/profile.png" alt="Profile" className="icon" />
                    <span className="user-greeting">Hello, {user ? user.fname : 'Guest'}</span>
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
            if (pathname.includes('/canteenSelection')) {
                setActiveSidebarItem('Home');
            } else if (pathname.includes('/canteen1/')) {
                setActiveSidebarItem('Menu');
            } else if (pathname.includes('/canteen1/account')) {
                setActiveSidebarItem('Profile');
            } else if (pathname.includes('/canteen1/cart')) {
                setActiveSidebarItem('Cart');
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

    const MenuGrid = () => {
        const menuItems = {
            breakfast: [
                { name: 'Sunny Sideup Egg', imgSrc: 'eggs.png', component: SunnySideupEgg },
                { name: 'Hotdog', imgSrc: 'hotdog.png', component: HotdugBun }, 
                { name: 'Bacon', imgSrc: 'bacon.png', component: Bacon },
                { name: 'Instant Noodles', imgSrc: 'instantnoodles.png', component: Noodles },
                { name: 'Tortang Talong', imgSrc: 'tortangtalong.png', component: TortangTalong },
                { name: 'Oatmeal', imgSrc: 'oatmeal.png', component: Oatmeal },
            ],
            lunch: [
                { name: 'Grilled Chicken', imgSrc: 'chicken.png', component: GrilledChicken },
                { name: 'Spaghetti', imgSrc: 'spaghetti.png', component: Spaghetti },
                { name: 'Adobo', imgSrc: 'adobo.png', component: Adobo },
                { name: 'Sizzling Sisig', imgSrc: 'sisig.png', component: SizzlingSisig },
                { name: 'Beef Steak', imgSrc: 'beefsteak.png', component: BeefSteak },
                { name: 'Chicken Curry', imgSrc: 'chickencurry.png', component: ChickenCurry },
            ],
            snacks: [
                { name: 'Sandwich', imgSrc: 'sandwich.png', component: Sandwich },
                { name: 'Banana Cue', imgSrc: 'bananacue.png', component: BananaCue },
                { name: 'Cheese Bread', imgSrc: 'cheesebread.png', component: CheeseBread },
                { name: 'French Fries', imgSrc: 'frenchfries.png', component: FrenchFries },
                { name: 'Pizza', imgSrc: 'pizza.png', component: Pizza },
                { name: 'Popcorn', imgSrc: 'popcorn.png', component: Popcorn },
            
            ],
            drinks: [
                { name: 'HotCoffee', imgSrc: 'hotcoffee.png', component: HotCoffee },
                { name: 'Iced Coffee', imgSrc: 'icedcoffee.png', component: IcedCoffee },
                { name: 'Coke', imgSrc: 'coke.png', component: Coke },
                { name: 'Iced Tea', imgSrc: 'icedtea.png', component: IcedTea },
                { name: 'Mango Smoothie', imgSrc: 'mangosmoothie.png', component: MangoSmoothie },
                { name: 'Pineapple Juice', imgSrc: 'pineapplejuice.png', component: PineappleJuice},
              
            ],
            dessert: [
                { name: 'IceCream', imgSrc: 'icecream.png', component: IceCream },
                { name: 'Cassava Cake', imgSrc: 'cassavacake.png', component: CassavaCake },
                { name: 'Chocolate Cake', imgSrc: 'chocolatecake.png', component: ChocolateCake },
                { name: 'Halo Halo', imgSrc: 'halohalo.png', component: HaloHalo },
                { name: 'Leche Flan', imgSrc: 'lecheflan.png', component: LecheFlan },
                { name: 'Mango Float', imgSrc: 'mangofloat.png', component: MangoFloat },
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
            } else if (item.name === 'Bacon') {
                navigate('/canteen1/breakfast/bacon');
            } else if (item.name === 'Instant Noodles') {
                navigate('/canteen1/breakfast/noodles'); 
            } else if (item.name === 'Tortang Talong') {
                navigate('/canteen1/breakfast/tortang-talong'); 
            } else if (item.name === 'Oatmeal') {
                navigate('/canteen1/breakfast/oatmeal'); 
            } else if (item.name === 'Adobo'){
                navigate('/canteen1/lunch/chicken-adobo');
            } else if (item.name === 'Sizzling Sisig'){
                navigate('/canteen1/lunch/sizzling-sisig');
            } else if (item.name === 'Beef Steak'){
                navigate('/canteen1/lunch/beef-steak');
            } else if (item.name === 'Chicken Curry'){
                navigate('/canteen1/lunch/chicken-curry');
            } else if (item.name === 'Banana Cue'){
                navigate('/canteen1/snacks/banana-cue'); 
            } else if (item.name === 'Cheese Bread'){
                navigate('/canteen1/snacks/cheese-bread'); 
            } else if (item.name === 'French Fries'){
                navigate('/canteen1/snacks/french-fries');   
            } else if (item.name === 'Pizza'){
                navigate('/canteen1/snacks/pizza');    
            } else if (item.name === 'Popcorn'){
                navigate('/canteen1/snacks/popcorn');   
            } else if (item.name === 'Iced Coffee'){
                navigate('/canteen1/drinks/iced-coffee');    
            } else if (item.name === 'Coke'){
                navigate('/canteen1/drinks/coke');  
            } else if (item.name === 'Iced Tea'){
                navigate('/canteen1/drinks/iced-tea');    
            } else if (item.name === 'Mango Smoothie'){
                navigate('/canteen1/drinks/mango-smoothie'); 
            } else if (item.name === 'Pineapple Juice'){
                navigate('/canteen1/drinks/pineapple-juice');   
            } else if (item.name === 'Cassava Cake'){
                navigate('/canteen1/dessert/cassava-cake');
            } else if (item.name === 'Chocolate Cake'){
                navigate('/canteen1/dessert/chocolate-cake');
            } else if (item.name === 'Halo Halo'){
                navigate('/canteen1/dessert/halo-halo');
            } else if (item.name === 'Leche Flan'){
                navigate('/canteen1/dessert/leche-flan');
            } else if (item.name === 'Mango Float'){
                navigate('/canteen1/dessert/mango-float');
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
        <div className="canteen1-container">
            <Header />
            <SubMenuNav showMenuLinks={true} toggleMenuLinks={toggleDropdown} />
            <div className="main-content">
                <Sidebar />
                <MenuGrid />
            </div>
            <Footer />
        </div>
    );
};
export default Canteen1;
