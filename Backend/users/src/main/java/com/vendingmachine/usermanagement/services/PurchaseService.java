package com.vendingmachine.usermanagement.services;


import com.vendingmachine.login.util.JwtUtil;
import com.vendingmachine.usermanagement.model.Balance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class PurchaseService {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private RestTemplate restTemplate;

    private static final String PRODUCT_SERVICE_URL = "http://localhost:8080/vendingapi/products";

    /**
     * Handles checkout process.
     */
//    public ResponseEntity<?> processCheckout(String token, Map<String, Object> request) {
//        int userId = jwtUtil.extractUserId(token.replace("Bearer ", ""));
//        List<Map<String, Object>> cart = (List<Map<String, Object>>) request.get("cart");
//
//        // ✅ Convert totalAmount safely to avoid ClassCastException
//        Number totalAmountRaw = (Number) request.get("totalAmount");
//        double totalAmount = totalAmountRaw.doubleValue(); // Works for both Integer and Double
//
//        // ✅ Fetch user balance correctly
//        Balance userBalance = getBalance(userId);
//        if (userBalance.getBalance() < totalAmount) {
//            return ResponseEntity.badRequest().body("Insufficient balance.");
//        }
//
//        // ✅ Deduct the amount atomically
//        userBalance = createOrUpdateBalance(userId, userBalance.getBalance() - totalAmount);
//
//        // ✅ Update product quantities
//        for (Map<String, Object> item : cart) {
//            int productId = (int) item.get("id");
//            int quantityToBuy = (int) item.get("quantity");
//
//            restTemplate.put(PRODUCT_SERVICE_URL + "/" + productId + "/quantity?quantity=" + (quantityToBuy - 1), null);
//        }
//
//        return ResponseEntity.ok("Purchase successful!");
//    }
    public ResponseEntity<?> processCheckout(String token, Map<String, Object> request) {
        int userId = jwtUtil.extractUserId(token.replace("Bearer ", ""));
        List<Map<String, Object>> cart = (List<Map<String, Object>>) request.get("cart");
        Number totalAmountRaw = (Number) request.get("totalAmount");
        double totalAmount = totalAmountRaw.doubleValue();

        // ✅ Fetch user balance
        Balance userBalance = getBalance(userId);
        if (userBalance.getBalance() < totalAmount) {
            return ResponseEntity.badRequest().body("Insufficient balance.");
        }

        // ✅ Deduct user balance atomically
        userBalance = createOrUpdateBalance(userId, userBalance.getBalance() - totalAmount);

        // ✅ Prepare headers with Authorization token
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", token);
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Void> entity = new HttpEntity<>(headers);

        // ✅ Update product quantities securely
        for (Map<String, Object> item : cart) {
            int productId = (int) item.get("id");
            int quantityToBuy = (int) item.get("quantity");

            try {
                restTemplate.exchange(
                        PRODUCT_SERVICE_URL + "/" + productId + "/quantity?quantity=" + (quantityToBuy - 1),
                        HttpMethod.PUT,
                        entity,
                        Void.class
                );
            } catch (HttpClientErrorException e) {
                return ResponseEntity.status(e.getStatusCode()).body("Failed to update product quantity: " + e.getMessage());
            }
        }

        return ResponseEntity.ok("Purchase successful!");
    }
    /**
     * Fetches user balance, ensuring a record exists.
     */
    public Balance getBalance(int userId) {
        Query query = new Query(Criteria.where("userId").is(userId));
        Balance balance = mongoTemplate.findOne(query, Balance.class);

        // ✅ If no balance exists, create it with 0 balance to avoid null issues
        return (balance != null) ? balance : createOrUpdateBalance(userId, 0.0);
    }

    /**
     * Creates or updates user balance atomically.
     */
    public Balance createOrUpdateBalance(int userId, double amount) {
        Query query = new Query(Criteria.where("userId").is(userId));
        Update update = new Update().set("balance", amount).setOnInsert("userId", userId);

        // ✅ Perform atomic upsert to avoid duplicate key errors
        return mongoTemplate.findAndModify(query, update,
                org.springframework.data.mongodb.core.FindAndModifyOptions.options().returnNew(true).upsert(true),
                Balance.class);
    }
}
