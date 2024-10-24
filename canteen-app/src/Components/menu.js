import React, { useState } from 'react';
import axios from 'axios';
import './frontend.css';

const Menu = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        image: '',
        user: {
            user_id: localStorage.getItem('user_id') // Get user ID from local storage
        }
    });

    const handleChange = (event) => {
        const { id, value } = event.target;
        setFormData({ ...formData, [id]: value });
    };

    const submitForm = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/menu/post', formData);
            console.log('Success:', response.data);
            alert('Menu item created successfully!');
            // Optionally, clear the form
            setFormData({
                name: '',
                description: '',
                price: '',
                category: '',
                image: '',
                user: { user_id: localStorage.getItem('user_id') } // Maintain the user ID
            });
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to create menu item.');
        }
    };

    return (
        <div className="form-container">
            <h2>Add Menu Item</h2>
            <form onSubmit={submitForm}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <input
                        type="text"
                        id="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="price">Price:</label>
                    <input
                        type="number"
                        id="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="category">Category:</label>
                    <input
                        type="text"
                        id="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="image">Image:</label>
                    <input
                        type="text"
                        id="image"
                        value={formData.image}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <button type="submit">Add Menu Item</button>
                </div>
            </form>
        </div>
    );
};

export default Menu;
