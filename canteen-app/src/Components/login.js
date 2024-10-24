// Login.js
import React, { useState } from 'react';
import axios from 'axios';
import './frontend.css';

const Login = ({ onSuccess }) => {
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

    const handleLoginChange = (event) => {
        const { id, value } = event.target;
        setLoginData({ ...loginData, [id]: value });
    };

    const submitLoginForm = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/users/login', loginData);
            console.log('Login Success:', response.data);
            alert('User logged in successfully!');
            
            // Store user ID in local storage
            localStorage.setItem('user_id', response.data.user_id); 

            // Call the onSuccess prop to move to menu
            onSuccess();

            // Optionally, clear the login form
            setLoginData({ email: '', password: '' });
        } catch (error) {
            console.error('Login Error:', error);
            alert('Failed to log in.');
        }
    };

    return (
        <div className="form-container">
            <h2>Login</h2>
            <form onSubmit={submitLoginForm}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={loginData.email}
                        onChange={handleLoginChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={loginData.password}
                        onChange={handleLoginChange}
                        required
                    />
                </div>
                <div>
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>
    );
};

export default Login;
