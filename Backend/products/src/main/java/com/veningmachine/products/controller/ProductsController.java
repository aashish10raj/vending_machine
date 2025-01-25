package com.veningmachine.products.controller;

import com.veningmachine.products.model.Products;
import com.veningmachine.products.service.ProductsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/vendingapi/products")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ProductsController {

    private static final Logger logger = LoggerFactory.getLogger(ProductsController.class);

    @Autowired
    private ProductsService productsService;

    @GetMapping
    public ResponseEntity<List<Products>> getAllProducts() {
        logger.info("Fetching all products");
        List<Products> products = productsService.getAllProducts();
        return ResponseEntity.ok(products);
    }

    @PostMapping
    public ResponseEntity<Products> addProduct(@RequestBody Products product) {
        logger.info("Adding a new product: {}", product.getProductName());
        Products savedProduct = productsService.saveProduct(product);
        return ResponseEntity.ok(savedProduct);
    }

    @PutMapping("/{id}/quantity")
    public ResponseEntity<Products> updateProductQuantity(@PathVariable int id, @RequestParam int quantity) {
        logger.info("Updating quantity for product with ID: {}", id);
        Products updatedProduct = productsService.updateProductQuantity(id, quantity);
        if (updatedProduct == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedProduct);
    }

    @PutMapping("/{id}/price")
    public ResponseEntity<Products> updateProductPrice(@PathVariable int id, @RequestParam float price) {
        logger.info("Updating price for product with ID: {}", id);
        Products updatedProduct = productsService.updateProductPrice(id, price);
        if (updatedProduct == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedProduct);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable int id) {
        logger.info("Deleting product with ID: {}", id);
        boolean isDeleted = productsService.deleteProduct(id);
        if (!isDeleted) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }
}
