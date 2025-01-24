import React from "react";
import { Link } from "react-router-dom";

const AdminPortal = () => {
  return (
    <div>
      <h1>Welcome to the Admin Portal</h1>
      <p>This is where you manage administrative tasks.</p>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Admin Portal</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" to="/manage-buyers">
                  Manage Buyers
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/manage-products">
                  Manage Products
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default AdminPortal;
