import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

//Entities
import Register from './register';
import Login from './login';
import CanteenSelection from './Canteen/CanteenSelection';
import Canteen1 from './Canteen/Canteen1'; 
import Payment from './Payment/Payment';
import Cart from './Cart';
import Feedbacks from './Admin side/feedbacks';
import Account from './account';
import History from './history';

//Admin Page
import AdminPage from './Admin side/admin';
import Users from './Admin side/users';
import Transaction from './Admin side/transaction';
import Feedback from './Feedback';
import Orders from './Admin side/orders';


//Menu items imported
import SunnySideupEgg from './Foods/SunnySudeupEgg'; 
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
import Adobo from './Foods/Adobo'
import SizzlingSisig from './Foods/SizzlingSisig'
import BeefSteak from './Foods/BeefSteak'
import ChickenCurry from './Foods/ChickenCurry'
import CheeseBread from './Foods/CheeseBread'
import FrenchFries from './Foods/FrenchFries'
import Pizza from './Foods/Pizza'
import Popcorn from './Foods/Popcorn'
import BananaCute from './Foods/BananaCute'
import IcedCoffee from './Foods/IcedCoffee'
import Coke from './Foods/Coke'
import IcedTea from './Foods/IcedTea'
import MangoSmoothie from './Foods/MangoSmoothie'
import PineappleJuice from './Foods/PineappleJuice'
import CassavaCake from './Foods/CassavaCake'
import ChocolateCake from './Foods/ChocolateCake'
import HaloHalo from './Foods/HaloHalo'
import LecheFlan from './Foods/LecheFlan'
import MangoFloat from './Foods/MangoFloat'









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
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/register" />} />
                <Route path="/register" element={<Register onSuccess={handleRegistrationSuccess} onSwitch={() => setStep('login')} />} />
                <Route path="/login" element={<Login onSuccess={handleLoginSuccess} />} />
                <Route path="/canteenSelection" element={<CanteenSelection onSelectCanteen={handleSelectCanteen} />} />
                <Route path ="/canteen1/account" element={<Account />} />
                <Route path ="/payment" element={<Payment />} />
                <Route path="/canteen1" element={<Canteen1 />} />
                <Route path="/canteen1/cart" element={<Cart />} />
                <Route path="/feedback" element={<Feedback />} />
                <Route path="/history" element={<History />} />


                
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
                <Route path="/canteen1/snacks/banana-cue" element={< BananaCute />} />
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

                <Route path="/admin" element={<AdminPage />} />
                <Route path="/admin/users" element={<Users />} />
                <Route path="/admin/transaction" element={<Transaction />} />
                <Route path="/admin/feedbacks" element={<Feedbacks />} />
                <Route path="/admin/orders" element={<Orders />} />

                
             


                
            </Routes>
        </Router>
    );
};

export default Frontend;
