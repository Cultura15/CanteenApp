import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import './history.css';
import Layout from "./layout";

const History = () => {
    const [orderItems, setOrderItems] = useState([]);
    const userId = localStorage.getItem("user_id");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState('cart');
    const navigate = useNavigate();

    useEffect(() => {
        if (userId) {
            fetchOrderItems();
        }
    }, [userId]);

    const fetchUserDetails = async (userId) => {
        try {
            const response = await fetch(`http://localhost:8080/api/users/id/${userId}`);
            if (response.ok) {
                return await response.json();
            } else {
                console.error(`Failed to fetch user details for userId: ${userId}`);
                return { fname: "Unknown", lname: "User" };
            }
        } catch (error) {
            console.error("Error fetching user details:", error);
            return { fname: "Unknown", lname: "User" };
        }
    };

    const fetchOrderItems = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/order-item/user/${userId}`);
            const data = await response.json();

            if (response.ok) {
                const updatedOrderItems = await Promise.all(
                    data.map(async (orderItem) => {
                        const userDetails = await fetchUserDetails(orderItem.userId);
                        return { ...orderItem, ...userDetails };
                    })
                );
                setOrderItems(updatedOrderItems);
            } else {
                console.error("Failed to fetch order items");
            }
        } catch (error) {
            console.error("Error fetching order items:", error);
        }
    };

    const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

    const handleDropdownOptionClick = (option) => {
        setIsDropdownOpen(false);
        if (option === 'profile') navigate('/canteen1/account');
        else if (option === 'logout') {
            localStorage.removeItem('user_id');
            localStorage.removeItem('username');
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
                <div className="history-header">
                    <h2>Order History</h2>
                </div>
                <div className="order-list">
                    {orderItems.length === 0 ? (
                        <p className="no-orders">No orders found</p>
                    ) : (
                        <table className="order-table">
                            <thead>
                                <tr>
                                    <th>Ordered By</th>
                                    <th>Item Name</th>
                                    <th>Category</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    {/* <th>Total</th> */}
                                    <th>Payment Method</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderItems.map((orderItem) => (
                                    <tr key={orderItem.orderItemId}>
                                        <td>{`${orderItem.fname} ${orderItem.lname}`}</td>
                                        <td>{orderItem.name}</td>
                                        <td>{orderItem.category}</td>
                                        <td>{orderItem.quantity}</td>
                                        <td>₱{orderItem.price.toFixed(2)}</td>
                                        {/* <td>₱{orderItem.totalAmount.toFixed(2)}</td> */}
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
