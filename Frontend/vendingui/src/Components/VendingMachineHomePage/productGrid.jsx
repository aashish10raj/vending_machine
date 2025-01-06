import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../../services/DisplayProducts';
import './homePage.css';

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [showAll, setShowAll] = useState(false);

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

  const handleShowAll = () => {
    setShowAll(true);
  };
  const handleCollapse = () => {
    setShowAll(false);
  };
  

  return (
    <div className="container mt-4">
      <div className="row">
        {(showAll ? products : products.slice(0, 6)).map((product) => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className="card h-100">
              <img src={product.imageUrl} alt={product.productName} className="card-img-top product-image" />
              <div className="card-body">
                <h5 className="card-title">{product.productName}</h5>
              { /* <h5 className="card-title">{product.product_name}</h5>*/ } {/* adding for dot net as name in mongodb is product_name*/ }
                <p className="card-text">Price: ₹{product.price}</p>
                <p className="card-text">Quantity: {product.quantity}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-4">
        {!showAll && products.length > 6 && (
          <button className="btn btn-primary custom-button" onClick={handleShowAll}>Show all products</button>
        )}
        {showAll && (
          <button className="btn btn-info custom-collapse" onClick={handleCollapse}>Collapse</button>
        )}
      </div>
    </div>
  );
};

export default ProductGrid;