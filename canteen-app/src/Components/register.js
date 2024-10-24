// Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './frontend.css';

const Register = ({ onSuccess, onSwitch }) => { // Accept onSwitch as a prop
    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (event) => {
        const { id, value } = event.target;
        setFormData({ ...formData, [id]: value });
    };
            
    const submitForm = async (event) => {
        event.preventDefault();
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
            console.log('Success:', data);
            alert('User registered successfully!');
            setFormData({ fname: '', lname: '', email: '', password: '' });
    
            console.log('Calling onSuccess() to navigate to login');
            onSuccess(); // Ensure this is called correctly
            navigate('/login');
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to register user.');
        }
    };
    

    return (
        <div className="form-container">
            <h2>Register Account</h2>
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
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <button type="submit">Register</button>
                </div>
            </form>
            <p>
            Already have an account? <a href="#" onClick={() => navigate('/login')}>Log in</a>
            </p>
        </div>
    );
};

export default Register;
