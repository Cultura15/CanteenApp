package com.g2appdev.register.Register.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.g2appdev.register.Register.entity.kennethEntity;
import com.g2appdev.register.Register.repository.kennethRepository;

import java.util.List;
import java.util.Optional;

@Service
public class kennethService {

    @Autowired
    private kennethRepository repository;

    public kennethEntity saveOrderItem(kennethEntity orderItem) {
        return repository.save(orderItem);
    }

    public List<kennethEntity> getAllOrderItems() {
        return repository.findAll();
    }

    public Optional<kennethEntity> getOrderItemById(Long id) {
        return repository.findById(id);
    }

    public kennethEntity updateOrderItem(kennethEntity orderItem) {
        return repository.save(orderItem);
    }

    public void deleteOrderItem(Long id) {
        repository.deleteById(id);
    }
}
