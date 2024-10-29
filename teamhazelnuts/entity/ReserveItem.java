package com.g2appdev.teamhazelnuts.entity;

import jakarta.persistence.*;
import java.time.LocalTime;
import java.util.Set;

@Entity
@Table(name = "tblReserveItem")
public class ReserveItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int reservationID;

    private int userID;
    private int menuItemID;
    private int reservedQuantity;

    @Column(name = "pickupTime")
    private LocalTime pickupTime;

    // Many-to-many relationship with OrderItemEntity
    @ManyToMany(mappedBy = "reservedItems")
    private Set<OrderItemEntity> orderItems;

    // Default constructor
    public ReserveItem() {}

    // Parameterized constructor
    public ReserveItem(int userID, int menuItemID, int reservedQuantity, LocalTime pickupTime) {
        this.userID = userID;
        this.menuItemID = menuItemID;
        this.reservedQuantity = reservedQuantity;
        this.pickupTime = pickupTime;
    }

    // Getters and Setters
    public int getReservationID() {
        return reservationID;
    }

    public void setReservationID(int reservationID) {
        this.reservationID = reservationID;
    }

    public int getUserID() {
        return userID;
    }

    public void setUserID(int userID) {
        this.userID = userID;
    }

    public int getMenuItemID() {
        return menuItemID;
    }

    public void setMenuItemID(int menuItemID) {
        this.menuItemID = menuItemID;
    }

    public int getReservedQuantity() {
        return reservedQuantity;
    }

    public void setReservedQuantity(int reservedQuantity) {
        this.reservedQuantity = reservedQuantity;
    }

    public LocalTime getPickupTime() {
        return pickupTime;
    }

    public void setPickupTime(LocalTime pickupTime) {
        this.pickupTime = pickupTime;
    }

    public Set<OrderItemEntity> getOrderItems() {
        return orderItems;
    }

    public void setOrderItems(Set<OrderItemEntity> orderItems) {
        this.orderItems = orderItems;
    }
}
