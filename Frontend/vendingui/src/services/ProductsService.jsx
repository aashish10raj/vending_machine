import axios from "axios";

// Backend API URL (adjust according to your backend)
const API_URL = "http://localhost:8080/vendingapi/products"; // For Spring Boot backend
// const API_URL = "https://localhost:7077/api/Product"; // For .NET backend

const token = localStorage.getItem('authToken');  // Assuming the token is stored in localStorage
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

// Fetch all products
export const fetchProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// Add a new product
export const addProduct = async (product) => {
  try {
    const response = await axios.post(API_URL, product, config);
    return response.data;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

// Update product price
export const updateProductPrice = async (id, price) => {
  try {
    const response = await axios.put(`${API_URL}/${id}/price?price=${price}`,{}, config);
    return response.data;
  } catch (error) {
    console.error("Error updating price:", error);
    throw error;
  }
};

// Update product quantity
export const updateProductQuantity = async (id, quantity) => {
  try {
    const response = await axios.put(`${API_URL}/${id}/quantity?quantity=${quantity}`, {}, config);
    return response.data;
  } catch (error) {
    console.error("Error updating quantity:", error);
    throw error;
  }
};

// Delete a product
export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, config);
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};
