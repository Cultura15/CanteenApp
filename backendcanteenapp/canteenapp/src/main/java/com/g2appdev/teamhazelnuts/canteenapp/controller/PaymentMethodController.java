package com.g2appdev.teamhazelnuts.canteenapp.controller;

import com.g2appdev.teamhazelnuts.canteenapp.entity.PaymentMethod;
import com.g2appdev.teamhazelnuts.canteenapp.service.PaymentMethodService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/paymentmethod")
public class PaymentMethodController {

    @Autowired
    PaymentMethodService paymentMethodService;

    
    // Create (POST)
    @PostMapping("/addp")
    public PaymentMethod addPaymentMethod(@RequestBody PaymentMethod paymentMethod) {
        return paymentMethodService.addPaymentMethod(paymentMethod);
    }

    // Retrieve all (GET)
    @GetMapping("/get")
    public List<PaymentMethod> getAllPayments() {
        return paymentMethodService.getAllPayments();
    }

    // Update (PUT)
    @PutMapping("/update")
    public PaymentMethod putPaymentMethodDetails(@RequestParam int id, @RequestBody PaymentMethod newPaymentDetails) {
        return paymentMethodService.updatePayment(id, newPaymentDetails);
    }

    // Delete (DELETE)
    @DeleteMapping("/delete/{id}")
    public String deletePayment(@PathVariable int id) {
        return paymentMethodService.deletePaymentMethod(id);
    }
}
