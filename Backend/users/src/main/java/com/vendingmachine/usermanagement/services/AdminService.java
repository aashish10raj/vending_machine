package com.vendingmachine.usermanagement.services;



import com.vendingmachine.login.model.Users;
import com.vendingmachine.login.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AdminService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    //add a new admin
    public boolean addAdmin(Users admin) {
        //check if user already present
        Optional<Users> existingUser = userRepository.findByUserId(admin.getUserId());
        if(existingUser.isPresent()){
            return false;
        }

        //set role as admin and encrypt the password
        admin.setRole(true);
        admin.setName(admin.getName());
        admin.setUserId(admin.getUserId());
        admin.setPassword(passwordEncoder.encode(admin.getPassword()));

        userRepository.save(admin);
        return true;
    }
}
