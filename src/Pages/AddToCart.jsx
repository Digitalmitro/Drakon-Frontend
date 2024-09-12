import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "../Components/styles/cart.css";

import base1 from "../assets/base-1.jpg";
import gpay from "../assets/gpay.png";
import paypal from "../assets/paypal.jpg";
import Shipping from "../assets/freeshipping.jpg"
import Returns from "../assets/secure.jpg"
import Secure from "../assets/freeshipping.jpg"
import BuyNow from "../assets/affirm.jpg"

const AddToCart = () => {
  const navigate = useNavigate();
  const [cartLen, setCartLen] = useState(1); // Number of items in cart
  const [quantity, setQuantity] = useState(1); // Quantity for the product
  const pricePerItem = 399.95; // Price per item
  const shippingCost = 6.99;
  const shippingDiscount = cartLen * pricePerItem > 35 ? -6.99 : 0; // Free shipping condition

  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);

  const handleAdd = () => {
    setQuantity(quantity + 1);
  };

  const handleRemove = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const subtotal = pricePerItem * quantity;
  const estimatedTotal = subtotal + shippingCost + shippingDiscount;

  return (
    <Layout>
      <div className="cart-container  ">
        {cartLen !== 0 ? (
          <>
            <div className="my-3 cart-heading">
              <h4 className="">CHECKOUT</h4>
              <p>{`${quantity} item(s) - $${subtotal.toFixed(2)}`}</p>
              <div className="express-checkout ">
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
                  <p className="qty">items - 1</p>
                    </div>
                    <div className="left-cart my-3">
                      <div className="flex justify-conten-between">
                      <h5 className="" >
                       Summer Fresh Infield Glove, Right Hand
                        Throw
                      </h5>
                  <p className="x">  <> X</></p>

                      </div>
                   
                    <div className="flex">  
                  {/* Left Side - Product Details */}
                    
                  <div className="product-info">
                  <img src={base1} />
                    <div className="product-details">
                     

                      <div className="quantity-control">
                        <div className="productsIds">
                          <h6>Product Id</h6>
                          <h6>KK21233455jjs</h6>
                          <h6>BRAND : Drakon</h6>
                          <h6> Length : 27 in</h6>
                          <h6> In Stock </h6>
                        </div>

                        <div className="each-price-product">
                          <h6>Each</h6>
                          <p>$3999</p>
                        </div>
                        <div>
                          <h6 className="quantity mx-3 mb-3">Quantity</h6>
                          <button onClick={handleRemove}>-</button>
                          <span className="mx-3">{quantity}</span>
                          <button onClick={handleAdd}>+</button>
                        </div>
                        <div>
                          <h6>Total </h6>
                          <p>${subtotal.toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  </div>
                  </div>
                </div>

                {/* Right Side - Pricing & Coupon */}
                <div className="right-cart">
                  <h5>Enter Coupon Code (optional)</h5>
                  <div  className="input-button"style={{ display: "flex" }}>
                    <input
                      type="text"
                      className="my-1"
                      placeholder="Coupon Code"
                    />
                    <button className="button-5" style={{ height: "15px" , marginTop:"-1px"
                      
                    }}>
                      SUBMIT
                    </button>
                  </div>
          

                  <div className="pricing-details">
                  
                    <div className="pricing-row">
                      <p><b>Subtotal : </b></p>
                      <p> <b>${subtotal.toFixed(2)}</b></p>
                    </div>
                    <div className="pricing-row">
                      <p>Shipping Cost:</p>
                      <p>${shippingCost.toFixed(2)}</p>
                    </div>
                    {/* <div className="pricing-row">
                      <p>Shipping Discount:</p>
                      <p>${shippingDiscount.toFixed(2)}</p>
                    </div> */}
                    <div className="pricing-row">
                      <p>Sales Tax:</p>
                      <p>-</p>
                    </div>
                    <div className="pricing-row total">
                      <p>Estimated Total:</p>
                      <p>${estimatedTotal.toFixed(2)}</p>
                    </div>
                    <p className="mt-3">EMI - starts at As low as $50/m with affirm <a href="#">check your pruchasing power</a> </p>
                    <button
                      className="button-5"
                      // style={{ height: "60px !important", marginTop:"30px" }}
                      onClick={() => navigate(`/checkout`)}
                    >
                      CHECK OUT
                    </button>
                    <hr/>
                  </div>
                  <div>
                    {/* <div className="flex">
                      <img src="" alt=""/>
                      <p>Free Shipping</p>
                    </div> */}

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
