package com.vendingmachine.usermanagement.controller;


import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/vendingmachine/admin")
@CrossOrigin
public class AdminController {

    @GetMapping
    public String getAdmin() {
        return "Admin";
    }
}
