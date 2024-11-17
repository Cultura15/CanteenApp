import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Layout from './layout';
import './Cart.css'; // Make sure the Layout component is properly imported.

const Cart = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const userId = localStorage.getItem('user_id');

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState('cart');

    const [selectedItems, setSelectedItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false); // Loading state

    useEffect(() => {
        axios.get(`http://localhost:8080/api/cart-items/user/${userId}?status=active`)
        .then(response => {
            setCartItems(response.data); // Only active items will be returned
        })
        .catch(error => {
            console.error("Error fetching cart items:", error);
        });
    }, [userId]);

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

    const updateCartItem = (itemId, newQuantity) => {
        axios.put(`http://localhost:8080/api/cart-items/${itemId}`, { quantity: newQuantity })
            .then(response => {
                console.log('Item quantity updated.');
                setCartItems(cartItems.map(item =>
                    item.cartItemId === itemId ? { ...item, quantity: response.data.quantity } : item
                ));
            })
            .catch(error => {
                console.error("Error updating cart item:", error);
            });
        alert('Quantity Updated.');
    };

    const inactivateCartItem = (itemId) => {
        const confirmInactivate = window.confirm("Are you sure you want to remove this item?");
        if (confirmInactivate) {
            axios.put(`http://localhost:8080/api/cart-items/${itemId}`, { status: "inactive" })
                .then(response => {
                    console.log('Item is now inactive.');
                    setCartItems(cartItems.filter(item => item.cartItemId !== itemId));
                })
                .catch(error => {
                    console.error("Error inactivating cart item:", error);
                });
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("user_id");
        navigate('/login');
    };

    // Toggle the selection of an item
    const toggleSelectItem = (itemId) => {
        setSelectedItems(prevSelectedItems => {
            if (prevSelectedItems.includes(itemId)) {
                return prevSelectedItems.filter(id => id !== itemId);
            } else {
                return [...prevSelectedItems, itemId];
            }
        });
    };

    // Select or deselect all items
    const toggleSelectAll = () => {
        if (selectedItems.length === cartItems.length) {
            setSelectedItems([]); // Deselect all if already all selected
        } else {
            setSelectedItems(cartItems.map(item => item.cartItemId)); // Select all
        }
    };

    // Delete selected items from the cart
    const deleteSelectedItems = () => {
        const confirmDelete = window.confirm("Are you sure you want to delete the selected items?");
        if (confirmDelete) {
            selectedItems.forEach((itemId) => {
                axios.put(`http://localhost:8080/api/cart-items/${itemId}`, { status: "inactive" })
                    .then(() => {
                        setCartItems(cartItems.filter(item => item.cartItemId !== itemId));
                    })
                    .catch(error => {
                        console.error("Error deleting item:", error);
                    });
            });
            setSelectedItems([]); // Clear selected items after deletion
        }
    };

    const handleContinueClick = () => {
        // Show confirmation dialog
        const confirmed = window.confirm('You will be directed to the payment page. Do you want to continue?');
    
        if (confirmed) {
            setIsLoading(true); // Show loading screen
            setTimeout(() => {
                navigate('/payment'); // After loading, redirect to payment page
            }, 2000); // Simulate a delay (2 seconds)
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
            <div className="cart-page">
                <div className="cart-content">
                    <div className="left-panel">
                        <div className="review-content">
                            <h2>Review your Order ({cartItems.length})</h2>
                            <p>Pick up your order at the Canteen :))</p>
                        </div>
                    </div>

                    <div className="right-panel">
                        {cartItems.length === 0 ? (
                            <p style={{ color: 'red' }}>Your cart is empty.</p>
                        ) : (
                            cartItems.map((item) => (
                                <div key={item.cartItemId} className="item-box">
                                    <input
                                        type="checkbox"
                                        checked={selectedItems.includes(item.cartItemId)}
                                        onChange={() => toggleSelectItem(item.cartItemId)}
                                    />
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
                                                    const quantity = Math.max(1, parseInt(e.target.value) || 0);
                                                    setCartItems(cartItems.map(cartItem =>
                                                        cartItem.cartItemId === item.cartItemId
                                                            ? { ...cartItem, quantity }
                                                            : cartItem
                                                    ));
                                                }}
                                            />
                                        </p>
                                        <p><strong>Price: ₱{(item.price * item.quantity).toFixed(2)}</strong></p>

                                        <div className="icon-container1">
                                            <img
                                                src="/assets/edit.webp"
                                                alt="Edit"
                                                className="editicon"
                                                onClick={() => updateCartItem(item.cartItemId, item.quantity)}
                                            />
                                            <img
                                                src="/assets/delete.png"
                                                alt="Delete"
                                                className="delicon"
                                                onClick={() => inactivateCartItem(item.cartItemId)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}

                        {/* Delete Selected button visible only when items are selected */}
                        {selectedItems.length > 0 && (
                            <button
                                className="delete-selected-button"
                                onClick={deleteSelectedItems}
                            >
                                Delete Selected
                            </button>
                        )}

                        <div className="order-summary">
                            <p>
                                <strong>Total</strong>
                                <span className="dots">.....................................................</span>
                                <strong>₱{cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</strong>
                            </p>
                        </div>

                        {/* Show Loading Screen if isLoading is true */}
                        {isLoading ? (
                            <div className="loading-screen">
                                <img src="/assets/loading.gif" alt="Loading..." />
                                <h2>"You are being securely redirected to the payment gateway..."</h2>
                                <img src="/assets/loading.gif" alt="Loading..." />
                            </div>
                           
                        ) : (
                            <button className="continue-button" disabled={cartItems.length === 0} onClick={handleContinueClick}>
                                Continue
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Cart;
