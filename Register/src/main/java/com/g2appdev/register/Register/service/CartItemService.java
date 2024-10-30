package com.g2appdev.register.Register.service;

import com.g2appdev.register.Register.entity.CartItemEntity;
import com.g2appdev.register.Register.entity.MenuEntity;
import com.g2appdev.register.Register.repository.CartItemRepository;
import com.g2appdev.register.Register.repository.CartRepository;
import com.g2appdev.register.Register.repository.MenuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.NoSuchElementException;

@Service
public class CartItemService {

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private MenuRepository menuRepository;
    
    @Autowired CartRepository cartRepository;
    
    
    //Method to create a cartItem
    public CartItemEntity createCartItem(CartItemEntity cartItem) {
        // Check if menuItem is correctly set
        if (cartItem.getMenuItem() == null || cartItem.getMenuItem().getMenuItemID() == 0) {
            throw new IllegalArgumentException("Menu item must not be null and must have a valid ID");
        }
        
        int menuId = cartItem.getMenuItem().getMenuItemID();
        System.out.println("Attempting to find MenuItem with ID: " + menuId);

        // Verify that the MenuEntity exists in the database
        if (!menuRepository.existsById(menuId)) {
            throw new NoSuchElementException("Menu item with ID " + menuId + " does not exist in the database.");
        }

        // If the MenuEntity exists, retrieve it
        MenuEntity menuEntity = menuRepository.findById(cartItem.getMenuItem().getMenuItemID())
        	    .orElseThrow(() -> new NoSuchElementException("Menu item not found"));


        // Set the retrieved MenuEntity back into the CartItemEntity
        cartItem.setMenuItem(menuEntity);

        // Save and return the CartItemEntity
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
    
 // Method to UPDATE a cart item
    public CartItemEntity updateCartItem(int cartItemId, CartItemEntity updatedCartItem) {
        CartItemEntity existingCartItem = cartItemRepository.findById(cartItemId)
            .orElseThrow(() -> new RuntimeException("Cart item not found"));

        existingCartItem.setQuantity(updatedCartItem.getQuantity());
        
        // Update menu item if necessary
        if (updatedCartItem.getMenuItem() != null) {
            existingCartItem.setMenuItem(updatedCartItem.getMenuItem());
        }

        return cartItemRepository.save(existingCartItem);
    }

    
    
    //Method to DELETE a cart item
    public void deleteCartItem(int cartItemId) {
        cartItemRepository.deleteById(cartItemId);
    }
    
 

<<<<<<< HEAD
    public void updateCart(CartEntity cart) {
        cartRepository.save(cart);
    }

=======
 
>>>>>>> add469f (fourth commit)
}

