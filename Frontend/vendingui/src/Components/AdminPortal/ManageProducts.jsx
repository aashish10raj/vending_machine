import React, { useState, useEffect } from "react";
import { fetchProducts, updateProductPrice, updateProductQuantity, deleteProduct  } from "../../services/ProductsService";

const ManageProducts = () => {
    const [products, setProducts] = useState([]);
  const [showAll, setShowAll] = useState(false);

  // Fetch products from the API
  const fetchAllProducts = async () => {
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Fetch products on component mount
  useEffect(() => {
    fetchAllProducts();
  }, []);

  // Update Price
  const handleUpdatePrice = async (id) => {
    const newPrice = prompt("Enter the new price:");
    if (newPrice) {
      try {
        const updatedProduct = await updateProductPrice(id, newPrice);
        alert("Price updated successfully!");
        fetchAllProducts(); // Reload products after update
      } catch (error) {
        alert("Failed to update price.");
      }
    }
  };

  // Update Quantity
  const handleUpdateQuantity = async (id) => {
    const newQuantity = prompt("Enter the new quantity:");
    if (newQuantity) {
      try {
        const updatedProduct = await updateProductQuantity(id, newQuantity);
        alert("Quantity updated successfully!");
        fetchAllProducts(); // Reload products after update
      } catch (error) {
        alert("Failed to update quantity.");
      }
    }
  };

  // Delete Product
  const handleDeleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
        alert("Product deleted successfully!");
        fetchAllProducts(); // Reload products after deletion
      } catch (error) {
        alert("Failed to delete product.");
      }
    }
  };

  // Show All Products
  const handleShowAll = () => {
    setShowAll(true);
  };

  // Collapse Product List
  const handleCollapse = () => {
    setShowAll(false);
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {(showAll ? products : products.slice(0, 6)).map((product) => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className="card h-100">
              <img
                src={product.imageUrl}
                alt={product.productName}
                className="card-img-top product-image"
              />
              <div className="card-body">
                <h5 className="card-title">{product.productName}</h5>
                <p className="card-text">Price: ₹{product.price}</p>
                <p className="card-text">Quantity: {product.quantity}</p>
                {/* Buttons for modifying price, quantity, and deleting the product */}
                <div className="d-flex justify-content-between mt-3">
                  <button
                    className="btn btn-sm btn-warning"
                    onClick={() => handleUpdatePrice(product.id)}
                  >
                    Update Price
                  </button>
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() => handleUpdateQuantity(product.id)}
                  >
                    Update Quantity
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-4">
        {!showAll && products.length > 6 && (
          <button className="btn btn-primary custom-button" onClick={handleShowAll}>
            Show all products
          </button>
        )}
        {showAll && (
          <button className="btn btn-info custom-collapse" onClick={handleCollapse}>
            Collapse
          </button>
        )}
      </div>
    </div>
  );
};

export default ManageProducts;
