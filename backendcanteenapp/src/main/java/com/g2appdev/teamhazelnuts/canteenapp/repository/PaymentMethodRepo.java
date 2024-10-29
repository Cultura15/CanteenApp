package com.g2appdev.teamhazelnuts.canteenapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.g2appdev.teamhazelnuts.canteenapp.entity.PaymentMethod;

public interface PaymentMethodRepo extends JpaRepository<PaymentMethod, Integer> {
}
