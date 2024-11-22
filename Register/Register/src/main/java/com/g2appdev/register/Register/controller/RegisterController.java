package com.g2appdev.register.Register.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.g2appdev.register.Register.dto.Login;
import com.g2appdev.register.Register.entity.RegisterEntity;
import com.g2appdev.register.Register.service.RegisterService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/users")
public class RegisterController {

    @Autowired
    private RegisterService registerService;

    // Register user
    @PostMapping("/register")
    public ResponseEntity<RegisterEntity> registerUser(@RequestBody RegisterEntity user) {
        RegisterEntity createdUser = registerService.registerUser(user);
        return ResponseEntity.ok(createdUser);
    }

    // Get user through userId
    @GetMapping("/id/{userId}")
    public ResponseEntity<RegisterEntity> getUserById(@PathVariable int userId) {
        return registerService.findById(userId)
                .map(user -> ResponseEntity.ok(user))
                .orElse(ResponseEntity.notFound().build());
    }

    // Get all users
    @GetMapping
    public ResponseEntity<List<RegisterEntity>> getAllUsers() {
        List<RegisterEntity> users = registerService.findAllUsers();
        return ResponseEntity.ok(users);
    }

    // Post registered user to log in
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> loginUser(@RequestBody Login loginRequest) {
        return registerService.loginUser(loginRequest)
                .map(user -> {
                    Map<String, Object> response = new HashMap<>();
                    response.put("userId", user.getUserId());
                    response.put("email", user.getEmail());
                    return ResponseEntity.ok(response);
                })
                .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED).build());
    }

    // Update user
    @PutMapping("/update/{userId}")
    public ResponseEntity<RegisterEntity> updateUser(@PathVariable int userId, @RequestBody Map<String, Object> payload) {
        String currentPassword = (String) payload.get("currentPassword");
        RegisterEntity updatedUser = new RegisterEntity();
        updatedUser.setFname((String) payload.get("fname"));
        updatedUser.setLname((String) payload.get("lname"));
        updatedUser.setEmail((String) payload.get("email"));
        updatedUser.setPassword((String) payload.get("password"));

        return registerService.updateUser(userId, updatedUser, currentPassword)
                .map(user -> ResponseEntity.ok(user))
                .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED).build());
    }



    // Delete user
    @DeleteMapping("/delete/{userId}")
    public ResponseEntity<Void> deleteUser(@PathVariable int userId) {
        boolean deleted = registerService.deleteUser(userId);
        if (deleted) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}