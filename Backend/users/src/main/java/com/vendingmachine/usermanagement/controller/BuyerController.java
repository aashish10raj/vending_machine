package com.vendingmachine.usermanagement.controller;


import com.vendingmachine.usermanagement.model.Balance;
import com.vendingmachine.usermanagement.services.BalanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/vendingmachine/buyer")
@CrossOrigin
public class BuyerController {

    @Autowired
    private BalanceService balanceService;

    // Get balance by userId
    @GetMapping("/getbalance/{userId}")
    public ResponseEntity<?> getBalance(@PathVariable int userId) {
        Optional<Balance> balance = balanceService.getBalanceByUserId(userId);
        return balance.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
}
