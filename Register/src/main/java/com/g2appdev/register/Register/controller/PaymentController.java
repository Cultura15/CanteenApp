package com.g2appdev.register.Register.controller;

import com.g2appdev.register.Register.dto.PaymentDTO;
import com.g2appdev.register.Register.entity.PaymentEntity;
import com.g2appdev.register.Register.service.CartItemService;
import com.g2appdev.register.Register.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/payment")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;
    

    // CREATE or UPDATE a payment
    @PostMapping("/{cartId}")
    public ResponseEntity<PaymentEntity> createOrUpdatePayment(
            @PathVariable int cartId, @RequestBody PaymentEntity payment) {
        try {
            PaymentEntity createdPayment = paymentService.createOrUpdatePayment(payment, cartId);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdPayment);
        } catch (Exception e) {
            System.err.println("Error creating payment: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    
    // GET all payments
    @GetMapping
    public ResponseEntity<List<PaymentEntity>> getAllPayments() {
        List<PaymentEntity> payments = paymentService.getAllPayments();
        return ResponseEntity.ok(payments);
    }

    // GET a payment by ID
    @GetMapping("/{id}")
    public ResponseEntity<PaymentEntity> getPaymentById(@PathVariable int id) {
        try {
            PaymentEntity payment = paymentService.getPaymentById(id);
            return ResponseEntity.ok(payment);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
    
 // UPDATE a payment by ID
    @PutMapping("/{id}")
    public ResponseEntity<PaymentEntity> updatePayment(
            @PathVariable int id, @RequestBody PaymentEntity updatedPayment) {
        try {
            PaymentEntity payment = paymentService.updatePayment(id, updatedPayment);
            return ResponseEntity.ok(payment);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    // DELETE a payment
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePayment(@PathVariable int id) {
        try {
            paymentService.deletePayment(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
