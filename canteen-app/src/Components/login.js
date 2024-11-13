import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './frontend.css';

const Login = ({ onSuccess }) => {
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLoginChange = (event) => {
        const { id, value } = event.target;
        setLoginData({ ...loginData, [id]: value });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const submitLoginForm = async (event) => {
        event.preventDefault();

        if (loginData.email === 'admin@gmail.com' && loginData.password === '123') {
            alert('Admin logged in successfully!');
            localStorage.setItem('user_id', '11'); 
            onSuccess();
            navigate('/admin');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/users/login', loginData);
            console.log('Login Response:', response.data);
    
            if (response.data && response.data.userId) {
                alert('User logged in successfully!');
                localStorage.setItem('user_id', response.data.userId);
                onSuccess();
                navigate('/canteenSelection');
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
                <div className="password-field">
                    <label htmlFor="password">Password:</label>
                    <div style={{ position: 'relative', width: '100%' }}>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            value={loginData.password}
                            onChange={handleLoginChange}
                            required
                            style={{ paddingRight: '30px' }} // Extra space for the icon
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
                <div>
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>
    );
};

export default Login;
