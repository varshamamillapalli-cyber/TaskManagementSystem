package com.example.taskmanager.controller;
import com.example.taskmanager.jwt.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import com.example.taskmanager.entity.User;
import com.example.taskmanager.repository.UserRepository;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/signup")
    public String signup(@RequestBody User user) {

        userRepository.save(user);

        return "User Registered Successfully";
    }

    @PostMapping("/login")
    public Object login(@RequestBody User user) {

        User existingUser =
                userRepository.findByEmail(user.getEmail())
                .orElse(null);

        if(existingUser != null &&
           existingUser.getPassword().equals(user.getPassword())) {

            return Map.of(
                    "token",
                    JwtUtil.generateToken(user.getEmail()),
                    "role",
                    existingUser.getRole()
            );
        }

        return "Invalid Credentials";
    }
}