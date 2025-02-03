package com.vendingmachine.usermanagement.repository;

import com.vendingmachine.usermanagement.model.Balance;
import org.springframework.data.mongodb.core.aggregation.ArithmeticOperators;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BalanceRepository extends MongoRepository<Balance, Integer> {

    Optional<Balance> findByUserId(int userId);

}
