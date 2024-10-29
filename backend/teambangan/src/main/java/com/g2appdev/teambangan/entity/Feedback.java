package com.g2appdev.teambangan.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.util.Date;

@Entity
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int feedbackID;

    private String userID;  // Changed to String as per new design
    private int orderID;    // New field
    private int cartID;
    private String rating;
    private String comments;
    private Date feedbackDate;  // Changed to Date

    public Feedback() {
        super();
    }

    public Feedback(int feedbackID, String userID, int orderID, int cartID, String rating, String comments, Date feedbackDate) {
        super();
        this.feedbackID = feedbackID;
        this.userID = userID;
        this.orderID = orderID;
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

    public String getUserID() {
        return userID;
    }

    public void setUserID(String userID) {
        this.userID = userID;
    }

    public int getOrderID() {
        return orderID;
    }

    public void setOrderID(int orderID) {
        this.orderID = orderID;
    }

    public int getCartID() {
        return cartID;
    }

    public void setCartID(int cartID) {
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
