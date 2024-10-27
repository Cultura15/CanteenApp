import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './register';
import Login from './login';
import CanteenSelection from './Canteen/CanteenSelection';
import Canteen1 from './Canteen/Canteen1'; 

import SunnySideupEgg from './Foods/SunnySudeupEgg'; // Ensure the import path is correct
import HotdugBun from './Foods/HotdogBun';
import GrilledChicken from './Foods/GrilledChicken';
import Sandwich from './Foods/Sandwhich';
import Spaghetti from './Foods/Spaghetti';
import HotCoffee from './Foods/HotCoffee';
import IceCream from './Foods/IceCream';
import Bacon from './Foods/Bacon';
import Noodles from './Foods/Noodles';
import TortangTalong from './Foods/TortangTalong';
import Oatmeal from './Foods/Oatmeal';
import Adobo from './Foods/Adobo';
import SizzlingSisig from './Foods/SizzlingSisig';
import BeefSteak from './Foods/BeefSteak';
import ChickenCurry from './Foods/ChickenCurry';
import BananaCue from './Foods/BananaCue';
import CheeseBread from './Foods/CheeseBread';
import FrenchFries from './Foods/FrenchFries';
import Popcorn from './Foods/Popcorn';
import Pizza from './Foods/Pizza';
import IcedTea from './Foods/IcedTea';
import MangoSmoothie from './Foods/MangoSmoothie';
import PineappleJuice from './Foods/PineappleJuice';
import IcedCoffee from './Foods/IcedCoffee';
import Coke from './Foods/Coke';
import CassavaCake from './Foods/CassavaCake';
import ChocolateCake from './Foods/ChocolateCake';
import HaloHalo from './Foods/HaloHalo';
import LecheFlan from './Foods/LecheFlan';
import MangoFloat from './Foods/MangoFloat';
import Canteen2 from './Canteen/Canteen2';
import Canteen3 from './Canteen/Canteen3';
import Nachos from './Foods/Nachos';
import Pancake from './Foods/Pancake';
import MeatrollBread from './Foods/MeatrollBread';
import Siopao from './Foods/Siopao';
import Tocino from './Foods/Tocino';
import FrenchToast from './Foods/FrenchToast';
import FriedBangus from './Foods/FriedBangus';
import ScrambledEgg from './Foods/ScrambledEgg';
import ArrozCaldo from './Foods/ArrozCaldo';
import Mami from './Foods/Mami';
import PorkMenudo from './Foods/PorkMenudo';
import PorkGiniling from './Foods/PorkGiniling';
import SinigangNaBaboy from './Foods/SinigangNaBaboy';
import FriedChicken from './Foods/FriedChicken';
import PorkChop from './Foods/PorkChop';
import ChickenAfritada from './Foods/ChickenAfritada';
import Water from './Foods/Water';
import OrangeJuice from './Foods/OrangeJuice';
import ChocolateSmoothie from './Foods/ChocolateSmoothie';
import BananaSmoothie from './Foods/BananaSmoothie';
import LemonJuice from './Foods/LemonJuice';
import Cart from './Cart';
import Cart2 from './Cart2';

