package com.vendingmachine.usermanagement.services;


import com.vendingmachine.login.util.JwtUtil;
import com.vendingmachine.usermanagement.model.Balance;
import com.vendingmachine.usermanagement.repository.BalanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class PurchaseService {

    @Autowired
    private BalanceService balanceService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private BalanceRepository balanceRepository;

    private static final String PRODUCT_SERVICE_URL = "http://localhost:8080/vendingapi/products";

    public ResponseEntity<?> processCheckout(String token, Map<String, Object> request) {
        int userId = jwtUtil.extractUserId(token.replace("Bearer ", ""));
        List<Map<String, Object>> cart = (List<Map<String, Object>>) request.get("cart");
        double totalAmount = (double) request.get("totalAmount");

        // Fetch user balance
        Optional<Balance> userBalanceOpt = balanceRepository.findByUserId(userId);
        if (userBalanceOpt.isEmpty() || userBalanceOpt.get().getBalance() < totalAmount) {
            return ResponseEntity.badRequest().body("Insufficient balance.");
        }

        // Deduct user balance
        Balance userBalance = userBalanceOpt.get();
        userBalance.setBalance(userBalance.getBalance() - totalAmount);
        balanceRepository.save(userBalance);

        // Update product quantities
        for (Map<String, Object> item : cart) {
            int productId = (int) item.get("id");
            int quantityToBuy = (int) item.get("quantity");

            restTemplate.put(PRODUCT_SERVICE_URL + "/" + productId + "/quantity?quantity=" + (quantityToBuy - 1), null);
        }

        return ResponseEntity.ok("Purchase successful!");
    }
}
