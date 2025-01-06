import axios from 'axios';


//modify this url to point to your backend
const API_URL = 'http://localhost:8080/vendingapi/products';

export const fetchProducts = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};