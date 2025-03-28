import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
import Cookies from "js-cookie";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [coupon, setCoupon] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const shippingCost = 6.99;
  const shippingDiscount = -6.99;
  const token = Cookies.get("token");

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_API}/api/cart`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCart(response.data.products);
      } catch (error) {
        console.error("Error fetching cart:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, [token]);

  const subtotal = cart.reduce((acc, item) => acc + item.total, 0);
  const estimatedTotal = subtotal + shippingCost + shippingDiscount;

  const checkout = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/api/stripe/create-payment-intent`,
        { amount: estimatedTotal * 100 }, // Convert to cents
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const stripe = await stripePromise;
    await stripe.redirectToCheckout({ sessionId: response.data.sessionId });
    } catch (error) {
      console.error("Error processing payment:", error);
    }
  };
  

  useEffect(() => {
    const checkPaymentStatus = async () => {
      const query = new URLSearchParams(window.location.search);
      if (query.get("success")) {
        setPaymentSuccess(true);
        await axios.post(
          `${import.meta.env.VITE_BACKEND_API}/api/order/create`,
          { paymentMethod: "Stripe" },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setCart([]);
      }
    };
    checkPaymentStatus();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-6 pt-24 pb-5">
      <h2 className="text-lg font-semibold">Shopping Cart</h2>
      {loading ? (
        <p>Loading...</p>
      ) : paymentSuccess ? (
        <p className="text-green-500 font-semibold text-center mt-4">Payment Successful! Your order has been placed.</p>
      ) : cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="bg-white p-4 rounded-md shadow-md mt-4">
          {cart.map((item) => (
            <div key={item.productId._id} className="flex items-center justify-between border-b pb-4 mb-4">
              <img src={item.productId.image[0]} alt={item.productId.title} className="w-20 h-20 object-cover rounded-md" />
              <div className="flex-1 space-y-2 px-4">
                <h3 className="font-semibold">{item.productId.title}</h3>
                <p className="text-sm text-gray-500">Price: ${item.productId.price.toFixed(2)}</p>
              </div>
              <div className="text-center flex flex-col justify-around h-[200px]">
                <button className="text-red-500"><FaTrash /></button>
                <p className="font-semibold">${item.total.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      {!paymentSuccess && cart.length > 0 && (
        <button onClick={checkout} className="bg-red-500 text-white w-full py-3 mt-4 text-lg font-semibold rounded-md">
          CHECKOUT
        </button>
      )}
    </div>
  );
};

export default CartPage;