const Frontend = () => {
    const [step, setStep] = useState('register');
    const [selectedCanteen, setSelectedCanteen] = useState(null);

    const handleRegistrationSuccess = () => {
        setStep('login');
    };

    const handleLoginSuccess = () => {
        setStep('canteenSelection');
    };

    const handleSelectCanteen = (canteen) => {
        setSelectedCanteen(canteen);
        setStep('canteen1');
        setStep('canteen2');
        setStep('canteen3');
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/register" />} />
                <Route path="/register" element={<Register onSuccess={handleRegistrationSuccess} onSwitch={() => setStep('login')} />} />
                <Route path="/login" element={<Login onSuccess={handleLoginSuccess} />} />
                <Route path="/canteenSelection" element={<CanteenSelection onSelectCanteen={handleSelectCanteen} />} />
                <Route path="/canteen1" element={<Canteen1 />} />
                <Route path="/canteen2" element={<Canteen2 />} />
                <Route path="/canteen3" element={<Canteen3 />} />
                <Route path="/canteen1/cart" element={<Cart />} />
                <Route path="/canteen1/breakfast/sunny-side-up" element={<SunnySideupEgg />} /> {/* Ensure this route matches */}
                <Route path="/canteen1/breakfast/hot-dog-bun" element={< HotdugBun />} />
                <Route path="/canteen1/breakfast/bacon" element={< Bacon />} />
                <Route path="/canteen1/breakfast/noodles" element={< Noodles />} />
                <Route path="/canteen1/breakfast/tortang-talong" element={< TortangTalong />} />
                <Route path="/canteen1/breakfast/oatmeal" element={< Oatmeal />} />
                <Route path="/canteen1/lunch/grilled-chicken" element={< GrilledChicken />} />
                <Route path="/canteen1/lunch/spaghetti" element={< Spaghetti />} />
                <Route path="/canteen1/lunch/chicken-adobo" element={< Adobo />} />
                <Route path="/canteen1/lunch/beef-steak" element={< BeefSteak />} />
                <Route path="/canteen1/lunch/sizzling-sisig" element={< SizzlingSisig />} />
                <Route path="/canteen1/lunch/chicken-curry" element={< ChickenCurry />} />
                <Route path="/canteen1/snacks/sand-wich" element={< Sandwich />} />
                <Route path="/canteen1/snacks/banana-cue" element={< BananaCue />} />
                <Route path="/canteen1/snacks/cheese-bread" element={< CheeseBread />} />
                <Route path="/canteen1/snacks/french-fries" element={< FrenchFries />} />
                <Route path="/canteen1/snacks/pizza" element={< Pizza />} />
                <Route path="/canteen1/snacks/popcorn" element={< Popcorn />} />
                <Route path="/canteen1/drinks/hot-coffee" element={< HotCoffee />} />
                <Route path="/canteen1/drinks/iced-coffee" element={< IcedCoffee />} />
                <Route path="/canteen1/drinks/iced-tea" element={< IcedTea />} />
                <Route path="/canteen1/drinks/coke" element={< Coke />} />
                <Route path="/canteen1/drinks/mango-smoothie" element={< MangoSmoothie />} />
                <Route path="/canteen1/drinks/pineapple-juice" element={< PineappleJuice />} />
                <Route path="/canteen1/dessert/ice-cream" element={< IceCream />} />
                <Route path="/canteen1/dessert/cassava-cake" element={< CassavaCake />} />
                <Route path="/canteen1/dessert/chocolate-cake" element={< ChocolateCake />} />
                <Route path="/canteen1/dessert/halo-halo" element={< HaloHalo />} />
                <Route path="/canteen1/dessert/leche-flan" element={< LecheFlan />} />
                <Route path="/canteen1/dessert/mango-float" element={< MangoFloat />} />

                <Route path="/canteen2/cart2" element={<Cart2 />} />
                <Route path="/canteen2/breakfast/tocino" element={<Tocino />} /> {/* Ensure this route matches */}
                <Route path="/canteen2/breakfast/french-toast" element={< FrenchToast />} />
                <Route path="/canteen2/breakfast/fried-bangus" element={< FriedBangus />} />
                <Route path="/canteen2/breakfast/scrambled-egg" element={< ScrambledEgg />} />
                <Route path="/canteen2/breakfast/arroz-caldo" element={< ArrozCaldo />} />
                <Route path="/canteen2/breakfast/mami" element={< Mami />} />
                <Route path="/canteen2/lunch/pork-menudo" element={< PorkMenudo />} />
                <Route path="/canteen2/lunch/pork-giniling" element={< PorkGiniling />} />
                <Route path="/canteen2/lunch/sinigang-na-baboy" element={< SinigangNaBaboy />} />
                <Route path="/canteen2/lunch/fried-chicken" element={< FriedChicken />} />
                <Route path="/canteen2/lunch/pork-chop" element={< PorkChop />} />
                <Route path="/canteen2/lunch/chicken-afritada" element={< ChickenAfritada />} />
                <Route path="/canteen2/snacks/sand-wich" element={< Sandwich />} />
                <Route path="/canteen2/snacks/pancake" element={< Pancake />} />
                <Route path="/canteen2/snacks/meatroll-bread" element={< MeatrollBread />} />
                <Route path="/canteen2/snacks/french-fries" element={< FrenchFries />} />
                <Route path="/canteen2/snacks/siopao" element={< Siopao />} />
                <Route path="/canteen2/snacks/nachos" element={< Nachos />} />
                <Route path="/canteen2/drinks/mango-smoothie" element={< MangoSmoothie />} />
                <Route path="/canteen2/drinks/iced-coffee" element={< IcedCoffee />} />
                <Route path="/canteen2/drinks/orange-juice" element={< OrangeJuice />} />
                <Route path="/canteen2/drinks/chocolate-smoothie" element={< ChocolateSmoothie />} />
                <Route path="/canteen2/drinks/banana-smoothie" element={< BananaSmoothie />} />
                <Route path="/canteen2/drinks/lemon-juice" element={< LemonJuice />} />
                <Route path="/canteen2/dessert/ice-cream" element={< IceCream />} />
                <Route path="/canteen2/dessert/cassava-cake" element={< CassavaCake />} />
                <Route path="/canteen2/dessert/chocolate-cake" element={< ChocolateCake />} />
                <Route path="/canteen2/dessert/halo-halo" element={< HaloHalo />} />
                <Route path="/canteen2/dessert/leche-flan" element={< LecheFlan />} />
                <Route path="/canteen2/dessert/mango-float" element={< MangoFloat />} />

                <Route path="/canteen3/breakfast/sunny-side-up" element={<SunnySideupEgg />} /> {/* Ensure this route matches */}
                <Route path="/canteen3/breakfast/hot-dog-bun" element={< HotdugBun />} />
                <Route path="/canteen3/breakfast/bacon" element={< Bacon />} />
                <Route path="/canteen3/breakfast/noodles" element={< Noodles />} />
                <Route path="/canteen3/breakfast/tortang-talong" element={< TortangTalong />} />
                <Route path="/canteen3/breakfast/oatmeal" element={< Oatmeal />} />
                <Route path="/canteen3/lunch/grilled-chicken" element={< GrilledChicken />} />
                <Route path="/canteen3/lunch/spaghetti" element={< Spaghetti />} />
                <Route path="/canteen3/lunch/chicken-adobo" element={< Adobo />} />
                <Route path="/canteen3/lunch/beef-steak" element={< BeefSteak />} />
                <Route path="/canteen3/lunch/sizzling-sisig" element={< SizzlingSisig />} />
                <Route path="/canteen3/lunch/chicken-curry" element={< ChickenCurry />} />
                <Route path="/canteen3/snacks/sand-wich" element={< Sandwich />} />
                <Route path="/canteen3/snacks/banana-cue" element={< BananaCue />} />
                <Route path="/canteen3/snacks/cheese-bread" element={< CheeseBread />} />
                <Route path="/canteen3/snacks/french-fries" element={< FrenchFries />} />
                <Route path="/canteen3/snacks/pizza" element={< Pizza />} />
                <Route path="/canteen3/snacks/popcorn" element={< Popcorn />} />
                <Route path="/canteen3/drinks/hot-coffee" element={< HotCoffee />} />
                <Route path="/canteen3/drinks/iced-coffee" element={< IcedCoffee />} />
                <Route path="/canteen3/drinks/iced-tea" element={< IcedTea />} />
                <Route path="/canteen3/drinks/coke" element={< Coke />} />
                <Route path="/canteen3/drinks/mango-smoothie" element={< MangoSmoothie />} />
                <Route path="/canteen3/drinks/pineapple-juice" element={< PineappleJuice />} />
                <Route path="/canteen3/dessert/ice-cream" element={< IceCream />} />
                <Route path="/canteen3/dessert/cassava-cake" element={< CassavaCake />} />
                <Route path="/canteen3/dessert/chocolate-cake" element={< ChocolateCake />} />
                <Route path="/canteen3/dessert/halo-halo" element={< HaloHalo />} />
                <Route path="/canteen3/dessert/leche-flan" element={< LecheFlan />} />
                <Route path="/canteen3/dessert/mango-float" element={< MangoFloat />} />

            </Routes>
        </Router>
    );
};

export default Frontend;
