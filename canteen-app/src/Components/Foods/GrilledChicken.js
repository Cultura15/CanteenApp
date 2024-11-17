import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const GrilledChicken = () => {
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1); // State to track quantity
    const [menuItem, setMenuItem] = useState(null);
    const userId = localStorage.getItem('user_id');

    const handleBack = () => {
        navigate(-1); // Go back to the previous route
    };

    useEffect(() => {
        const fetchMenuItem = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/menu/get'); // Adjust this if necessary
                console.log('Response data:', response.data); // Log the entire response data
                
                const eggItem = response.data.find(item => item.name === "GrilledChicken"); // Replace with your actual condition
                
                if (eggItem) {
                    console.log('Grilled Chicken item:', eggItem); // Log the found item
                    setMenuItem(eggItem); // Set the fetched item
                } else {
                    console.warn('Grilled Chicken not found in the fetched data.'); // Warn if not found
                }
            } catch (error) {
                console.error('Error fetching menu items:', error);
                alert("Item not found in the database."); // Alert if an error occurs
            }
        };

        fetchMenuItem();
    }, []);
    

    // Handle quantity change
    const handleQuantityChange = (e) => {
        setQuantity(parseInt(e.target.value));
    };

    
    // Function to add the item to the cart
    const addToCart = async () => {
        if (!menuItem) {
            alert("Menu item not found.");
            return;
        }
    
        if (!userId) {
            alert("User is not logged in.");
            return;
        }
    
        let cart;
        try {
            // Try to fetch the user's cart by userId
            const cartResponse = await axios.get(`http://localhost:8080/api/cart/user/${userId}`);
            cart = cartResponse.data;
        } catch (error) {
            console.warn('No existing cart found, creating a new one.');
            const newCartData = {
                totalAmount: 0.0,
                user: { userId: userId }
            };
    
            try {
                // Create a new cart if none exists
                const newCartResponse = await axios.post('http://localhost:8080/api/cart', newCartData);
                cart = newCartResponse.data;

                alert("Cart created successfully!");
            } catch (error) {
                console.error('Error creating new cart:', error);
                alert("Failed to create cart.");
                return;
            }
        }
    
        // Ensure the cart is valid
        if (!cart || !cart.cartId) {
            alert("Invalid cart. Please try again.");
            return;
        }
    
        // Structure the cart item data according to your DTO requirements
        const cartItemData = {
            cart: { cartId: cart.cartId },           // Reference to the cart
            menuItem: { menuItemID: menuItem.menuItemID }, // Adjusted key to match your DTO
            quantity: quantity, // This quantity is the amount you want to add
            price: menuItem.price,
            name: menuItem.name,
            category: menuItem.category// You may also want to include the price if needed
        };
    
        console.log('Sending cart item data:', cartItemData); // Debugging log
    
        try {
            // Add item to cart
            const itemResponse = await axios.post(`http://localhost:8080/api/cart-items/user/${userId}`, cartItemData);
            console.log('Item added to cart:', itemResponse.data);
            alert(`Added ${quantity} ${menuItem.name}(s) to cart!`);
        } catch (error) {
            console.error('Error adding to cart:', error);
            alert("Failed to add item to cart.");
        }
    };

    // Reusing the Header component from Canteen1
    const Header = () => {
        return (
            <>
                <header className="header">
                    <div className="logo">LOGO</div>
                    <nav className="nav-links">
                        <a href="#menu">Menu</a>
                        <Link to="/canteen1/cart">Cart</Link> {/* Link to Cart */}
                        <a href="#account">Account</a>
                    </nav>
                    <div className="canteen">Canteen 1</div>
                </header>
                <div className="horizontal-line"></div> {/* Add this line */}
                {/* Add text below the horizontal line */}
            <div className="food-path">
                / Lunch / Grilled Chicken            
            </div>
            
            <div className = "back-button-container">
            <button className="back-button" onClick={handleBack}>
                    Back to Menu
                </button>
                </div>
            </>
        );
    };

    return (
        <div className="sunny-side-up-page">
            <Header />

            {/* Full width container with specific height */}
            <div className="food-detail-container">
                <div className="image-container">
                    <img src="/assets/chicken.png" alt="Grilled Chicken" />
                </div>
                <div className="details-container">
                    <h2>Grilled Chicken </h2>
                    <h3>232 Calories</h3>
                    <h3>&#8369; 135</h3>
                </div>
            </div>

            <div className="description">
                <h3>Description</h3>
                <div className="small-horizontal-line"></div> {/* New small horizontal line */}
                <p> Grilled chicken consists of chicken parts or entire chickens[1] that are barbecued, grilled or smoked. 
                    There are many global and regional preparation techniques and cooking styles. Grilled chicken is often seasoned or coated in a spice rub, barbecue sauce, or both. Marinades are also used to tenderize the meat and add flavor. Rotisserie chicken has gained prominence and popularity in U.S. grocery markets. 
                    Grilled chicken is one of the world's most popular barbecue dishes.</p>       
            </div>

            <div className="quantity">
                <h3>Quantity</h3>
                <div className="small-horizontal-line"></div> {/* New small horizontal line */}

                 {/* Quantity Selector and Buttons */}
            <div className="quantity-selector">
                {/* <label htmlFor="quantity">Quantity:</label> */}
                <input
                    type="number"
                    id="quantity"
                    min="1"
                    value={quantity}
                    onChange={handleQuantityChange}
                />
            </div>

            {/* Buttons */}
            <div className="action-buttons">
            <button className="add-to-cart" onClick={addToCart}>
                    Add to Cart
                </button>
                <button className="reserve-item" onClick={() => alert(`Reserved ${quantity} Sunny Sideup Egg(s)`)}>
                    Reserve Item
                </button>
               
            </div>
                   
            </div>

            {/* CSS styling */}
            <style>{`

            .sunny-side-up-page {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                    background-color: #f4f4f4;
                }

               .content-wrapper {
                    max-width: 800px;
                    padding: 20px;
                    background-color: white;
                    border-radius: 10px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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

               .horizontal-line {
                    position: fixed; /* Fixes the position of the line */
                    top: 80px; /* Adjust this value to position it below the header */
                    width: 100%; /* Full width of the viewport */
                    height: 4px; /* Height of the line */
                    background-color: #000000; /* Color of the line */
                    z-index: 999; /* Ensure it stays on top of other elements */
                    left: 0px;
                }


                .food-detail-container {
                    display: flex;
                    background-color: #70795e;
                    width: 100vw; /* Full width of the viewport */
                    height: 250px; /* Set the desired height */
                    align-items: center;
                    padding: 20px;
                    box-sizing: border-box; /* Ensure padding is included in the width/height */
                    position: fixed; /* Fix the position */
                    top: 150px; /* Adjust this value to position it below the .food-path */
                    left: 0; /* Align to the left */
                    z-index: 998; /* Ensure it stays below the food-path but above other content */
                }

                .quantity {
                    position: fixed; /* Fix the position of the element */
                    top: 400px; /* Position it below the food-detail-container */
                    right: 20px; /* Align to the left with some padding */
                    z-index: 997; /* Ensure it stays below the food detail container */
                    color: black;
                    padding: 10px; /* Padding for spacing */
                    background-color: #f9f9f9; /* Background color */
                    border-radius: 5px; /* Rounded corners */
                    width: calc(50vw - 50px); /* Full width minus some padding */
                    
                }

                .description {
                    position: fixed; /* Fix the position of the element */
                    top: 400px; /* Position it below the food-detail-container */
                    left: 20px; /* Align to the left with some padding */
                    z-index: 997; /* Ensure it stays below the food detail container */
                    color: #70795e; /* Color of the description text */
                    padding: 10px; /* Padding for spacing */
                    background-color: #f9f9f9; /* Background color */
                    border-radius: 5px; /* Rounded corners */
                    width: calc(50vw - 50px); /* Full width minus some padding */
                   

                }

                .small-horizontal-line {
                    width: 80%; /* Adjust width as needed */
                    height: 2px; /* Height of the line */
                    background-color: #000000; /* Color of the line */
                    position: relative; /* Change to relative positioning */
                    margin-top: 10px; /* Space from the description */
                    left: 40%; /* Center horizontally */
                    transform: translateX(-50%); /* Center alignment */
                }

                .description h3 {
                    margin: 100; /* Remove default margin */
                    color: black;
                }

                .description p {
                    margin: 30px 0 0; /* Add margin to separate text */
                    color: black;
                }



                .image-container img {
                    width: 300px;
                    height: 200px;
                    border-radius: 10px;
                    margin-right: 40px;
                    margin-left: 50px;
                   
                }

                .details-container h2 {
                    color: white;
                    font-size: 2.5rem;
                    margin-left: 250px; /* Adjust this value to move the text to the right */
                }

                 .details-container h3 {
                    color: #bcc4c2;
                    font-size: 1.5rem;
                    margin-left: 260px; /* Adjust this value to move the text to the right */
                }


             .food-path {
                    position: fixed; /* Fixes the position of the element */
                    top: 110px; /* Adjust this value based on where you want it to appear (below the header) */
                    left: 70px; /* Adjust this value for horizontal positioning */
                    font-size: 18px; /* Font size for the path text */
                    color: #524e4e; /* Color of the path text */
                    z-index: 999; /* Ensure it stays above other elements if necessary */
                }



                .quantity-selector {
                    margin: 20px 0;
                    text-align: left;
                    left: 10px;
                    width: 200px; /* Adjust the width as needed */
                    font-size: 20px; /* Increase the font size */
                    padding: 10px; /* Add padding for better spacing */
                    
                }

                .quantity-selector input[type="number"] {
                    width: 50px;
                    text-align: center;
                    margin-left: 10px;
                    font-size: 30px;
                    border-radius: 10px;
                }

                .action-buttons {
                    display: flex;
                    justify-content: left;
                    gap: 50px;
                    margin-top: 60px;
                }

                .add-to-cart, .reserve-item {
                    padding: 20px 20px;
                    width: 20%;
                    color: white;
                    border: none;
                    cursor: pointer;
                    border-radius: 100px;
                }

                .add-to-cart {
                    background-color: #545454;
                    color: white;
                    border: 2px solid black;
                   
                }

                .reserve-item {
                    background-color: #545454;
                    color: white;
                    border: 2px solid black;
                  
                }

                .back-button-container{
                    position: fixed; /* Fixes the position of the element */
                    top: 99px; /* Adjust this value based on where you want it to appear (below the header) */
                    right: 70px; /* Adjust this value for horizontal positioning */
                    font-size: 18px; /* Font size for the path text */
                    color: #70795e; /* Color of the path text */
                    z-index: 999; /* Ensure it stays above other elements if necessary */
                    
                }

                .back-button {
                    padding: 10px 20px;
                    color: black;
                    border: 2px solid black;
                    border-radius: 100px;
                    cursor: pointer;
                    background-color: #8d1313;
                }

                button:hover {
                    background-color: #b5c496;
                    opacity: 1;
                }
            `}</style>
        </div>
    );
};

export default GrilledChicken;