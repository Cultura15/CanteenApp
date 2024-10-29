// src/PaymentMethod.js
import React, { useState } from 'react';
import axios from 'axios';
import './PaymentMethod.css';

const PaymentMethod = () => {
  const [selectedMethod, setSelectedMethod] = useState('Credit/Debit Card');
  const [paymentMethods] = useState([
    { name: 'Credit/Debit Card', imgSrc: '/images/creditcard.png' },
    { name: 'GCash', imgSrc: '/images/gcash.png' },
    { name: 'PayPal', imgSrc: '/images/paypal.png' },
    { name: 'Cash', imgSrc: '/images/money.png' },
  ]);

  const generatePaymentDetails = () => ({
    orderID: Math.floor(Math.random() * 100) + 1, // Random Order ID
    paymentDate: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
    amount: (Math.random() * 100 + 100).toFixed(2), // Random amount between 100 and 200
  });

  const [paymentDetails, setPaymentDetails] = useState(generatePaymentDetails);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const paymentData = {
      paymentMethod: selectedMethod,
      ...paymentDetails,
    };

    console.log("Payment Data Sent:", paymentData);

    try {
      const response = await axios.post('http://localhost:8080/api/paymentmethod/add', paymentData);
      console.log("Response from server:", response.data);
      setMessage('Payment successful!');
      setPaymentDetails(generatePaymentDetails()); // Refresh orderID and amount
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      setMessage('Payment failed. Please try again.');
    }
  };

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
            {method.name === 'Credit/Debit Card' && (
              <div className="cardIcons">
                <img src="/images/visa.png" alt="Visa" className="cardIcon" />
                <img src="/images/mastercard.png" alt="MasterCard" className="cardIcon" />
                <img src="/images/amex.png" alt="American Express" className="cardIcon" />
                <img src="/images/jcb.png" alt="JCB" className="cardIcon" />
              </div>
            )}
          </label>
        ))}
      </div>

      <div className="summary">
        <h4 className="summaryTitle">Order Summary</h4>
        <div className="summaryRow"><strong>Order ID:</strong> <span>{paymentDetails.orderID}</span></div>
        <div className="summaryRow"><strong>Payment Method:</strong> <span>{selectedMethod}</span></div>
        <div className="summaryRow"><strong>Payment Date:</strong> <span>{paymentDetails.paymentDate}</span></div>
        <div className="summaryRow"><strong>Total Amount:</strong> <span>₱{paymentDetails.amount}</span></div>
      </div>

      <button type="submit" className="submitButton" onClick={handleSubmit}>Pay Now</button>

      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default PaymentMethod;