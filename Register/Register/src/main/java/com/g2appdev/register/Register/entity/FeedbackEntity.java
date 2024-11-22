package com.g2appdev.register.Register.entity;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "feedback")
public class FeedbackEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int feedbackID;
    
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "cart_id", nullable = false)
    @JsonIgnore
    private CartEntity cartID;
    
    
    private String rating;
    private String comments;
    private Date feedbackDate;  

    public FeedbackEntity() {}

    public FeedbackEntity(int feedbackID, CartEntity cartID, String rating, String comments, Date feedbackDate) {
        this.feedbackID = feedbackID;
        this.cartID = cartID;
        this.rating = rating;
        this.comments = comments;
        this.feedbackDate = feedbackDate;
    }

    
    
    // Getters and Setters
    
    public int getFeedbackID() {
        return feedbackID;
    }

    public void setFeedbackID(int feedbackID) {
        this.feedbackID = feedbackID;
    }

  
    public CartEntity getCartID() {
        return cartID;
    }

    public void setCartID(CartEntity cartID) {
        this.cartID = cartID;
    }

    public String getRating() {
        return rating;
    }

    public void setRating(String rating) {
        this.rating = rating;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public Date getFeedbackDate() {
        return feedbackDate;
    }

    public void setFeedbackDate(Date feedbackDate) {
        this.feedbackDate = feedbackDate;
    }
    
}
