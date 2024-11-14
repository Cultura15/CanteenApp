import React, { useState, useEffect } from 'react';
import { useNavigate , useLocation, Link} from 'react-router-dom';
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

import './Canteen2.css'
import SizzlingSisig from '../Foods/SizzlingSisig';
import BeefSteak from '../Foods/BeefSteak';
import ChickenCurry from '../Foods/ChickenCurry';
import Pancake from '../Foods/Pancake';
import FrenchFries from '../Foods/FrenchFries';
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
import MeatrollBread from '../Foods/MeatrollBread';
import Siopao from '../Foods/Siopao';
import Nachos from '../Foods/Nachos';
import Tocino from '../Foods/Tocino';
import FrenchToast from '../Foods/FrenchToast';
import FriedBangus from '../Foods/FriedBangus';
import ScrambledEgg from '../Foods/ScrambledEgg';
import ArrozCaldo from '../Foods/ArrozCaldo';
import Mami from '../Foods/Mami';
import PorkMenudo from '../Foods/PorkMenudo';
import PorkGiniling from '../Foods/PorkGiniling';
import SinigangNaBaboy from '../Foods/SinigangNaBaboy';
import FriedChicken from '../Foods/FriedChicken';
import PorkChop from '../Foods/PorkChop';
import ChickenAfritada from '../Foods/ChickenAfritada';

