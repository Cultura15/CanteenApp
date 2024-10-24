import React, { useState } from 'react';
import Register from './register';
import Login from './login';
import CanteenSelection from './Canteen/CanteenSelection';
import Canteen1 from './Canteen/Canteen1'; // Import Canteen1 component
// You can import Canteen2 and Canteen3 here as well, if you create them

const Frontend = () => {
    const [step, setStep] = useState('register'); // Initial step is 'register'
    const [selectedCanteen, setSelectedCanteen] = useState(null); // State for selected canteen

    const handleRegistrationSuccess = () => {
        setStep('login'); // Move to login after successful registration
    };

    const handleLoginSuccess = () => {
        setStep('canteenSelection'); // Move to canteenSelection after successful login
    };

    const handleSelectCanteen = (canteen) => {
        setSelectedCanteen(canteen);
        setStep('canteen1'); // Set step to show Canteen1
    };

    // Render the appropriate component based on step and selectedCanteen
    return (
        <div>
            {step === 'register' && <Register onSuccess={handleRegistrationSuccess} onSwitch={() => setStep('login')} />}
            {step === 'login' && <Login onSuccess={handleLoginSuccess} />}
            {step === 'canteenSelection' && <CanteenSelection onSelectCanteen={handleSelectCanteen} />}
            {selectedCanteen === 'canteen1' && <Canteen1 />} {/* Show Canteen1 when selected */}
            {/* Add similar lines for Canteen2 and Canteen3 if needed */}
        </div>
    );
};

export default Frontend;
