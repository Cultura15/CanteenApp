package com.g2appdev.teambangan.controller;

import com.g2appdev.teambangan.entity.Feedback;
import com.g2appdev.teambangan.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    // Create (POST)
    @PostMapping("/addfeedback")
    public Feedback addFeedback(@RequestBody Feedback feedback) {
        return feedbackService.saveFeedback(feedback);
    }

    // Retrieve all (GET)
    @GetMapping("/allfeedback")
    public List<Feedback> getAllFeedback() {
        return feedbackService.getAllFeedbacks();
    }
    
    // Update (PUT)
    @PutMapping("/update/{id}")
    public Feedback updateFeedback(@PathVariable int id, @RequestBody Feedback feedbackDetails) {
        return feedbackService.updateFeedback(id, feedbackDetails);
    }
 
    // Delete (DELETE)
    @DeleteMapping("/delete/{id}")
    public String deleteFeedback(@PathVariable int id) {
        return feedbackService.deleteFeedback(id);
    }
}
