package com.g2appdev.register.Register.repository;

import com.g2appdev.register.Register.entity.OrderItemEntity;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItemEntity, Integer> {
	
	 List<OrderItemEntity> findByPayment_User_UserId(int userId);
}