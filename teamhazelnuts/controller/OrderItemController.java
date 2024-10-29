package com.g2appdev.teamhazelnuts.controller;

import com.g2appdev.teamhazelnuts.entity.OrderItemEntity;
import com.g2appdev.teamhazelnuts.service.OrderItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3001")
@RequestMapping("/api/orderItem")
public class OrderItemController {

    @Autowired
    OrderItemService orderItemService;

    // Create (POST)
    @PostMapping("/create")
    public OrderItemEntity createOrderItem(@RequestBody OrderItemEntity orderItemEntity) {
        return orderItemService.createOrderItem(orderItemEntity);
    }

    // Read all (GET)
    @GetMapping("/getAll")
    public List<OrderItemEntity> getAllOrderItems() {
        return orderItemService.getAllOrderItems();
    }

    // Update (PUT)
    @PutMapping("/update/{id}")
    public OrderItemEntity updateOrderItem(@PathVariable int id, @RequestBody OrderItemEntity orderItemDetails) {
        return orderItemService.updateOrderItem(id, orderItemDetails);
    }

    // Delete (DELETE)
    @DeleteMapping("/delete/{id}")
    public String deleteOrderItem(@PathVariable int id) {
        return orderItemService.deleteOrderItem(id);
    }
}
