package com.g2appdev.register.Register.repository;

import com.g2appdev.register.Register.entity.CartItemEntity;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartItemRepository extends JpaRepository<CartItemEntity, Integer> {
	 List<CartItemEntity> findByCart_CartId(int cartId);
 
<<<<<<< HEAD
}
=======
}
>>>>>>> a4a422e (second commit)
