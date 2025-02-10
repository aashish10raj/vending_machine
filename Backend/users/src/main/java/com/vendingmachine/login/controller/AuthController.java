package com.vendingmachine.login.controller;

import com.vendingmachine.login.model.Users;
import com.vendingmachine.login.services.AuthService;
import com.vendingmachine.login.util.JwtUtil;
import com.vendingmachine.usermanagement.controller.AdminController;
import com.vendingmachine.usermanagement.controller.BuyerController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/vendingmachine/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {
    @Autowired
    private AuthService authService;

    @Autowired
    private JwtUtil jwtUtil;


    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, Object> loginRequest) {
        Integer userId = (Integer) loginRequest.get("user_id"); // Parse as integer
        String password = (String) loginRequest.get("password");

        // Authenticate user
        Optional<Users> userOpt = authService.authenticate(userId, password);

        if (userOpt.isPresent()) {
            Users user = userOpt.get();

            // Generate JWT Token
            String token = authService.generateJwtToken(user);

            // Build the response map
            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("role", user.getRole() ? "admin" : "buyer");
            response.put("user_id", user.getUserId());
            response.put("message", user.getRole() ? "Admin privileges granted" : "Buyer privileges granted");

            return ResponseEntity.ok(response);
        } else {
            // Unauthorized response
            return ResponseEntity.status(401).body(Map.of(
                    "error", "Invalid credentials",
                    "message", "Please check your user ID and password"
            ));
        }
    }

    }

