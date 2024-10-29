import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EditFeedback.css';

const StarRating = ({ rating, onRatingChange }) => {
  return (
    <div className="rating-stars">
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          className={`star ${rating >= i + 1 ? 'selected' : ''}`}
          onClick={() => onRatingChange(i + 1)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

const EditFeedback = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [editingFeedback, setEditingFeedback] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/feedback/allfeedback');
        setFeedbackList(response.data);
      } catch (error) {
        console.error('Error fetching feedback:', error);
      }
    };
    fetchFeedback();
  }, []);

  const handleUpdateFeedback = async (feedbackID, updatedFeedback) => {
    try {
      await axios.put(`http://localhost:8080/api/feedback/update/${feedbackID}`, updatedFeedback);
      alert('Feedback updated successfully!');
      const response = await axios.get('http://localhost:8080/api/feedback/allfeedback');
      setFeedbackList(response.data);
      setEditingFeedback(null);
    } catch (error) {
      console.error('Error updating feedback:', error);
    }
  };

  const handleDeleteFeedback = async (feedbackID) => {
    try {
      await axios.delete(`http://localhost:8080/api/feedback/delete/${feedbackID}`);
      alert('Feedback deleted successfully!');
      setFeedbackList(feedbackList.filter(item => item.feedbackID !== feedbackID));
    } catch (error) {
      console.error('Error deleting feedback:', error);
    }
  };

  const handleEditClick = (item) => {
    setEditingFeedback(item);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingFeedback({ ...editingFeedback, [name]: value });
  };

  const handleReturn = () => {
    navigate('/feedback-manager');
  };

  return (
    <div className="edit-feedback-card">
      <h2>All Feedback</h2>
      <ul>
        {feedbackList.map((item) => (
          <li key={item.feedbackID}>
            {editingFeedback && editingFeedback.feedbackID === item.feedbackID ? (
              <div>
                <StarRating 
                  rating={editingFeedback.rating} 
                  onRatingChange={(rating) => setEditingFeedback({ ...editingFeedback, rating })} 
                />
                <textarea
                  name="comments"
                  value={editingFeedback.comments}
                  onChange={handleInputChange}
                  placeholder="Comments"
                  rows="2"
                />
                <button 
                  onClick={() => handleUpdateFeedback(item.feedbackID, editingFeedback)} 
                  className="submit-button"
                >
                  Update
                </button>
                <button 
                  onClick={() => setEditingFeedback(null)} 
                  className="submit-button"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div>
                <strong>Rating:</strong> {item.rating} | <strong>Comments:</strong> {item.comments}
                <button 
                  onClick={() => handleEditClick(item)} 
                  className="submit-button"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDeleteFeedback(item.feedbackID)} 
                  className="submit-button delete-button"
                >
                  Delete
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
      <button onClick={handleReturn} className="submit-button return-button">
        Return to Feedback Manager
      </button>
    </div>
  );
};

export default EditFeedback;
