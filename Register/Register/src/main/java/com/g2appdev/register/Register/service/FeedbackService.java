package com.g2appdev.register.Register.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.g2appdev.register.Register.entity.FeedbackEntity;
import com.g2appdev.register.Register.entity.CartEntity; 
import com.g2appdev.register.Register.repository.FeedbackRepository;
import com.g2appdev.register.Register.repository.CartRepository; 

@Service
public class FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepo;

    @Autowired
    private CartRepository cartRepo; 

    // Save Feedback (POST) by cartId
    public FeedbackEntity saveFeedbackByCartId(int cartId, FeedbackEntity feedback) {
        CartEntity cart = cartRepo.findById(cartId)
                .orElseThrow(() -> new RuntimeException("Cart not found with id " + cartId));

        feedback.setCartID(cart); 
        return feedbackRepo.save(feedback);
    }
    

    // Get all Feedbacks (GET)
    public List<FeedbackEntity> getAllFeedbacks() {
        return feedbackRepo.findAll();
    }
    

    // Update Feedback (PUT)
    public FeedbackEntity updateFeedback(int id, FeedbackEntity feedbackDetails) {
        FeedbackEntity feedback = feedbackRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Feedback not found with id " + id));

  
        feedback.setRating(feedbackDetails.getRating());
        feedback.setComments(feedbackDetails.getComments());
        feedback.setFeedbackDate(feedbackDetails.getFeedbackDate());

        return feedbackRepo.save(feedback);
    }
    

    // Delete Feedback (DELETE)
    public String deleteFeedback(int id) {
        FeedbackEntity feedback = feedbackRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Feedback not found with id " + id));

        feedbackRepo.delete(feedback);
        return "Feedback deleted with id " + id;
    }
}
