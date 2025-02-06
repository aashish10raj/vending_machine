package com.vendingmachine.login.services;


import com.vendingmachine.login.model.Users;
import com.vendingmachine.login.repository.UserRepository;
import com.vendingmachine.login.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;


//    public boolean login(int user_id, String password) {
//        Optional<Users> userOpt = userRepository.findByUserId(user_id);
//        if (userOpt.isPresent()) {
//            Users user = userOpt.get();
//            System.out.println("User found: " + user.getName());
//            System.out.println("Stored password: " + user.getPassword());
//            System.out.println("Input password: " + password);
//            return password.equals(user.getPassword());
//        }
//        System.out.println("User not found for user_id: " + user_id);
//        return false;
//    }
public Optional<Users> authenticate(int userId, String password) {
    Optional<Users> userOpt = userRepository.findByUserId(userId);
//    if (userOpt.isPresent() && password.equals(userOpt.get().getPassword())) {
//        return userOpt;
//    }
    if (userOpt.isPresent() && passwordEncoder.matches(password, userOpt.get().getPassword())) {
        return userOpt;
    }

    return Optional.empty();
}

    public String generateJwtToken(Users user) {
        return jwtUtil.generateToken(user.getName(), user.getRole(), user.getUserId());
    }

}
