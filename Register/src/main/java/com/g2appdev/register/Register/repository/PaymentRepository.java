package com.g2appdev.register.Register.repository;

import com.g2appdev.register.Register.entity.CartEntity;
import com.g2appdev.register.Register.entity.PaymentEntity;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentRepository extends JpaRepository<PaymentEntity, Integer> {
	List<PaymentEntity> findByCart(CartEntity cart);
	   
}
