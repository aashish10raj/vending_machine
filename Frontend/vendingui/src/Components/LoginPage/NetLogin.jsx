import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NetLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post("https://localhost:7077/login", {
        email,
        password,
      });

      console.log("Login Successful:", response.data);
      const token = response.data.token;
      localStorage.setItem("token", response.data.token); // Store JWT token


      alert("Login Successful!");

      const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
      const isAdmin = payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] === "Admin";

      // Redirect based on role
      if (isAdmin) {
        navigate("/admin");
      } else {
        navigate("/buyer");
      }

      
    } catch (err) {
      console.error("Login Error:", err);
      setError(err.response?.data || "Login failed. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <h2>.NET Login</h2>
      <form onSubmit={handleLogin} style={styles.form}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>
      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "300px",
    margin: "50px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    margin: "10px 0",
    padding: "8px",
    fontSize: "16px",
  },
  button: {
    padding: "10px",
    background: "#28a745",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
  error: {
    color: "red",
    marginTop: "10px",
  },
};

export default NetLogin;
