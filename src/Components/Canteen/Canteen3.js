import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SunnySideupEgg from '../Foods/SunnySudeupEgg';
import HotdugBun from '../Foods/HotdogBun';
import GrilledChicken from '../Foods/GrilledChicken';
import Sandwich from '../Foods/Sandwhich';
import Spaghetti from '../Foods/Spaghetti';
import HotCoffee from '../Foods/HotCoffee';
import IceCream from '../Foods/IceCream';
import Bacon from '../Foods/Bacon';
import Noodles from '../Foods/Noodles';
import TortangTalong from '../Foods/TortangTalong';
import Oatmeal from '../Foods/Oatmeal';
import Adobo from '../Foods/Adobo';

import './Canteen3.css'
import SizzlingSisig from '../Foods/SizzlingSisig';
import BeefSteak from '../Foods/BeefSteak';
import ChickenCurry from '../Foods/ChickenCurry';
import BananaCue from '../Foods/BananaCue';
import FrenchFries from '../Foods/FrenchFries';
import Pizza from '../Foods/Pizza';
import CheeseBread from '../Foods/CheeseBread';
import Popcorn from '../Foods/Popcorn';
import MangoSmoothie from '../Foods/MangoSmoothie';
import IcedTea from '../Foods/IcedTea';
import Coke from '../Foods/Coke';
import IcedCoffee from '../Foods/IcedCoffee';
import PineappleJuice from '../Foods/PineappleJuice';
import CassavaCake from '../Foods/CassavaCake';
import ChocolateCake from '../Foods/ChocolateCake';
import HaloHalo from '../Foods/HaloHalo';
import LecheFlan from '../Foods/LecheFlan';
import MangoFloat from '../Foods/MangoFloat';
const Canteen3 = () => {
    const [activeMenu, setActiveMenu] = useState('lunch'); // Track the active menu
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
                    <div className="canteen">Canteen</div>
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
                { name: 'Bacon', imgSrc: 'bacon.png', component: Bacon },
                { name: 'Noodles', imgSrc: 'instantnoodles.png', component: Noodles },
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
            } else if (item.name === 'Bacon') {
                navigate('/canteen1/breakfast/bacon');
            } else if (item.name === 'Noodles') {
                navigate('/canteen1/breakfast/noodles'); 
            } else if (item.name === 'Tortang Talong') {
                navigate('/canteen1/breakfast/tortang-talong'); 
            } else if (item.name === 'Oatmeal') {
                navigate('/canteen1/breakfast/oatmeal');     
            } else if (item.name === 'Grilled Chicken'){
                navigate('/canteen1/lunch/grilled-chicken');
            } else if (item.name === 'Adobo'){
                navigate('/canteen1/lunch/chicken-adobo');
            } else if (item.name === 'Sizzling Sisig'){
                navigate('/canteen1/lunch/sizzling-sisig');
            } else if (item.name === 'Beef Steak'){
                navigate('/canteen1/lunch/beef-steak');
            } else if (item.name === 'Chicken Curry'){
                navigate('/canteen1/lunch/chicken-curry');
            } else if (item.name === 'Sandwich'){
                navigate('/canteen1/snacks/sand-wich');
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
            } else if (item.name === 'Spaghetti'){
                navigate('/canteen1/lunch/spaghetti');
            } else if (item.name === 'HotCoffee'){
                navigate('/canteen1/drinks/hot-coffee');
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
            } else if (item.name === 'IceCream'){
                navigate('/canteen1/dessert/ice-cream');
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

export default Canteen3;
