import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useNavigate, useSearchParams } from "react-router-dom";
import moment from "moment";
import { message } from "antd";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Checkout = () => {
  const token = Cookies.get("token");
  const decodedToken = token && jwtDecode(token);
  const userId = decodedToken?._id;
  const userEmail = decodedToken?.email;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Addresses & form for guest
  const [shippingData, setShippingData] = useState([]);
  const [deliveryAddress, setDeliveryAddress] = useState(null);
  const [guestShipping, setGuestShipping] = useState({
    shippingfirstName: "",
    shippinglastName: "",
    shippingstreetAddress: "",
    shippingcity: "",
    shippingstate: "",
    shippingcountry: "",
    shippingzipcode: "",
    shippingphone: "",
  });

  // Cart
  const [cartData, setCartData] = useState([]);
  // Pricing
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

  // Stripe
  const [sessionId, setSessionId] = useState(null);



  // on mount

  useEffect(() => {

    async function getUserShippingAddresses() {
      const shipping = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/addressbookshipping/${userId}`
      );
      setShippingData(shipping.data.addressbookShipping)
      console.log(shipping);

    }
    getUserShippingAddresses();
  }, [])

  useEffect(() => {
    fetchCart();
    fetchSettings();
    const sid = searchParams.get("session_id");
    if (sid) setSessionId(sid);
  }, []);

  useEffect(() => {
    if (sessionId) confirmPayment(sessionId);
  }, [sessionId]);

  // fetchCart supports guest
  const fetchCart = async () => {
    if (token) {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_API}/api/cart`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCartData(res.data.products || []);
      } catch {
        setCartData([]);
      }
    } else {
      setCartData(JSON.parse(localStorage.getItem("guest_cart") || "[]"));
    }
  };

  // settings
  const fetchSettings = async () => {
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
    } catch { }
  };

  // recalc prices
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

  // apply coupon
  const applyCoupon = () => {
    if (!enableCoupon) return message.error("Coupons disabled");
    const cp = couponList.find(c => c.couponName === couponName);
    if (!cp) return message.error("Invalid coupon");
    setCouponDiscount((subtotal * (cp.discount || 0)) / 100);
    message.success("Coupon applied");
  };

  // when deliveryAddress changes (including guest form),
  // fetch shipping rates
  useEffect(() => {
    if (!deliveryAddress) return setShippingCost(0);
    (async () => {
      try {
        const weight = cartData.reduce(
          (w, i) => w + (i.productId?.weight || 0) * i.quantity,
          0
        );
        const payload = {
          carrierCode: "stamps_com",
          fromPostalCode: import.meta.env.VITE_SHIP_FROM_ZIP,
          toState: deliveryAddress.shippingstate,
          toPostalCode: deliveryAddress.shippingzipcode,
          toCountry: deliveryAddress.shippingcountry,
          toCity: deliveryAddress.shippingcity,
          weight: { value: weight, units: "ounces" },
          confirmation: "delivery",
          residential: false,
        };
        const res = await axios.post(
          "https://ssapi.shipstation.com/v2/shipments/getrates",
          payload,
          {
            auth: {
              username: import.meta.env.VITE_SHIPSTATION_API_KEY,
              password: import.meta.env.VITE_SHIPSTATION_API_SECRET,
            },
          }
        );
        setShippingCost(res.data.rates?.[0]?.shipmentCost || 0);
      } catch {
        setShippingCost(0);
      }
    })();
  }, [deliveryAddress, cartData]);

  // Stripe checkout
  const initiateStripe = async () => {
    if (!deliveryAddress) {
      return message.error("Enter a shipping address");
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
  };

  // confirm + create orders
  const confirmPayment = async sid => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/api/stripe/confirm`,
        { sessionId: sid },
        token ? { headers: { Authorization: `Bearer ${token}` } } : {}
      );

      // create orders & update stock
      for (const item of cartData) {
        const p = item.productId;
        const payload = {
          image: p.image || [],
          title: p.title,
          price: p.price,
          qty: item.quantity,
          billing: {}, // you can add billing input similarly
          shipping: deliveryAddress,
          shippingCost,
          product_id: p._id,
          user_id: userId || null,
          user: userEmail || "Guest",
          ip: (await axios.get("https://api.ipify.org")).data,
          createdDate: moment().format("MMM Do YY"),
          status: "Processing",
          totalpay: Number(finalPayment + shippingCost),
          paymentMethod: "Stripe",
          paymentStatus: "Paid",
        };
        await axios.post(
          `${import.meta.env.VITE_BACKEND_API}/order`,
          payload,
          token ? { headers: { Authorization: `Bearer ${token}` } } : {}
        );
        if (p.stock != null) {
          const newStock = p.stock - item.quantity;
          const endpoint =
            p.type === "products"
              ? "products"
              : p.type === "inventory"
                ? "inv-products"
                : "feature-products";
          await axios.put(
            `${import.meta.env.VITE_BACKEND_API}/${endpoint}/${p._id}`,
            { stock: newStock }
          );
        }
      }

      // clear cart
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
  };

  // handle guest form change
  const onGuestChange = e => {
    const { name, value } = e.target;
    const upd = { ...guestShipping, [name]: value };
    setGuestShipping(upd);
    setDeliveryAddress(upd);
  };

  console.log(shippingData);


  return (
    <div className="container d-flex justify-content-center mt-20 mb-5" style={{ zoom: "1.1" }}>
      <div className="row w-100 px-3" style={{ display: "flex", gap: "7rem" }}>
        {/* Shipping Section */}

        <div className="col-md-4 mt-5 ">

          {!token && <div>
            <ul>
              <li><button
                onClick={() => {
                  localStorage.setItem("redirect_after_login", "/checkout");
                  navigate("/account", { state: { from: "/checkout" } });

                }}
                type="button"
                className="w-full mb-4  py-2 px-4 bg-black text-white rounded-md hover:bg-gray-800 transition duration-200"
              >
                Login
              </button></li>
              <li><button
                onClick={() => navigate("/account", { state: { from: "/checkout" } })}
                type="button"
                className="w-full mb-4  py-2 px-4 border-2 border-black  text-black rounded-md hover:bg-gray-800 hover:text-white transition duration-200"
              >
                Register
              </button></li>
            </ul>
          </div>}
          <h2 className="fs-2 pb-3">SHIPPING ADDRESS</h2>

          {/* logged-in: select saved */}
          {token && shippingData.length > 0 ? (
            shippingData.map(addr => {
              const sel = deliveryAddress?._id === addr._id;
              return (
                <div
                  key={addr._id}
                  onClick={() => setDeliveryAddress(addr)}
                  style={{
                    border: sel ? "2px solid coral" : "1px solid #ddd",
                    borderRadius: 5,
                    padding: "1rem",
                    marginBottom: "1rem",
                    background: sel ? "#fff4f1" : "#fff",
                    cursor: "pointer",
                  }}
                >
                  <p><strong>{addr.shippingfirstName} {addr.shippinglastName}</strong></p>
                  <p>{addr.shippingstreetAddress}, {addr.shippingcity}, {addr.shippingstate}, {addr.shippingcountry}</p>
                  <p><strong>ZIP:</strong> {addr.shippingzipcode}</p>
                  <p><strong>Phone:</strong> {addr.shippingphone}</p>
                </div>
              );
            })
          ) : (
            // guest or no saved: inline form
            <div>
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
                    value={guestShipping[key] || ""}
                    onChange={onGuestChange}
                    className="form-control"
                    placeholder={label}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Coupon */}
          <div className="mt-4 d-flex">
            <input
              type="text"
              className="form-control me-2"
              placeholder="Coupon Code"
              value={couponName}
              onChange={e => setCouponName(e.target.value)}
            />
            <button className="btn btn-warning" onClick={applyCoupon}>Apply</button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="col-md-6  mt-5 flex flex-col">
          <h2 className="fs-2">YOUR ORDER</h2>
          <table className="table">
            <thead>
              <tr><th>Product</th><th></th><th>Qty</th><th>Price</th></tr>
            </thead>
            <tbody>
              {cartData.map(item => {
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
                    <td>{enableCurrency} {(p.price * item.quantity).toFixed(2)}</td>
                  </tr>
                );
              })}
              <tr>
                <td colSpan="3" className="text-end">Subtotal:</td>
                <td>{enableCurrency} {subtotal.toFixed(2)}</td>
              </tr>
              <tr>
                <td colSpan="3" className="text-end">Coupon Discount:</td>
                <td>- {enableCurrency} {couponDiscount.toFixed(2)}</td>
              </tr>
              <tr>
                <td colSpan="3" className="text-end">Tax:</td>
                <td>+ {enableCurrency} {taxValue.toFixed(2)}</td>
              </tr>
              <tr>
                <td colSpan="3" className="text-end">Shipping Cost:</td>
                <td>+ {enableCurrency} {shippingCost.toFixed(2)}</td>
              </tr>
              <tr>
                <td colSpan="3" className="text-end"><strong>Total:</strong></td>
                <td><strong>{enableCurrency} {(finalPayment + shippingCost).toFixed(2)}</strong></td>
              </tr>
            </tbody>
          </table>

          <div className="text-center space-y-5 mt-4 mb-auto">
            <button
              className="btn btn-lg btn-success"
              disabled={!deliveryAddress}
              onClick={initiateStripe}
            >
              Pay & Place Order
            </button>


          </div>



        </div>
      </div>
    </div>
  );
};

export default Checkout;
