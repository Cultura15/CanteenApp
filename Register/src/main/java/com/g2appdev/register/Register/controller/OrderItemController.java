package com.g2appdev.register.Register.controller;

import com.g2appdev.register.Register.dto.OrderItemDTO;
import com.g2appdev.register.Register.entity.OrderItemEntity;
import com.g2appdev.register.Register.entity.PaymentEntity;
import com.g2appdev.register.Register.service.OrderItemService;
import com.g2appdev.register.Register.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/order-item")
public class OrderItemController {

    @Autowired
    private OrderItemService orderItemService;

    @Autowired
    private PaymentService paymentService; 

    // POST: Add Order Item from CartItem for a specific user
    @PostMapping("/user/{userId}")
    public ResponseEntity<OrderItemDTO> addOrderItem(@PathVariable int userId, @RequestParam int cartItemId) {
        List<PaymentEntity> existingPayments = paymentService.getPaymentsByUserId(userId);

        if (!existingPayments.isEmpty()) {
            try {
                for (PaymentEntity payment : existingPayments) {
                    OrderItemEntity savedOrderItem = orderItemService.createOrderItemFromCartItem(payment, cartItemId);

                    OrderItemDTO orderItemDTO = new OrderItemDTO();
                    orderItemDTO.setOrderItemId(savedOrderItem.getOrderItemId());
                    orderItemDTO.setQuantity(savedOrderItem.getQuantity());
                    orderItemDTO.setPrice(savedOrderItem.getPrice());
                    orderItemDTO.setName(savedOrderItem.getName());
                    orderItemDTO.setCategory(savedOrderItem.getCategory());
                    orderItemDTO.setPaymentId(savedOrderItem.getPayment().getPaymentId());

                    return ResponseEntity.status(HttpStatus.CREATED).body(orderItemDTO);
                }
            } catch (NoSuchElementException e) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }
    
    // GET all orders
    @GetMapping
    public List<OrderItemEntity> getAllOrderItems() {
        return orderItemService.getAllOrderItems(); // Call service layer to fetch all order items
    }

    // GET: Retrieve a single order item by its ID
    @GetMapping("/{orderItemId}")
    public ResponseEntity<OrderItemDTO> getOrderItemById(@PathVariable int orderItemId) {
        try {
            OrderItemEntity orderItem = orderItemService.getOrderItemById(orderItemId);
            OrderItemDTO orderItemDTO = new OrderItemDTO();
            orderItemDTO.setOrderItemId(orderItem.getOrderItemId());
            orderItemDTO.setQuantity(orderItem.getQuantity());
            orderItemDTO.setPrice(orderItem.getPrice());
            orderItemDTO.setName(orderItem.getName());
            orderItemDTO.setCategory(orderItem.getCategory());
            orderItemDTO.setPaymentId(orderItem.getPayment().getPaymentId());
            return ResponseEntity.ok(orderItemDTO);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    // GET: Retrieve all order items by userId
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<OrderItemDTO>> getOrderItemsByUserId(@PathVariable int userId) {
        List<OrderItemEntity> orderItems = orderItemService.getOrderItemsByUserId(userId);

        if (!orderItems.isEmpty()) {
            List<OrderItemDTO> orderItemDTOs = new ArrayList<>();
            for (OrderItemEntity orderItem : orderItems) {
                OrderItemDTO dto = new OrderItemDTO();
                dto.setOrderItemId(orderItem.getOrderItemId());
                dto.setQuantity(orderItem.getQuantity());
                dto.setPrice(orderItem.getPrice());
                dto.setName(orderItem.getName());
                dto.setCategory(orderItem.getCategory());
                dto.setPaymentId(orderItem.getPayment().getPaymentId());
                orderItemDTOs.add(dto);
            }
            return ResponseEntity.ok(orderItemDTOs);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    // PUT: Update an order item by its ID
    @PutMapping("/{orderItemId}")
    public ResponseEntity<OrderItemDTO> updateOrderItem(@PathVariable int orderItemId, @RequestBody OrderItemEntity updatedOrderItem) {
        try {
            OrderItemEntity orderItem = orderItemService.updateOrderItem(orderItemId, updatedOrderItem);
            OrderItemDTO orderItemDTO = new OrderItemDTO();
            orderItemDTO.setOrderItemId(orderItem.getOrderItemId());
            orderItemDTO.setQuantity(orderItem.getQuantity());
            orderItemDTO.setPrice(orderItem.getPrice());
            orderItemDTO.setName(orderItem.getName());
            orderItemDTO.setCategory(orderItem.getCategory());
            orderItemDTO.setPaymentId(orderItem.getPayment().getPaymentId());
            return ResponseEntity.ok(orderItemDTO);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    // DELETE: Delete an order item by its ID
    @DeleteMapping("/{orderItemId}")
    public ResponseEntity<Void> deleteOrderItem(@PathVariable int orderItemId) {
        try {
            orderItemService.deleteOrderItem(orderItemId);
            return ResponseEntity.noContent().build();
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    // DELETE: Delete all order items for a user by userId
    @DeleteMapping("/user/{userId}")
    public ResponseEntity<Void> deleteAllOrderItemsByUserId(@PathVariable int userId) {
        List<OrderItemEntity> orderItems = orderItemService.getOrderItemsByUserId(userId);
        if (!orderItems.isEmpty()) {
            orderItemService.deleteAllOrderItemsByUserId(userId);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
