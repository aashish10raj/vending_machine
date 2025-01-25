import React, { useEffect, useState } from 'react';
import { fetchUsers, updateUserName, deleteUser } from "../../services/BuyersService";  


const ManageBuyers = () => {
  const [users, setUsers] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const usersData = await fetchUsers();
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    getUsers();
  }, []);

  const handleUpdateName = async (userId) => {
    const newName = prompt('Enter new name:');
    if (newName) {
      try {
        await updateUserName(userId, newName);
        setUsers(users.map(user => user.userId === userId ? { ...user, name: newName } : user));
      } catch (error) {
        console.error('Error updating name:', error);
      }
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(userId);
        setUsers(users.filter(user => user.id !== userId));
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const handleShowAll = () => {
    setShowAll(true);
  };

  const handleCollapse = () => {
    setShowAll(false);
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {(showAll ? users : users.slice(0, 6)).map((user) => (
          <div key={user.id} className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
                <p className="card-text">User ID: {user.userId}</p>
                <p className="card-text">Role: {user.isadmin ? 'Admin' : 'Buyer'}</p>
                {/* Buttons for modifying name and deleting the user */}
                <div className="d-flex justify-content-between mt-3">
                  <button
                    className="btn btn-sm btn-warning"
                    onClick={() => handleUpdateName(user.userId)}
                  >
                    Update Name
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDeleteUser(user.userId)}
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
        {!showAll && users.length > 6 && (
          <button className="btn btn-primary custom-button" onClick={handleShowAll}>
            Show all users
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

export default ManageBuyers;
