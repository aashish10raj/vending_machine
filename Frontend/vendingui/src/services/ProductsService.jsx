// src/services/ProductsService.jsx
import axios from 'axios';

// Modify this URL to point to your backend
const API_URL = 'http://localhost:8080/vendingapi/products'; // Spring backend
// const API_URL = 'https://localhost:7077/api/Product'; // Dotnet backend

// Fetch all products
export const fetchProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Update product price
export const updateProductPrice = async (id, price) => {
  try {
    const response = await axios.put(`${API_URL}/${id}/price?price=${price}`);
    return response.data;
  } catch (error) {
    console.error('Error updating price:', error);
    throw error;
  }
};

// Update product quantity
export const updateProductQuantity = async (id, quantity) => {
  try {
    const response = await axios.put(`${API_URL}/${id}/quantity?quantity=${quantity}`);
    return response.data;
  } catch (error) {
    console.error('Error updating quantity:', error);
    throw error;
  }
};

// Delete product
export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};
