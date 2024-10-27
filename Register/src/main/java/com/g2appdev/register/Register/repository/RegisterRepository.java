package com.g2appdev.register.Register.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.g2appdev.register.Register.entity.RegisterEntity;

public interface RegisterRepository extends JpaRepository<RegisterEntity, Integer> {
	
	RegisterEntity findByEmail(String email);

}
