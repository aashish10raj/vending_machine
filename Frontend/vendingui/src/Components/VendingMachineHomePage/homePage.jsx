import React from "react";
import "./homePage.css";

const VendingMachineHomePage = () => {

    return (
      <div className="product-tile">
      <img src={product.image_url} alt={product.product_name} className="product-image" />
      <div className="product-details">
          <div className="product-name">{product.product_name}</div>
          <div className="product-price">${product.price.toFixed(2)}</div>
          <div className="product-quantity">Quantity: {product.quantity}</div>
      </div>
  </div>
    );

}

export default VendingMachineHomePage;