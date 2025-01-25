package com.vendingmachine.usermanagement.controller;

import com.vendingmachine.login.model.Users;
import com.vendingmachine.usermanagement.services.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/vendingmachine/admin")
@CrossOrigin
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/getAllUsers")
    public ResponseEntity<List<Users>> getAllUsers() {
        List<Users> users = adminService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @PostMapping("/addadmin")
    public ResponseEntity<String> addAdmin(@RequestBody Users admin, @RequestAttribute(name = "isAdmin", required = false) Boolean isAdmin) {
        if (isAdmin == null || !isAdmin) {
            return ResponseEntity.status(403).body("Forbidden: You need admin privileges to perform this action.");
        }

        System.out.println("Received User ID: " + admin.getUserId());
        System.out.println("Received Name: " + admin.getName());
        System.out.println("Received Password: " + admin.getPassword());
        System.out.println("Is Admin: " + admin.getRole());

        if (admin.getUserId() <= 0 || admin.getName() == null || admin.getPassword() == null) {
            return ResponseEntity.badRequest().body("Invalid admin details. User ID, name, and password are required.");
        }
        boolean added = adminService.addAdmin(admin);
        if (added) {
            return ResponseEntity.ok("User added successfully!");
        } else {
            return ResponseEntity.status(400).body("Failed to add admin. User ID might already exist.");
        }
    }

    // Delete admin by user ID
    @DeleteMapping("/deleteadmin/{userId}")
    public ResponseEntity<String> deleteAdmin(@PathVariable int userId, @RequestAttribute(name = "isAdmin", required = false) Boolean isAdmin) {
        if (isAdmin == null || !isAdmin) {
            return ResponseEntity.status(403).body("Forbidden: You need admin privileges to perform this action.");
        }

        System.out.println("Deleting admin with User ID: " + userId);
        boolean deleted = adminService.deleteAdmin(userId);
        if (deleted) {
            return ResponseEntity.ok("Admin deleted successfully!");
        } else {
            return ResponseEntity.status(404).body("Admin with given ID not found.");
        }
    }

    // Update admin name by user ID
    @PutMapping("/updateadmin/{userId}")
    public ResponseEntity<String> updateAdminName(
            @PathVariable int userId,
            @RequestParam String newName,
            @RequestAttribute(name = "isAdmin", required = false) Boolean isAdmin
    ) {
        if (isAdmin == null || !isAdmin) {
            return ResponseEntity.status(403).body("Forbidden: You need admin privileges to perform this action.");
        }

        System.out.println("Updating admin with User ID: " + userId + " to new name: " + newName);
        boolean updated = adminService.updateAdminName(userId, newName);
        if (updated) {
            return ResponseEntity.ok("Admin name updated successfully!");
        } else {
            return ResponseEntity.status(404).body("Admin with given ID not found.");
        }
    }

}
