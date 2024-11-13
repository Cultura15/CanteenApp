import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Cart = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const userId = localStorage.getItem('user_id');

    useEffect(() => {
        axios.get(`http://localhost:8080/api/cart-items/user/${userId}?status=active`)
        .then(response => {
            setCartItems(response.data); // Only active items will be returned
        })
        .catch(error => {
            console.error("Error fetching cart items:", error);
        });
    
    }, [userId]);

    // CALCULATE total price
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    // UPDATE function
    const updateCartItem = (itemId, newQuantity) => {
        axios.put(`http://localhost:8080/api/cart-items/${itemId}`, { quantity: newQuantity })
            .then(response => {
                console.log('Item quantity updated.');

                // Update the cart items state with the updated item
                setCartItems(cartItems.map(item => 
                    item.cartItemId === itemId ? { ...item, quantity: response.data.quantity } : item
                ));
            })
            .catch(error => {
                console.error("Error updating cart item:", error);
            });

        alert('Quantity Updated.');
    };

    // DELETE function
    // const deleteCartItem = (itemId) => {
    //     const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    //     if (confirmDelete) {
    //         axios.delete(`http://localhost:8080/api/cart-items/${itemId}`)
    //             .then(response => {
    //                 console.log(`Item is deleted.`);
    //                 // Remove the deleted item from the cart items state
    //                 setCartItems(cartItems.filter(item => item.cartItemId !== itemId));
    //             })
    //             .catch(error => {
    //                 console.error("Error deleting cart item:", error);
    //             });
    //     }
    // };

    const inactivateCartItem = (itemId) => {
        const confirmInactivate = window.confirm("Are you sure you want to remove this item?");
        if (confirmInactivate) {
            axios.put(`http://localhost:8080/api/cart-items/${itemId}`, { status: "inactive" })
                .then(response => {
                    console.log('Item is now inactive.');

                    // Filter out the inactivated item from the state
                    setCartItems(cartItems.filter(item => item.cartItemId !== itemId));
                })
                .catch(error => {
                    console.error("Error inactivating cart item:", error);
                });
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("user_id"); // Remove user ID from local storage
        navigate('/login'); // Redirect to login page
    };


    return (
        <div className="cart-page">
            <header className="header">
                <div className="logo">LOGO</div>
                <nav className="nav-links">
                    <Link to="/canteen1/">Menu</Link>
                    <a href="#cart">Cart</a>
                    <a href="#account">Account</a>
                    <button onClick={handleLogout} className="logout-button">Log Out</button>
                </nav>
                <div className="canteen">Canteen 1</div>
            </header>
            <div className="horizontal-line"></div> 

            <div className="cart-content">
                <div className="left-panel">
                    <button className="back-button" onClick={() => navigate(-1)}>
                        &lt; Back to Menu
                    </button>
                    <div className="review-content">
                        <h2>Review your Order ({cartItems.length})</h2>
                        <p>Pick up your order at Canteen 1</p>
                    </div>
                </div>

                <div className="right-panel">
                    {cartItems.length === 0 ? (
                        <>
                            <p style={{ color: 'red' }}>Your cart is empty.</p>
                        </>
                    ) : (
                        cartItems.map((item) => (
                            <div key={item.cartItemId} className="item-box">
                                <img src="/assets/egg.png" alt={item.name} />
                                <div className="item-details">
                                    <h3>Category: {item.category}</h3>
                                    <p>Name: {item.name}</p>
                                    <p>
                                        Quantity: 
                                        <input 
                                            type="number" 
                                            value={item.quantity} 
                                            min="1" 
                                            onChange={(e) => {
                                                const quantity = Math.max(1, parseInt(e.target.value) || 0); // Ensure quantity is at least 1
                                                setCartItems(cartItems.map(cartItem =>
                                                    cartItem.cartItemId === item.cartItemId ? { ...cartItem, quantity } : cartItem
                                                ));
                                            }}
                                        />
                                    </p>
                                    <p>Price: ₱{(item.price * item.quantity).toFixed(2)}</p>
                                    <button onClick={() => updateCartItem(item.cartItemId, item.quantity)}>Update</button>
                                </div>
                                
                                <button className='buttons' onClick={() => inactivateCartItem(item.cartItemId)}>Remove</button>
                            </div>
                        ))
                    )}

                    <div className="order-summary">
                        <p>Total - ₱{totalPrice.toFixed(2)}</p>
                    </div>
                    <Link to="/payment">
                        <button 
                            className="continue-button" 
                            disabled={cartItems.length === 0} // Disable button if cart is empty
                        >
                            Continue
                        </button>
                    </Link>
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
                    align-items: center; /* Vertically center the content */
                    padding: 10px;
                    background-color: #e4dede;
                    color: black;
                    position: fixed; /* Fix it at the top */
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 80px; /* Set a consistent height */
                    z-index: 1000; /* Ensure it stays on top of other elements */
                    
                }

                .cart-content {
                    display: flex;
                    flex: 1;
                    margin-top: 80px;
                    width: 100vw;
                    height: calc(100vh - 80px);
                }

                .logo {
                    font-size: 24px;
                    font-weight: bold;
                    margin-right: 20px; /* Space between logo and nav links */
                }

              .nav-links {
                    display: flex;
                    gap: 20px; /* Space between the links */
                }

                .nav-links a {
                    color: black;
                    text-decoration: none;
                    font-size: 18px;
                }

                .nav-links a:hover {
                    text-decoration: underline;
                }

                .canteen {
                margin-left: auto; /* Pushes canteen text to the far right */
                color: black;
                background-color: #f9a72e; /* Background color */
                padding: 10px 20px; /* Optional: Padding for spacing */
                border-radius: 5px; /* Optional: Rounded corners */
                display: flex; /* Use flex to center the text */
                align-items: center; /* Center vertically */
                height: 100%; /* Fill the height of the header */
            }

                .left-panel {
                    width: 35%;
                    background-color: #f6a12e;
                    padding: 20px;
                    color: white;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    height: 100%;
                    box-sizing: border-box;
                }

                .back-button {
                    background: none;
                    border: none;
                    color: black;
                    cursor: pointer;
                    font-size: 16px;
                    margin-bottom: 30px;
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
                    height: 100%;
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

                .continue-button {
                    width: 300px;
                    background-color: #545454;
                    color: white;
                    border-radius: 25px;
                    cursor: pointer;
                    position: fixed;
                    bottom: 30px;
                    right: 50px;
                    font-size: 14px;
                }

                .continue-button:hover {
                    background-color: #4c4c4c;
                }

                .buttons{
                width: 100px;
                font-size: 20px;
                position:fixed;
                right: 1px;
                
                }


            `}</style>
        </div>
    );
};

export default Cart;
