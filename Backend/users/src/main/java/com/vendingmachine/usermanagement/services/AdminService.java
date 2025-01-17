package com.vendingmachine.usermanagement.services;



import com.vendingmachine.login.model.Users;
import com.vendingmachine.login.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Random;

@Service
public class AdminService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    // Method to generate random numbers between 501 and 1000
    public int generateRandomId() {
        Random random = new Random();
        return random.nextInt(500) + 501;  // 500 is the range, 501 is the starting point
    }

    //add a new admin
    public boolean addAdmin(Users admin) {
        int randomId = generateRandomId();
        //check if user already present
        Optional<Users> existingUser = userRepository.findByUserId(admin.getUserId());
        if(existingUser.isPresent()){
            return false;
        }

        //set role as admin and encrypt the password
        admin.setRole(admin.getRole());
        admin.setName(admin.getName());
        admin.setUserId(admin.getUserId());
        admin.setPassword(passwordEncoder.encode(admin.getPassword()));
        admin.setId(randomId);

        userRepository.save(admin);
        return true;
    }
}
