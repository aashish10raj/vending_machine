import React, { useEffect, useState } from "react";
import "./main.css";
import HomePage from "./Components/VendingMachineHomePage/homePage";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";

const App = () => {


  return (
    <div className="app">
      <Header />
      <HomePage />
      <Footer />
    </div>
  );
};

export default App;