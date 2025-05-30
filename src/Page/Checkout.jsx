import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";
import { useNavigate, useSearchParams } from "react-router-dom";
import moment from "moment";
import { message, Spin } from "antd";

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
    shippingcountry: "",
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

  // INITIAL FETCH
  useEffect(() => {
    fetchCart();
    fetchSettings();
    const sid = searchParams.get("session_id");
    if (sid) setSessionId(sid);
  }, []);

  // CONFIRM PAYMENT
  useEffect(() => {
    if (sessionId) confirmPayment(sessionId);
  }, [sessionId]);

  // AUTO‐CALCULATE SHIPPING once we have a deliveryAddress
  useEffect(() => {
    if (!showAddressForm && cartData.length) {
      calculateShipping();
    }
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
      const settings = sRes.data[0];
      setEnableTax(settings.EnableTax);
      setTaxRate(settings.TaxRate);
      setEnableCurrency(settings.Currency);
      setEnableCoupon(settings.EnableCoupon);
      setCouponList(cRes.data || []);
    } catch {}
  }

  // RECALCULATE SUBTOTAL, TAX, FINAL before shipping
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
    if (!enableCoupon) {
      return message.error("Coupons disabled");
    }
    const cp = couponList.find((c) => c.couponName === couponName);
    if (!cp) {
      return message.error("Invalid coupon");
    }
    setCouponDiscount((subtotal * (cp.discount || 0)) / 100);
    message.success("Coupon applied");
  }

  // SAVE ADDRESS FORM as FINAL address
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
    } catch (err) {
      console.error(err);
      message.error("Failed to calculate shipping");
      setShippingCost(0);
    } finally {
      setShippingLoading(false);
    }
  }

  // INITIATE STRIPE
  async function initiateStripe() {
    if (shippingLoading || !deliveryAddress) {
      return message.error("Please wait for shipping to finish");
    }
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
    } catch (err) {
      console.error(err);
      message.error("Payment initiation failed");
    }
  }

  // CONFIRM STRIPE & CREATE ORDER
  async function confirmPayment(sid) {
    try {
      // Confirm payment on your backend
      await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/api/stripe/confirm`,
        { sessionId: sid },
        token ? { headers: { Authorization: `Bearer ${token}` } } : {}
      );

      // Create a single Order using your new API
      await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/order`,
        {
          paymentMethod:   "Stripe",
          paymentStatus:    "Paid",
          shippingAddress:  deliveryAddress,
          billingAddress:   deliveryAddress  // or separate billing form
        },
        token ? { headers: { Authorization: `Bearer ${token}` } } : {}
      );

      // Clear the cart
      if (token) {
        await axios.delete(`${import.meta.env.VITE_BACKEND_API}/api/cart/clear`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        localStorage.removeItem("guest_cart");
      }

      message.success("Order placed!");
      navigate("/profile?tab=3");
    } catch (err) {
      console.error(err);
      message.error("Order creation failed");
    }
  }

  // INPUT HANDLER
  function onAddressChange(e) {
    const { name, value } = e.target;
    setAddressForm((f) => ({ ...f, [name]: value }));
  }

  return (
    <div className="container d-flex justify-content-center mt-20" style={{ zoom: "1.1" }}>
      <div className="row w-100 px-3" style={{ display: "flex", gap: "7rem" }}>

        {/* ADDRESS FORM or SUMMARY */}
        <div className="col-md-4 my-5">
          <h2 className="fs-2 pb-3">SHIPPING ADDRESS</h2>

          {showAddressForm ? (
            <form onSubmit={handleAddressSubmit}>
              {[
                ["shippingfirstName", "First Name"],
                ["shippinglastName", "Last Name"],
                ["shippingstreetAddress", "Street Address"],
                ["shippingcity", "City"],
                ["shippingstate", "State"],
                ["shippingcountry", "Country"],
                ["shippingzipcode", "ZIP"],
                ["shippingphone", "Phone"],
              ].map(([key, label]) => (
                <div className="mb-2" key={key}>
                  <label>{label}</label>
                  <input
                    name={key}
                    value={addressForm[key]}
                    onChange={onAddressChange}
                    className="form-control"
                    placeholder={label}
                  />
                </div>
              ))}
              <button type="submit" className="btn btn-primary w-100">
                Save & Continue
              </button>
            </form>
          ) : (
            <div style={{ border: "1px solid #ddd", padding: "1rem", borderRadius: 5 }}>
              <p>
                <strong>
                  {deliveryAddress.shippingfirstName}{" "}
                  {deliveryAddress.shippinglastName}
                </strong>
              </p>
              <p>
                {deliveryAddress.shippingstreetAddress},{" "}
                {deliveryAddress.shippingcity},{" "}
                {deliveryAddress.shippingstate},{" "}
                {deliveryAddress.shippingcountry}
              </p>
              <p>
                <strong>ZIP:</strong> {deliveryAddress.shippingzipcode}
              </p>
              <p>
                <strong>Phone:</strong> {deliveryAddress.shippingphone}
              </p>
            </div>
          )}

          {/* COUPON */}
          <div className="mt-4 d-flex">
            <input
              type="text"
              className="form-control me-2"
              placeholder="Coupon"
              value={couponName}
              onChange={(e) => setCouponName(e.target.value)}
            />
            <button className="btn btn-warning" onClick={applyCoupon}>
              Apply
            </button>
          </div>
        </div>

        {/* ORDER SUMMARY */}
        <div className="col-md-6">
          <h2 className="fs-2">YOUR ORDER</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Product</th><th></th><th>Qty</th><th>Price</th>
              </tr>
            </thead>
            <tbody>
              {cartData.map((item) => {
                const p = item.productId;
                return (
                  <tr key={p._id}>
                    <td>
                      <img
                        src={p.image?.[0] || ""}
                        alt={p.title}
                        style={{ width: 50, height: 50, objectFit: "cover" }}
                        className="me-2"
                      />
                      {p.title}
                    </td>
                    <td></td>
                    <td>{item.quantity}</td>
                    <td>
                      {enableCurrency} {(p.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                );
              })}
              <tr>
                <td colSpan="3" className="text-end">Subtotal:</td>
                <td>{enableCurrency} {subtotal.toFixed(2)}</td>
              </tr>
              <tr>
                <td colSpan="3" className="text-end">Coupon:</td>
                <td>- {enableCurrency} {couponDiscount.toFixed(2)}</td>
              </tr>
              <tr>
                <td colSpan="3" className="text-end">Tax:</td>
                <td>+ {enableCurrency} {taxValue.toFixed(2)}</td>
              </tr>
              <tr>
                <td colSpan="3" className="text-end">Shipping:</td>
                <td>
                  {!shippingLoading
                    ? `+ ${enableCurrency} ${shippingCost.toFixed(2)}`
                    : <Spin />}
                </td>
              </tr>
              <tr>
                <td colSpan="3" className="text-end"><strong>Total:</strong></td>
                <td>
                  <strong>
                    {enableCurrency}{" "}
                    {(finalPayment + shippingCost).toFixed(2)}
                  </strong>
                </td>
              </tr>
            </tbody>
          </table>

          <div className="text-center mt-4 mb-4">
            <button
              className="btn btn-lg btn-success"
              disabled={showAddressForm || shippingLoading}
              onClick={initiateStripe}
            >
              Pay & Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
