package com.g2appdev.register.Register.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "menu") // Ensure this matches what you want in the database
public class MenuEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "menu_id", nullable = false)
    private int menuID;

    private String name;
    private String description;
    private double price;
    private String category;
    private String image;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private RegisterEntity user;

    // Default constructor
    public MenuEntity() {
    }

    // Parameterized constructor
    public MenuEntity(String name, String description, double price, String category, String image, RegisterEntity user) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.category = category;
        this.image = image;
        this.user = user; // Set user here
    }

    // Getters and setters
    public int getMenuItemID() { // Updated to use the correct method name
        return menuID;
    }

    public void setMenuItemID(int menuItemID) { // Updated to use the correct method name
        this.menuID = menuItemID;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }
    
  
    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public RegisterEntity getUser() {
        return user;
    }

    public void setUser(RegisterEntity user) {
        this.user = user;
    }
}
