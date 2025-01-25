import React, { useState, useEffect } from 'react';
import BuyersService from '../../services/BuyersService';

const ManageBuyers = () => {
  const [users, setUsers] = useState([]);
  const [newAdmin, setNewAdmin] = useState({ userId: '', name: '', password: '', role: false });
  const [updatedName, setUpdatedName] = useState('');
  const [userIdToDelete, setUserIdToDelete] = useState('');

  // Fetch all users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await BuyersService.getAllUsers();
        setUsers(users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleAddAdmin = async () => {
    try {
      const response = await BuyersService.addAdmin(newAdmin);
      console.log(response);
      setUsers([...users, newAdmin]);  // Add the new admin to the list
    } catch (error) {
      console.error("Error adding admin:", error);
    }
  };

  const handleDeleteAdmin = async () => {
    try {
      const response = await BuyersService.deleteAdmin(userIdToDelete);
      console.log(response);
      setUsers(users.filter(user => user.userId !== userIdToDelete)); // Remove deleted user from list
    } catch (error) {
      console.error("Error deleting admin:", error);
    }
  };

  const handleUpdateAdminName = async () => {
    try {
      const response = await BuyersService.updateAdminName(userIdToDelete, updatedName);
      console.log(response);
      setUsers(users.map(user => user.userId === userIdToDelete ? { ...user, name: updatedName } : user)); // Update name in list
    } catch (error) {
      console.error("Error updating admin name:", error);
    }
  };

  return (
    <div>
      <h1>Manage Buyers</h1>
      
      {/* Display the list of users */}
      <h2>Users List</h2>
      <ul>
        {users.map(user => (
          <li key={user.userId}>
            {user.name} ({user.userId})
          </li>
        ))}
      </ul>

      {/* Form to add a new admin */}
      <h2>Add Admin</h2>
      <input
        type="text"
        placeholder="User ID"
        value={newAdmin.userId}
        onChange={e => setNewAdmin({ ...newAdmin, userId: e.target.value })}
      />
      <input
        type="text"
        placeholder="Name"
        value={newAdmin.name}
        onChange={e => setNewAdmin({ ...newAdmin, name: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={newAdmin.password}
        onChange={e => setNewAdmin({ ...newAdmin, password: e.target.value })}
      />
      <button onClick={handleAddAdmin}>Add Admin</button>

      {/* Form to delete an admin */}
      <h2>Delete Admin</h2>
      <input
        type="text"
        placeholder="User ID to Delete"
        value={userIdToDelete}
        onChange={e => setUserIdToDelete(e.target.value)}
      />
      <button onClick={handleDeleteAdmin}>Delete Admin</button>

      {/* Form to update admin name */}
      <h2>Update Admin Name</h2>
      <input
        type="text"
        placeholder="New Name"
        value={updatedName}
        onChange={e => setUpdatedName(e.target.value)}
      />
      <button onClick={handleUpdateAdminName}>Update Name</button>
    </div>
  );
};

export default ManageBuyers;
