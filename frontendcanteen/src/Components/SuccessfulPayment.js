// src/SuccessfulPayment.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './SuccessfulPayment.css';


const SuccessfulPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderID, paymentMethod, paymentDate, amount } = location.state || {};

  return (
    <div className="successfulPayment">
       <img src="/images/checked.png" alt="Success Icon" className="successIcon" /> {/* Direct path to image */}
      <h1>Payment Successful</h1>
      <p>Your payment was processed successfully.</p>

      <div className="receipt">
        <h2>Payment Receipt</h2>
        <div className="receiptRow"><strong>Order ID:</strong> <span>{orderID}</span></div>
        <div className="receiptRow"><strong>Payment Method:</strong> <span>{paymentMethod}</span></div>
        <div className="receiptRow"><strong>Payment Date:</strong> <span>{paymentDate}</span></div>
        <div className="receiptRow"><strong>Total Amount:</strong> <span>₱{amount}</span></div>
      </div>

      <button className="backButton" onClick={() => navigate('/')}>Back to Home</button>
    </div>
  );
};

export default SuccessfulPayment;
