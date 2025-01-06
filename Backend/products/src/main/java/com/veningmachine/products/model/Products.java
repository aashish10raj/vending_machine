package com.veningmachine.products.model;

import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Document(collection = "Products")
public class Products {

    // Getters and Setters
    @Id
    private String id;
    private String product_name;
    private String price;
    private String quantity;
    private String imageUrl;

    public void setId(String id) {
        this.id = id;
    }


    public void setProduct_name(String product_name) {
        this.product_name = product_name;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public void setQuantity(String quantity) {
        this.quantity = quantity;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
