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

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "cart_id")
    private CartEntity cart;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "menu_id",  nullable = false)
    private MenuEntity menuItem;

    @Column(name = "quantity", nullable = false)
    private int quantity = 1; // Default value to avoid SQL errors

    @Column(name = "price", nullable = false)
    private double price;

    public CartItemEntity() {}

    public CartItemEntity(CartEntity cart, MenuEntity menuItem, int quantity, double price) {
        this.cart = cart;
        this.menuItem = menuItem;
        this.quantity = quantity;
        this.price = price;
    }

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
}
