package com.vendingmachine.login.controller;

import com.vendingmachine.login.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/vendingmachine/auth")
@CrossOrigin
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<Boolean> login(@RequestBody Map<String, Object> loginRequest) {
        Integer userId = (Integer) loginRequest.get("user_id"); // Parse as integer
        String password = (String) loginRequest.get("password");
        System.out.println(userId);
        boolean isLoggedIn = authService.login(userId, password);
        return isLoggedIn ? ResponseEntity.ok(true) : ResponseEntity.status(401).body(false);
    }


}
