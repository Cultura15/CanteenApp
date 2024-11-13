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

//TRIAL





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
                <Route path ="/payment" element={<Payment />} />
                <Route path="/canteen1" element={<Canteen1 />} />
                <Route path="/canteen1/cart" element={<Cart />} />
                <Route path="/feedback" element={<Feedback />} />


                
                <Route path="/canteen1/breakfast/sunny-side-up" element={<SunnySideupEgg />} /> {/* Ensure this route matches */}
                <Route path="/canteen1/breakfast/hot-dog-bun" element={< HotdugBun />} />
                <Route path="/canteen1/lunch/grilled-chicken" element={< GrilledChicken />} />
                <Route path="/canteen1/lunch/spaghetti" element={< Spaghetti />} />
                <Route path="/canteen1/snacks/sand-wich" element={< Sandwich />} />
                <Route path="/canteen1/drinks/hot-coffee" element={< HotCoffee />} />
                <Route path="/canteen1/dessert/ice-cream" element={< IceCream />} />

                <Route path="/admin" element={<AdminPage />} />
                <Route path="/admin/users" element={<Users />} />
                <Route path="/admin/transaction" element={<Transaction />} />
                <Route path="/admin/feedbacks" element={<Feedbacks />} />\
                <Route path="/admin/orders" element={<Orders />} />
          


                
            </Routes>
        </Router>
    );
};

export default Frontend;
