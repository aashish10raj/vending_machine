import React, { useState, useEffect } from "react";
import { fetchProducts, updateProductPrice, updateProductQuantity, deleteProduct, addProduct } from "../../services/ProductsService";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    productName: "",
    price: "",
    quantity: "",
    imageUrl: "",
  });

  // Fetch products from the API
  const fetchAllProducts = async () => {
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await addProduct(newProduct);
      alert("Product added successfully!");
      fetchAllProducts(); // Refresh the product list
      setNewProduct({ productName: "", price: "", quantity: "", imageUrl: "" });
      setShowAddForm(false);
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product.");
    }
  };

  const toggleAddForm = () => setShowAddForm(!showAddForm);

  const handleShowAll = () => setShowAll(true);
  const handleCollapse = () => setShowAll(false);

  const handleUpdatePrice = async (id) => {
    const newPrice = prompt("Enter the new price:");
    if (newPrice) {
      try {
        await updateProductPrice(id, newPrice);
        alert("Price updated successfully!");
        fetchAllProducts();
      } catch (error) {
        alert("Failed to update price.");
      }
    }
  };

  const handleUpdateQuantity = async (id) => {
    const newQuantity = prompt("Enter the new quantity:");
    if (newQuantity) {
      try {
        await updateProductQuantity(id, newQuantity);
        alert("Quantity updated successfully!");
        fetchAllProducts();
      } catch (error) {
        alert("Failed to update quantity.");
      }
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
        alert("Product deleted successfully!");
        fetchAllProducts();
      } catch (error) {
        alert("Failed to delete product.");
      }
    }
  };

  return (
    <div className="container mt-4">
      <div className="text-end mb-3">
        <button className="btn btn-success" onClick={toggleAddForm}>
          {showAddForm ? "Close Form" : "Add Product"}
        </button>
      </div>

      {showAddForm && (
        <div className="card p-3 mb-4">
          <form onSubmit={handleAddProduct}>
            <div className="mb-3">
              <label className="form-label">Product Name</label>
              <input
                type="text"
                className="form-control"
                name="productName"
                value={newProduct.productName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Price</label>
              <input
                type="number"
                className="form-control"
                name="price"
                value={newProduct.price}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Quantity</label>
              <input
                type="number"
                className="form-control"
                name="quantity"
                value={newProduct.quantity}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Image URL</label>
              <input
                type="text"
                className="form-control"
                name="imageUrl"
                value={newProduct.imageUrl}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">Add Product</button>
          </form>
        </div>
      )}

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
