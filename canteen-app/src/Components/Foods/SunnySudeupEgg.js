import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SunnySideupEgg = () => {
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1); // State to track quantity

    const handleBack = () => {
        navigate(-1); // Go back to the previous route
    };

    // Handle quantity change
    const handleQuantityChange = (e) => {
        setQuantity(parseInt(e.target.value));
    };

    // Reusing the Header component from Canteen1
    const Header = () => {
        return (
            <>
                <header className="header">
                    <div className="logo">LOGO</div>
                    <nav className="nav-links">
                        <a href="#menu">Menu</a>
                        <a href="#cart">Cart</a>
                        <a href="#account">Account</a>
                    </nav>
                    <div className="canteen">Canteen 1</div>
                </header>
                <div className="horizontal-line"></div> {/* Add this line */}
                {/* Add text below the horizontal line */}
            <div className="food-path">
                /Breakfast/Sunny Sideup
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
                    <img src="/assets/eggs.png" alt="Sunny Sideup Egg" />
                </div>
                <div className="details-container">
                    <h2>Sunny Sideup Egg</h2>
                    <h3>97 Calories</h3>
                </div>
            </div>

            <div className="description">
                <h3>Description</h3>
                <p>Your detailed description of the Sunny Sideup Egg goes here...</p>
            </div>

            

            {/* Quantity Selector and Buttons */}
            <div className="quantity-selector">
                <label htmlFor="quantity">Quantity:</label>
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
                <button className="add-to-cart" onClick={() => alert(`Added ${quantity} Sunny Sideup Egg(s) to cart!`)}>
                    Add to Cart
                </button>
                <button className="reserve-item" onClick={() => alert(`Reserved ${quantity} Sunny Sideup Egg(s)`)}>
                    Reserve Item
                </button>
                <button className="back-button" onClick={handleBack}>
                    Back to Menu
                </button>
            </div>

            {/* CSS styling */}
            <style jsx>{`
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

                .description {
                    position: fixed; /* Fix the position of the element */
                    top: 400px; /* Adjust this value based on the height of your food-detail-container */
                    left: 20px; /* Align to the left with some padding */
                    z-index: 997; /* Ensure it stays below the food detail container */
                    color: #70795e; /* Color of the description text */
                    padding: 10px; /* Padding for spacing */
                    background-color: #f9f9f9; /* Background color */
                    border-radius: 5px; /* Rounded corners */
                    width: calc(100vw - 40px); /* Full width minus some padding */
                }

                .description h3 {
                    margin: 0; /* Remove default margin */
                }

                .description p {
                    margin: 5px 0 0; /* Add margin to separate text */
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
                    color: #70795e; /* Color of the path text */
                    z-index: 999; /* Ensure it stays above other elements if necessary */
                }



                .quantity-selector {
                    margin: 20px 0;
                    text-align: center;
                }

                .quantity-selector input[type="number"] {
                    width: 50px;
                    text-align: center;
                    margin-left: 10px;
                }

                .action-buttons {
                    display: flex;
                    justify-content: center;
                    gap: 10px;
                    margin-top: 20px;
                }

                .add-to-cart, .reserve-item, .back-button {
                    padding: 10px 20px;
                    color: white;
                    border: none;
                    cursor: pointer;
                }

                .add-to-cart {
                    background-color: #4CAF50;
                }

                .reserve-item {
                    background-color: #f0ad4e;
                }

                .back-button {
                    background-color: #d9534f;
                }

                button:hover {
                    opacity: 0.8;
                }
            `}</style>
        </div>
    );
};

export default SunnySideupEgg;
