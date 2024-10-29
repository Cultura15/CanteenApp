import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Feedback.css';


const Feedback = () => {
  const [newFeedback, setNewFeedback] = useState({
    rating: '',
    comments: '',
    feedbackDate: new Date().toISOString(),
  });
  const navigate = useNavigate();
  const generateAutoID = () => Math.floor(Math.random() * 10000).toString();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFeedback({ ...newFeedback, [name]: value });
  };
  const handleCreateFeedback = async () => {
    if (!newFeedback.rating || !newFeedback.comments) {
      alert('Please fill all fields.');
      return;
    }
    const feedbackWithIDs = {
      ...newFeedback,
      userID: generateAutoID(),
      orderID: generateAutoID(),
      cartID: generateAutoID(),
    };
    try {
      await axios.post('http://localhost:8080/api/feedback/addfeedback', feedbackWithIDs);
      setNewFeedback({ rating: '', comments: '', feedbackDate: new Date().toISOString() });
    } catch (error) {
      console.error('Error creating feedback:', error);
    }
  };
  const handleNavigateToEditFeedback = () => {
    navigate('/edit-feedback');
  };
  return (
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
      {/* Move the Edit Feedback button below the Submit Feedback button */}
      <button onClick={handleNavigateToEditFeedback} className="submit-button edit-feedback-button">
        Edit Feedback
      </button>
    </div>
  );
};
export default Feedback;