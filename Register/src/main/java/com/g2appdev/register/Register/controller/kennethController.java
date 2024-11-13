package com.g2appdev.register.Register.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.g2appdev.register.Register.entity.kennethEntity;
import com.g2appdev.register.Register.service.kennethService;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/order-items")
public class kennethController {

    @Autowired
    private kennethService service;

    // Create (POST)
    @PostMapping
    public ResponseEntity<kennethEntity> createOrderItem(@RequestBody kennethEntity orderItem) {
        return ResponseEntity.ok(service.saveOrderItem(orderItem));
    }

    // Read All (GET)
    @GetMapping
    public ResponseEntity<List<kennethEntity>> getAllOrderItems() {
        return ResponseEntity.ok(service.getAllOrderItems());
    }

    // Read by ID (GET)
    @GetMapping("/{id}")
    public ResponseEntity<kennethEntity> getOrderItemById(@PathVariable Long id) {
        return service.getOrderItemById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Update (PUT)
    @PutMapping("/{id}")
    public ResponseEntity<kennethEntity> updateOrderItem(@PathVariable Long id, @RequestBody kennethEntity updatedOrderItem) {
        return service.getOrderItemById(id)
                .map(existingOrderItem -> {
                    existingOrderItem.setQuantity(updatedOrderItem.getQuantity());
                    existingOrderItem.setPrice(updatedOrderItem.getPrice());
                    existingOrderItem.setItemName(updatedOrderItem.getItemName());
                    return ResponseEntity.ok(service.updateOrderItem(existingOrderItem));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // Delete (DELETE)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrderItem(@PathVariable Long id) {
        service.deleteOrderItem(id);
        return ResponseEntity.noContent().build();
    }
}
