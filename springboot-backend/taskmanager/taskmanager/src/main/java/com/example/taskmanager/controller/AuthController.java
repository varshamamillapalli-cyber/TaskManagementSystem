package com.example.taskmanager.controller;

import com.example.taskmanager.entity.User;
import com.example.taskmanager.jwt.JwtUtil;
import com.example.taskmanager.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/signup")
    public Object signup(@RequestBody User user) {

        // Default role if not provided
        if (user.getRole() == null || user.getRole().isEmpty()) {
            user.setRole("ADMIN");
        }

        userRepository.save(user);

        return Map.of(
                "message", "User Registered Successfully"
        );
    }

    @PostMapping("/login")
    public Object login(@RequestBody User user) {

        User existingUser = userRepository
                .findByEmail(user.getEmail())
                .orElse(null);

        if (existingUser != null &&
                existingUser.getPassword().equals(user.getPassword())) {

            String role = existingUser.getRole();

            if (role == null || role.isEmpty()) {
                role = "ADMIN";
            }

            return Map.of(
                    "token", JwtUtil.generateToken(existingUser.getEmail()),
                    "role", role
            );
        }

        return Map.of(
                "message", "Invalid Credentials"
        );
    }
}
