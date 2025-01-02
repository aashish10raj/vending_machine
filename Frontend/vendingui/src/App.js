import React from "react";  
import "./App.css";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import VendingMachine from "./Components/VendingMachine/main";


function App() {
  return (
   <div className="App">
  <Header/>
  <VendingMachine/>
  <Footer/>
   </div>
      
  
  );
}

export default App;



