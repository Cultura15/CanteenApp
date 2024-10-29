package com.g2appdev.register.Register.repository;

import com.g2appdev.register.Register.entity.CartEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartRepository extends JpaRepository<CartEntity, Integer> {
    CartEntity findByUser_UserId(int userId); // Adjusted to reflect the userId field in RegisterEntity

}
