package com.g2appdev.teamhazelnuts.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.g2appdev.teamhazelnuts.entity.ReserveItem;

public interface ReserveItemRepository extends JpaRepository<ReserveItem, Integer> {
}
