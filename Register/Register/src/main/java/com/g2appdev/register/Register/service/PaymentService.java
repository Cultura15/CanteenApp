package com.g2appdev.register.Register.service;

import com.g2appdev.register.Register.entity.PaymentEntity;
import com.g2appdev.register.Register.entity.RegisterEntity;
import com.g2appdev.register.Register.dto.PaymentDTO;
import com.g2appdev.register.Register.entity.CartEntity;
import com.g2appdev.register.Register.entity.CartItemEntity;
import com.g2appdev.register.Register.repository.PaymentRepository;
import com.g2appdev.register.Register.repository.RegisterRepository;
import com.g2appdev.register.Register.repository.CartItemRepository;
import com.g2appdev.register.Register.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private CartRepository cartRepository;
    
    @Autowired
    private RegisterRepository registerRepository;
    
    @Autowired
    private CartItemRepository cartItemRepository;
    
    @Autowired
    private CartService cartService;
    @Autowired
    private RegisterService registerService; 
    
    @Autowired
    private CartItemService cartItemService;
    

    // Method to create or update a payment
    public PaymentEntity createOrUpdatePayment(PaymentEntity payment, int cartId, int cartItemId, int userId) {
        // Fetch the User entity by userId
        RegisterEntity user = registerService.getUserById(userId);
        
        // Check if the user exists and is active
        if (user == null || !"active".equals(user.getStatus())) {
            throw new IllegalArgumentException("User is either inactive or does not exist.");
        }

        // Fetch the Cart entity by cartId associated with the active user
        CartEntity cart = cartService.getCartById(cartId);  // Retrieve Cart by cartId
        if (cart == null || cart.getUser().getUserId() != userId) {
            throw new IllegalArgumentException("Invalid cartId or the cart does not belong to the active user.");
        }
        
        // Fetch the CartItemEntities associated with the cart
        List<CartItemEntity> cartItems = cartItemService.getCartItemsByCartId(cart.getCartId());

        // Initialize totalAmount
        double totalAmount = 0;
        
        // Log and calculate the total amount based on cart items
        for (CartItemEntity item : cartItems) {
            double itemTotal = item.getPrice() * item.getQuantity();
            totalAmount += itemTotal;
            System.out.println(" Price: " + item.getPrice() + " Quantity: " + item.getQuantity() + " Total: " + itemTotal);
        }

        // Set the cart and user to the payment entity
        payment.setCart(cart);
        payment.setUser(user);
        payment.setTotalAmount(totalAmount); // Set the calculated totalAmount to the payment entity

        // Save the payment entity to the database
        return paymentRepository.save(payment);
    }




    
    //NOT SURE WHAT IS THIS HAHA
    public PaymentDTO processPayment(int userId, PaymentDTO paymentRequest) {
       
        CartEntity cart = cartRepository.findByUser_UserId(userId); 

        if (cart == null) {
           
            throw new RuntimeException("Cart not found for user ID: " + userId); 
        }

      
        PaymentEntity paymentEntity = new PaymentEntity();
        paymentEntity.setPaymentMethod(paymentRequest.getPaymentMethod());
        paymentEntity.setPaymentDate(new Date(System.currentTimeMillis())); 
        paymentEntity.setTotalAmount(paymentRequest.getTotalAmount());
        paymentEntity.setCart(cart); 

       
        PaymentEntity savedPayment = paymentRepository.save(paymentEntity);

      
        PaymentDTO responsePaymentDTO = new PaymentDTO();
        responsePaymentDTO.setPaymentId(savedPayment.getPaymentId());
        responsePaymentDTO.setPaymentMethod(savedPayment.getPaymentMethod());
        responsePaymentDTO.setPaymentDate(savedPayment.getPaymentDate());
        responsePaymentDTO.setTotalAmount(savedPayment.getTotalAmount());
        
        return responsePaymentDTO; 
    }
    
    public PaymentEntity createPayment(PaymentEntity paymentEntity) {
      
        return paymentRepository.save(paymentEntity);
    }
    

    // Get all payments
    public List<PaymentEntity> getAllPayments() {
        return paymentRepository.findAll();
    }

    // Get payment by ID
    public PaymentEntity getPaymentById(int id) {
        return paymentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Payment not found"));
    }
    
    //GET payment by userId
    public List<PaymentEntity> getPaymentsByUserId(int userId) {
        CartEntity cart = cartRepository.findByUser_UserId(userId);
        if (cart == null) {
            throw new RuntimeException("Cart not found for user ID: " + userId);
        }

        return paymentRepository.findByCart(cart); 
    }

    
 // Add this method in PaymentService
//    public PaymentEntity getPaymentByUserId(int userId) {
//        CartEntity cart = cartRepository.findByUser_UserId(userId); 
//        if (cart == null) {
//            throw new RuntimeException("Cart not found for user ID: " + userId);
//        }
//        
//        return paymentRepository.findByCart(cart) 
//                .orElseThrow(() -> new RuntimeException("No payment found for cart associated with user ID: " + userId));
//    }

    
    
    // UPDATE payment
    public PaymentEntity updatePayment(int id, PaymentEntity updatedPayment) {
        Optional<PaymentEntity> existingPayment = paymentRepository.findById(id);
        if (existingPayment.isPresent()) {
            PaymentEntity payment = existingPayment.get();
            payment.setPaymentMethod(updatedPayment.getPaymentMethod());
            payment.setPaymentDate(updatedPayment.getPaymentDate());
            payment.setTotalAmount(updatedPayment.getTotalAmount());
            return paymentRepository.save(payment);
        } else {
            throw new RuntimeException("Payment not found with ID: " + id);
        }
    }

    // Delete a payment
    public void deletePayment(int id) {
        if (!paymentRepository.existsById(id)) {
            throw new RuntimeException("Payment not found");
        }
        paymentRepository.deleteById(id);
    }
    
    public PaymentEntity findById(int paymentId) {
        return paymentRepository.findById(paymentId).orElse(null); // Returns null if not found
    }
}