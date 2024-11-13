package com.g2appdev.register.Register.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.g2appdev.register.Register.entity.kennethEntity;

@Repository
public interface kennethRepository extends JpaRepository<kennethEntity, Long> {
}