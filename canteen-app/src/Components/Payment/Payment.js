// src/Payment.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Payment.css'; 
import Feedback from '../Feedback';

const Payment = () => {
  const navigate = useNavigate();
  const [cartId, setCartId] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState('PayPal');
  const [totalAmount, setTotalAmount] = useState(0);
  const [paymentDetails, setPaymentDetails] = useState({
    orderID: Math.floor(Math.random() * 100) + 1, // Random Order ID
    paymentDate: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
  });
  const [orderSummary, setOrderSummary] = useState({ items: [], total: 0 });
  const [message, setMessage] = useState('');
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false); // State to track payment success

  const userId = localStorage.getItem("user_id");

  const paymentMethods = [
    { name: 'PayPal', imgSrc: '/images/paypal.png' },
    { name: 'GCash', imgSrc: '/images/gcash.png' },
    { name: 'Credit Card', imgSrc: '/images/creditcard.png' },
    { name: 'Cash', imgSrc: '/images/money.png' },
  ];

  // Fetch cartId and order summary on component mount
  useEffect(() => {
    const fetchCartId = async () => {
      if (!userId) {
        console.error("User ID not available.");
        return;
      }

      try {
        const response = await axios.get(`http://localhost:8080/api/cart/user/${userId}`);
        if (response.data) {
          setCartId(response.data.cartId);
          setOrderSummary({
            items: response.data.items || [],
            total: response.data.total || 0,
          });
          setTotalAmount(response.data.total || 0);
        }
      } catch (error) {
        console.error("Error fetching cartId:", error);
      }
    };

    fetchCartId();
  }, [userId]);

  const deleteCartItems = async () => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/cart-items/user/${userId}`);
      if (response.status === 204) {
        console.log("Cart items deleted successfully.");
        setMessage("Your cart items have been cleared successfully.");
      } else {
        console.error("Failed to delete the cart items.");
      }
    } catch (error) {
      console.error("Error deleting the cart items:", error);
      setMessage("Failed to delete the cart items. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cartId) {
      setMessage("Cart ID not available. Please try again.");
      return;
    }

    const paymentData = {
      paymentMethod: selectedMethod,
      ...paymentDetails,
      totalAmount,
    };

    try {
      const response = await axios.post(`http://localhost:8080/api/payment/${cartId}`, paymentData);
      if (response.status === 201) {
        alert("Payment created successfully!");
        setIsPaymentSuccessful(true); // Set payment success state
        await deleteCartItems(); // Clear cart after successful payment
        navigate('/feedback'); // Navigate to feedback page
      } else {
        alert("Error creating payment. Please try again.");
      }
    } catch (error) {
      console.error("Error creating payment:", error);
      alert("Failed to create payment. Please check the console for more details.");
    }
  };

  // Optional: Prevent access to the Payment page if payment was successful
  if (isPaymentSuccessful) {
    return <p>Thank you for your payment! Redirecting to feedback...</p>;
  }

  return (
    <div className="container">
      <h3>Payment Method</h3>
      <div className="paymentMethod">
        {paymentMethods.map((method) => (
          <label
            key={method.name}
            className={`paymentOption ${selectedMethod === method.name ? 'selected' : ''}`}
            onClick={() => setSelectedMethod(method.name)}
          >
            <div className="topRow">
              <div>
                <img src={method.imgSrc} alt={method.name} className="image" />
                {method.name}
              </div>
              <input
                type="radio"
                checked={selectedMethod === method.name}
                onChange={() => setSelectedMethod(method.name)}
              />
            </div>
          </label>
        ))}
      </div>

      <div className="summary">
        <h4 className="summaryTitle">Order Summary</h4>
        <div className="summaryRow"><strong>Order ID:</strong> <span>{paymentDetails.orderID}</span></div>
        <div className="summaryRow"><strong>Payment Method:</strong> <span>{selectedMethod}</span></div>
        <div className="summaryRow"><strong>Payment Date:</strong> <span>{paymentDetails.paymentDate}</span></div>
        <div className="summaryRow"><strong>Total Amount:</strong> <span>₱{totalAmount}</span></div>
        <h4 className="summaryTitle">Items:</h4>
        <ul className="orderItems">
          {orderSummary.items.map((item, index) => (
            <li key={index}>
              {item.name} - ₱{item.price} x {item.quantity}
            </li>
          ))}
        </ul>
      </div>

      <button type="submit" className="submitButton" onClick={handleSubmit}>Pay Now</button>

      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Payment;
