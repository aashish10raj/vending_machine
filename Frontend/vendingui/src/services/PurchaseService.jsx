import axios from "axios";

const API_URL = "http://localhost:8081/vendingmachine/buyer";

const token = localStorage.getItem("authToken");
console.log("Token in localStorage:", token);


const PurchaseService = {
  getAllProducts: async () => {
    try {
      const response = await axios.get("http://localhost:8080/vendingapi/products");
      return response.data;
    } catch (error) {
      console.error("Error fetching products", error);
      return null;
    }
  },

  getUserBalance: async (token) => {
    try {
      const response = await axios.get(`${API_URL}/getbalance`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching balance", error);
      return null;
    }
  },

  checkout: async (token, cart, totalAmount) => {
    try {
      const response = await axios.post(
        `${API_URL}/checkout`,
        { cart, totalAmount },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return { success: true, message: response.data };
    } catch (error) {
      console.error("Checkout failed", error);
      return { success: false, message: error.response?.data || "Checkout failed" };
    }
  },
};

export default PurchaseService;
