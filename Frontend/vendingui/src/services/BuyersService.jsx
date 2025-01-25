import axios from 'axios';

// Set up the base URL for the API (adjust this to your actual base URL)
const API_URL = 'http://localhost:8081/vendingmachine/admin';
const token = localStorage.getItem('authToken');  // Assuming the token is stored in localStorage
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

// BuyersService contains all API calls related to the users (buyers)
const BuyersService = {

  // Fetch all users (buyers)
  getAllUsers: async () => {
    try {
      const response = await axios.get(`${API_URL}/getAllUsers`, config);
      return response.data;
    } catch (error) {
      console.error("Error fetching all users:", error);
      throw error;
    }
  },

  // Add a new admin user
  addAdmin: async (adminData) => {
    try {
      const response = await axios.post(`${API_URL}/addadmin`, adminData);
      return response.data;
    } catch (error) {
      console.error("Error adding admin:", error);
      throw error;
    }
  },

  // Delete an admin user
  deleteAdmin: async (userId) => {
    try {
      const response = await axios.delete(`${API_URL}/deleteadmin/${userId}`, config);
      return response.data;
    } catch (error) {
      console.error("Error deleting admin:", error);
      throw error;
    }
  },

  // Update admin username
  updateAdminName: async (userId, newName) => {
    try {
      const response = await axios.put(`${API_URL}/updateadmin/${userId}`, null, {
        params: { newName }
      }, config);
      return response.data;
    } catch (error) {
      console.error("Error updating admin name:", error);
      throw error;
    }
  }
};

export default BuyersService;
