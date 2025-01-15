package com.vendingmachine.login.controller;

import com.vendingmachine.login.model.Users;
import com.vendingmachine.login.services.AuthService;
import com.vendingmachine.login.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/vendingmachine/auth")
@CrossOrigin
public class AuthController {
    @Autowired
    private AuthService authService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, Object> loginRequest) {
        Integer userId = (Integer) loginRequest.get("user_id"); // Parse as integer
        String password = (String) loginRequest.get("password");
        System.out.println(userId);
        Optional<Users> userOpt = authService.authenticate(userId, password);
        if (userOpt.isPresent()) {
            Users user = userOpt.get();
            String token = jwtUtil.generateToken(String.valueOf(userId), user.getRole());
            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("redirect", user.getRole() ? "/admin" : "/buyer");
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(401).body(Map.of("error", "Invalid credentials"));
    }


}
