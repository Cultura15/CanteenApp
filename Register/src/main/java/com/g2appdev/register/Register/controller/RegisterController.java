package com.g2appdev.register.Register.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
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

    @PostMapping("/register")
    public ResponseEntity<RegisterEntity> registerUser(@RequestBody RegisterEntity user) {
        RegisterEntity createdUser = registerService.registerUser(user);
        return ResponseEntity.ok(createdUser);
    }
    
    // Restricting this to only handle numeric IDs
    @GetMapping("/id/{userId}")
    public ResponseEntity<RegisterEntity> getUserById(@PathVariable int userId) {
        return registerService.findById(userId)
                .map(user -> ResponseEntity.ok(user))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<RegisterEntity>> getAllUsers() {
        List<RegisterEntity> users = registerService.findAllUsers();
        return ResponseEntity.ok(users);
    }
    
//    @PostMapping("/login")
//    public ResponseEntity<RegisterEntity> loginUser(@RequestBody Login loginRequest) {
//        return registerService.loginUser(loginRequest)
//                .map(user -> ResponseEntity.ok(user))
//                .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED).build());
//    }
    
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> loginUser(@RequestBody Login loginRequest) {
        return registerService.loginUser(loginRequest)
                .map(user -> {
                    Map<String, Object> response = new HashMap<>();
                    response.put("userId", user.getUserId()); // return user ID
                    response.put("email", user.getEmail()); // optionally return other user details
                    return ResponseEntity.ok(response);
                })
                .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED).build());
    }
    
}

