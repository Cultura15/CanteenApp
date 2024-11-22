import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Payment.css'; // Update your CSS to match the new layout
import Feedback from '../Feedback';

const Payment = () => {
  const navigate = useNavigate();
  const [cartId, setCartId] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState('PayPal');
  const [totalAmount, setTotalAmount] = useState(0);
  const [paymentDetails, setPaymentDetails] = useState({
    orderID: Math.floor(Math.random() * 100) + 1,
    paymentDate: new Date().toISOString().split('T')[0],
  });
  const [orderSummary, setOrderSummary] = useState({ items: [], total: 0 });
  const [message, setMessage] = useState('');
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeCartItems, setActiveCartItems] = useState([]);

  const [userData, setUserData] = useState(null); // State to store user info
  const userId = localStorage.getItem("user_id");

  const paymentMethods = [
    { name: 'PayPal', imgSrc: '/assets/paypal.png' },
    { name: 'GCash', imgSrc: '/assets/gcash.png' },
    { name: 'Credit Card', imgSrc: '/assets/creditcard.png' },
    { name: 'Cash', imgSrc: '/assets/money.png' },
  ];

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) {
        console.error("User ID not available.");
        return;
      }

      try {
        const response = await axios.get(`http://localhost:8080/api/users/id/${userId}`);
        console.log("user:", userId);
        if (response.data) {
          setUserData(response.data); // Store user data in state
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();

    const fetchCartId = async () => {
      if (!userId) {
        console.error("User ID not available.");
        return;
      }
    
      try {
        const response = await axios.get(`http://localhost:8080/api/cart/user/${userId}/active`);
        console.log("API Response for cart:", response.data); // Debug the response
        if (response.data) {
          setCartId(response.data.cartId);
          setOrderSummary({
            items: response.data.cartItems || [],
            total: response.data.totalAmount || 0,
          });
          setTotalAmount(response.data.totalAmount || 0);
        }
      } catch (error) {
        console.error("Error fetching cartId:", error);
      }
    };

    fetchCartId();

    const fetchActiveCartItems = async () => {
      if (!userId) {
        console.error("User ID not available.");
        return;
      }
  
      try {
        const response = await axios.get(`http://localhost:8080/api/cart-items/user/${userId}/active`);
        console.log("API Response:", response.data); // Log the API response
        
        if (response.data) {
          // Map and set the active cart items with the required properties
          const formattedItems = response.data.map((item) => ({
            cartItemId: item.cartItemId,
            menuItemId: item.menuItemId,  // Include menuItemId
            name: item.name,              // Include name
            category: item.category,      // Include category
            price: item.price,            // Include price
            quantity: item.quantity,      // Include quantity
          }));
  
          setActiveCartItems(formattedItems);
  
          // Update the order summary for display
          setOrderSummary({
            items: formattedItems,
            total: formattedItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
          });
  
          setTotalAmount(formattedItems.reduce((sum, item) => sum + item.price * item.quantity, 0));
        }
      } catch (error) {
        console.error("Error fetching active cart items:", error);
      }
    };
  
    fetchActiveCartItems();
  }, [userId]);

  // Handle payment submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const isConfirmed = window.confirm("Are you sure you want to proceed with the payment?");
    if (!isConfirmed) return;
  
    // Ensure required data is available
    if (!cartId || !userId || !orderSummary.items || orderSummary.items.length === 0) {
      setMessage("No active items in the cart to process payment.");
      return;
    }
  
    try {
      setLoading(true);
  
      // Process payments only for active cart items in orderSummary
      const paymentPromises = orderSummary.items.map(async (item) => {
        const { cartItemId, menuItemId, quantity, price } = item;  // Destructure item with all properties
  
        const paymentData = {
          paymentMethod: selectedMethod,
          paymentDate: paymentDetails.paymentDate,
          totalAmount, // Use the fetched totalAmount
        };
  
        // Post the payment
        const paymentResponse = await axios.post(
          `http://localhost:8080/api/payment/${cartId}/${cartItemId}/${userId}`,
          paymentData
        );
  
        if (paymentResponse.status === 201) {
          const createdPayment = paymentResponse.data;
          console.log("Payment created:", createdPayment);
  
          // Post to OrderItem using paymentId and cartItemId
          const orderItemResponse = await axios.post(
            `http://localhost:8080/api/order-item/payment/${createdPayment.paymentId}/cart-item/${cartItemId}`
          );
  
          if (orderItemResponse.status === 201) {
            console.log("OrderItem successfully created:", orderItemResponse.data);
            return { payment: createdPayment, orderItem: orderItemResponse.data };
          } else {
            console.error("Failed to create OrderItem:", orderItemResponse);
            throw new Error("OrderItem creation failed");
          }
        } else {
          console.error("Failed to create payment:", paymentResponse);
          throw new Error("Payment creation failed");
        }
      });
  
      const results = await Promise.all(paymentPromises);
    console.log("All payments and order items processed successfully:", results);

    setIsPaymentSuccessful(true);  // Set payment success to true

    // Delay the redirection by 2 seconds to show the loading screen for a little longer
    setTimeout(() => {
      setLoading(true); // Hide the loading screen
      navigate("/feedback"); // Redirect after 2 seconds
    }, 2000);  // Adjust this delay time if you want a longer wait
  } catch (error) {
    console.error("Error processing payment and order items:", error);
    setMessage("An error occurred while processing your payment. Please try again.");
    setLoading(false); // Hide loading screen in case of error
  }
};




  //RETURN--------------------------------------------------

  return (
    <div className="payment-page">
      <div className="content-container">
        {/* Payment Container */}
        <div className="payment-container with-3d-effect">
          <header className="payment-header">
            <button className="back-button" onClick={() => navigate('/canteen1/cart')}>
              ←
            </button>
            <img src="/assets/loading.gif" alt="Logo" className="payment-logo" />
          </header>
  
          <div className="payment-title">
            <div className="hi">
              <p>Hi, {userData ? `${userData.fname}` : 'user'}</p>
            </div>
            <h1>Choose Payment Method</h1>
          </div>
  
          <div className="payment-options-container">
            <div className="payment-options">
              {paymentMethods.map((method) => (
                <label
                  key={method.name}
                  className={`payment-option ${selectedMethod === method.name ? 'selected' : ''}`}
                  onClick={() => setSelectedMethod(method.name)}
                >
                  <div className="method-info">
                    <img src={method.imgSrc} alt={method.name} className="method-image" />
                    {method.name}
                  </div>
                  <input
                    type="radio"
                    checked={selectedMethod === method.name}
                    onChange={() => setSelectedMethod(method.name)}
                  />
                </label>
              ))}
            </div>
          </div>
  
          <div className="personal-info">
            <p><strong>Personal information</strong></p>
            <div className="user-info">
              <img src="/assets/profile.png" alt="Profile" className="profile-img" />
              <p>{userData ? `${userData.fname} ${userData.lname}` : 'Loading...'}</p>
            </div>
            <div className="user-info">
              <img src="/assets/email.webp" alt="Email" className="email-img" />
              <p>{userData ? userData.email : 'Loading...'}</p>
            </div>
          </div>
  
          <button className="pay-now-button" onClick={handleSubmit}>
            Pay ₱{totalAmount.toFixed(2)}
          </button>
        </div>
  
        {/* Loading Screen */}
        {loading && (
          <div className="loading-overlay">
            <img src="/assets/loading.gif" alt="Loading..." className="loading-gif" />
            <h2>Processing Payment, Thank you for ordering!</h2>
            <img src="/assets/loading.gif" alt="Loading..." className="loading-gif" />
          </div>
        )}
  
        {/* Summary Container */}
        <div className="summary-container">
          <h3>Your Order Summary</h3>
          <div className="order-details">
            
            <ul className="order-items">
              {orderSummary.items.map((item, index) => (
                <li key={index} className="order-item">
                  <div className="item-name">
                    <strong>Food: {item.name}</strong> 
                    <div className="item-name2">
                    <strong>Category: {item.category}</strong> {/* You can display the category if needed */} 
                    </div>
                    
                  </div>
                  <div className="item-quantity">Quantity: {item.quantity}</div>
                  <div className="item-price">Price: ₱{item.price.toFixed(2)}</div>
                  <div className="item-total">Total Price: ₱{(item.price * item.quantity).toFixed(2)}</div>
                </li>
              ))}
            </ul>
            <div className="order-total">
              <strong>Total order amount:</strong> ₱{totalAmount.toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
};
  
export default Payment;