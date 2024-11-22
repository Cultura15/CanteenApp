package com.g2appdev.register.Register.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;

@Entity
@Table(name = "cart_item")
public class CartItemEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cart_item_id")
    @JsonIgnore
    private int cartItemId;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "cart_id")
    @JsonIgnore
    private CartEntity cart;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "menu_id",  nullable = false)
    private MenuEntity menuItem;

    @Column(name = "quantity", nullable = false)
    private int quantity = 1; 

    @Column(name = "price", nullable = false)
    private double price;
    
    @Column(name = "name", nullable = false)
    private String name;
    
    @Column(name = "category", nullable = false)
    private String category;
    

    @Column(nullable = false)
    private String status = "active";
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private RegisterEntity user;
    


    public CartItemEntity() {}

    public CartItemEntity(CartEntity cart, MenuEntity menuItem, int quantity, double price, String name, String category, String status) {
        this.cart = cart;
        this.menuItem = menuItem;
        this.quantity = quantity;
        this.price = price;
        this.name= name;
        this.category = category;
        this.status = status;
        
    }
    
    
    //Getters Setters
    public int getCartItemId() {
        return cartItemId;
    }

    public CartEntity getCart() {
        return cart;
    }

    public void setCart(CartEntity cart) {
        this.cart = cart;
    }

    public MenuEntity getMenuItem() {
        return menuItem;
    }

    public void setMenuItem(MenuEntity menuItem) {
        this.menuItem = menuItem;
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
    
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
    
    public RegisterEntity getUser() {  // Add this getter
        return user;
    }

    public void setUser(RegisterEntity user) {
        this.user = user;
    }
    
}