package com.g2appdev.register.Register.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.g2appdev.register.Register.entity.MenuEntity;
import com.g2appdev.register.Register.service.MenuService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/menu")
public class MenuController {
    @Autowired
    private MenuService menuItemService;

    // Create a new Menu record
    @PostMapping("/post")
    public MenuEntity postMenuItemRecord(@RequestBody MenuEntity menuItem) {
        return menuItemService.postMenuItemRecord(menuItem);
    }

    // Get all Menu records
    @GetMapping("/get")
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
    }
}
