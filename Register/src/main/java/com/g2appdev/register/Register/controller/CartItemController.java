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

    
    //POST the cart item to the cart_id created by the user
    @PostMapping("/user/{userId}")
    public ResponseEntity<CartItemDTO> addCartItem(@PathVariable int userId, @RequestBody CartItemEntity cartItem) {
        
        CartEntity existingCart = cartService.getCartByUserId(userId); 

        if (existingCart != null) {
            CartItemEntity newCartItem = new CartItemEntity();
            newCartItem.setCart(existingCart);
            MenuEntity menuItem = new MenuEntity();
            menuItem.setMenuItemID(cartItem.getMenuItem().getMenuItemID());
            newCartItem.setMenuItem(menuItem);
            newCartItem.setQuantity(cartItem.getQuantity());
            newCartItem.setPrice(cartItem.getPrice());
            newCartItem.setName(cartItem.getName());
            newCartItem.setCategory(cartItem.getCategory());

            try {
                CartItemEntity savedCartItem = cartItemService.createCartItem(newCartItem);
                
                CartItemDTO cartItemDTO = new CartItemDTO();
                cartItemDTO.setCartItemId(savedCartItem.getCartItemId());
                cartItemDTO.setQuantity(savedCartItem.getQuantity());
                cartItemDTO.setPrice(savedCartItem.getPrice());
                cartItemDTO.setName(savedCartItem.getName());
                cartItemDTO.setCategory(savedCartItem.getCategory());
                cartItemDTO.setMenuItemId(savedCartItem.getMenuItem().getMenuItemID());

                return ResponseEntity.status(HttpStatus.CREATED).body(cartItemDTO);
            } catch (NoSuchElementException e) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    //GET all cart items
    @GetMapping
    public ResponseEntity<List<CartItemDTO>> getAllCartItems() {
        List<CartItemEntity> cartItems = cartItemService.getAllCartItems();
        
       
        List<CartItemDTO> cartItemDTOs = cartItems.stream().map(cartItem -> {
            CartItemDTO dto = new CartItemDTO();
            dto.setCartItemId(cartItem.getCartItemId());
            dto.setQuantity(cartItem.getQuantity());
            dto.setPrice(cartItem.getPrice());
            dto.setName(cartItem.getName());
            dto.setCategory(cartItem.getCategory());
            dto.setMenuItemId(cartItem.getMenuItem().getMenuItemID());
            return dto;
        }).toList();

        return ResponseEntity.ok(cartItemDTOs);
    }
    
    
    //GET cart items by userId
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<CartItemDTO>> getCartItemsByUserId(
            @PathVariable int userId, 
            @RequestParam(required = false) String status) {

        CartEntity cart = cartService.getCartByUserId(userId);

        if (cart != null) {
            // Call the service with status filter
            List<CartItemEntity> cartItems = cartItemService.getCartItemsByStatusAndCartId(cart.getCartId(), status);

            List<CartItemDTO> cartItemDTOs = cartItems.stream().map(cartItem -> {
                CartItemDTO dto = new CartItemDTO();
                dto.setCartItemId(cartItem.getCartItemId());
                dto.setQuantity(cartItem.getQuantity());
                dto.setPrice(cartItem.getPrice());
                dto.setName(cartItem.getName());
                dto.setCategory(cartItem.getCategory());
                dto.setMenuItemId(cartItem.getMenuItem().getMenuItemID());
                return dto;
            }).collect(Collectors.toList());

            return ResponseEntity.ok(cartItemDTOs);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    
    //GET a specific cart item by cartItemId
    @GetMapping("/{id}")
    public ResponseEntity<CartItemDTO> getCartItemById(@PathVariable int id) {
        try {
            CartItemEntity cartItem = cartItemService.getCartItemById(id);
       
            CartItemDTO cartItemDTO = new CartItemDTO();
            cartItemDTO.setCartItemId(cartItem.getCartItemId());
            cartItemDTO.setQuantity(cartItem.getQuantity());
            cartItemDTO.setPrice(cartItem.getPrice());
            cartItemDTO.setName(cartItem.getName());
            cartItemDTO.setCategory(cartItem.getCategory());
            cartItemDTO.setMenuItemId(cartItem.getMenuItem().getMenuItemID());
            return ResponseEntity.ok(cartItemDTO);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
    
    //UPDATE a cart item
//    @PutMapping("/{cartItemId}")
//    public ResponseEntity<CartItemEntity> updateCartItem(@PathVariable int cartItemId, @RequestBody CartItemEntity updatedCartItem) {
//        try {
//            CartItemEntity updatedItem = cartItemService.updateCartItem(cartItemId, updatedCartItem);
//            return ResponseEntity.ok(updatedItem);
//        } catch (Exception e) {
//            System.err.println("Error updating cart item: " + e.getMessage());
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
//        }
//    }
    
    @PutMapping("/{cartItemId}")
    public ResponseEntity<CartItemEntity> updateCartItem(@PathVariable int cartItemId, @RequestBody CartItemEntity updatedCartItem) {
        try {
            // Fetch the existing cart item
            CartItemEntity existingCartItem = cartItemService.getCartItemById(cartItemId);

            // Update only the status if provided in the request body
            if (updatedCartItem.getStatus() != null) {
                existingCartItem.setStatus(updatedCartItem.getStatus());
            }

            // Optionally, you can allow for other fields (like quantity) to be updated
            // if the updatedCartItem contains a value for it
            if (updatedCartItem.getQuantity() > 0) {
                existingCartItem.setQuantity(updatedCartItem.getQuantity());
            }

            // Save the updated item back to the database
            CartItemEntity updatedItem = cartItemService.updateCartItem(cartItemId, existingCartItem);

            return ResponseEntity.ok(updatedItem);
        } catch (Exception e) {
            System.err.println("Error updating cart item: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }


    
    //DELETE a cart item
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCartItem(@PathVariable int id) {
        cartItemService.deleteCartItem(id);
        return ResponseEntity.noContent().build();
    }
    
 // DELETE all cart items by userId
    @DeleteMapping("/user/{userId}")
    public ResponseEntity<Void> deleteAllCartItemsByUserId(@PathVariable int userId) {
        
        CartEntity cart = cartService.getCartByUserId(userId);

        
        if (cart != null) {
         
            List<CartItemEntity> cartItems = cartItemService.getCartItemsByCartId(cart.getCartId());

           
            if (!cartItems.isEmpty()) {
               
                for (CartItemEntity cartItem : cartItems) {
                    cartItemService.deleteCartItem(cartItem.getCartItemId());
                }
                return ResponseEntity.noContent().build(); 
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); 
            }
        } else {
          
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

}