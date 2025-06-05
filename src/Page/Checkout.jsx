import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useNavigate, useSearchParams } from "react-router-dom";
import moment from "moment";
import { message, Spin } from "antd";
import { FiEdit } from "react-icons/fi";      // ← edit icon

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function Checkout() {
  const token = Cookies.get("token");
  const decodedToken = token && jwtDecode(token);
  const userId = decodedToken?._id;
  const userEmail = decodedToken?.email;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Address form / final address
  const [showAddressForm, setShowAddressForm] = useState(true);
  const [deliveryAddress, setDeliveryAddress] = useState(null);
  const [addressForm, setAddressForm] = useState({
    shippingfirstName: "",
    shippinglastName: "",
    shippingstreetAddress: "",
    shippingcity: "",
    shippingstate: "",
    shippingcountry: "US",
    shippingzipcode: "",
    shippingphone: "",
  });

  // Cart & pricing
  const [cartData, setCartData] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [taxValue, setTaxValue] = useState(0);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);
  const [finalPayment, setFinalPayment] = useState(0);

  // Settings
  const [enableTax, setEnableTax] = useState(false);
  const [taxRate, setTaxRate] = useState(0);
  const [enableCurrency, setEnableCurrency] = useState("");
  const [enableCoupon, setEnableCoupon] = useState(false);
  const [couponList, setCouponList] = useState([]);
  const [couponName, setCouponName] = useState("");

  // Loading
  const [shippingLoading, setShippingLoading] = useState(false);

  // Stripe session
  const [sessionId, setSessionId] = useState(null);

  // ───────────────────────────────────────────────────
  // 1) on mount
  // ───────────────────────────────────────────────────
  useEffect(() => {
    fetchCart();
    fetchSettings();

    const saved = localStorage.getItem("deliveryAddress");
    if (saved) {
      setDeliveryAddress(JSON.parse(saved));
      setAddressForm(JSON.parse(saved));   // preload form for edit
      setShowAddressForm(false);
    }

    const sid = searchParams.get("session_id");
    if (sid) setSessionId(sid);
  }, []);

  // 2) confirmPayment when stripe returns
  useEffect(() => {
    if (sessionId && deliveryAddress) confirmPayment(sessionId);
  }, [sessionId, deliveryAddress]);

  // 3) auto shipping
  useEffect(() => {
    if (!showAddressForm && cartData.length) calculateShipping();
  }, [deliveryAddress]);

  // FETCH CART
  async function fetchCart() {
    if (token) {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_API}/api/cart`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setCartData(data.products || []);
      } catch {
        setCartData([]);
      }
    } else {
      setCartData(JSON.parse(localStorage.getItem("guest_cart") || "[]"));
    }
  }

  // FETCH SETTINGS
  async function fetchSettings() {
    try {
      const [sRes, cRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_BACKEND_API}/general-settings`),
        axios.get(`${import.meta.env.VITE_BACKEND_API}/coupon`),
      ]);
      setEnableCoupon(true);
      setCouponList(cRes.data || []);
      const settings = sRes.data[0];
      setEnableTax(settings.EnableTax);
      setTaxRate(settings.TaxRate);
      setEnableCurrency(settings.Currency);
    } catch {}
  }

  // SUBTOTAL / TAX
  useEffect(() => {
    const sub = cartData.reduce(
      (acc, item) => acc + (item.productId?.price || 0) * item.quantity,
      0
    );
    setSubtotal(sub);
    const t = enableTax ? (sub * taxRate) / 100 : 0;
    setTaxValue(t);
    setFinalPayment(sub + t - couponDiscount);
  }, [cartData, enableTax, taxRate, couponDiscount]);

  // APPLY COUPON
  function applyCoupon() {
    if (!enableCoupon) return message.error("Coupons disabled");
    const cp = couponList.find((c) => c.couponName === couponName);
    if (!cp) return message.error("Invalid coupon");
    setCouponDiscount((subtotal * (cp.discount || 0)) / 100);
    message.success("Coupon applied");
  }

  // SAVE ADDRESS
  function handleAddressSubmit(e) {
    e.preventDefault();
    const f = addressForm;
    if (
      !f.shippingfirstName ||
      !f.shippinglastName ||
      !f.shippingstreetAddress ||
      !f.shippingcity ||
      !f.shippingstate ||
      !f.shippingcountry ||
      !f.shippingzipcode ||
      !f.shippingphone
    ) {
      return message.error("Please fill all address fields");
    }
    setDeliveryAddress({ ...addressForm });
    setShowAddressForm(false);
    localStorage.setItem("deliveryAddress", JSON.stringify(addressForm));
  }

  // EDIT ADDRESS
  function handleEditAddress() {
    setAddressForm(deliveryAddress);
    setShowAddressForm(true);
  }

  // CALCULATE SHIPPING
  async function calculateShipping() {
    setShippingLoading(true);
    try {
      const totalOunces = cartData.reduce(
        (sum, item) => sum + (item.productId?.weight || 0) * item.quantity,
        0
      );
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/shipping/estimate`,
        {
          to: {
            shippingcountry: deliveryAddress.shippingcountry,
            shippingzipcode: deliveryAddress.shippingzipcode,
            shippingcity: deliveryAddress.shippingcity,
            shippingstate: deliveryAddress.shippingstate,
          },
          weightOunces: totalOunces,
        },
        token ? { headers: { Authorization: `Bearer ${token}` } } : {}
      );
      setShippingCost(res.data.estimatedCost || 0);
    } catch {
      message.error("Failed to calculate shipping");
      setShippingCost(0);
    } finally {
      setShippingLoading(false);
    }
  }

  // STRIPE INIT
  async function initiateStripe() {
    if (shippingLoading || !deliveryAddress)
      return message.error("Wait for shipping to finish");
    try {
      const stripe = await stripePromise;
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/api/stripe/create-payment-intent`,
        {
          amount: Math.round((finalPayment + shippingCost) * 100),
          success_url: `${window.location.origin}/checkout?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: window.location.href,
        },
        token ? { headers: { Authorization: `Bearer ${token}` } } : {}
      );
      await stripe.redirectToCheckout({ sessionId: data.sessionId });
    } catch {
      message.error("Payment initiation failed");
    }
  }

  // CONFIRM PAYMENT & CREATE ORDER  (unchanged except for brevity)
  async function confirmPayment(sid) {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/api/stripe/confirm`,
        { sessionId: sid },
        token ? { headers: { Authorization: `Bearer ${token}` } } : {}
      );
      const normalizedShipping = {
        fullName: `${deliveryAddress.shippingfirstName} ${deliveryAddress.shippinglastName}`,
        phone: deliveryAddress.shippingphone,
        address1: deliveryAddress.shippingstreetAddress,
        city: deliveryAddress.shippingcity,
        state: deliveryAddress.shippingstate,
        postalCode: deliveryAddress.shippingzipcode,
        country: deliveryAddress.shippingcountry,
      };
      const normalizedBilling = normalizedShipping;

      const payload = token
        ? {
            paymentMethod: "Stripe",
            paymentStatus: "Paid",
            shippingAddress: normalizedShipping,
            billingAddress: normalizedBilling,
          }
        : {
            paymentMethod: "Stripe",
            paymentStatus: "Paid",
            shippingAddress: normalizedShipping,
            billingAddress: normalizedBilling,
            cartData: cartData.map((p) => ({
              productId: p.productId._id || p.productId,
              quantity: p.quantity,
              price: p.productId.price || p.price,
            })),
            subtotal,
            shippingCost,
            discount: couponDiscount,
            totalAmount: finalPayment + shippingCost,
          };

      await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/order`,
        payload,
        token ? { headers: { Authorization: `Bearer ${token}` } } : {}
      );

      if (token) {
        await axios.delete(
          `${import.meta.env.VITE_BACKEND_API}/api/cart/clear`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        localStorage.removeItem("guest_cart");
      }
      message.success("Order placed!");
      navigate("/");
    } catch {
      message.error("Order creation failed");
    }
  }

  // FORM INPUT HANDLER
  function onAddressChange(e) {
    const { name, value } = e.target;
    setAddressForm((f) => ({ ...f, [name]: value }));
  }

  // RENDER
  return (
   // Responsive and Shopify-like checkout UI
<div className="container mx-auto mt-24 mb-4 px-4">
  <div className="flex flex-col lg:flex-row gap-10">

    {/* Shipping Address */}
    <div className="w-full lg:w-2/3">
      <h2 className="text-2xl font-semibold mb-6">Shipping address</h2>

      <div className="mb-4 flex gap-4">
        <button onClick={() => navigate("/account")} className="px-6 py-2 bg-orange-500 text-white rounded-lg w-full max-w-[180px]">
          Register
        </button>
        <button onClick={() => navigate("/account")} className="px-6 py-2 bg-slate-900 text-white rounded-lg w-full max-w-[180px]">
          Login
        </button>
      </div>

      {showAddressForm ? (
        <form onSubmit={handleAddressSubmit} className="space-y-4">
          {[ ["shippingfirstName", "First Name"], ["shippinglastName", "Last Name"], ["shippingstreetAddress", "Street Address"], ["shippingcity", "City"], ["shippingstate", "State"], ["shippingcountry", "Country"], ["shippingzipcode", "ZIP"], ["shippingphone", "Phone"] ].map(([key, label]) => (
            <div key={key}>
              <label className="block mb-1 text-sm font-medium">{label}</label>
              <input
                name={key}
                value={addressForm[key]}
                onChange={onAddressChange}
                className="w-full border border-gray-300 px-3 py-2 rounded-md"
                placeholder={label}
                {...(key === "shippingcountry" ? { disabled: true } : {})}
              />
            </div>
          ))}
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md">
            Save & Continue
          </button>
        </form>
      ) : (
        <div className="border p-4 rounded relative">
          <button onClick={handleEditAddress} className="absolute top-2 right-2 text-gray-500 hover:text-black">
            <FiEdit size={18} />
          </button>
          <p className="font-semibold">{deliveryAddress.shippingfirstName} {deliveryAddress.shippinglastName}</p>
          <p>{deliveryAddress.shippingstreetAddress}, {deliveryAddress.shippingcity}, {deliveryAddress.shippingstate}, {deliveryAddress.shippingcountry}</p>
          <p><strong>ZIP:</strong> {deliveryAddress.shippingzipcode}</p>
          <p><strong>Phone:</strong> {deliveryAddress.shippingphone}</p>
        </div>
      )}

      {/* Coupon */}
      <div className="mt-6 flex gap-2">
        <input
          type="text"
          className="border border-gray-300 px-3 py-2 rounded-md w-full"
          placeholder="Coupon"
          value={couponName}
          onChange={(e) => setCouponName(e.target.value)}
        />
        <button className="bg-yellow-500 text-white px-4 py-2 rounded-md" onClick={applyCoupon}>
          Apply
        </button>
      </div>
    </div>

    {/* Order Summary */}
    <div className="w-full lg:w-1/3">
      <h2 className="text-2xl font-semibold mb-4">Your Order</h2>
      <div className="border rounded-md p-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Product</th>
              <th className="text-center">Qty</th>
              <th className="text-right">Price</th>
            </tr>
          </thead>
          <tbody>
            {cartData.map((item) => {
              const p = item.productId;
              return (
                <tr key={p._id || p} className="border-b">
                  <td className="flex items-center gap-2 py-2">
                    <img src={p.image?.[0] || ""} alt={p.title} className="w-10 h-10 object-cover rounded" />
                    <span>{p.title}</span>
                  </td>
                  <td className="text-center">{item.quantity}</td>
                  <td className="text-right">{enableCurrency} {(p.price * item.quantity).toFixed(2)}</td>
                </tr>
              );
            })}
            <tr><td colSpan="2" className="text-right">Subtotal:</td><td className="text-right">{enableCurrency} {subtotal.toFixed(2)}</td></tr>
            <tr><td colSpan="2" className="text-right">Coupon:</td><td className="text-right">- {enableCurrency} {couponDiscount.toFixed(2)}</td></tr>
            <tr><td colSpan="2" className="text-right">Tax:</td><td className="text-right">+ {enableCurrency} {taxValue.toFixed(2)}</td></tr>
            <tr><td colSpan="2" className="text-right">Shipping:</td>
              <td className="text-right">{!shippingLoading ? `+ ${enableCurrency} ${shippingCost.toFixed(2)}` : <Spin />}</td>
            </tr>
            <tr className="font-semibold">
              <td colSpan="2" className="text-right">Total:</td>
              <td className="text-right">{enableCurrency} {(finalPayment + shippingCost).toFixed(2)}</td>
            </tr>
          </tbody>
        </table>

        <div className="mt-6 text-center">
          <button
            className="bg-green-600 text-white text-lg py-2 w-full rounded-md"
            disabled={showAddressForm || shippingLoading}
            onClick={initiateStripe}
          >
            Pay & Place Order
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

  );
}
