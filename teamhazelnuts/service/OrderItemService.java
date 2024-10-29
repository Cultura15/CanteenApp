package com.g2appdev.teamhazelnuts.service;

import com.g2appdev.teamhazelnuts.entity.OrderItemEntity;
import com.g2appdev.teamhazelnuts.repository.OrderItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class OrderItemService {

    @Autowired
    OrderItemRepository orderItemRepository;

    // Create OrderItem
    public OrderItemEntity createOrderItem(OrderItemEntity orderItemEntity) {
        return orderItemRepository.save(orderItemEntity);
    }

    // Get all OrderItems
    public List<OrderItemEntity> getAllOrderItems() {
        return orderItemRepository.findAll();
    }

    // Update OrderItem
    public OrderItemEntity updateOrderItem(int id, OrderItemEntity newOrderItemDetails) {
        OrderItemEntity orderItem = orderItemRepository.findById(id).orElseThrow(() -> new NoSuchElementException("OrderItem not found"));
        orderItem.setOrderID(newOrderItemDetails.getOrderID());
        orderItem.setMenuItemID(newOrderItemDetails.getMenuItemID());
        orderItem.setQuantity(newOrderItemDetails.getQuantity());
        orderItem.setPrice(newOrderItemDetails.getPrice());
        orderItem.setReserve(newOrderItemDetails.isReserve());  // Updating the reserve field
        return orderItemRepository.save(orderItem);
    }

    // Delete OrderItem
    public String deleteOrderItem(int id) {
        if (orderItemRepository.findById(id).isPresent()) {
            orderItemRepository.deleteById(id);
            return "OrderItem deleted successfully!";
        } else {
            return "OrderItem not found!";
        }
    }
}
