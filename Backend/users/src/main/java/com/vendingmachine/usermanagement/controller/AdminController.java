package com.vendingmachine.usermanagement.controller;


import com.vendingmachine.login.model.Users;
import com.vendingmachine.usermanagement.services.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/vendingmachine/admin")
@CrossOrigin
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping
    public String getAdmin() {
        return "Admin";
    }

    @PostMapping("/addadmin")
    public ResponseEntity<String> addAdmin(@RequestBody Users admin) {
        System.out.println("Received User ID: " + admin.getUserId());
        System.out.println("Received Name: " + admin.getName());
        System.out.println("Received Password: " + admin.getPassword());
        System.out.println("Is Admin: " + admin.getRole());
        if (admin.getUserId() <= 0 || admin.getName() == null || admin.getPassword() == null) {
            return ResponseEntity.badRequest().body("Invalid admin details. User ID, name, and password are required.");
        }
        boolean added = adminService.addAdmin(admin);
        if (added) {
            return ResponseEntity.ok("Admin added successfully!");
        } else {
            return ResponseEntity.status(400).body("Failed to add admin. User ID might already exist.");
        }
    }
}
