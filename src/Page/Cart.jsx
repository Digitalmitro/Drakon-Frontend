import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
import Cookies from "js-cookie";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation, useSearchParams } from "react-router-dom";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [coupon, setCoupon] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const shippingCost = 6.99;
  const shippingDiscount = -6.99;
  const token = Cookies.get("token");
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");
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
  useEffect(() => {
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

  const checkPaymentStatus = async (sessionId) => {
    try {
      const paymentRes = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/api/stripe/confirm`,
        { sessionId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (paymentRes.data.session !== "paid") {
        console.warn("Payment not successful. Aborting order creation.");
        return;
      }

      // 1. Create the Order
      await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/api/order/create`,
        {
          paymentMethod: "Stripe",
          paymentStatus: "Paid"
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // 2. Optional: Send to shipping API

      // 3. Clear the cart
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_API}/api/cart/clear`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Order created and cart cleared.");
    } catch (error) {
      console.error("Error verifying payment or creating order:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    const verifyPaymentAndCreateOrder = async () => {
      if (!sessionId) return;

      try {
        // Confirm payment and create order
        checkPaymentStatus(sessionId);
      } catch (err) {
        console.error("Payment confirmation failed:", err);
      }
    };

    verifyPaymentAndCreateOrder(sessionId);
  }, [sessionId]);

  const removeProduct = async (productId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_API}/api/cart/remove`, {
        headers: { Authorization: `Bearer ${token}` },
        data: { productId }, // 🔥 this is the key part!
      });
      fetchCart();  
    } catch (error) {
      console.error("Error deleting from cart:", error.response?.data || error.message);
    }
  };


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
                <button className="text-red-500" onClick={() => removeProduct(item.productId._id)}><FaTrash /></button>
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
