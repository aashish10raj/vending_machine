package com.vendingmachine.usermanagement.services;

import com.vendingmachine.usermanagement.model.Balance;
import com.vendingmachine.usermanagement.repository.BalanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class BalanceService {

    @Autowired
    private BalanceRepository balanceRepository;

    public Optional<Balance> getBalanceByUserId(int userId) {
        return balanceRepository.findByUserId(userId);
    }

    public Balance createOrUpdateBalance(int userId, double amount) {
        Optional<Balance> existingBalance = balanceRepository.findByUserId(userId);
        if (existingBalance.isPresent()) {
            Balance balance = existingBalance.get();
            balance.setBalance(amount);
            return balanceRepository.save(balance);
        } else {
            Balance newBalance = new Balance(userId, amount);
            return balanceRepository.save(newBalance);
        }
    }

}
