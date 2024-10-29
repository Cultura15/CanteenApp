package com.g2appdev.teamhazelnuts.entity;

import java.util.Set;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;



@Table(name = "tblOrderItem")
@Entity
public class OrderItemEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int orderItemID;

    private int orderID;
    private int menuItemID;
    private int quantity;
    private double price;
    private boolean reserve;  // New attribute
    
    @ManyToMany
    @JoinTable(
        name = "Order_Reserve", 
        joinColumns = @JoinColumn(name = "orderItemID"), 
        inverseJoinColumns = @JoinColumn(name = "reservationID")
    )
    private Set<ReserveItem> reservedItems;



    // Default constructor
    public OrderItemEntity() {
    }

    // Parameterized constructor including the new reserve field
    public OrderItemEntity(int orderItemID, int orderID, int menuItemID, int quantity, double price, boolean reserve) {
        this.orderItemID = orderItemID;
        this.orderID = orderID;
        this.menuItemID = menuItemID;
        this.quantity = quantity;
        this.price = price;
        this.reserve = reserve;  // New field in constructor
    }

    // Getters and Setters
    public int getOrderItemID() {
        return orderItemID;
    }

    public void setOrderItemID(int orderItemID) {
        this.orderItemID = orderItemID;
    }

    public int getOrderID() {
        return orderID;
    }

    public void setOrderID(int orderID) {
        this.orderID = orderID;
    }

    public int getMenuItemID() {
        return menuItemID;
    }

    public void setMenuItemID(int menuItemID) {
        this.menuItemID = menuItemID;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public boolean isReserve() {  // Getter for reserve
        return reserve;
    }

    public void setReserve(boolean reserve) {  // Setter for reserve
        this.reserve = reserve;
    }
}
