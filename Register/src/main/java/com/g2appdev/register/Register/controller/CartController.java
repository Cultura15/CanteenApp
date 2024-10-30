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

    
    //CREATE a new cart for the user
    @PostMapping("/user/{userId}")
    public ResponseEntity<CartEntity> createCart(@PathVariable int userId) {
        try {
          
            CartEntity cart = new CartEntity();
            cart.setTotalAmount(0); 

            
            RegisterEntity user = new RegisterEntity();
            user.setUserId(userId); 
            cart.setUser(user);

            
            CartEntity createdCart = cartService.createCart(cart);
            
            
            return ResponseEntity.status(HttpStatus.CREATED).body(createdCart);
        } catch (Exception e) {
            
            System.err.println("Error creating cart: " + e.getMessage());
                      
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


    //GET all carts
    @GetMapping
    public ResponseEntity<List<CartEntity>> getAllCarts() {
        List<CartEntity> carts = cartService.getAllCarts();
        return ResponseEntity.ok(carts);
    }

    
    
    //GET cart of a specific user through userID
    @GetMapping("/user/{userId}")
    public ResponseEntity<CartDTO> getCartByUserId(@PathVariable int userId) {
        CartEntity cart = cartService.createOrGetCart(userId);

        CartDTO cartDTO = new CartDTO();
        cartDTO.setCartId(cart.getCartId());
        List<CartItemDTO> cartItems = cart.getCartItems().stream()
            .map(cartItem -> {
                CartItemDTO itemDTO = new CartItemDTO();
                itemDTO.setCartItemId(cartItem.getCartItemId());
                itemDTO.setQuantity(cartItem.getQuantity());
                itemDTO.setPrice(cartItem.getPrice());
               
                return itemDTO;
            })
            .collect(Collectors.toList());
        
        cartDTO.setCartItems(cartItems);
        return ResponseEntity.ok(cartDTO);
    }
    
    // UPDATE a cart
    @PutMapping("/{id}")
    public ResponseEntity<CartEntity> updateCart(@PathVariable int id, @RequestBody CartEntity updatedCart) {
        try {
            CartEntity cart = cartService.updateCart(id, updatedCart);
            return ResponseEntity.ok(cart);
        } catch (Exception e) {
            System.err.println("Error updating cart: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    
    // DELETE a cart
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCart(@PathVariable int id) {
        try {
            cartService.deleteCart(id);
            System.out.print("Cart #" + id + " has been deleted");
            return ResponseEntity.noContent().build();
            
        } catch (Exception e) {
            System.err.println("Error deleting cart: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } 
    }
    
}
