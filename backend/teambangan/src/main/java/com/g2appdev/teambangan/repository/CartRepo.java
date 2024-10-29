package com.g2appdev.teambangan.repository;

import com.g2appdev.teambangan.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepo extends JpaRepository<Cart, Integer> {
}
