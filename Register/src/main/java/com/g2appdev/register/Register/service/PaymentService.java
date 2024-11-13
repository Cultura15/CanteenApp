package com.g2appdev.register.Register.service;

import com.g2appdev.register.Register.entity.PaymentEntity;
import com.g2appdev.register.Register.dto.PaymentDTO;
import com.g2appdev.register.Register.entity.CartEntity;
import com.g2appdev.register.Register.repository.PaymentRepository;
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

    // Create or update a payment
    public PaymentEntity createOrUpdatePayment(PaymentEntity payment, int cartId) {
        CartEntity cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        payment.setCart(cart);
        
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
