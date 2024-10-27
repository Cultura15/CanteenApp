package com.g2appdev.register.Register.dto;

public class CartItemDTO {
    private int cartItemId;
    private int quantity;
    private double price;
    private int menuItemId; // Or any other fields you want to expose

    // Getter for cartItemId
    public int getCartItemId() {
        return cartItemId;
    }

    // Setter for cartItemId
    public void setCartItemId(int cartItemId) {
        this.cartItemId = cartItemId;
    }

    // Getter for quantity
    public int getQuantity() {
        return quantity;
    }

    // Setter for quantity
    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    // Getter for price
    public double getPrice() {
        return price;
    }

    // Setter for price
    public void setPrice(double price) {
        this.price = price;
    }

    // Getter for menuItemId
    public int getMenuItemId() {
        return menuItemId;
    }

    // Setter for menuItemId
    public void setMenuItemId(int menuItemId) {
        this.menuItemId = menuItemId;
    }
}
