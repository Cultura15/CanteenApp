// Register.js

import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import './register.css';



const Register = ({ onSuccess, onSwitch }) => {

    const [formData, setFormData] = useState({

        fname: '',

        lname: '',

        email: '',

        password: ''

    });



    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);



    const handleChange = (event) => {

        const { id, value } = event.target;

        setFormData({ ...formData, [id]: value });

    };



    const submitForm = async (event) => {

        event.preventDefault();

        const password = formData.password;
        const passwordPattern = /^(?=.*[!@#$%^&*()_+\-=\[\]{};':\"\\|,.<>\/?]).{8,}$/;
    
        if (!passwordPattern.test(password)) {
            alert("Password must be at least 8 characters long and contain at least one special character.");
            return; // Prevent form submission if validation fails
        }

        try {

            const response = await fetch('http://localhost:8080/api/users/register', {

                method: 'POST',

                headers: {

                    'Content-Type': 'application/json',

                },

                body: JSON.stringify(formData),

            });



            if (!response.ok) {

                throw new Error(`HTTP error! status: ${response.status}`);

            }



            const data = await response.json();

            alert('User registered successfully!');

            setFormData({ fname: '', lname: '', email: '', password: '' });



            onSuccess();

            navigate('/login');

        } catch (error) {

            console.error('Error:', error);

            alert('Failed to register user.');

        }

    };

  


    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };




    return (

        <div className="container">

            <div className="background-container">

                <h1>Welcome to Our Platform</h1>

                <p>Join us and explore amazing features!</p>

            </div>

            <div className="form-container">

                <h2>Create your Account</h2>

                <form onSubmit={submitForm}>

                    <div>

                        <label htmlFor="fname">First Name:</label>

                        <input

                            type="text"

                            id="fname"

                            value={formData.fname}

                            onChange={handleChange}

                            required

                        />

                    </div>

                    <div>

                        <label htmlFor="lname">Last Name:</label>

                        <input

                            type="text"

                            id="lname"

                            value={formData.lname}

                            onChange={handleChange}

                            required

                        />

                    </div>

                    <div>

                        <label htmlFor="email">Email:</label>

                        <input

                            type="email"

                            id="email"

                            value={formData.email}

                            onChange={handleChange}

                            required

                        />

                    </div>

                    <div className="password-field">
                        <label htmlFor="password">Password:</label>
                        <div style={{ position: 'relative', width: '100%' }}>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                minLength="8"
                                pattern="^(?=.*[!@#$%^&*()_+\\-=\[\]{};':\"
                                 title="Password must be at least 8 characters long and contain at least one special character."
                                style={{ paddingRight: '40px' }} // Extra space for the icon
                            />
                            <img
                                src={showPassword ? '/assets/open.png' : '/assets/close.png'}
                                alt={showPassword ? 'Hide password' : 'Show password'}
                                className="password-toggle-icon"
                                onClick={togglePasswordVisibility}
                                style={{
                                    position: 'absolute',
                                    right: '10px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    cursor: 'pointer',
                                    width: '20px'
                                }}
                            />
                        </div>
                    </div>


                    <div className='signup'>

                        <button type="submit">Sign up</button>
                        

                    </div>
                    <div className='signin'>
                        <button
                            type="button" // Change to "button" to prevent form submission
                            onClick={() => navigate('/login')} // Navigate to the login page
                        >
                            Sign in
                        </button>
                    </div>


                </form>

                <p>

                    Already have an account? <a href="#" onClick={() => navigate('/login')}>Log in</a>

                </p>

            </div>

        </div>

    );

};



export default Register;

