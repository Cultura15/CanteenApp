package com.g2appdev.register.Register.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import com.g2appdev.register.Register.dto.Login;
import com.g2appdev.register.Register.entity.RegisterEntity;
import com.g2appdev.register.Register.repository.RegisterRepository;

@Service
public class RegisterService {

    @Autowired
    private RegisterRepository registerRepository;

    // Method to register user
    public RegisterEntity registerUser(RegisterEntity user) {
        if (user.getStatus() == null || user.getStatus().isEmpty()) {
            user.setStatus("active");
        }

        try {
            return registerRepository.save(user);
        } catch (DataIntegrityViolationException e) {
            throw new IllegalArgumentException("Email already exists.");
        }
    }


    // Method to find user by ID
    public Optional<RegisterEntity> findById(int userId) {
        return registerRepository.findById(userId);
    }

    // Method to find all users
    public List<RegisterEntity> findAllUsers() {
        return registerRepository.findAll();
    }

    // Method to log in
    public Optional<RegisterEntity> loginUser(Login loginRequest) {
        RegisterEntity user = registerRepository.findByEmail(loginRequest.getEmail());
        if (user != null && user.getPassword().equals(loginRequest.getPassword())) { 
            return Optional.of(user);
        }
        return Optional.empty();
    }

    // Method to update a user
    public Optional<RegisterEntity> updateUser(int userId, RegisterEntity updatedUser, String currentPassword) {
        return registerRepository.findById(userId)
                .filter(user -> user.getPassword().equals(currentPassword)) // Check if current password matches
                .map(user -> {
                    user.setFname(updatedUser.getFname());
                    user.setLname(updatedUser.getLname());
                    user.setEmail(updatedUser.getEmail());
                    user.setPassword(updatedUser.getPassword());
                    user.setStatus(updatedUser.getStatus());
                    return registerRepository.save(user);
                });
    }




    // Method to delete a user
    public boolean deleteUser(int userId) {
        if (registerRepository.existsById(userId)) {
            registerRepository.deleteById(userId);
            return true;
        }
        return false;
    }
    
    // Method to get RegisterEntity (User) by userId
    public RegisterEntity getUserById(int userId) {
        return registerRepository.findById(userId).orElse(null);  // Returns null if not found
    }
}