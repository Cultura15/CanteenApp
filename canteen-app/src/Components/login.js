import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './frontend.css';

const Login = ({ onSuccess }) => {
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });
    
    const navigate = useNavigate(); // Initialize useNavigate

    const handleLoginChange = (event) => {
        const { id, value } = event.target;
        setLoginData({ ...loginData, [id]: value });
    };

    const submitLoginForm = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/users/login', loginData);
            alert('User logged in successfully!');
            localStorage.setItem('user_id', response.data.user_id); 
    
            // Call the onSuccess prop to indicate a successful login
            onSuccess();
            navigate('/canteenSelection'); // Navigate to the canteen selection page on successful login
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
