package com.g2appdev.register.Register.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
<<<<<<< HEAD
=======
import org.springframework.http.HttpStatus;
>>>>>>> a4a422e (second commit)
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.g2appdev.register.Register.entity.MenuEntity;
import com.g2appdev.register.Register.service.MenuService;

@RestController
<<<<<<< HEAD
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/menu")
=======
@RequestMapping("/api/menu")
@CrossOrigin(origins = "http://localhost:3000") // Allowing cross-origin requests for frontend access
>>>>>>> a4a422e (second commit)
public class MenuController {
    @Autowired
    private MenuService menuItemService;

    // Create a new Menu record
    @PostMapping("/post")
<<<<<<< HEAD
    public MenuEntity postMenuItemRecord(@RequestBody MenuEntity menuItem) {
        return menuItemService.postMenuItemRecord(menuItem);
=======
    public ResponseEntity<MenuEntity> postMenuItemRecord(@RequestBody MenuEntity menuItem) {
        MenuEntity createdMenuItem = menuItemService.postMenuItemRecord(menuItem);
        return new ResponseEntity<>(createdMenuItem, HttpStatus.CREATED);
>>>>>>> a4a422e (second commit)
    }

    // Get all Menu records
    @GetMapping("/get")
<<<<<<< HEAD
    public ResponseEntity<List<MenuEntity>> getAllMenuItems() {
        List<MenuEntity> menuItems = menuItemService.getAllMenuItem(); // Assuming this retrieves the items
        
        menuItems.forEach(item -> {
            System.out.println("Fetched menu item: " + item.getName() + ", Description: " + item.getDescription());
        
        });
        return ResponseEntity.ok(menuItems); // Ensure this returns a JSON response
    }



    @PutMapping("/put")
    public MenuEntity putMenuItemDetails(@RequestParam int id, @RequestBody MenuEntity newMenuItemDetails) {
        return menuItemService.putMenuItemDetails(id, newMenuItemDetails);
    }

    // Delete
    @DeleteMapping("/delete/{id}")
    public String deleteMenuItem(@PathVariable int id) {
        return menuItemService.deleteMenuItem(id);
=======
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
>>>>>>> a4a422e (second commit)
    }
}
