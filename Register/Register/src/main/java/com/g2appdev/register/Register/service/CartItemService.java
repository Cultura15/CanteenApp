package com.g2appdev.register.Register.service;

import com.g2appdev.register.Register.entity.CartItemEntity;
import com.g2appdev.register.Register.entity.MenuEntity;
import com.g2appdev.register.Register.entity.OrderItemEntity;
import com.g2appdev.register.Register.repository.CartItemRepository;
import com.g2appdev.register.Register.repository.CartRepository;
import com.g2appdev.register.Register.repository.MenuRepository;
import com.g2appdev.register.Register.repository.OrderItemRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class CartItemService {

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private MenuRepository menuRepository;
    
    @Autowired CartRepository cartRepository;
   
    
    
    //Method to create a cartItem
    public CartItemEntity createCartItem(CartItemEntity cartItem) {
       
        if (cartItem.getMenuItem() == null || cartItem.getMenuItem().getMenuItemID() == 0) {
            throw new IllegalArgumentException("Menu item must not be null and must have a valid ID");
        }
        
        int menuId = cartItem.getMenuItem().getMenuItemID();
        System.out.println("Attempting to find MenuItem with ID: " + menuId);

        
        if (!menuRepository.existsById(menuId)) {
            throw new NoSuchElementException("Menu item with ID " + menuId + " does not exist in the database.");
        }
 
        MenuEntity menuEntity = menuRepository.findById(cartItem.getMenuItem().getMenuItemID())
        	    .orElseThrow(() -> new NoSuchElementException("Menu item not found"));

        cartItem.setMenuItem(menuEntity);

      
        return cartItemRepository.save(cartItem);
    }
    

    
    //Method to GET all cart items
    public List<CartItemEntity> getAllCartItems() {
        return cartItemRepository.findAll();
    }
    
    //Method to GET a specific cart item by CartId, which has been assign to a user.
    public List<CartItemEntity> getCartItemsByCartId(int cartId) {
        return cartItemRepository.findByCart_CartId(cartId);
    }

    //Method to GET a specific cart item.
    public CartItemEntity getCartItemById(int cartItemId) {
        return cartItemRepository.findById(cartItemId).orElse(null);
    }
    
    public Optional<CartItemEntity> getCartItemByIdinOrder(int cartItemId) {
        return cartItemRepository.findById(cartItemId);
    }
    
    public List<CartItemEntity> getCartItemsByStatusAndCartId(int cartId, String status) {
        if (status != null) {
            return cartItemRepository.findByCart_CartIdAndStatus(cartId, status);
        } else {
            return cartItemRepository.findByCart_CartId(cartId); // Return all if status is null
        }
    }
    
    public List<CartItemEntity> getCartItemsByCartIdAndStatus(int cartId, String status) {
        return cartItemRepository.findByCart_CartIdAndStatus(cartId, status);
    }
    
    public void updateCartItem1(CartItemEntity cartItem) {
        // You can perform additional logic here if needed
        if (cartItem != null && cartItem.getCartItemId() > 0) {
            // Ensure that the cart item is not null and has a valid ID before updating
            cartItemRepository.save(cartItem);  // Save the updated CartItem
        } else {
            // If cart item is invalid, throw an exception or handle the error accordingly
            throw new IllegalArgumentException("Invalid Cart Item or Cart Item ID");
        }
    }

    
    
 // Method to UPDATE a cart item
//    public CartItemEntity updateCartItem(int cartItemId, CartItemEntity updatedCartItem) {
//        CartItemEntity existingCartItem = cartItemRepository.findById(cartItemId)
//            .orElseThrow(() -> new RuntimeException("Cart item not found"));
//
//        existingCartItem.setQuantity(updatedCartItem.getQuantity());
//        
//        if (updatedCartItem.getMenuItem() != null) {
//            existingCartItem.setMenuItem(updatedCartItem.getMenuItem());
//        }
//
//        return cartItemRepository.save(existingCartItem);
//    }
    
    public CartItemEntity updateCartItem(int cartItemId, CartItemEntity updatedCartItem) {
        // Retrieve the existing cart item from the database
        CartItemEntity existingCartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new NoSuchElementException("Cart item not found"));

        // Update the status field if it's provided
        if (updatedCartItem.getStatus() != null) {
            existingCartItem.setStatus(updatedCartItem.getStatus());
        }

        // Optionally update other fields, such as quantity or price
        if (updatedCartItem.getQuantity() > 0) {
            existingCartItem.setQuantity(updatedCartItem.getQuantity());
        }

        // Save the updated cart item
        return cartItemRepository.save(existingCartItem);
    }

    
    
    //Method to DELETE a cart item
    public void deleteCartItem(int cartItemId) {
        cartItemRepository.deleteById(cartItemId);
    }
    
//    public CartItemEntity updateCartItem1(CartItemEntity cartItem) {
//        // Ensure that the cart item exists before updating
//        if (cartItem == null || cartItem.getCartItemId() == null) {
//            throw new IllegalArgumentException("Cart item not found or invalid ID");
//        }
//        
//        // Save the updated CartItem in the repository
//        return cartItemRepository.save(cartItem);
//    }


 
}