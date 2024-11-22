package com.g2appdev.register.Register.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;

@Entity
@Table(name = "cart")
public class CartEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cart_id")
    private int cartId;

    @Column(name = "total_amount", nullable = false)
    private double totalAmount;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private RegisterEntity user;
    
    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<CartItemEntity> cartItems = new ArrayList<>();

    public CartEntity() {}

    public CartEntity(double totalAmount, RegisterEntity user) {
        this.totalAmount = totalAmount;
        this.user = user;
    }
    
    public CartEntity(int cartId) {
        this.cartId = cartId;
    }
    
    

    //Getters Setters
    public int getCartId() {
        return cartId;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public RegisterEntity getUser() {
        return user;
    }

    public void setUser(RegisterEntity user) {
        this.user = user;
    }
    
    public List<CartItemEntity> getCartItems() {
        return cartItems;
    }

    public void setCartItems(List<CartItemEntity> cartItems) {
        this.cartItems = cartItems;
    }

}
