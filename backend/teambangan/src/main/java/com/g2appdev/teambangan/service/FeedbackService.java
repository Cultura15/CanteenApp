package com.g2appdev.teambangan.service;

import com.g2appdev.teambangan.entity.Feedback;
import com.g2appdev.teambangan.repository.FeedbackRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeedbackService {

    @Autowired
    private FeedbackRepo feedbackRepo;

    // Save Feedback (POST)
    public Feedback saveFeedback(Feedback feedback) {
        return feedbackRepo.save(feedback);
    }

    // Get all Feedbacks (GET)
    public List<Feedback> getAllFeedbacks() {
        return feedbackRepo.findAll();
    }

    // Update Feedback (PUT)
    public Feedback updateFeedback(int id, Feedback feedbackDetails) {
        Feedback feedback = feedbackRepo.findById((long) id)
            .orElseThrow(() -> new RuntimeException("Feedback not found with id " + id));

        feedback.setUserID(feedbackDetails.getUserID());
        feedback.setOrderID(feedbackDetails.getOrderID());
        feedback.setCartID(feedbackDetails.getCartID());
        feedback.setRating(feedbackDetails.getRating());
        feedback.setComments(feedbackDetails.getComments());
        feedback.setFeedbackDate(feedbackDetails.getFeedbackDate());

        return feedbackRepo.save(feedback);
    }

    // Delete Feedback (DELETE)
    public String deleteFeedback(int id) {
        Feedback feedback = feedbackRepo.findById((long) id)
            .orElseThrow(() -> new RuntimeException("Feedback not found with id " + id));
        
        feedbackRepo.delete(feedback);
        return "Feedback deleted with id " + id;
    }
}
