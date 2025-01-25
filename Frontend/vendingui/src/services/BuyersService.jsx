import axios from 'axios';

// Set up the base URL for the API (adjust this to your actual base URL)
const API_URL = 'http://localhost:8081/vendingmachine/admin';
const token = localStorage.getItem('authToken');  // Assuming the token is stored in localStorage
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};


export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/getAllUsers`, config);
    return response.data;  // Return users data
  } catch (error) {
    console.error('Error fetching all users:', error);
    throw error;
  }
};

// export const updateUserName = async (userId, newName) => {
//     try {
//         const response = await axios.put(
//           `${API_URL}/updateadmin/${userId}`,
//           { newName },  // Send the newName as part of the request body
//           config  // Add the config object to include the Authorization header
//         );
//         return response.data;
//   } catch (error) {
//     console.error('Error updating user name:', error);
//     throw error;
//   }
// };

export const updateUserName = async (userId, newName) => {
    try {
        const response = await axios.put(`${API_URL}/updateadmin/${userId}?newName=${newName}`, {}, config);
      return response.data;  // Return updated user data
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with an error status
        console.error('Error response:', error.response.data);
        console.error('Error status:', error.response.status);
        console.error('Error headers:', error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Error request:', error.request);
      } else {
        // Something else triggered the error
        console.error('Error message:', error.message);
      }
      throw error;
    }
  };
  

export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${API_URL}/deleteadmin/${userId}`, config);
    return response.data;  // Return success message or data
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};


