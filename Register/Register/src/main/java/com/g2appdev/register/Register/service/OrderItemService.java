package com.g2appdev.register.Register.service;

import com.g2appdev.register.Register.entity.CartItemEntity;
import com.g2appdev.register.Register.entity.OrderItemEntity;
import com.g2appdev.register.Register.entity.PaymentEntity;
import com.g2appdev.register.Register.repository.OrderItemRepository;
import com.g2appdev.register.Register.repository.CartItemRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class OrderItemService {

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private CartItemService cartItemService;

    // Create an OrderItem from a CartItem and associate it with a Payment
    public OrderItemEntity createOrderItemFromCartItem(PaymentEntity payment, int cartItemId) {
        CartItemEntity cartItem = cartItemService.getCartItemById(cartItemId);
        
        OrderItemEntity orderItem = new OrderItemEntity();
        orderItem.setQuantity(cartItem.getQuantity());
        orderItem.setPrice(cartItem.getPrice());
        orderItem.setName(cartItem.getName());
        orderItem.setCategory(cartItem.getCategory());
        orderItem.setPayment(payment);
        orderItem.setCartItem(cartItem);

        return orderItemRepository.save(orderItem);
    }
    
 // Save the OrderItem to the database
    public OrderItemEntity saveOrderItem(OrderItemEntity orderItem) {
        return orderItemRepository.save(orderItem);
    }
    
    
    // GET all orders
    public List<OrderItemEntity> getAllOrderItems() {
        return orderItemRepository.findAll(); // Fetch all order items from the database
    }

    // Get a single order item by its ID
    public OrderItemEntity getOrderItemById(int orderItemId) {
        return orderItemRepository.findById(orderItemId).orElseThrow(() -> new NoSuchElementException("Order Item not found"));
    }

    // Get all order items for a specific user by userId
    public List<OrderItemEntity> getOrderItemsByUserId(int userId) {
        return orderItemRepository.findByPayment_User_UserId(userId); // Assume Payment has a relation with User
    }

    // Update an order item by its ID
    public OrderItemEntity updateOrderItem(int orderItemId, OrderItemEntity updatedOrderItem) {
        OrderItemEntity existingOrderItem = orderItemRepository.findById(orderItemId)
                .orElseThrow(() -> new NoSuchElementException("Order Item not found"));

        if (updatedOrderItem.getQuantity() > 0) {
            existingOrderItem.setQuantity(updatedOrderItem.getQuantity());
        }
        if (updatedOrderItem.getPrice() > 0) {
            existingOrderItem.setPrice(updatedOrderItem.getPrice());
        }

        return orderItemRepository.save(existingOrderItem);
    }

    // Delete a single order item by its ID
    public void deleteOrderItem(int orderItemId) {
        orderItemRepository.deleteById(orderItemId);
    }

    // Delete all order items for a user
    public void deleteAllOrderItemsByUserId(int userId) {
        List<OrderItemEntity> orderItems = orderItemRepository.findByPayment_User_UserId(userId);
        for (OrderItemEntity orderItem : orderItems) {
            orderItemRepository.delete(orderItem);
        }
    }
}