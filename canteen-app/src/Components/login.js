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

        // Check if admin credentials are entered
        if (loginData.email === 'admin@gmail.com' && loginData.password === '123') {
            alert('Admin logged in successfully!');
            // localStorage.setItem('user_id', '3'); 
            onSuccess(); // Call onSuccess to update any relevant app state
            navigate('/admin'); // Navigate to the admin page
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/users/login', loginData);
            
            // Log the entire response to check the structure
            console.log('Login Response:', response.data);
    
            // Assuming the response.data contains the user object with user_id
            if (response.data && response.data.userId) { // Ensure userId matches your backend
                alert('User logged in successfully!');
                localStorage.setItem('user_id', response.data.userId); // Store the user ID
                
                // Call the onSuccess prop to indicate a successful login
                onSuccess();
                navigate('/canteenSelection'); // Navigate to the canteen selection page
            } else {
                alert('Login failed: User ID not found in response.'); // Handle case where user_id is not returned
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
