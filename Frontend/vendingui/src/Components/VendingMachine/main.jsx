import react from "react";
import "./main.css";

const VendingMachine=()=>{


    return(
        <div className="main-container">
        <div className="product-list">
            <div className="product">
              <div className="product-name">PRODUCT 1 </div>
              <div className="product-price"> 22 </div>            
            </div>

            <div className="product">
              <div className="product-name">PRODUCT 2 </div>
              <div className="product-price"> 23 </div>            
            </div>

            <div className="product">
              <div className="product-name">PRODUCT 3 </div>
              <div className="product-price"> 24 </div>            
            </div>

        </div>
          
          <div className="button-container ">
            <button className="btn btn-danger cancel-btn" > CANCEL </button>
            
            <button className="btn btn-success cancel-btn" > Insert Coin </button>

        
          </div>
        </div>


    );

}

export default VendingMachine;