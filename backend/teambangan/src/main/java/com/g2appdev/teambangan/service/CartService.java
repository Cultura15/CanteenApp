package com.g2appdev.teambangan.service;

import com.g2appdev.teambangan.entity.Cart;
import com.g2appdev.teambangan.repository.CartRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartService {

    @Autowired
    private CartRepo cartRepo;

    // Save Cart (POST)
    public Cart saveCart(Cart cart) {
        return cartRepo.save(cart);
    }

    // Get all Carts (GET)
    public List<Cart> getAllCarts() {
        return cartRepo.findAll();
    }

    // Update Cart (PUT)
    public Cart updateCart(int id, Cart cartDetails) {
        Cart cart = cartRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Cart not found with id " + id));

        cart.setUserID(cartDetails.getUserID());
        cart.setTotalAmount(cartDetails.getTotalAmount());
        cart.setOrderDate(cartDetails.getOrderDate());
        cart.setOrderStatus(cartDetails.getOrderStatus());

        return cartRepo.save(cart);
    }

    // Delete Cart (DELETE)
    public String deleteCart(int id) {
        Cart cart = cartRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Cart not found with id " + id));

        cartRepo.delete(cart);
        return "Cart deleted with id " + id;
    }
}
