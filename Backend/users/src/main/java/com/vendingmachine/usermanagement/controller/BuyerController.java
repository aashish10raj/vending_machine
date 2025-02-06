package com.vendingmachine.usermanagement.controller;


import com.vendingmachine.usermanagement.model.Balance;
import com.vendingmachine.usermanagement.services.BalanceService;
import com.vendingmachine.usermanagement.services.PurchaseService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/vendingmachine/buyer")
@CrossOrigin
public class BuyerController {

    @Autowired
    private BalanceService balanceService;

    @Autowired
    private PurchaseService purchaseService;

    // Get balance by userId
//    @GetMapping("/getbalance/{userId}")
//    public ResponseEntity<?> getBalance(@PathVariable int userId) {
//        Optional<Balance> balance = balanceService.getBalanceByUserId(userId);
//        return balance.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
//    }

    @GetMapping("/getbalance")
    public ResponseEntity<?> getBalance(HttpServletRequest request) {
        Integer userId = (Integer) request.getAttribute("userId");

        if (userId == null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("User ID is missing in request");
        }

        Optional<Balance> balance = balanceService.getBalanceByUserId(userId);
        return balance.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }


//    // Update user balance after checkout
//    @PutMapping("/updatebalance/{userId}")
//    public ResponseEntity<?> updateBalance(@PathVariable int userId, @RequestBody Balance balanceUpdate) {
//        Optional<Balance> existingBalance = balanceService.getBalanceByUserId(userId);
//        if (existingBalance.isPresent()) {
//            Balance updatedBalance = balanceService.createOrUpdateBalance(userId, balanceUpdate.getBalance());
//            return ResponseEntity.ok(updatedBalance);
//        }
//        return ResponseEntity.notFound().build();
//    }
// Checkout Endpoint
@PostMapping("/checkout")
public ResponseEntity<?> checkout(@RequestHeader("Authorization") String token, @RequestBody Map<String, Object> request) {
    return purchaseService.processCheckout(token, request);
}
}
