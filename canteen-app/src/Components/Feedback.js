import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Feedback.css';

const Feedback = () => {
  const [cartId, setCartId] = useState(null);
  const [newFeedback, setNewFeedback] = useState({
    rating: '',
    comments: '',
    feedbackDate: new Date().toISOString(),
  });
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    const fetchCartId = async () => {
      if (!userId || isNaN(userId)) {
        console.error('Invalid user ID:', userId);
        alert('Invalid user ID. Please log in again.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:8080/api/cart/user/${userId}`);
        setCartId(response.data.cartId);
      } catch (error) {
        console.error('Error fetching cart ID:', error);
        alert('Could not fetch cart ID. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    const fetchOrderHistory = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/orders/history/${userId}`);
        setOrderHistory(response.data || []);
      } catch (error) {
        console.error('Error fetching order history:', error);
      }
    };

    fetchCartId();
    fetchOrderHistory();
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFeedback({ ...newFeedback, [name]: value });
  };

  const handleCreateFeedback = async () => {
    if (!newFeedback.rating || !newFeedback.comments) {
      alert('Please fill all fields.');
      return;
    }

    const feedbackData = {
      ...newFeedback,
      feedbackDate: new Date().toISOString(),
    };

    try {
      await axios.post(`http://localhost:8080/api/feedback/${cartId}`, feedbackData);
      setNewFeedback({ rating: '', comments: '', feedbackDate: new Date().toISOString() });
      
      alert('Feedback submitted! Thank you for your input.');
      navigate('/canteen1');
    } catch (error) {
      console.error('Error creating feedback:', error);
      alert('There was an error submitting your feedback. Please try again later.');
    }
  };

  if (loading) {
    return <div>Loading your feedback form...</div>;
  }

  return (
    <div className="feedback-container">
      {/* Left side: Order History */}
      <div className="order-history">
        <h3>Order History</h3>
        <ul className="order-list">
          {orderHistory.length > 0 ? (
            orderHistory.map((order, index) => (
              <li key={index} className="order-item">
                <span>Order #{order.orderId}</span> - <span>{order.date}</span>
                <div>Total: ₱{order.totalAmount}</div>
              </li>
            ))
          ) : (
            <p>No previous orders found.</p>
          )}
        </ul>
      </div>

      {/* Right side: Feedback Form */}
      <div className="feedback-card">
        <h2 className="feedback-title">Feedback</h2>
        <p className="feedback-subtitle">We'd love to hear about your experience!</p>
        <div className="feedback-input-group">
          <label className="feedback-label">Rate your experience</label>
          <div className="rating-stars">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`star ${newFeedback.rating >= i + 1 ? 'selected' : ''}`}
                onClick={() => setNewFeedback({ ...newFeedback, rating: (i + 1).toString() })}
              >
                ★
              </span>
            ))}
          </div>
        </div>
        <div className="feedback-input-group centered-input">
          <label className="feedback-label">Your comments</label>
          <textarea
            name="comments"
            placeholder="Tell us what you liked or how we can improve..."
            value={newFeedback.comments}
            onChange={handleInputChange}
            rows="4"
          />
        </div>
        <button onClick={handleCreateFeedback} className="submit-button">
          <span className="submit-icon">🍔</span> Submit Feedback
        </button>
      </div>
    </div>
  );
};

export default Feedback;
