import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './users.css'; // You can create and add styling if needed

const Orders = () => {
    const navigate = useNavigate();
    const [orderItems, setOrderItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedOrderItem, setSelectedOrderItem] = useState(null); // For storing the order item to be edited
    const [updateMode, setUpdateMode] = useState(false); // Toggle for update mode
    const [orderItemData, setOrderItemData] = useState({ quantity: '', price: '', name: '', category: '' }); // State for order item data input

    useEffect(() => {
        fetchOrderItems();
    }, []);

    const fetchOrderItems = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/order-item'); // Change to the correct endpoint
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log("Fetched order items:", data);
            setOrderItems(data);
        } catch (error) {
            console.error("Error fetching order items:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/order-item/${selectedOrderItem}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderItemData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            await fetchOrderItems(); // Refresh the order item list after update
            setUpdateMode(false); // Exit update mode
            setOrderItemData({ quantity: '', price: '', name: '', category: '' }); // Reset order item data
            setSelectedOrderItem(null);
        } catch (error) {
            console.error("Error updating order item:", error);
            setError(error.message);
        }
    };

    const handleEdit = (orderItem) => {
        setSelectedOrderItem(orderItem.orderItemId);
        setOrderItemData({
            quantity: orderItem.quantity,
            price: orderItem.price,
            name: orderItem.name,
            category: orderItem.category,
        });
        setUpdateMode(true);
    };

    const handleDelete = async (orderItemId) => {
        if (window.confirm("Are you sure you want to delete this order item?")) {
            try {
                const response = await fetch(`http://localhost:8080/api/order-item/${orderItemId}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                await fetchOrderItems(); // Refresh the order item list after deletion
            } catch (error) {
                console.error("Error deleting order item:", error);
                setError(error.message);
            }
        }
    };

    const handleChange = (e) => {
        setOrderItemData({ ...orderItemData, [e.target.name]: e.target.value });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const handleLogout = () => {
        localStorage.removeItem("user_id"); // Remove user ID from local storage
        navigate('/login'); // Redirect to login page
    };

    return (
        <div className="admin-page">
            <header className="header">
                <div className="logo">LOGO</div>
                <nav className="nav-links">
                    <Link to="/admin">View Menu</Link>
                    <Link to="/admin/users">View Users</Link>
                    <Link to="/admin/transaction">View Transactions</Link>
                    <Link to="/admin/feedbacks">View Feedbacks</Link>
                    <Link to="/admin/orders">View Orders</Link>
                    <button onClick={handleLogout} className="logout-button">Log Out</button>
                </nav>
                <div className="canteen">Admin Panel</div>
            </header>
            <div className="horizontal-line"></div>

            <div className="admin-content">
                <div className="fixed-section">
                    <h2>Order Item List</h2>
                </div>

                <div className="menu-items-container">
                    <h2>Current Order Items</h2>
                    <div className="categories-grid">
                        <ul>
                            {orderItems.map(orderItem => (
                                <li key={orderItem.orderItemId}>
                                    <span>
                                        {orderItem.name} - {orderItem.quantity} - ${orderItem.price} - {orderItem.category}
                                    </span>
                                    <div className="button-group">
                                        <button onClick={() => handleEdit(orderItem)}>Edit</button>
                                        <button className="delete-button" onClick={() => handleDelete(orderItem.orderItemId)}>Delete</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {updateMode && (
                    <div className="update-form">
                        <h3>Edit Order Item</h3>
                        <input type="text" name="name" value={orderItemData.name} onChange={handleChange} placeholder="Name" />
                        <input type="number" name="quantity" value={orderItemData.quantity} onChange={handleChange} placeholder="Quantity" />
                        <input type="number" name="price" value={orderItemData.price} onChange={handleChange} placeholder="Price" />
                        <input type="text" name="category" value={orderItemData.category} onChange={handleChange} placeholder="Category" />
                        <button onClick={handleUpdate}>Update Order Item</button>
                        <button onClick={() => { setUpdateMode(false); setOrderItemData({ quantity: '', price: '', name: '', category: '' }); }}>Cancel</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Orders;
