package com.g2appdev.register.Register.service;

import com.g2appdev.register.Register.entity.CartEntity;
import com.g2appdev.register.Register.entity.RegisterEntity;
import com.g2appdev.register.Register.repository.CartRepository;
import com.g2appdev.register.Register.repository.RegisterRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private RegisterRepository registerRepository;

    // Method to create a Cart
    public CartEntity createCart(CartEntity cart) {
        return cartRepository.save(cart);
    }

    // Method to check if a cart exists for the user; if not, it creates a new one
    public CartEntity createOrGetCart(int userId) {
        CartEntity existingCart = cartRepository.findByUser_UserId(userId);

        if (existingCart != null) {
            return existingCart;
        }

        RegisterEntity user = registerRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));

        CartEntity newCart = new CartEntity();
        newCart.setUser(user);
        newCart.setTotalAmount(0.0);

        return cartRepository.save(newCart);
    }

    // Method to get all carts
    public List<CartEntity> getAllCarts() {
        return cartRepository.findAll();
    }

    // Method to get a cart by UserID
    public CartEntity getCartByUserId(int userId) {
        return cartRepository.findByUser_UserId(userId);
    }

    // Method to update a cart
    public CartEntity updateCart(int id, CartEntity updatedCart) {
        CartEntity existingCart = cartRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Cart not found"));

        existingCart.setTotalAmount(updatedCart.getTotalAmount());

        return cartRepository.save(existingCart);
    }

    // Method to delete a cart
    public void deleteCart(int cartId) {
        if (!cartRepository.existsById(cartId)) {
            throw new RuntimeException("Cart not found");
        }
        cartRepository.deleteById(cartId);
    }
    
 // Method to get CartEntity by cartId
    public CartEntity getCartById(int cartId) {
        return cartRepository.findById(cartId).orElse(null);  // Returns null if not found
    }
}
