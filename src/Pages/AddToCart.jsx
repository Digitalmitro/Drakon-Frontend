import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios
import "../Components/styles/cart.css";

import Layout from "./Layout";
import { useSvgIcons } from "../Components/context/svgContext";
import base1 from "../assets/base-1.jpg"; // Fallback image if image is not available
import gpay from "../assets/gpaypay.png";
import paypal from "../assets/paypalwhite.jpg";
import Shipping from "../assets/freeshipping.jpg";
import Returns from "../assets/secure.jpg";
import Secure from "../assets/freeshipping.jpg";
import BuyNow from "../assets/affirm.jpg";

const AddToCart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]); // Cart items from the API
  const [loading, setLoading] = useState(true); // Loading state
  const { svgIcons } = useSvgIcons();

  const token = localStorage.getItem("token");

  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);

    // Fetch cart data when component mounts
    const fetchCartData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_API}/get-user-cart`,
          { headers: { token } } // Token in headers
        );
        setCartItems(response.data.cart); // Fetching the 'cart' array from response
      } catch (error) {
        console.error("Error fetching cart data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartData();
  }, [token]);

  const handleAdd = (itemId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === itemId ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const handleRemove = (itemId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === itemId && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item
      )
    );
  };

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.qty,
      0
    );
  };

  const calculateEstimatedTotal = (subtotal) => {
    const shippingCost = 6.99;
    const shippingDiscount = subtotal > 35 ? -6.99 : 0; // Free shipping condition
    return subtotal + shippingCost + shippingDiscount;
  };

  const subtotal = calculateSubtotal();
  const estimatedTotal = calculateEstimatedTotal(subtotal);

  if (loading) {
    return <p>Loading cart...</p>;
  }

  return (
    <Layout>
      <div className="cart-container">
        {cartItems.length !== 0 ? (
          <>
            <div className="my-3 cart-heading">
              <h4>CHECKOUT</h4>
              <p>{`${cartItems.length} item(s) - $${subtotal.toFixed(2)}`}</p>
              <div className="express-checkout">
                <p className="heading">Express Checkout</p>
                <div className="flex">
                  <img src={paypal} alt="paypal" />
                  <img src={gpay} alt="gpay" />
                </div>
              </div>
            </div>

            <div className="carttrue">
              <div className="main-cart">
                <div className="text-start">
                  <div className="flex gap-5">
                    <a href="/products">
                      <p className="continue-shopping">Continue Shopping</p>
                    </a>
                  </div>
                  {cartItems.map((item) => (
                    <div key={item._id} className="left-cart my-3">
                      <div className="flex justify-conten-between">
                        <h5>{item.title}</h5>
                        <span className="mx-2">{svgIcons.deleteSvg}</span>
                      </div>
                      <hr style={{ color: "grey" }} />
                      <div className="flex">
                        {/* Left Side - Product Details */}
                        <div className="product-info">
                          <img
                            src={item.image && item.image.length > 0 ? item.image[0] : base1}
                            alt={item.title}
                          />
                          <div className="product-details">
                            <table>
                              <thead>
                                <tr>
                                  <th>Desc</th>
                                  <th>Price</th>
                                  <th>Quantity</th>
                                  <th>Total</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>{item.title}</td>
                                  <td>${item.price}</td>
                                  <td>
                                    <button
                                      className="p-1"
                                      onClick={() => handleRemove(item._id)}
                                    >
                                      -
                                    </button>
                                    <span className="px-3">{item.qty}</span>
                                    <button
                                      className="p-1"
                                      onClick={() => handleAdd(item._id)}
                                    >
                                      +
                                    </button>
                                  </td>
                                  <td>
                                    ${(item.price * item.qty).toFixed(2)}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Right Side - Pricing & Coupon */}
                <div className="right-cart">
                  <h5>Enter Coupon Code (optional)</h5>
                  <div className="input-button" style={{ display: "flex" }}>
                    <input type="text" className="" placeholder="Coupon Code" />
                    <button className="button-5" style={{ height: "15px", marginTop: "-1px" }}>
                      SUBMIT
                    </button>
                  </div>
                  <br />

                  <div className="pricing-details">
                    <div className="pricing-row">
                      <p><b>Subtotal : </b></p>
                      <p><b>${subtotal.toFixed(2)}</b></p>
                    </div>
                    <div className="pricing-row">
                      <p>Shipping Cost:</p>
                      <p>$6.99</p>
                    </div>
                    <div className="pricing-row">
                      <p>Sales Tax:</p>
                      <p>-</p>
                    </div>
                    <div className="pricing-row total">
                      <p>Estimated Total:</p>
                      <p>${estimatedTotal.toFixed(2)}</p>
                    </div>
                    <p className="mt-3">
                      EMI - starts at As low as $50/m with affirm{" "}
                      <a href="#">check your purchasing power</a>
                    </p>
                    <button
                      className="button-5"
                      onClick={() => navigate(`/checkout`)}
                    >
                      CHECK OUT
                    </button>
                    <hr />
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="cartfalse">
            <h4>Your Shopping Cart is Empty</h4>
            <NavLink to={"/"}>
              <button className="button-5">CONTINUE SHOPPING</button>
            </NavLink>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AddToCart;
