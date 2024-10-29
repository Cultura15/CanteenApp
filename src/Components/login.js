import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './frontend.css';

const Login = ({ onSuccess }) => {
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });
    
    const navigate = useNavigate();

    const handleLoginChange = (event) => {
        const { id, value } = event.target;
        setLoginData({ ...loginData, [id]: value });
    };

    const submitLoginForm = async (event) => {
        event.preventDefault();

        // Check if admin credentials are entered
        if (loginData.email === 'admin@gmail.com' && loginData.password === 'canteen123') {
            alert('Admin logged in successfully!');
            localStorage.setItem('user_id', '3'); // Set user_id for admin in localStorage
            onSuccess(); // Call onSuccess to update any relevant app state
            navigate('/admin'); // Navigate to the admin page
            return;
        }
        
        // Process normal user login
        try {
            const response = await axios.post('http://localhost:8080/api/users/login', loginData);
            console.log('Login Response:', response.data);

            // Check if userId is returned in the response data
            if (response.data && response.data.userId) {
                alert('User logged in successfully!');
                localStorage.setItem('user_id', response.data.userId); // Store the user ID for the logged-in user
                onSuccess();
                navigate('/canteenSelection'); // Navigate to the canteen selection page
            } else {
                alert('Login failed: User ID not found in response.');
            }
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
