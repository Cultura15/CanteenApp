package com.g2appdev.register.Register.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.g2appdev.register.Register.entity.MenuEntity;
import com.g2appdev.register.Register.service.MenuService;

@RestController
@RequestMapping("/api/menu")
@CrossOrigin(origins = "http://localhost:3000") // Allowing cross-origin requests for frontend access
public class MenuController {
    @Autowired
    private MenuService menuItemService;

    // Create a new Menu record
    @PostMapping("/post")
    public ResponseEntity<MenuEntity> postMenuItemRecord(@RequestBody MenuEntity menuItem) {
        MenuEntity createdMenuItem = menuItemService.postMenuItemRecord(menuItem);
        return new ResponseEntity<>(createdMenuItem, HttpStatus.CREATED);
    }

    // Get all Menu records
    @GetMapping("/get")
    public ResponseEntity<List<MenuEntity>> getAllMenuItem() {
        List<MenuEntity> menuItems = menuItemService.getAllMenuItem();
        return new ResponseEntity<>(menuItems, HttpStatus.OK);
    }

    // Update Menu item details
    @PutMapping("/put")
    public ResponseEntity<MenuEntity> putMenuItemDetails(@RequestParam int id, @RequestBody MenuEntity newMenuItemDetails) {
        MenuEntity updatedMenuItem = menuItemService.putMenuItemDetails(id, newMenuItemDetails);
        return new ResponseEntity<>(updatedMenuItem, HttpStatus.OK);
    }

    // Delete Menu item
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteMenuItem(@PathVariable int id) {
        String responseMessage = menuItemService.deleteMenuItem(id);
        return new ResponseEntity<>(responseMessage, HttpStatus.OK);
    }
}