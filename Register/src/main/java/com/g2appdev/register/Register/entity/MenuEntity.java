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
<<<<<<< HEAD
    private String description;
    private double price;
    private String category;
=======
    private int calories;
    private double price;
    private String category;
    private String description;
>>>>>>> a4a422e (second commit)
    private String image;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private RegisterEntity user;

    // Default constructor
    public MenuEntity() {
    }

    // Parameterized constructor
<<<<<<< HEAD
    public MenuEntity(String name, String description, double price, String category, String image, RegisterEntity user) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.category = category;
        this.image = image;
=======
    public MenuEntity(String name, int calories, double price, String description ,String image, String category,RegisterEntity user) {
        this.name = name;
        this.calories = calories;
        this.price = price;
        this.description = description;
        this.image = image;
        this.category = category;
>>>>>>> a4a422e (second commit)
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
<<<<<<< HEAD

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

=======
    
    public int getCalories() {
    	return calories;
    }
    
    public void setCalories(int calories) {
    	this.calories = calories;
    }

   
>>>>>>> a4a422e (second commit)
    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }
<<<<<<< HEAD
=======
    
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
>>>>>>> a4a422e (second commit)

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
<<<<<<< HEAD
}
=======
}
>>>>>>> a4a422e (second commit)
