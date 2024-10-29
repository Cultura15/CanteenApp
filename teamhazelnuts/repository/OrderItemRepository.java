package com.g2appdev.teamhazelnuts.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.g2appdev.teamhazelnuts.entity.OrderItemEntity;

public interface OrderItemRepository extends JpaRepository<OrderItemEntity, Integer> {
    void deleteById(int id);
}

