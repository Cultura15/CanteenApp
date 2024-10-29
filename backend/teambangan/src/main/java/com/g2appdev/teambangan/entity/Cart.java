package com.g2appdev.teambangan.entity;

import jakarta.persistence.*;
import java.util.Date;


@Entity
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int cartID;

    private String userID;  // user ID, could also be an entity relation to User if needed
    private double totalAmount;
    private Date orderDate;
    private String orderStatus;



    public Cart() {
        super();
    }

    public Cart(int cartID, String userID, double totalAmount, Date orderDate, String orderStatus) {
        this.cartID = cartID;
        this.userID = userID;
        this.totalAmount = totalAmount;
        this.orderDate = orderDate;
        this.orderStatus = orderStatus;
    }

    // Getters and Setters

    public int getCartID() {
        return cartID;
    }

    public void setCartID(int cartID) {
        this.cartID = cartID;
    }

    public String getUserID() {
        return userID;
    }

    public void setUserID(String userID) {
        this.userID = userID;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public Date getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(Date orderDate) {
        this.orderDate = orderDate;
    }

    public String getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(String orderStatus) {
        this.orderStatus = orderStatus;
    }

}
