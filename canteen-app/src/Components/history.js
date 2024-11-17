// History.js
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import './history.css'; // Assuming the styles are defined in this CSS file
import Layout from "./layout";

const History = () => {
    const [orderItems, setOrderItems] = useState([]);
    const userId = localStorage.getItem("user_id");

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState('cart');

    const navigate = useNavigate(); 

  

    // Fetch order items when the component mounts
    useEffect(() => {
        if (userId) {
            fetchOrderItems();
        }
    }, [userId]);

    // Function to fetch order items
    const fetchOrderItems = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/order-item/user/${userId}`);
            const data = await response.json();

            if (response.ok) {
                setOrderItems(data); // Set the fetched order items
            } else {
                console.error("Failed to fetch order items");
            }
        } catch (error) {
            console.error("Error fetching order items:", error);
        }
    };

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    const handleDropdownOptionClick = (option) => {
        setIsDropdownOpen(false);
        if (option === 'profile') navigate('/canteen1/account');
        else if (option === 'logout') {
            localStorage.removeItem('user_id');
            navigate('/login');
        }
    };

    return (
        <Layout
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
            toggleDropdown={toggleDropdown}
            isDropdownOpen={isDropdownOpen}
            handleDropdownOptionClick={handleDropdownOptionClick}
        >
        <div className="history-container">
            <h2>Order History</h2>
            <div className="order-list">
                {orderItems.length === 0 ? (
                    <p>No orders found</p>
                ) : (
                    <table className="order-table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Total Amount</th>
                                <th>Payment Method</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderItems.map((orderItem) => (
                                <tr key={orderItem.orderItemId}>
                                    <td>{orderItem.orderItemId}</td>
                                    <td>{orderItem.name}</td>
                                    <td>{orderItem.category}</td>
                                    <td>{orderItem.quantity}</td>
                                    <td>{orderItem.price}</td>
                                    <td>{orderItem.totalAmount}</td>
                                    <td>{orderItem.paymentMethod}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
        </Layout>
    );
};

export default History;
