package com.g2appdev.register.Register.controller;

import com.g2appdev.register.Register.dto.CartItemDTO;
import com.g2appdev.register.Register.entity.CartEntity;
import com.g2appdev.register.Register.entity.CartItemEntity;
import com.g2appdev.register.Register.entity.MenuEntity;
import com.g2appdev.register.Register.service.CartItemService;
import com.g2appdev.register.Register.service.CartService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/cart-items")
public class CartItemController {

    @Autowired
    private CartItemService cartItemService;
    
    @Autowired 
    private CartService cartService;

    @PostMapping("/user/{userId}")
    public ResponseEntity<CartItemDTO> addCartItem(@PathVariable int userId, @RequestBody CartItemEntity cartItem) {
        // Fetch the cart for the given userId
        CartEntity existingCart = cartService.getCartByUserId(userId); // You need to implement this method in your service

        if (existingCart != null) {
            CartItemEntity newCartItem = new CartItemEntity();
            newCartItem.setCart(existingCart);
            MenuEntity menuItem = new MenuEntity();
            menuItem.setMenuItemID(cartItem.getMenuItem().getMenuItemID());
            newCartItem.setMenuItem(menuItem);
            newCartItem.setQuantity(cartItem.getQuantity());
            newCartItem.setPrice(cartItem.getPrice());

            try {
                CartItemEntity savedCartItem = cartItemService.createCartItem(newCartItem);
                
                // Convert to DTO
                CartItemDTO cartItemDTO = new CartItemDTO();
                cartItemDTO.setCartItemId(savedCartItem.getCartItemId());
                cartItemDTO.setQuantity(savedCartItem.getQuantity());
                cartItemDTO.setPrice(savedCartItem.getPrice());
                cartItemDTO.setMenuItemId(savedCartItem.getMenuItem().getMenuItemID());

                return ResponseEntity.status(HttpStatus.CREATED).body(cartItemDTO);
            } catch (NoSuchElementException e) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @GetMapping
    public ResponseEntity<List<CartItemDTO>> getAllCartItems() {
        List<CartItemEntity> cartItems = cartItemService.getAllCartItems();
        
        // Convert to DTOs
        List<CartItemDTO> cartItemDTOs = cartItems.stream().map(cartItem -> {
            CartItemDTO dto = new CartItemDTO();
            dto.setCartItemId(cartItem.getCartItemId());
            dto.setQuantity(cartItem.getQuantity());
            dto.setPrice(cartItem.getPrice());
            dto.setMenuItemId(cartItem.getMenuItem().getMenuItemID());
            return dto;
        }).toList();

        return ResponseEntity.ok(cartItemDTOs);
    }
    
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<CartItemDTO>> getCartItemsByUserId(@PathVariable int userId) {
        // Fetch the cart for the given userId
        CartEntity cart = cartService.getCartByUserId(userId); // Ensure this method exists

        if (cart != null) {
            List<CartItemEntity> cartItems = cartItemService.getCartItemsByCartId(cart.getCartId()); // Implement this method in your service

            // Convert to DTOs
            List<CartItemDTO> cartItemDTOs = cartItems.stream().map(cartItem -> {
                CartItemDTO dto = new CartItemDTO();
                dto.setCartItemId(cartItem.getCartItemId());
                dto.setQuantity(cartItem.getQuantity());
                dto.setPrice(cartItem.getPrice());
                dto.setMenuItemId(cartItem.getMenuItem().getMenuItemID());
                return dto;
            }).collect(Collectors.toList());

            return ResponseEntity.ok(cartItemDTOs);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<CartItemDTO> getCartItemById(@PathVariable int id) {
        try {
            CartItemEntity cartItem = cartItemService.getCartItemById(id);
            // Convert to DTO
            CartItemDTO cartItemDTO = new CartItemDTO();
            cartItemDTO.setCartItemId(cartItem.getCartItemId());
            cartItemDTO.setQuantity(cartItem.getQuantity());
            cartItemDTO.setPrice(cartItem.getPrice());
            cartItemDTO.setMenuItemId(cartItem.getMenuItem().getMenuItemID());
            return ResponseEntity.ok(cartItemDTO);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCartItem(@PathVariable int id) {
        cartItemService.deleteCartItem(id);
        return ResponseEntity.noContent().build();
    }
<<<<<<< HEAD
}
=======
}
>>>>>>> a4a422e (second commit)
