package com.g2appdev.register.Register.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.g2appdev.register.Register.entity.CartEntity;
import com.g2appdev.register.Register.entity.FeedbackEntity;
import com.g2appdev.register.Register.service.FeedbackService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/feedback")
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    // Create (POST)
    @PostMapping("/{cartId}")
    public FeedbackEntity addFeedback(@PathVariable int cartId, @RequestBody FeedbackEntity feedback) {
        // Create a CartEntity object using the cartId from the URL
        CartEntity cartEntity = new CartEntity(cartId);	
        
        // Set the cart entity in the feedback object
        feedback.setCartID(cartEntity);
        
        // Save the feedback entity
        return feedbackService.saveFeedbackByCartId(cartId, feedback);
    }

    // Retrieve all (GET)
    @GetMapping("/allfeedback")
    public List<FeedbackEntity> getAllFeedback() {
        return feedbackService.getAllFeedbacks();
    }
    
    // Update (PUT)
    @PutMapping("/update/{id}")
    public FeedbackEntity updateFeedback(@PathVariable int id, @RequestBody FeedbackEntity feedbackDetails) {
        return feedbackService.updateFeedback(id, feedbackDetails);
    }
 
    // Delete (DELETE)
    @DeleteMapping("/delete/{id}")
    public String deleteFeedback(@PathVariable int id) {
        return feedbackService.deleteFeedback(id);
    }
}