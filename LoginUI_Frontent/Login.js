import React from 'react';
import './Login.css';

const Login = () => {
    return (
        <div className="outer-container">
            <div className="container">
                <div className="left-panel">
                    <h2>Sign in</h2>
                    <form>
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" name="username" required />
                        
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" required />
                        
                        <button type="submit">Log in</button>
                    </form>
                </div>
                <div className="right-panel">
                    <h1>Welcome to</h1>
                    <h2>CIT-U Canteen App</h2>
                    <div className="logo">
                        LOGO
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
