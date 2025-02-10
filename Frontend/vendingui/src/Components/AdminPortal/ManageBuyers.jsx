import React, { useEffect, useState } from 'react';
import { fetchUsers, updateUserName, deleteUser, addUser, fetchUserBalance, updateUserBalance } from "../../services/BuyersService";  

const ManageBuyers = () => {
  const [users, setUsers] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [balances, setBalances] = useState({});

  const [newUser, setNewUser] = useState({
    userId: "",
    name: "",
    password: "",
    isadmin: false
  });

  useEffect(() => {
    const getUsers = async () => {
      try {
        const usersData = await fetchUsers();
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    getUsers();
  }, []);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const usersData = await fetchUsers();
        setUsers(usersData);
  
        // Fetch balances for all users
        const balanceData = {};
        await Promise.all(
          usersData.map(async (user) => {
            balanceData[user.userId] = await fetchUserBalance(user.userId);
          })
        );
        setBalances(balanceData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    getUsers();
  }, []);
  
  
  const handleUpdateBalance = async (userId) => {
    const newBalance = prompt("Enter new balance:");
    if (newBalance && !isNaN(newBalance)) {
      try {
        await updateUserBalance(userId, parseFloat(newBalance));
        setBalances({ ...balances, [userId]: parseFloat(newBalance) });
      } catch (error) {
        console.error("Error updating balance:", error);
      }
    }
  };
  
  

  const handleUpdateName = async (userId) => {
    const newName = prompt("Enter new name:");
    if (newName) {
      try {
        await updateUserName(userId, newName);
        setUsers(users.map(user => user.userId === userId ? { ...user, name: newName } : user));
      } catch (error) {
        console.error("Error updating name:", error);
      }
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(userId);
        setUsers(users.filter(user => user.userId !== userId));
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const handleShowAll = () => setShowAll(true);
  const handleCollapse = () => setShowAll(false);

  const toggleAddForm = () => setShowAddForm(!showAddForm);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewUser({
      ...newUser,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      await addUser(newUser);
      setUsers([...users, newUser]);
      setNewUser({ userId: "", name: "", password: "", isadmin: false });
      setShowAddForm(false);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="text-end mb-3">
        <button className="btn btn-success" onClick={toggleAddForm}>
          {showAddForm ? "Close Form" : "Add User"}
        </button>
      </div>

      {showAddForm && (
        <div className="card p-3 mb-4">
          <form onSubmit={handleAddUser}>
            <div className="mb-3">
              <label className="form-label">User ID</label>
              <input
                type="text"
                className="form-control"
                name="userId"
                value={newUser.userId}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={newUser.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={newUser.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-check mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                name="isadmin"
                checked={newUser.isadmin}
                onChange={handleInputChange}
              />
              <label className="form-check-label">Is Admin?</label>
            </div>
            <button type="submit" className="btn btn-primary">Add User</button>
          </form>
        </div>
      )}

      <div className="row">
        {(showAll ? users : users.slice(0, 6)).map((user) => (
          // <div key={user.userId} className="col-md-4 mb-4">
          //   <div className="card h-100">
          //     <div className="card-body">
          //       <h5 className="card-title">{user.name}</h5>
          //       <p className="card-text">User ID: {user.userId}</p>
          //       <p className="card-text">Role: {user.isadmin ? "Admin" : "Buyer"}</p>
          //       <div className="d-flex justify-content-between mt-3">
          //         <button
          //           className="btn btn-sm btn-warning"
          //           onClick={() => handleUpdateName(user.userId)}
          //         >
          //           Update Name
          //         </button>
          //         <button
          //           className="btn btn-sm btn-danger"
          //           onClick={() => handleDeleteUser(user.userId)}
          //         >
          //           Delete
          //         </button>
          //       </div>
          //     </div>
          //   </div>
          // </div>
          <div key={user.userId} className="col-md-4 mb-4">
  <div className="card h-100">
    <div className="card-body">
      <h5 className="card-title">{user.name}</h5>
      <p className="card-text">User ID: {user.userId}</p>
      <p className="card-text">Role: {user.role ? "Admin" : "Buyer"}</p>
      <p className="card-text">Balance: ₹{balances[user.userId] || 0}</p>

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

      <button
        className="btn btn-sm btn-info mt-2"
        onClick={() => handleUpdateBalance(user.userId)}
      >
        Update Balance
      </button>
    </div>
  </div>
</div>

        ))}
      </div>
      <div className="text-center mt-4">
        {!showAll && users.length > 6 && (
          <button className="btn btn-primary" onClick={handleShowAll}>
            Show all users
          </button>
        )}
        {showAll && (
          <button className="btn btn-info" onClick={handleCollapse}>
            Collapse
          </button>
        )}
      </div>
    </div>
  );
};

export default ManageBuyers;
