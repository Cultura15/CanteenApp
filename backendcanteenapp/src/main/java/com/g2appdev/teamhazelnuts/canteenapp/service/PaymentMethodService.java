package com.g2appdev.teamhazelnuts.canteenapp.service;

import com.g2appdev.teamhazelnuts.canteenapp.entity.PaymentMethod;
import com.g2appdev.teamhazelnuts.canteenapp.repository.PaymentMethodRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentMethodService {

    @Autowired
    PaymentMethodRepo paymentMethodRepo;

    public PaymentMethod addPaymentMethod(PaymentMethod paymentMethod) {
        return paymentMethodRepo.save(paymentMethod);
    }

    public List<PaymentMethod> getAllPayments() {
        return paymentMethodRepo.findAll();
    }
    
    public PaymentMethod updatePayment(int id, PaymentMethod newPaymentDetails) {
        PaymentMethod paymentMethod = paymentMethodRepo.findById(id)
            .orElseThrow(() -> new RuntimeException("Payment Method not found with id " + id));
 
        paymentMethod.setOrderID(newPaymentDetails.getOrderID());
        paymentMethod.setPaymentMethod(newPaymentDetails.getPaymentMethod());
        paymentMethod.setPaymentDate(newPaymentDetails.getPaymentDate());
        paymentMethod.setAmount(newPaymentDetails.getAmount());
 
        return paymentMethodRepo.save(paymentMethod);
    }
    
    public String deletePaymentMethod(int id) {
        PaymentMethod paymentMethod = paymentMethodRepo.findById(id)
            .orElseThrow(() -> new RuntimeException("Payment not found with id " + id));
        paymentMethodRepo.delete(paymentMethod);
        return "Payment Method deleted with id " + id;
    }
}