import OrangeJuice from '../Foods/OrangeJuice';
import ChocolateSmoothie from '../Foods/ChocolateSmoothie';
import BananaSmoothie from '../Foods/BananaSmoothie';
import LemonJuice from '../Foods/LemonJuice';
import Water from '../Foods/Water';
const Canteen2 = () => {

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
                        <a href="#menu">Menu</a>
                        <Link to="/canteen2/cart2">Cart</Link> {/* Link to Cart */}
                        <a href="#account">Account</a>
                    </nav>
                    <div className="canteen">Canteen</div>
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
                { name: 'Tocino', imgSrc: 'tocino.png', component: Tocino },
                { name: 'French Toast', imgSrc: 'frenchtoast.png', component: FrenchToast }, // Added Hotdog component
                { name: 'Fried Bangus', imgSrc: 'friedbangus.png', component: FriedBangus },
                { name: 'Scrambled Egg', imgSrc: 'scrambledegg.png', component: ScrambledEgg },
                { name: 'Arroz Caldo', imgSrc: 'arrozcaldo.png', component: ArrozCaldo },
                { name: 'Mami', imgSrc: 'mami.png', component: Mami },



            ],
            lunch: [
                { name: 'Pork Menudo', imgSrc: 'porkmenudo.png', component: PorkMenudo },
                { name: 'Pork Giniling', imgSrc: 'porkginiling.png', component: PorkGiniling },
                { name: 'Sinigang Na Baboy', imgSrc: 'sinigangnababoy.png', component: SinigangNaBaboy },
                { name: 'Fried Chicken', imgSrc: 'friedchicken.png', component: FriedChicken },
                { name: 'Pork Chop', imgSrc: 'porkchop.png', component: PorkChop },
                { name: 'Chicken Afritada', imgSrc: 'chickenafritada.png', component: ChickenAfritada },
              
            ],
            snacks: [
                { name: 'Sandwich', imgSrc: 'sandwich.png', component: Sandwich },
                { name: 'Pancake', imgSrc: 'pancake.png', component: Pancake },
                { name: 'Meatroll Bread', imgSrc: 'meatrollbread.png', component: MeatrollBread },
                { name: 'French Fries', imgSrc: 'frenchfries.png', component: FrenchFries },
                { name: 'Siopao', imgSrc: 'siopao.png', component: Siopao },
                { name: 'Nachos', imgSrc: 'nachos.png', component: Nachos },
            
            
            ],
            drinks: [
                { name: 'Mango Smoothie', imgSrc: 'mangosmoothie.png', component: MangoSmoothie},
                { name: 'Iced Coffee', imgSrc: 'icedcoffee.png', component: IcedCoffee },
                { name: 'Orange Juice', imgSrc: 'orangejuice.png', component: OrangeJuice },
                { name: 'Chocolate Smoothie', imgSrc: 'chocolatesmoothie.png', component: ChocolateSmoothie },
                { name: 'Banana Smoothie', imgSrc: 'bananasmoothie.png', component: BananaSmoothie },
                { name: 'Lemon Juice', imgSrc: 'lemonjuice.png', component: LemonJuice},
              
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
            if (item.name === 'Tocino') {
                navigate('/canteen2/breakfast/tocino');
            } else if (item.name === 'French Toast') {
                navigate('/canteen2/breakfast/french-toast');
            } else if (item.name === 'Fried Bangus') {
                navigate('/canteen2/breakfast/fried-bangus');
            } else if (item.name === 'Scrambled Egg') {
                navigate('/canteen2/breakfast/scrambled-egg'); 
            } else if (item.name === 'Arroz Caldo') {
                navigate('/canteen2/breakfast/arroz-caldo'); 
            } else if (item.name === 'Mami') {
                navigate('/canteen2/breakfast/mami');     
            } else if (item.name === 'Pork Menudo'){
                navigate('/canteen2/lunch/pork-menudo');
            } else if (item.name === 'Pork Giniling'){
                navigate('/canteen2/lunch/pork-giniling');
            } else if (item.name === 'Sinigang Na Baboy'){
                navigate('/canteen2/lunch/sinigang-na-baboy');
            } else if (item.name === 'Fried Chicken'){
                navigate('/canteen2/lunch/fried-chicken');
            } else if (item.name === 'Pork Chop'){
                navigate('/canteen2/lunch/pork-chop');
            } else if (item.name === 'Sandwich'){
                navigate('/canteen2/snacks/sand-wich');
            } else if (item.name === 'Pancake'){
                navigate('/canteen2/snacks/pancake'); 
            } else if (item.name === 'Meatroll Bread'){
                navigate('/canteen2/snacks/meatroll-bread'); 
            } else if (item.name === 'French Fries'){
                navigate('/canteen2/snacks/french-fries');   
            } else if (item.name === 'Siopao'){
                navigate('/canteen2/snacks/siopao');    
            } else if (item.name === 'Nachos'){
                navigate('/canteen2/snacks/nachos');        
            } else if (item.name === 'Chicken Afritada'){
                navigate('/canteen2/lunch/chicken-afritada');
            } else if (item.name === 'Mango Smoothie'){
                navigate('/canteen2/drinks/mango-smoothie');
            } else if (item.name === 'Orange Juice'){
                navigate('/canteen2/drinks/orange-juice');    
            } else if (item.name === 'Chocolate Smoothie'){
                navigate('/canteen2/drinks/chocolate-smoothie');  
            } else if (item.name === 'Banana Smoothie'){
                navigate('/canteen2/drinks/banana-smoothie');    
            } else if (item.name === 'Iced Coffee'){
                navigate('/canteen2/drinks/iced-coffee'); 
            } else if (item.name === 'Lemon Juice'){
                navigate('/canteen2/drinks/lemon-juice');         
            } else if (item.name === 'IceCream'){
                navigate('/canteen2/dessert/ice-cream');
            } else if (item.name === 'Cassava Cake'){
                navigate('/canteen2/dessert/cassava-cake');
            } else if (item.name === 'Chocolate Cake'){
                navigate('/canteen2/dessert/chocolate-cake');
            } else if (item.name === 'Halo Halo'){
                navigate('/canteen2/dessert/halo-halo');
            } else if (item.name === 'Leche Flan'){
                navigate('/canteen2/dessert/leche-flan');
            } else if (item.name === 'Mango Float'){
                navigate('/canteen2/dessert/mango-float');
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
            <div className="separator" />
            <SubMenuNav />
            <div className="separator" />
            <div className="content-container">
                <Sidebar />
                <MenuGrid activeMenu={activeMenu} onClickItem={handleItemClick} />
            </div>
        </div>
    );
};

export default Canteen2;
