package com.g2appdev.register.Register.dto;

import java.util.List;

public class CartDTO {
    private int cartId;
    private List<CartItemDTO> cartItems;

    // Getter for cartId
    public int getCartId() {
        return cartId;
    }

    // Setter for cartId
    public void setCartId(int cartId) {
        this.cartId = cartId;
    }

    // Getter for cartItems
    public List<CartItemDTO> getCartItems() {
        return cartItems;
    }

    // Setter for cartItems
    public void setCartItems(List<CartItemDTO> cartItems) {
        this.cartItems = cartItems;
    }

}


