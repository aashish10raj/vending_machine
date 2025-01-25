package com.veningmachine.products.model;

import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Getter
@Document(collection = "Products")
public class Products {

    // Getters and Setters
    @Id
    private int id;
    @Field(name = "product_name")
    private String productName;
    private float price;
    private int quantity;
    private String imageUrl;

    public void setId(int id) {
        this.id = id;
    }


    public void setProductName(String productName) {
        this.productName = productName;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
