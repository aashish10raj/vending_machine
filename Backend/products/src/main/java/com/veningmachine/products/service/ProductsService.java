package com.veningmachine.products.service;

import com.veningmachine.products.model.Products;
import com.veningmachine.products.repository.ProductsRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class ProductsService {

    private static final Logger logger = LoggerFactory.getLogger(ProductsService.class);

    @Autowired
    private ProductsRepository productsRepository;

    // Method to generate random numbers between 201 and 999
    public int generateRandomId() {
        Random random = new Random();
        return random.nextInt(201) + 450;  // 500 is the range, 501 is the starting point
    }

    public List<Products> getAllProducts() {
        logger.info("Fetching all products from the database");
        return productsRepository.findAll();
    }

    public Products saveProduct(Products product) {
        int randomId = generateRandomId();
        logger.info("Saving product: {}", product.getProductName());
        product.setId(randomId);
        product.setProductName(product.getProductName());
        product.setPrice(product.getPrice());
        product.setQuantity(product.getQuantity());
        product.setImageUrl(product.getImageUrl());
        return productsRepository.save(product);
    }

    public Products updateProductQuantity(int id, int quantity) {
        logger.info("Updating quantity for product with ID: {}", id);
        Optional<Products> productOpt = productsRepository.findById(id);
        if (productOpt.isPresent()) {
            Products product = productOpt.get();
            product.setQuantity(quantity);
            return productsRepository.save(product);
        }
        return null;
    }

    public Products updateProductPrice(int id, float price) {
        logger.info("Updating price for product with ID: {}", id);
        Optional<Products> productOpt = productsRepository.findById(id);
        if (productOpt.isPresent()) {
            Products product = productOpt.get();
            product.setPrice(price);
            return productsRepository.save(product);
        }
        return null;
    }

    public boolean deleteProduct(int id) {
        logger.info("Deleting product with ID: {}", id);
        if (productsRepository.existsById(id)) {
            productsRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
