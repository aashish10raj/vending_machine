package com.vendingMachine.product;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
public class Product {

	public static void main(String[] args) {
		SpringApplication.run(Product.class, args);

		System.out.println("Hello World");
	}
}
