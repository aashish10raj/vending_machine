import React, { useEffect, useState } from "react";
import PurchaseService from "../../services/PurchaseService";

const BuyerPortal = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [balance, setBalance] = useState(0);
  const [userToken, setUserToken] = useState(localStorage.getItem("authToken"));

  useEffect(() => {
    fetchProducts();
    fetchUserBalance();
  }, []);

  const fetchProducts = async () => {
    const response = await PurchaseService.getAllProducts();
    setProducts(response);
  };

  const fetchUserBalance = async () => {
    const balanceData = await PurchaseService.getUserBalance(userToken);
    if (balanceData) {
      setBalance(balanceData.balance);
    }
  };

  // const addToCart = (product) => {
  //   setCart((prevCart) => [...prevCart, product]);
  // };
  const addToCart = (product) => {
    setCart((prevCart) => {
      // Check if product already exists in cart
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) return prevCart; // Prevent duplicate entry
      return [...prevCart, product];
    });
  };
  

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  const handleCheckout = async () => {
    // const totalAmount = calculateTotal();
    const totalAmount = parseFloat(calculateTotal());
    const cartWithFloatPrices = cart.map(item => ({
      ...item,
      price: parseFloat(item.price) // ✅ Ensure price is always a float
    }));
  
    const response = await PurchaseService.checkout(userToken, cartWithFloatPrices, totalAmount);
    
    if (response.success) {
      alert("Purchase Successful!");
      setCart([]);
      fetchUserBalance();
    } else {
      alert(response.message);
    }
  };
  //   const response = await PurchaseService.checkout(userToken, cart, totalAmount);
  //   if (response.success) {
  //     alert("Purchase Successful!");
  //     setCart([]);
  //     fetchUserBalance();
  //   } else {
  //     alert(response.message);
  //   }
  // };

  return (
    <div className="container mt-4">
      <h2>Welcome </h2>
      <h4>Balance: ₹{balance}</h4>

      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className="card h-100">
              <img src={product.imageUrl} className="card-img-top" alt={product.productName} />
              <div className="card-body">
                <h5>{product.productName}</h5>
                <p>Price: ₹{product.price}</p>
                <button className="btn btn-primary" onClick={() => addToCart(product)}>Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h3>Cart</h3>
      {cart.map((item, index) => (
        <p key={index}>{item.productName} - ₹{item.price}</p>
      ))}

      <h4>Total: ₹{calculateTotal()}</h4>
      <button className="btn btn-success" onClick={handleCheckout}>Checkout</button>
    </div>
  );
};

export default BuyerPortal;
