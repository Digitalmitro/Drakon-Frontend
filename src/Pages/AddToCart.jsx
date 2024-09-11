import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import { NavLink, useNavigate } from 'react-router-dom';
import base1 from "../assets/base-1.jpg";
// import './AddToCart.css'; // Assuming CSS file for styling

const AddToCart = () => {
    const navigate = useNavigate()
    const [cartLen, setCartLen] = useState(1);  // Number of items in cart
    const [quantity, setQuantity] = useState(1); // Quantity for the product
    const pricePerItem = 399.95;  // Price per item
    const shippingCost = 6.99;
    const shippingDiscount = cartLen * pricePerItem > 35 ? -6.99 : 0;  // Free shipping condition

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
            <div className='cart-container container '>
                {cartLen !== 0 ? (
                    <>
                        <div className='my-3'>
                        <h4 >CHECKOUT</h4>
                        <p>{`${quantity} item(s) - $${subtotal.toFixed(2)}`}</p>
                        </div>
                        <div className="carttrue">
                            <div className="main-cart">
                                {/* Left Side - Product Details */}
                                <div className="left-cart my-3">
                                    <img
                                        src={base1} 
                                    />
                                    <div className="product-details" >
                                        <h4 className='my-3'style={{letterSpacing:"0.7px"}}>
                                        REV1X 11.75" Summer Fresh Infield Glove, Right Hand Throw</h4>
                                        
                                        <div className="quantity-control">
                                        <div className="productsIds">
                                        <h6 >Product Id</h6>
                                        <p>KK21233455jjs</p>
                                        </div>
                                        
                                        <div className="each-price-product" >
                                        <h6 >Each</h6>
                                        <p>$3999</p>
                                        </div>
                                            <div>
                                                <h6 className='mx-3 mb-3'>Quantity</h6>
                                            <button onClick={handleRemove}>-</button>
                                            <span className='mx-3'>{quantity}</span>
                                            <button onClick={handleAdd}>+</button></div>
                                        <div>
                                        <h6 >Total </h6>
                                            <p>${subtotal.toFixed(2)}</p>
                                        </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Side - Pricing & Coupon */}
                                <div className="right-cart" >
                                    <h4>Enter Coupon Code (optional)</h4>
                                    <div style={{display:"flex"}}>
                                    <input type="text" className='my-1' placeholder="Coupon Code" />
                                   <button className='button-5' style={{height:"20px"}}>SUBMIT</button>
                                    </div>
{/* 
                                    <div className="pricing-details">
                                        <p>Free Shipping $35 Sitewide - $6.99</p>
                                        <p>Subtotal: ${subtotal.toFixed(2)}</p>
                                        <p>Shipping Cost: ${shippingCost.toFixed(2)}</p>
                                        <p>Shipping Discount: ${shippingDiscount.toFixed(2)}</p>
                                        <p>Sales Tax: -</p>
                                        <h4>Estimated Total: ${estimatedTotal.toFixed(2)}</h4>
                                    </div> */}


<div className="pricing-details">
    <div className="pricing-row">
        <span>Free Shipping $35 Sitewide</span>
        <span>$6.99</span>
    </div>
    <div className="pricing-row">
        <span>Subtotal:</span>
        <span>${subtotal.toFixed(2)}</span>
    </div>
    <div className="pricing-row">
        <span>Shipping Cost:</span>
        <span>${shippingCost.toFixed(2)}</span>
    </div>
    <div className="pricing-row">
        <span>Shipping Discount:</span>
        <span>${shippingDiscount.toFixed(2)}</span>
    </div>
    <div className="pricing-row">
        <span>Sales Tax:</span>
        <span>-</span>
    </div>
    <div className="pricing-row total">
        <span>Estimated Total:</span>
        <span>${estimatedTotal.toFixed(2)}</span>
        
    </div>
    <button className='button-5' style={{height:"20px"}} onClick={()=> navigate(`/checkout`)}>CHECK OUT</button>
</div>

                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="cartfalse">
                        <h4>Your Shopping Cart is Empty</h4>
                        <NavLink to={"/"}>
                            <button className='button-5'>CONTINUE SHOPPING</button>
                        </NavLink>
                    </div>
                )}
            </div>
        </Layout>
    );
}

export default AddToCart;
