package com.g2appdev.register.Register.controller;

import com.g2appdev.register.Register.dto.CartDTO;
import com.g2appdev.register.Register.dto.CartItemDTO;
import com.g2appdev.register.Register.entity.CartEntity;
import com.g2appdev.register.Register.entity.RegisterEntity;
import com.g2appdev.register.Register.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @PostMapping("/user/{userId}")
    public ResponseEntity<CartEntity> createCart(@PathVariable int userId) {
        try {
            // Create a new CartEntity
            CartEntity cart = new CartEntity();
            cart.setTotalAmount(0); // Set initial total amount

            // Set user for the cart
            RegisterEntity user = new RegisterEntity();
            user.setUserId(userId); // Set the user ID
            cart.setUser(user);

            // Save the cart using the service
            CartEntity createdCart = cartService.createCart(cart);
            
            // Return the created cart with a 201 status
            return ResponseEntity.status(HttpStatus.CREATED).body(createdCart);
        } catch (Exception e) {
            // Log the exception for debugging
            System.err.println("Error creating cart: " + e.getMessage());
            
            // Return a 500 Internal Server Error status
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


    @GetMapping
    public ResponseEntity<List<CartEntity>> getAllCarts() {
        List<CartEntity> carts = cartService.getAllCarts();
        return ResponseEntity.ok(carts);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<CartDTO> getCartByUserId(@PathVariable int userId) {
        CartEntity cart = cartService.createOrGetCart(userId);

        // Convert CartEntity to CartDTO
        CartDTO cartDTO = new CartDTO();
        cartDTO.setCartId(cart.getCartId());
        List<CartItemDTO> cartItems = cart.getCartItems().stream()
            .map(cartItem -> {
                CartItemDTO itemDTO = new CartItemDTO();
                itemDTO.setCartItemId(cartItem.getCartItemId());
                itemDTO.setQuantity(cartItem.getQuantity());
                itemDTO.setPrice(cartItem.getPrice());
                // Set additional fields if needed
                return itemDTO;
            })
            .collect(Collectors.toList());
        
        cartDTO.setCartItems(cartItems);
        return ResponseEntity.ok(cartDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCart(@PathVariable int id) {
        cartService.deleteCart(id);
        return ResponseEntity.noContent().build();
    }
<<<<<<< HEAD
}
=======
}
>>>>>>> a4a422e (second commit)
