import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Cart2 = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);

    const handleBack = () => {
        navigate(-1);
    };

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/cart/get'); // Adjust this URL to your API
                setCartItems(response.data); // Assuming response.data is an array of cart items
            } catch (error) {
                console.error('Error fetching cart items:', error);
                alert("Failed to load cart items.");
            }
        };

        fetchCartItems();
    }, []);

    const addItemToCart = (menuItem) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.name === menuItem.name);
            if (existingItem) {
                return prevItems.map(item =>
                    item.name === menuItem.name ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevItems, { ...menuItem, quantity: 1 }];
        });
    };

    const updateQuantity = (index, newQuantity) => {
        const updatedItems = [...cartItems];
        updatedItems[index].quantity = newQuantity;
        setCartItems(updatedItems);
    };

    const removeItem = (index) => {
        setCartItems(prevItems => prevItems.filter((_, i) => i !== index));
    };

    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div className="cart-page">
            <header className="header">
                <div className="logo">LOGO</div>
                <nav className="nav-links">
                    <a href="#menu">Menu</a>
                    <a href="#cart">Cart</a>
                    <a href="#account">Account</a>
                </nav>
                <div className="canteen">Canteen 2</div>
            </header>

            <div className="cart-content">
                <div className="left-panel">
                    <button className="back-button" onClick={handleBack}>
                        &lt; Back to Menu
                    </button>
                    <div className="review-content">
                        <h2>Review your Order ({cartItems.length})</h2>
                        <p>Pick up your order at Canteen 2</p>
                    </div>
                </div>

                <div className="right-panel">
                    {cartItems.length === 0 ? (
                        <p>Your cart is empty.</p>
                    ) : (
                        cartItems.map((item, index) => (
                            <div key={index} className="item-box">
                                <img src="/assets/egg.png" alt={item.name} />
                                <div className="item-details">
                                    <h3>{item.name}</h3>
                                    <p>{item.calories} calories</p>
                                    <p>
                                        Quantity: 
                                        <input
                                            type="number"
                                            min="1"
                                            value={item.quantity}
                                            onChange={(e) => updateQuantity(index, parseInt(e.target.value))}
                                        />
                                    </p>
                                    <button onClick={() => removeItem(index)}>Remove</button>
                                </div>
                            </div>
                        ))
                    )}

                    <div className="order-summary">
                        <p>Total - ₱{totalPrice.toFixed(2)}</p>
                        {/* Change this button to provide an actual menu item to add */}
                        <button onClick={() => addItemToCart({ name: "Sunny Sideup Egg", price: 15, calories: 97 })}>Add Sunny Sideup Egg</button>
                    </div>
                    <button className="continue-button">Continue</button>
                </div>
            </div>

            {/* CSS Styling */}
            <style>{`
                .cart-page {
                    font-family: Arial, sans-serif;
                    display: flex;
                    flex-direction: column;
                    height: 100vh;
                    width: 100vw;
                    overflow: hidden;
                }

                .header {
                    display: flex;
                    align-items: center;
                    padding: 10px 20px;
                    background-color: #e4dede;
                    position: fixed;
                    width: 100%;
                    top: 0;
                    z-index: 1000;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }

                .cart-content {
                    display: flex;
                    flex: 1;
                    margin-top: 80px;
                    width: 100vw;
                    height: calc(100vh - 80px); /* Adjust for header height */
                }

                .logo {
                    font-weight: bold;
                    font-size: 20px;
                }

                .nav-links {
                    display: flex;
                    margin-left: 20px;
                    gap: 20px;
                }

                .nav-links a {
                    text-decoration: none;
                    color: black;
                    font-weight: 500;
                }

                .canteen {
                    margin-left: auto;
                    background-color: #f9a72e;
                    padding: 8px 12px;
                    border-radius: 5px;
                    font-weight: bold;
                }

                .left-panel {
                    width: 35%;
                    background-color: #f6a12e;
                    padding: 20px;
                    color: white;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start; /* Ensure items are aligned to the start (left) */
                    height: 100%;
                    box-sizing: border-box;
                }

                .back-button {
                    background: none;
                    border: none;
                    color: black;
                    cursor: pointer;
                    font-size: 16px;
                    margin-bottom: 30px; /* Space below the button */
                    align-self: flex-start; /* This keeps the button to the left */
                    margin-left: 0; /* Ensure it's flush against the left edge */
                }

                .review-content {
                    flex-grow: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: flex-start;
                    text-align: left;
                    margin-left: 90px;
                }    

                .right-panel {
                    width: 65%;
                    background-color: #d6dfc2;
                    padding: 20px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 20px;
                    height: 100%; /* Full height */
                    overflow-y: auto;
                    box-sizing: border-box;
                }

                .item-box {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    background: white;
                    padding: 10px;
                    border-radius: 5px;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                    width: 60%;
                }

                .item-box img {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                }

                .order-summary {
                    background: white;
                    padding: 15px;
                    border-radius: 5px;
                    width: 60%;
                    text-align: left;
                    font-size: 16px;
                }

                .order-summary hr {
                    margin: 10px 0;
                }

                .continue-button {
                    padding: 15px 40px; /* Adjust for a smaller button */
                    background-color: #545454;
                    color: white;
                    border: none;
                    border-radius: 25px; /* Smaller rounded corners */
                    cursor: pointer;
                    position: fixed; /* Fixed position relative to the viewport */
                    bottom: 30px; /* Distance from the bottom of the viewport */
                    right: 50px; /* Distance from the right of the viewport */
                    font-size: 14px; /* Adjust font size */
                    width: auto; /* Ensure button width doesn't expand */
                    display: inline-block; /* Keeps button size to its content */
                }

                .continue-button:hover {
                    background-color: #4c4c4c;
                }
            `}</style>
        </div>
    );
};

export default Cart2;
