package com.g2appdev.register.Register.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.g2appdev.register.Register.entity.MenuEntity;
import com.g2appdev.register.Register.entity.RegisterEntity;
import com.g2appdev.register.Register.repository.MenuRepository;
import com.g2appdev.register.Register.repository.RegisterRepository;

import jakarta.transaction.Transactional;

@Service
public class MenuService {
    @Autowired
    private MenuRepository menuItemRepository;

    @Autowired
    private RegisterRepository registerRepository;

    public MenuEntity postMenuItemRecord(MenuEntity menuItem) {
        // Fetch the user (RegisterEntity) from the database using user_id
        RegisterEntity user = registerRepository.findById(menuItem.getUser().getUserId())
            .orElseThrow(() -> new NoSuchElementException("User not found"));

        // Set the user to the menuItem
        menuItem.setUser(user);
        return menuItemRepository.save(menuItem);
    }

    public List<MenuEntity> getAllMenuItem() {
        return menuItemRepository.findAll();
    }

    public MenuEntity putMenuItemDetails(int id, MenuEntity newMenuItemDetails) {
        // Fetch the existing menu item
        MenuEntity menuItem = menuItemRepository.findById(id)
            .orElseThrow(() -> new NoSuchElementException("Menu item not found"));

        // Update the menu item details
        updateMenuItem(menuItem, newMenuItemDetails);

        return menuItemRepository.save(menuItem);
    }

    @Transactional
    public String deleteMenuItem(int id) {
        // Check if the menu item exists before attempting to delete
        if (menuItemRepository.findById(id).isPresent()) {
            menuItemRepository.deleteById(id);
            return "Menu item record successfully deleted!";
        } else {
            return "Menu item with ID " + id + " NOT found!";
        }
    }

    private void updateMenuItem(MenuEntity menuItem, MenuEntity newMenuItemDetails) {
        // Helper method to update menu item details
        menuItem.setName(newMenuItemDetails.getName());
        menuItem.setCalories(newMenuItemDetails.getCalories());
        menuItem.setPrice(newMenuItemDetails.getPrice());
        menuItem.setDescription(newMenuItemDetails.getDescription());
        menuItem.setImage(newMenuItemDetails.getImage());
        menuItem.setCategory(newMenuItemDetails.getCategory());
    }
}