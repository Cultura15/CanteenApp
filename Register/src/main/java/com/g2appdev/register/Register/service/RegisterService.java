package com.g2appdev.register.Register.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.g2appdev.register.Register.dto.Login;
import com.g2appdev.register.Register.entity.RegisterEntity;
import com.g2appdev.register.Register.repository.RegisterRepository;

@Service
public class RegisterService {

    @Autowired
    private RegisterRepository registerRepository;

    public RegisterEntity registerUser(RegisterEntity user) {
        return registerRepository.save(user);
    }

    public Optional<RegisterEntity> findById(int userId) {
        return registerRepository.findById(userId);
    }

    public List<RegisterEntity> findAllUsers() {
        return registerRepository.findAll();
    }

    public Optional<RegisterEntity> loginUser(Login loginRequest) {
        RegisterEntity user = registerRepository.findByEmail(loginRequest.getEmail());
        if (user != null && user.getPassword().equals(loginRequest.getPassword())) {
            return Optional.of(user);
        }
        return Optional.empty();
    }

    // New method to update a user
    public Optional<RegisterEntity> updateUser(int userId, RegisterEntity updatedUser) {
        return registerRepository.findById(userId)
                .map(user -> {
                    user.setFname(updatedUser.getFname());
                    user.setLname(updatedUser.getLname());
                    user.setEmail(updatedUser.getEmail());
                    user.setPassword(updatedUser.getPassword()); // Make sure to handle password securely
                    return registerRepository.save(user);
                });
    }

    // New method to delete a user
    public boolean deleteUser(int userId) {
        if (registerRepository.existsById(userId)) {
            registerRepository.deleteById(userId);
            return true;
        }
        return false;
    }
}
