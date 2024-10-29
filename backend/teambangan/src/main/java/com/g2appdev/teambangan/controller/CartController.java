package com.g2appdev.teambangan.controller;

import com.g2appdev.teambangan.entity.Cart;
import com.g2appdev.teambangan.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3001") // Ensure this matches your frontend's URL
@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    // Create (POST)
    @PostMapping("/addcart")
    public Cart addCart(@RequestBody Cart cart) {
        return cartService.saveCart(cart);
    }

    // Retrieve all (GET)
    @GetMapping("/allcarts")
    public List<Cart> getAllCarts() {
        return cartService.getAllCarts();
    }

    // Update (PUT)
    @PutMapping("/update/{id}")
    public Cart updateCart(@PathVariable int id, @RequestBody Cart cartDetails) {
        return cartService.updateCart(id, cartDetails);
    }

    // Delete (DELETE)
    @DeleteMapping("/delete/{id}")
    public String deleteCart(@PathVariable int id) {
        return cartService.deleteCart(id);
    }
}
