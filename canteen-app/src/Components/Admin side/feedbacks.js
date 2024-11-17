import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './users.css'; // Create this file for styling if needed

const Feedbacks = () => {
    const navigate = useNavigate();
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedFeedback, setSelectedFeedback] = useState(null); // For storing the feedback to be edited
    const [updateMode, setUpdateMode] = useState(false); // Toggle for update mode
    const [feedbackData, setFeedbackData] = useState({ rating: '', comments: '', feedbackDate: '' }); // State for feedback data input

    useEffect(() => {
        fetchFeedbacks();
    }, []);

    const fetchFeedbacks = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/feedback/allfeedback');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log("Fetched feedbacks:", data);
            setFeedbacks(data);
        } catch (error) {
            console.error("Error fetching feedbacks:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/feedback/update/${selectedFeedback}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(feedbackData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            await fetchFeedbacks(); // Refresh the feedback list after update
            setUpdateMode(false); // Exit update mode
            setFeedbackData({ rating: '', comments: '', feedbackDate: '' }); // Reset feedback data
            setSelectedFeedback(null);
        } catch (error) {
            console.error("Error updating feedback:", error);
            setError(error.message);
        }
    };

    const handleEdit = (feedback) => {
        setSelectedFeedback(feedback.feedbackID);
        setFeedbackData({
            rating: feedback.rating,
            comments: feedback.comments,
            feedbackDate: feedback.feedbackDate,
        });
        setUpdateMode(true);
    };

    const handleDelete = async (feedbackId) => {
        if (window.confirm("Are you sure you want to delete this feedback?")) {
            try {
                const response = await fetch(`http://localhost:8080/api/feedback/delete/${feedbackId}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                await fetchFeedbacks(); // Refresh the feedback list after deletion
            } catch (error) {
                console.error("Error deleting feedback:", error);
                setError(error.message);
            }
        }
    };

    const handleChange = (e) => {
        setFeedbackData({ ...feedbackData, [e.target.name]: e.target.value });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const handleLogout = () => {
        localStorage.removeItem("user_id"); // Remove user ID from local storage
        navigate('/login'); // Redirect to login page
    };

    return (
        <div className="admin-page">
            <header className="header">
                <div className="logo">LOGO</div>
                <nav className="nav-links">
                    <Link to="/admin">View Menu</Link>
                    <Link to="/admin/users">View Users</Link>
                    <Link to="/admin/transaction">View Transactions</Link>
                    <Link to="/admin/feedbacks">View Feedbacks</Link>
                    <Link to="/admin/orders">View Orders</Link>
                    <button onClick={handleLogout} className="logout-button">Log Out</button>
                </nav>
                <div className="canteen">Admin Panel</div>
            </header>
            <div className="horizontal-line"></div>

            <div className="admin-content">
                <div className="fixed-section">
                    <h2>Feedback List</h2>
                </div>

                                <div className="menu-items-container">
                    <h2>Current Feedbacks</h2>
                    <div className="categories-grid">
                        <ul>
                            {feedbacks.map(feedback => (
                                <li key={feedback.feedbackID}>
                                    <span>
                                        <strong style={{ backgroundColor: '#FFD700'}} className="feedback-id-highlight">Feedback ID: {feedback.feedbackID}</strong>
                                        &nbsp;- Rating: {feedback.rating} - {feedback.comments} - {feedback.feedbackDate}
                                    </span>
                                    <div className="button-group">
                                        <button onClick={() => handleEdit(feedback)}>Edit</button>
                                        <button className="delete-button" onClick={() => handleDelete(feedback.feedbackID)}>Delete</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>


                {updateMode && (
                    <div className="update-form">
                        <h3>Edit Feedback</h3>
                        <input type="text" name="rating" value={feedbackData.rating} onChange={handleChange} placeholder="Rating" />
                        <input type="text" name="comments" value={feedbackData.comments} onChange={handleChange} placeholder="Comments" />
                        <input type="date" name="feedbackDate" value={feedbackData.feedbackDate} onChange={handleChange} placeholder="Feedback Date" />
                        <button onClick={handleUpdate}>Update Feedback</button>
                        <button onClick={() => { setUpdateMode(false); setFeedbackData({ rating: '', comments: '', feedbackDate: '' }); }}>Cancel</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Feedbacks;
