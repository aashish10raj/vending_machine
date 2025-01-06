import React, { useEffect, useState } from "react";
import "./main.css";
import { fetchProducts } from "./services/homepageProducts";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";

const VendingMachineHomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getProducts();
  }, []);

  return (
    <div className="app">
      <Header />
    <div className="product-grid">
      {products.map((product) => (
        <div key={product._id} className="product-tile">
          <img src={product.image_url} alt={product.product_name} className="product-image" />
          <div className="product-details">
            <div className="product-name">{product.product_name}</div>
            <div className="product-price">${product.price}</div>
            <div className="product-quantity">Quantity: {product.quantity}</div>
          </div>
        </div>
      ))}
    </div>
    <Footer/>
    </div>
  );
};

export default VendingMachineHomePage;