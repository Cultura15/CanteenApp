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
        // Optionally, you can add validations or checks here
        return registerRepository.save(user);
    }
    
    public Optional<RegisterEntity> findById(int userId) {
        return registerRepository.findById(userId);
    }
    
    public List<RegisterEntity> findAllUsers() {
        return registerRepository.findAll(); // Assuming you have a repository for accessing data
    }
    
    public Optional<RegisterEntity> loginUser(Login loginRequest) {
        RegisterEntity user = registerRepository.findByEmail(loginRequest.getEmail());
        if (user != null && user.getPassword().equals(loginRequest.getPassword())) { // Use BCryptPasswordEncoder for encrypted passwords
            return Optional.of(user);
        }
        return Optional.empty();
    }

}