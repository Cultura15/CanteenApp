import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './login.module.css'; // Import CSS module styles

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
        <div className={styles['outer-container']}> {/* Outer container */}
            <div className={styles['container']}> {/* Container for the entire page */}
                <div className={styles['left-panel']}> {/* Left panel with form */}
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
                                    className={styles['password-toggle-icon']} // Apply styles for the icon
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
                        <div className='signinn'>
                            <button type="submit">Login</button>
                        </div>
                    </form>
                </div>
                <div className={styles['right-panel']}>
                       
                        <img 
                            src="/assets/bgregister.png" 
                            alt="Background" 
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                zIndex: -1
                            }} 
                        />
                    </div>

            </div>
        </div>
    );
};

export default Login;
