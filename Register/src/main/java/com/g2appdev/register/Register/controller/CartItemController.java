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
<<<<<<< HEAD
    
    
    @PostMapping("/user/{userId}")
    public ResponseEntity<CartItemDTO> addCartItem(@PathVariable int userId, @RequestBody CartItemEntity cartItem) {
        // Fetch the cart for the given userId
        CartEntity existingCart = cartService.getCartByUserId(userId); // You need to implement this method in your service
=======

    
    //POST the cart item to the cart_id created by the user
    @PostMapping("/user/{userId}")
    public ResponseEntity<CartItemDTO> addCartItem(@PathVariable int userId, @RequestBody CartItemEntity cartItem) {
        
        CartEntity existingCart = cartService.getCartByUserId(userId); 

>>>>>>> add469f (fourth commit)
        if (existingCart != null) {
            CartItemEntity newCartItem = new CartItemEntity();
            newCartItem.setCart(existingCart);
            MenuEntity menuItem = new MenuEntity();
            menuItem.setMenuItemID(cartItem.getMenuItem().getMenuItemID());
            newCartItem.setMenuItem(menuItem);
            newCartItem.setQuantity(cartItem.getQuantity());
            newCartItem.setPrice(cartItem.getPrice());
<<<<<<< HEAD
=======
            newCartItem.setName(cartItem.getName());
            newCartItem.setCategory(cartItem.getCategory());

>>>>>>> add469f (fourth commit)
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
<<<<<<< HEAD
=======

    //GET all cart items
>>>>>>> add469f (fourth commit)
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
    public ResponseEntity<List<CartItemDTO>> getCartItemsByUserId(@PathVariable int userId) {
<<<<<<< HEAD
        // Fetch the cart for the given userId
        CartEntity cart = cartService.getCartByUserId(userId); // Ensure this method exists
        if (cart != null) {
            List<CartItemEntity> cartItems = cartItemService.getCartItemsByCartId(cart.getCartId()); // Implement this method in your service
            // Convert to DTOs
=======
        
        CartEntity cart = cartService.getCartByUserId(userId); 

        if (cart != null) {
            List<CartItemEntity> cartItems = cartItemService.getCartItemsByCartId(cart.getCartId()); 

>>>>>>> add469f (fourth commit)
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
<<<<<<< HEAD
=======

    
    //GET a specific cart item by cartItemId
>>>>>>> add469f (fourth commit)
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
<<<<<<< HEAD
=======
    
    //UPDATE a cart item
    @PutMapping("/{cartItemId}")
    public ResponseEntity<CartItemEntity> updateCartItem(@PathVariable int cartItemId, @RequestBody CartItemEntity updatedCartItem) {
        try {
            CartItemEntity updatedItem = cartItemService.updateCartItem(cartItemId, updatedCartItem);
            return ResponseEntity.ok(updatedItem);
        } catch (Exception e) {
            System.err.println("Error updating cart item: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    
    //DELETE a cart item
>>>>>>> add469f (fourth commit)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCartItem(@PathVariable int id) {
        cartItemService.deleteCartItem(id);
        return ResponseEntity.noContent().build();
    }
<<<<<<< HEAD
}
=======
    
 // DELETE all cart items by userId
    @DeleteMapping("/user/{userId}")
    public ResponseEntity<Void> deleteAllCartItemsByUserId(@PathVariable int userId) {
        // Fetch the cart associated with the given userId
        CartEntity cart = cartService.getCartByUserId(userId);

        // Check if the cart exists
        if (cart != null) {
            // Fetch all cart items associated with the cartId
            List<CartItemEntity> cartItems = cartItemService.getCartItemsByCartId(cart.getCartId());

            // Check if there are items to delete
            if (!cartItems.isEmpty()) {
                // Delete each cart item associated with the cart
                for (CartItemEntity cartItem : cartItems) {
                    cartItemService.deleteCartItem(cartItem.getCartItemId());
                }
                return ResponseEntity.noContent().build(); // Return 204 No Content status if deletion is successful
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // Return 404 if there are no items to delete
            }
        } else {
            // Return 404 Not Found if the cart doesn't exist for the given userId
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

}
>>>>>>> add469f (fourth commit)
