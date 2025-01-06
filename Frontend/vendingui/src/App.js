import React, { useEffect, useState } from "react";
import "./main.css";
import HomePage from "./Components/VendingMachineHomePage/homePage";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import VendingMachineHomePage from "./Components/VendingMachineHomePage/homePage";
import LoginPage from "./Components/LoginPage/login";

const App = () => {


  return (
    <Router>
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<VendingMachineHomePage />} />
        <Route path="/login" element={<LoginPage />} />
        </Routes>
      <Footer />
    </div>
    </Router>
  );
};

export default App;