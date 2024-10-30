import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './users.css';

const Transaction = () => {
    const navigate = useNavigate(); 
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedPayment, setSelectedPayment] = useState(null); // For storing the payment to be edited
    const [updateMode, setUpdateMode] = useState(false); // Toggle for update mode
    const [paymentData, setPaymentData] = useState({ paymentMethod: '', paymentDate: '', totalAmount: 0, cartId: '' }); // State for payment data input

    useEffect(() => {
        fetchPayments();
    }, []);

    const fetchPayments = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/payment');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log("Fetched payments:", data);
            setPayments(data);
        } catch (error) {
            console.error("Error fetching payments:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    // Handle clicking the "Edit" button
    const handleEdit = (payment) => {
        setPaymentData({
            paymentMethod: payment.paymentMethod,
            paymentDate: payment.paymentDate,
            totalAmount: payment.totalAmount,
            cartId: payment.cartId,
        });
        setSelectedPayment(payment.paymentId); // Set the payment ID of the selected payment
        setUpdateMode(true); // Enable update mode
    };

    const handleUpdate = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/payment/${selectedPayment}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(paymentData), // Send the updated paymentData directly
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            await fetchPayments(); // Refresh the payment list after update
            setUpdateMode(false); // Exit update mode
            setPaymentData({ paymentMethod: '', paymentDate: '', totalAmount: 0, cartId: '' }); // Reset payment data
            setSelectedPayment(null);
        } catch (error) {
            console.error("Error updating payment:", error);
            setError(error.message);
        }
    };

    const handleDelete = async (paymentId) => {
        if (window.confirm("Are you sure you want to delete this payment?")) {
            try {
                const response = await fetch(`http://localhost:8080/api/payment/${paymentId}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                await fetchPayments(); // Refresh the payment list after deletion
            } catch (error) {
                console.error("Error deleting payment:", error);
                setError(error.message);
            }
        }
    };

    const handleChange = (e) => {
        setPaymentData({ ...paymentData, [e.target.name]: e.target.value });
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
                    <button onClick={handleLogout} className="logout-button">Log Out</button>
                </nav>
                <div className="canteen">Admin Panel</div>
            </header>
            <div className="horizontal-line"></div>

            <div className="admin-content">
                <div className="fixed-section">
                    <h2>Payment List</h2>
                </div>

                <div className="menu-items-container">
                    <h2>Current Payments</h2>
                    <div className="categories-grid">
                        <ul>
                            {payments.map(payment => (
                                <li key={payment.paymentId}>
                                    <span>
                                        {payment.paymentMethod} - {payment.paymentDate} - ${payment.totalAmount}
                                    </span>
                                    <div className="button-group">
                                        <button onClick={() => handleEdit(payment)}>Edit</button>
                                        <button onClick={() => handleDelete(payment.paymentId)}>Delete</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {updateMode && (
                    <div className="update-form">
                        <h3>Edit Payment</h3>
                        <input type="text" name="paymentMethod" value={paymentData.paymentMethod} onChange={handleChange} placeholder="Payment Method" />
                        <input type="date" name="paymentDate" value={paymentData.paymentDate} onChange={handleChange} placeholder="Payment Date" />
                        <input type="number" name="totalAmount" value={paymentData.totalAmount} onChange={handleChange} placeholder="Total Amount" />
                        <button onClick={handleUpdate}>Update Payment</button>
                        <button onClick={() => { setUpdateMode(false); setPaymentData({ paymentMethod: '', paymentDate: '', totalAmount: 0, cartId: '' }); }}>Cancel</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Transaction;
