import React, { useState } from 'react';
import axios from 'axios';

const ReserveItem = () => {
    const [reserveItem, setReserveItem] = useState({
        userID: '',
        menuItemID: '',
        reservedQuantity: '',
        pickupTime: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setReserveItem({ ...reserveItem, [name]: value });
    };

    const createReserveItem = async (reserveItemData) => {
        try {
            const response = await axios.post('http://localhost:8080/api/reserveItem/create', reserveItemData);
            console.log("Reserve item created:", response.data);
        } catch (error) {
            console.error('Error creating reserve item:', error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createReserveItem(reserveItem);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="number"
                name="userID"
                value={reserveItem.userID}
                onChange={handleChange}
                placeholder="User ID"
                required
            />
            <input
                type="number"
                name="menuItemID"
                value={reserveItem.menuItemID}
                onChange={handleChange}
                placeholder="Menu Item ID"
                required
            />
            <input
                type="number"
                name="reservedQuantity"
                value={reserveItem.reservedQuantity}
                onChange={handleChange}
                placeholder="Reserved Quantity"
                required
            />
            <input
                type="time"
                name="pickupTime"
                value={reserveItem.pickupTime}
                onChange={handleChange}
                placeholder="Pickup Time"
                required
            />
            <button type="submit">Create Reserve Item</button>
        </form>
    );
};

export default ReserveItem;
