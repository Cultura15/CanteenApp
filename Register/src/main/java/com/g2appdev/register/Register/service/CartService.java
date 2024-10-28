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

    // This method checks if a cart exists for the user; if not, it creates a new one
    public CartEntity createOrGetCart(int userId) {
        CartEntity existingCart = cartRepository.findByUser_UserId(userId);

        // Return the existing cart if it exists
        if (existingCart != null) {
            return existingCart;
        }

        // Otherwise, create a new cart
        RegisterEntity user = registerRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));

        CartEntity newCart = new CartEntity();
        newCart.setUser(user);
        newCart.setTotalAmount(0.0);
        
        return cartRepository.save(newCart);
    }
    
    public CartEntity createCart(CartEntity cart) {
        return cartRepository.save(cart);
    }


    public List<CartEntity> getAllCarts() {
        return cartRepository.findAll();
    }

    public CartEntity getCartByUserId(int userId) {
        return cartRepository.findByUser_UserId(userId);
    }

    public void deleteCart(int cartId) {
        cartRepository.deleteById(cartId);
    }
<<<<<<< HEAD
}
=======
}
>>>>>>> a4a422e (second commit)
