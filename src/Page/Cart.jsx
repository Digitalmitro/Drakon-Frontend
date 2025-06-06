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
  const { cart, setCart, loading, setLoading } = useCart();

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
    <div className="mx-auto px-4 sm:px-6 pt-24 pb-12">
      <h1 className="text-2xl font-bold mb-8">Shopping Cart</h1>

      {loading ? (
        <p>Loading...</p>
      ) : cart.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow-sm text-center">
          <p className="text-gray-500 text-lg">Your cart is empty.</p>
          <button
            onClick={() => navigate("/shop")}
            className="mt-4 bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8 md:px-20">
          {/* Cart Items - Responsive */}
          <div className="w-full lg:w-[70%]  ">
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
              {/* Desktop Header - Hidden on mobile */}
              <div className="hidden sm:grid lg:grid-cols-12 gap-4 border-b pb-2 mb-4 text-sm text-gray-500">
                <div className="col-span-5 ">Product</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-3 text-center">Total</div>
                <div className="col-span-2 text-center">Delete</div>
              </div>

              {cart.map((item) => (
                <div
                  key={item.productId._id}
                  className="flex flex-col sm:grid sm:grid-cols-12 gap-4 py-4 border-b last:border-b-0"
                >
                  {/* Product Info */}
                  <div className="sm:col-span-5 flex items-start gap-4">
                    <img
                      src={item.productId.image[0]}
                      alt={item.productId.title}
                      className="w-20 h-20 object-contain rounded-md"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-700 text-base">
                        {item.productId.title}
                      </h3>
                      <div className="text-sm text-gray-500 mt-1 space-y-1">

                      </div>
                      {/* Mobile Price - Hidden on desktop */}
                      <p className="sm:hidden font-semibold mt-2 text-base">
                        ${item.total.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className="sm:col-span-2 flex items-center md:justify-center">
                    <span className="sm:hidden text-gray-500">Quantity:</span>
                    <div className="flex items-center gap-2  rounded-md px-3 py-1">
                      {/* <span className="text-gray-500">-</span> */}
                      <span className="font-medium">{item.quantity} {item.productId?.size ?? item?.size}  </span>
                      {/* <span className="text-gray-500">+</span> */}
                    </div>
                  </div>



                  {/* Total - Hidden on mobile (shown in product info) */}
                  <div className="hidden sm:flex sm:col-span-3 items-center justify-center">
                    <p className="font-bold text-base">
                      ${item.total.toFixed(2)}
                    </p>
                  </div>

                  <div className="hidden sm:flex sm:col-span-2 items-center justify-center">
                    <button
                      className="text-gray-400 hover:text-red-500 transition"
                      onClick={() => removeProduct(item.productId._id)}
                    >
                      <FaTrash size={16} />
                    </button>
                  </div>

                  {/* Delete Button - Bottom right on mobile */}
                  <div className="sm:hidden flex justify-end mt-2">
                    <button
                      className="text-gray-400 hover:text-red-500 transition"
                      onClick={() => removeProduct(item.productId._id)}
                    >
                      <FaTrash size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary - Full width on mobile */}
          <div className="w-full lg:w-[30%]">
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm lg:sticky lg:top-24">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>

              {subtotal >= 200 && (
                <div className="bg-green-50 text-green-700 p-3 rounded-md mb-4 text-sm">
                  Nice work! You've unlocked free shipping
                </div>
              )}

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                className="w-full bg-black text-white py-3 rounded-md font-semibold hover:bg-gray-800 transition mb-4"
              >
                CHECKOUT
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
