import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../../services/homepageProducts';

const ProductGrid = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        console.log("Fetched products:", data); 
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getProducts();
  }, []);

  return (
    <div className="product-grid">
      {products.map((product) => (
        <div key={product.id} className="product-tile">
          <img src={product.imageUrl} alt={product.productName} className="product-image" />
          <div className="product-details">
            <div className="product-name">{product.productName}</div>
            <div className="product-price">${product.price}</div>
            <div className="product-quantity">Quantity: {product.quantity}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;