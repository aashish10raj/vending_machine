import React, { useEffect, useState } from "react";
import "./main.css";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import VendingMachineHomePage from "./Components/VendingMachineHomePage/homePage";
import LoginPage from "./Components/LoginPage/login";
import AdminPortal from "./Components/AdminPortal/AdminPortal";
import BuyerPortal from "./Components/BuyerPortal/BuyerPortal";
import ManageProducts from "./Components/AdminPortal/ManageProducts";
import ManageBuyers from "./Components/AdminPortal/ManageBuyers";


const App = () => {


  return (
    <Router>
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<VendingMachineHomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminPortal />} />
        <Route path="/buyer" element={<BuyerPortal />} />
        <Route path="/manage-products" element={<ManageProducts />} />
        <Route path="/manage-buyers" element={<ManageBuyers />} />
        </Routes>
      <Footer />
    </div>
    </Router>
  );
};

export default App;