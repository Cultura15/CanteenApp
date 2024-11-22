package com.g2appdev.register.Register.controller;

import com.g2appdev.register.Register.dto.PaymentDTO;
import com.g2appdev.register.Register.entity.CartEntity;
import com.g2appdev.register.Register.entity.CartItemEntity;
import com.g2appdev.register.Register.entity.PaymentEntity;
import com.g2appdev.register.Register.entity.RegisterEntity;
import com.g2appdev.register.Register.service.CartItemService;
import com.g2appdev.register.Register.service.CartService;
import com.g2appdev.register.Register.service.PaymentService;
import com.g2appdev.register.Register.service.RegisterService;

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
    
    @Autowired
    private CartService cartService;
    
    @Autowired
    private RegisterService registerService;
  
    
    @Autowired
    private CartItemService cartItemService;
    
    

    // CREATE or UPDATE a payment
    @PostMapping("/{cartId}/{cartItemId}/{userId}")
    public ResponseEntity<PaymentEntity> createOrUpdatePayment(
            @PathVariable int cartId, 
            @PathVariable int cartItemId, 
            @PathVariable int userId, 
            @RequestBody PaymentEntity payment) {

        try {
            // Retrieve cart, cartItem, and user using cartId, cartItemId, and userId
            CartEntity cart = cartService.getCartById(cartId);  // Retrieve Cart by cartId
            CartItemEntity cartItem = cartItemService.getCartItemById(cartItemId);  // Retrieve CartItem by cartItemId
            RegisterEntity user = registerService.getUserById(userId);  // Retrieve User by userId

            // Check if cart, cartItem, or user does not exist
            if (cart == null || cartItem == null || user == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }

            // Ensure that the user is active
            if (!user.getStatus().equals("active")) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);  // Return forbidden if the user is not active
            }

            // Calculate totalAmount based on active cart items associated with the user
            double totalAmount = 0.0;
            // Fetch only active cart items for this cart
            List<CartItemEntity> cartItems = cartItemService.getCartItemsByCartIdAndStatus(cart.getCartId(), "active"); 
            
            // Sum up the prices of only active cart items for the user
            for (CartItemEntity item : cartItems) {
                if (item.getUser().getUserId() == user.getUserId()) {  // Only include items belonging to the user
                    totalAmount += item.getPrice() * item.getQuantity();
                }
            }

            // Set the total amount for the payment
            payment.setTotalAmount(totalAmount);

            // Set the cart, user, and cartItem information to the payment entity
            payment.setCart(cart); // Set the cart
            payment.setUser(user); // Set the user
            payment.setCartItem(cartItem); // Set the cartItem to the payment

            // Call the service method to handle the payment creation or update
            PaymentEntity createdPayment = paymentService.createOrUpdatePayment(payment, cartId, cartItemId, userId);

            // After successful payment, set the cartItem status to "inactive"
            cartItem.setStatus("inactive");  // Update the status to inactive
            cartItemService.updateCartItem1(cartItem);  // Save the updated cartItem

            // Return response with created payment
            return ResponseEntity.status(HttpStatus.CREATED).body(createdPayment);

        } catch (Exception e) {
            System.err.println("Error creating payment: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);  // Return internal server error if something goes wrong
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