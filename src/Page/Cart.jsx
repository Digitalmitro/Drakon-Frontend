import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
import Cookies from "js-cookie";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCart } from "../context/CartContext";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CartPage = () => {
  const navigate = useNavigate();
  const {cart, setCart,loading, setLoading}=useCart()
  
  const [sessionId, setSessionId] = useState(null);
  const [params] = useSearchParams();
  const token = Cookies.get("token");
console.log(cart);

  useEffect(() => {
    fetchCart();
    const sid = params.get("session_id");
    if (sid) setSessionId(sid);
  }, []);

  // If we have a session_id back from Stripe, handle order creation...
  useEffect(() => {
    if (sessionId) confirmOrder(sessionId);
  }, [sessionId]);

  // 1️⃣ fetchCart
  const fetchCart = async () => {
    if (token) {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_API}/api/cart`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setCart(res.data.products || []);
      } catch (err) {
        console.error("Error fetching cart:", err);
        setCart([]);
      }
    } else {
      // guest
      setCart(JSON.parse(localStorage.getItem("guest_cart") || "[]"));
    }
    setLoading(false);
  };

  // 2️⃣ removeProduct
  const removeProduct = async (productId) => {
    if (token) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_BACKEND_API}/api/cart/remove`,
          {
            headers: { Authorization: `Bearer ${token}` },
            data: { productId },
          }
        );
        fetchCart();
      } catch (err) {
        console.error("Error deleting from cart:", err);
      }
    } else {
      // guest
      const guestCart = JSON.parse(
        localStorage.getItem("guest_cart") || "[]"
      ).filter((i) => i.productId._id !== productId);
      localStorage.setItem("guest_cart", JSON.stringify(guestCart));
      setCart(guestCart);
    }
  };

  // 3️⃣ Stripe checkout redirect
  const checkout = async () => {
    const subtotal = cart.reduce((acc, i) => acc + i.total, 0);
    const shippingCost = 6.99;
    const shippingDiscount = -6.99;
    const total = subtotal + shippingCost + shippingDiscount;

    try {
      const stripe = await stripePromise;
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/api/stripe/create-payment-intent`,
        {
          amount: Math.round(total * 100),
          success_url: `${window.location.origin}/cart?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: window.location.href,
        },
        token ? { headers: { Authorization: `Bearer ${token}` } } : {}
      );
      await stripe.redirectToCheckout({ sessionId: data.sessionId });
    } catch (err) {
      console.error("Stripe checkout error:", err);
    }
  };

  // 4️⃣ confirmOrder after Stripe returns
  const confirmOrder = async (sid) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/api/stripe/confirm`,
        { sessionId: sid },
        token ? { headers: { Authorization: `Bearer ${token}` } } : {}
      );
      // create orders on your backend, clear cart...
      if (token) {
        await axios.delete(
          `${import.meta.env.VITE_BACKEND_API}/api/cart/clear`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        localStorage.removeItem("guest_cart");
      }
      fetchCart();
      message.success("Payment successful and order placed!");
    } catch (err) {
      console.error("Order confirm error:", err);
    }
  };

  const subtotal = cart.reduce((acc, item) => acc + item.total, 0);
  const shippingCost = 6.99;
  const shippingDiscount = -6.99;
  const estimatedTotal = subtotal + shippingCost + shippingDiscount;


  return (
    <div className="max-w-5xl mx-auto px-6 pt-24 pb-5">
      <h2 className="text-lg font-semibold">Shopping Cart</h2>

      {loading ? (
        <p>Loading...</p>
      ) : cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="bg-white p-4 rounded-md shadow-md mt-4">
          {cart.map((item) => (
            <div
              key={item.productId._id}
              className="flex items-center justify-between border-b pb-4 mb-4"
            >
              <img
                src={item.productId.image[0]}
                alt={item.productId.title}
                className="w-20 h-20 object-cover rounded-md"
              />
              <div className="flex-1 space-y-2 px-4">
                <h3 className="font-semibold">{item.productId.title}</h3>X{" "}
                {item.quantity}
                <p className="text-sm text-gray-500">
                  Price: ${item.productId.price.toFixed(2)}
                </p>
              </div>
              <div className="text-center flex flex-col justify-around h-[200px]">
                <button
                  className="text-red-500"
                  onClick={() => removeProduct(item.productId._id)}
                >
                  <FaTrash />
                </button>
                <p className="font-semibold">${item.total.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {cart.length > 0 && (
        <button
          onClick={() => navigate("/checkout")}
          className="bg-red-500 text-white w-full py-3 mt-4 text-lg font-semibold rounded-md"
        >
          CHECKOUT
        </button>
      )}
    </div>
  );
};

export default CartPage;
