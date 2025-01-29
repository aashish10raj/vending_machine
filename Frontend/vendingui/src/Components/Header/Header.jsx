import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("authToken"); // Check if JWT token exists in localStorage

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Remove token on logout
    navigate("/login"); // Redirect to login page
  };

  return (
    <header className="d-flex justify-content-between align-items-center p-3 bg-secondary text-white">
      <h1 className="m-0">VENDING MACHINE</h1>

      {isLoggedIn ? (
        // If logged in, show "Logout" button
        <button className="btn btn-danger" onClick={handleLogout}>
          LOG OUT
        </button>
      ) : (
        // If not logged in, show "Login" button
        <Link to="/login">
          <button className="btn btn-primary">
            LOG IN
          </button>
        </Link>
      )}
    </header>
  );
};

export default Header;
