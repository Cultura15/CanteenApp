package com.g2appdev.register.Register.dto;

public class OrderItemDTO {
    private int orderItemId;
    private int quantity;
    private double price;
    private String name;
    private String category;
    private int paymentId;
    private int userId;  // Add userId field
    private double paymentAmount; // Include payment amount if needed
    private String paymentMethod;

    // Getters and Setters
    public int getOrderItemId() {
        return orderItemId;
    }

    public void setOrderItemId(int orderItemId) {
        this.orderItemId = orderItemId;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public int getPaymentId() {
        return paymentId;
    }

    public void setPaymentId(int paymentId) {
        this.paymentId = paymentId;
    }

    public int getUserId() {
        return userId; // Add getter for userId
    }

    public void setUserId(int userId) {
        this.userId = userId; // Add setter for userId
    }
    
    public double getTotalAmount() {
        return paymentAmount;
    }

    public void setTotalAmount(double paymentAmount) {
        this.paymentAmount = paymentAmount;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }
}
