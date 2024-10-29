package com.g2appdev.register.Register.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "menu")
public class MenuEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "menu_id", nullable = false)
    private int menuID;

    private String name;
    private int calories;
    private double price;
    private String category;
    private String description;
    private String image;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private RegisterEntity user;

    // Constructors, getters, and setters

    public int getMenuItemID() {
        return menuID;
    }

    public void setMenuItemID(int menuID) {
        this.menuID = menuID;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getCalories() {
        return calories;
    }

    public void setCalories(int calories) {
        this.calories = calories;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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
