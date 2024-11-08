import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './PaymentMethod.css';

const PaymentMethod = () => {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState('Credit/Debit Card');
  const [paymentMethods] = useState([
    { name: 'Credit/Debit Card', imgSrc: '/images/creditcard.png' },
    { name: 'GCash', imgSrc: '/images/gcash.png' },
    { name: 'PayPal', imgSrc: '/images/paypal.png' },
    { name: 'Cash', imgSrc: '/images/money.png' },
  ]);

  const generatePaymentDetails = () => ({
    orderID: Math.floor(Math.random() * 100) + 1,
    paymentDate: new Date().toISOString().split('T')[0],
    amount: (Math.random() * 100 + 100).toFixed(2),
  });

  const [paymentDetails, setPaymentDetails] = useState(generatePaymentDetails());
  const [message, setMessage] = useState('');
  const [paymentsList, setPaymentsList] = useState([]);
  const [showPayments, setShowPayments] = useState(false); // State to toggle the payments list

  const handleSubmit = async (e) => {
    e.preventDefault();
    const paymentData = {
      paymentMethod: selectedMethod,
      ...paymentDetails,
    };

    console.log("Payment Data Sent:", paymentData);

    try {
      const response = await axios.post('http://localhost:8080/api/paymentmethod/addp', paymentData);
      console.log("Response from server:", response.data);
      setMessage('Payment successful!');
      navigate('/successful-payment', { state: paymentData }); // Pass paymentData to the next page
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      setMessage('Payment failed. Please try again.');
    }
  };

  const fetchPayments = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/paymentmethod/get');
      setPaymentsList(response.data);
      setShowPayments(true);
    } catch (error) {
      console.error('Error fetching payments:', error);
      setMessage('Failed to fetch payments. Please try again.');
    }
  };

  const handleEdit = (orderID) => {
    const paymentToEdit = paymentsList.find(payment => payment.orderID === orderID);
    // Here you can implement your edit logic
    // For instance, you might open a modal to edit payment details
    console.log("Editing payment:", paymentToEdit);
  };

  const handleDelete = async (orderID) => {
    try {
      await axios.delete(`http://localhost:8080/api/paymentmethod/delete/${orderID}`); // Adjust the URL as needed
      setPaymentsList(paymentsList.filter(payment => payment.orderID !== orderID));
      setMessage('Payment deleted successfully!');
    } catch (error) {
      console.error('Error deleting payment:', error);
      setMessage('Failed to delete payment. Please try again.');
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
      <button className="listButton" onClick={fetchPayments}>List of Payments</button>

      {message && <p className="message">{message}</p>}

      {showPayments && (
        <div className="paymentsList">
          <h4>Payments List</h4>
          <ul>
            {paymentsList.map((payment) => (
              <li key={payment.orderID} className="paymentItem">
                <strong>Order ID:</strong> {payment.orderID}, <strong>Method:</strong> {payment.paymentMethod}, <strong>Date:</strong> {payment.paymentDate}, <strong>Amount:</strong> ₱{payment.amount}
                <div className="paymentActions">
                  <button className="editButton" onClick={() => handleEdit(payment.orderID)}>Edit</button>
                  <button className="deleteButton" onClick={() => handleDelete(payment.orderID)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
          <button onClick={() => setShowPayments(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default PaymentMethod;
