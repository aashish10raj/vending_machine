package com.veningmachine.products.service;


import com.veningmachine.products.model.Products;
import com.veningmachine.products.repository.ProductsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductsService {

    @Autowired
    private ProductsRepository productsRepository;

    public List<Products> getAllProducts() {

        return productsRepository.findAll();
    }
}
