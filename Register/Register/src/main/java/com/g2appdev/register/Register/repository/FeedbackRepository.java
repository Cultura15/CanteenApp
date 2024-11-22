package com.g2appdev.register.Register.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.g2appdev.register.Register.entity.FeedbackEntity;

public interface FeedbackRepository extends JpaRepository<FeedbackEntity, Integer> {
	
}