import axios from 'axios';

//To get all product on Home display
//modify this url to point to your backend
//Uncomment when using your endpoint
const API_URL = 'http://localhost:8080/vendingapi/products';//spring

// const API_URL='https://localhost:7077/api/Product';//dot net

export const fetchProducts = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};