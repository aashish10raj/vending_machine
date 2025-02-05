package com.vendingmachine.usermanagement.services;

import com.vendingmachine.usermanagement.model.Balance;
import com.vendingmachine.usermanagement.repository.BalanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class BalanceService {

    @Autowired
    private BalanceRepository balanceRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    public Optional<Balance> getBalanceByUserId(int userId) {
        return balanceRepository.findByUserId(userId);
    }

    public Balance createOrUpdateBalance(int userId, double amount) {
        Query query = new Query(Criteria.where("userId").is(userId));
        Update update = new Update().set("balance", amount);

        // Perform atomic upsert operation
        return mongoTemplate.findAndModify(query, update,
                org.springframework.data.mongodb.core.FindAndModifyOptions.options().returnNew(true).upsert(true),
                Balance.class);
    }

}
