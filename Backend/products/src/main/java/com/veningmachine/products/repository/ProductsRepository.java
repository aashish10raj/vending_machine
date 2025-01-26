package com.veningmachine.products.repository;

import com.veningmachine.products.model.Products;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductsRepository extends MongoRepository<Products, Integer> {
}
