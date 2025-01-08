package com.vendingmachine.login.repository;

import com.vendingmachine.login.model.Users;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepository extends MongoRepository<Users, Integer> {

    Optional<Users> findByUserId(int user_id);

}
