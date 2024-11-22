package com.g2appdev.register.Register.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "order_item")
public class OrderItemEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_item_id")
    private int orderItemId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "payment_id")
    private PaymentEntity payment;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "cart_item_id") // Make sure to create a column for cart_item_id in your order_item table
    private CartItemEntity cartItem; // Add this field
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")  // Add the user reference
    private RegisterEntity user;

    private String name;
    private String category;
    private int quantity;
    private double price;

    // Getters and Setters

    public int getOrderItemId() {
        return orderItemId;
    }

    public void setOrderItemId(int orderItemId) {
        this.orderItemId = orderItemId;
    }

    public PaymentEntity getPayment() {
        return payment;
    }

    public void setPayment(PaymentEntity payment) {
        this.payment = payment;
    }

    public CartItemEntity getCartItem() { // Add this getter
        return cartItem;
    }

    public void setCartItem(CartItemEntity cartItem) { // Add this setter
        this.cartItem = cartItem;
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
    
    public RegisterEntity getUser() {  // Add this getter
        return user;
    }

    public void setUser(RegisterEntity user) {
        this.user = user;
    }
}