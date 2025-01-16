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
@CrossOrigin
public class AuthController {
    @Autowired
    private AuthService authService;

    @Autowired
    private AdminController adminController;

    @Autowired
    private BuyerController buyerController;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Map<String, Object> loginRequest) {
        Integer userId = (Integer) loginRequest.get("user_id"); // Parse as integer
        String password = (String) loginRequest.get("password");
        System.out.println(userId);
        // Authenticate user
        Optional<Users> userOpt = authService.authenticate(userId, password);
        if (userOpt.isPresent()) {
            Users user = userOpt.get();
            // Generate JWT Token
            String token = authService.generateJwtToken(user);

            // Redirect to respective endpoint
            if (user.getRole()) {
                // If admin, call the Admin endpoint directly
                return ResponseEntity.ok(adminController.getAdmin());
            } else {
                // If buyer, call the Buyer endpoint directly
                return ResponseEntity.ok(buyerController.getBuyer());
            }
        }

        // Unauthorized response
        return ResponseEntity.status(401).body("Invalid user ID or password");

    }


}
