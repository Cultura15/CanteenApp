package com.g2appdev.register.Register.dto;

import java.sql.Date;

public class PaymentDTO {

    private int paymentId;
    private String paymentMethod;
    private Date paymentDate;
    private double totalAmount;
    private int cartId; 

    
    public PaymentDTO() {}


    public PaymentDTO(int paymentId, String paymentMethod, Date paymentDate, double totalAmount, int cartId) {
        this.paymentId = paymentId;
        this.paymentMethod = paymentMethod;
        this.paymentDate = paymentDate;
        this.totalAmount = totalAmount;
        this.cartId = cartId;
    }
    

    // Getters and Setters
    public int getPaymentId() {
        return paymentId;
    }

    public void setPaymentId(int paymentId) {
        this.paymentId = paymentId;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public Date getPaymentDate() {
        return paymentDate;
    }

    public void setPaymentDate(Date paymentDate) {
        this.paymentDate = paymentDate;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public int getCartId() {
        return cartId;
    }

    public void setCartId(int cartId) {
        this.cartId = cartId;
    }
}