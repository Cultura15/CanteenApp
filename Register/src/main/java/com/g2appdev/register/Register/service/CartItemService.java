package com.g2appdev.register.Register.service;

import com.g2appdev.register.Register.entity.CartEntity;
import com.g2appdev.register.Register.entity.CartItemEntity;
import com.g2appdev.register.Register.entity.MenuEntity;
import com.g2appdev.register.Register.repository.CartItemRepository;
import com.g2appdev.register.Register.repository.CartRepository;
import com.g2appdev.register.Register.repository.MenuRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class CartItemService {

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private CartRepository cartRepository;
    
    @Autowired
    private MenuRepository menuRepository;
    
    

//
//    public CartItemEntity createCartItem(CartItemEntity cartItem) {
//        return cartItemRepository.save(cartItem);
//    }
    
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


    public List<CartItemEntity> getAllCartItems() {
        return cartItemRepository.findAll();
    }
    
    public List<CartItemEntity> getCartItemsByCartId(int cartId) {
        return cartItemRepository.findByCart_CartId(cartId);
    }

    public CartItemEntity getCartItemById(int cartItemId) {
        return cartItemRepository.findById(cartItemId).orElse(null);
    }

    public void deleteCartItem(int cartItemId) {
        cartItemRepository.deleteById(cartItemId);
    }

    public CartEntity getCartById(int cartId) {
        return cartRepository.findById(cartId).orElse(null);
    }
    
   

    public void updateCart(CartEntity cart) {
        cartRepository.save(cart);
    }
<<<<<<< HEAD
}
=======
}
>>>>>>> a4a422e (second commit)
