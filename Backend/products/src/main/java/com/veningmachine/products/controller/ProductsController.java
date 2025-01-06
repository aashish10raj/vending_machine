package com.veningmachine.products.controller;


import com.veningmachine.products.model.Products;
import com.veningmachine.products.service.ProductsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/vendingapi/products")
public class ProductsController {

    @Autowired
    private ProductsService productsService;

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping
    public List<Products> getAllProducts() {
        return productsService.getAllProducts();
    }
}
