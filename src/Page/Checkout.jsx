import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useNavigate, useSearchParams } from "react-router-dom";
import moment from "moment";
import { message, Spin } from "antd";
import { FiEdit } from "react-icons/fi";      // ← edit icon
import API_BASE_URL from "../config/api";

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
  
  // Shipping options per item
  const [itemShippingOptions, setItemShippingOptions] = useState({});
  const [selectedShippingMethods, setSelectedShippingMethods] = useState({});
  const [itemQuantities, setItemQuantities] = useState({}); // Track quantities for shipping calculation

  // Settings
  const [enableTax, setEnableTax] = useState(false);
  const [taxRate, setTaxRate] = useState(0);
  const [enableCurrency, setEnableCurrency] = useState("");
  const [enableCoupon, setEnableCoupon] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);

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
          `${API_BASE_URL}/api/cart`,
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
      const sRes = await axios.get(`${API_BASE_URL}/general-settings`);
      const settings = sRes.data[0];
      setEnableCoupon(settings.EnableCoupon || false);
      setEnableTax(settings.EnableTax);
      setTaxRate(settings.TaxRate);
      setEnableCurrency(settings.Currency);
    } catch { }
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
  async function applyCoupon() {
    if (!enableCoupon) return message.error("Coupons disabled");
    if (!couponCode.trim()) return message.error("Please enter a coupon code");
    
    try {
      const res = await axios.post(
        `${API_BASE_URL}/coupon/validate`,
        { couponCode: couponCode.trim() }
      );
      
      if (res.data.valid) {
        const discountAmount = (subtotal * (res.data.discount || 0)) / 100;
        setCouponDiscount(discountAmount);
        setAppliedCoupon({ code: couponCode, discount: res.data.discount });
        message.success(res.data.message || "Coupon applied successfully");
      } else {
        message.error(res.data.message || "Invalid coupon code");
      }
    } catch (error) {
      console.error("Coupon validation error:", error);
      message.error("Failed to validate coupon");
    }
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

  // CALCULATE SHIPPING - Now fetches shipping options per item
  async function calculateShipping() {
    setShippingLoading(true);
    try {
      console.log('Full cartData:', JSON.stringify(cartData, null, 2)); // Debug: see full cart structure
      
      // Prepare items with UPC codes for ShipStation
      const items = cartData.map(item => {
        // UPC is now stored directly in cart item
        const upc = item.upc || '';
        
        console.log('Cart item:', {
          size: item.size,
          upc: item.upc,
          productId: item.productId?._id
        });
        
        return {
          upc,
          quantity: item.quantity,
          productId: item.productId._id,
          selectedSize: item.size
        };
      }).filter(item => item.upc); // Only include items with UPC

      console.log('Shipping request items:', items); // Debug log

      const res = await axios.post(
        `${API_BASE_URL}/shipping/estimate-v2`,
        {
          to: {
            shippingcountry: deliveryAddress.shippingcountry,
            shippingzipcode: deliveryAddress.shippingzipcode,
            shippingcity: deliveryAddress.shippingcity,
            shippingstate: deliveryAddress.shippingstate,
          },
          items,
        },
        token ? { headers: { Authorization: `Bearer ${token}` } } : {}
      );

      // Store shipping options per item
      const shippingOptions = {};
      const defaultSelections = {};
      const quantities = {};
      let totalShipping = 0;

      res.data.items.forEach((itemData, index) => {
        const cartItem = items[index];
        const key = `${cartItem.productId}-${cartItem.upc}`;
        
        shippingOptions[key] = itemData.shippingOptions;
        quantities[key] = cartItem.quantity; // Store quantity for this item
        
        // Select cheapest option by default
        const cheapestOption = itemData.shippingOptions.reduce((min, opt) => 
          opt.cost < min.cost ? opt : min
        , itemData.shippingOptions[0]);
        
        defaultSelections[key] = cheapestOption.serviceCode;
        totalShipping += cheapestOption.cost * cartItem.quantity; // Multiply by quantity
      });

      setItemShippingOptions(shippingOptions);
      setSelectedShippingMethods(defaultSelections);
      setItemQuantities(quantities);
      setShippingCost(totalShipping);
      
    } catch (error) {
      console.error("Shipping calculation error:", error);
      message.error("Failed to calculate shipping");
      setShippingCost(0);
    } finally {
      setShippingLoading(false);
    }
  }

  // Handle shipping method selection for a specific item
  function handleShippingMethodChange(itemKey, serviceCode) {
    setSelectedShippingMethods(prev => ({
      ...prev,
      [itemKey]: serviceCode
    }));

    // Recalculate total shipping cost with quantity multiplier
    let totalShipping = 0;
    Object.keys(itemShippingOptions).forEach(key => {
      const selectedService = key === itemKey ? serviceCode : selectedShippingMethods[key];
      const option = itemShippingOptions[key].find(opt => opt.serviceCode === selectedService);
      const quantity = itemQuantities[key] || 1;
      
      if (option) {
        totalShipping += option.cost * quantity; // Multiply by quantity
      }
    });
    
    setShippingCost(totalShipping);
  }

  async function initiateStripe() {
    if (shippingLoading || !deliveryAddress)
      return message.error("Wait for shipping to finish");

    try {
      const stripe = await stripePromise;
      if (!stripe) {
        return message.error("Stripe JS failed to load. Check publishable key & HTTPS.");
      }

      const { data } = await axios.post(
        `${API_BASE_URL}/api/stripe/create-payment-intent`,
        {
          amount: Math.round((finalPayment + shippingCost) * 100),
          success_url: `${location.origin}/checkout?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${location.origin}/cart?canceled=true`,
        },
        token ? { headers: { Authorization: `Bearer ${token}` } } : undefined
      );

      console.log("Session from backend ➜", data);   // verify sessionId value

      const { error } = await stripe.redirectToCheckout({ sessionId: data.sessionId });

      if (error) {
        console.error("Stripe redirect error ➜", error);
        message.error(error.message);
      }
    } catch (err) {
      console.error("Outer catch ➜", err);
      message.error("Payment initiation failed");
    }
  }


  // CONFIRM PAYMENT & CREATE ORDER
  async function confirmPayment(sid) {
    try {
      await axios.post(
        `${API_BASE_URL}/api/stripe/confirm`,
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

      // Prepare cart items with selected shipping methods
      const cartItemsWithShipping = cartData.map((p) => {
        // UPC is now stored directly in cart item
        const upc = p.upc || '';
        const itemKey = `${p.productId._id}-${upc}`;
        
        // Get selected shipping method for this item
        const selectedServiceCode = selectedShippingMethods[itemKey];
        const shippingOptions = itemShippingOptions[itemKey] || [];
        const selectedShipping = shippingOptions.find(opt => opt.serviceCode === selectedServiceCode);

        return {
          productId: p.productId._id || p.productId,
          quantity: p.quantity,
          name: p?.productId?.title ?? "",
          size: p?.size ?? "M",
          weight: p?.productId?.weight ?? p.weight ?? 0,
          price: p.productId.price || p.price,
          upc: upc,
          shippingMethod: selectedShipping ? {
            serviceName: selectedShipping.serviceName,
            serviceCode: selectedShipping.serviceCode,
            cost: selectedShipping.cost
          } : null
        };
      });

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
          cartData: cartItemsWithShipping,
          subtotal,
          shippingCost,
          discount: couponDiscount,
          totalAmount: finalPayment + shippingCost,
        };

      await axios.post(
        `${API_BASE_URL}/order`,
        payload,
        token ? { headers: { Authorization: `Bearer ${token}` } } : {}
      );

      if (token) {
        await axios.delete(
          `${API_BASE_URL}/api/cart/clear`,
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


  console.log(cartData);

  // RENDER
  return (
    // Responsive and Shopify-like checkout UI
    <div className="container mx-auto mt-24 mb-4 px-4">
      <div className="flex flex-col lg:flex-row gap-10">

        {/* Shipping Address */}
        <div className="w-full lg:w-2/3">
          <h2 className="text-2xl font-semibold mb-6">Shipping address</h2>



          {
            !token &&
            <>
              <div className="mb-4 flex gap-4">
                <button onClick={() => navigate("/account")} className="px-6 py-2 bg-orange-500 text-white rounded-lg w-full max-w-[180px]">
                  Register
                </button>
                <button onClick={() => navigate("/account")} className="px-6 py-2 bg-slate-900 text-white rounded-lg w-full max-w-[180px]">
                  Login
                </button>
              </div>
            </>
          }


          {showAddressForm ? (
            <form onSubmit={handleAddressSubmit} className="space-y-4">
              {[["shippingfirstName", "First Name"], ["shippinglastName", "Last Name"], ["shippingstreetAddress", "Street Address"], ["shippingcity", "City"], ["shippingstate", "State"], ["shippingcountry", "Country"], ["shippingzipcode", "ZIP"], ["shippingphone", "Phone"]].map(([key, label]) => (
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
              placeholder="Enter coupon code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <button className="bg-yellow-500 text-white px-4 py-2 rounded-md" onClick={applyCoupon}>
              Apply
            </button>
          </div>
        </div>

        {/* ORDER SUMMARY */}
        <div className="col-md-6">
          <h2 className="fs-2">YOUR ORDER</h2>
          <table className="table">
            <thead>
              <tr><th>Product</th><th></th><th>Qty</th><th>Price</th></tr>
            </thead>
            <tbody>
              {cartData.map((item, idx) => {
                const p = item.productId;
                // UPC is now stored directly in cart item
                const upc = item.upc || '';
                const itemKey = `${p._id}-${upc}`;
                const hasShippingOptions = itemShippingOptions[itemKey] && itemShippingOptions[itemKey].length > 0;
                
                return (
                  <React.Fragment key={idx}>
                    <tr>
                      <td>
                        <img src={p.image?.[0] || ""} alt={p.title}
                          style={{ width: 50, height: 50, objectFit: "cover" }}
                          className="me-2" /> {p.title}
                      </td>
                      <td></td>
                      <td>{item.quantity} <strong className=""> {item?.size}</strong></td>
                      <td>{enableCurrency} {(p.price * item.quantity).toFixed(2)}</td>
                    </tr>
                    {/* Shipping method selection row */}
                    {hasShippingOptions && (
                      <tr>
                        <td colSpan="4" className="pt-0 pb-3">
                          <div className="d-flex align-items-center gap-2" style={{ fontSize: '0.9em' }}>
                            <span className="text-muted">Shipping Method:</span>
                            <select 
                              className="form-select form-select-sm" 
                              style={{ maxWidth: '300px' }}
                              value={selectedShippingMethods[itemKey] || ''}
                              onChange={(e) => handleShippingMethodChange(itemKey, e.target.value)}
                            >
                              {itemShippingOptions[itemKey].map((option, optIdx) => (
                                <option key={optIdx} value={option.serviceCode}>
                                  {option.serviceName} - {enableCurrency}{option.cost.toFixed(2)}
                                </option>
                              ))}
                            </select>
                            {item.quantity > 1 && (
                              <span className="text-muted">
                                x{item.quantity} = {enableCurrency}
                                {(() => {
                                  const selectedService = selectedShippingMethods[itemKey];
                                  const option = itemShippingOptions[itemKey].find(opt => opt.serviceCode === selectedService);
                                  return option ? (option.cost * item.quantity).toFixed(2) : '0.00';
                                })()}
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}

              <tr><td colSpan="3" className="text-end">Subtotal:</td><td>{enableCurrency} {subtotal.toFixed(2)}</td></tr>
              <tr><td colSpan="3" className="text-end">Coupon:</td><td>- {enableCurrency} {couponDiscount.toFixed(2)}</td></tr>
              <tr><td colSpan="3" className="text-end">Tax:</td><td>+ {enableCurrency} {taxValue.toFixed(2)}</td></tr>
              <tr><td colSpan="3" className="text-end">Shipping:</td>
                <td>{!shippingLoading ? `+ ${enableCurrency} ${shippingCost.toFixed(2)}` : <Spin />}</td></tr>
              <tr><td colSpan="3" className="text-end"><strong>Total:</strong></td>
                <td><strong>{enableCurrency} {(finalPayment + shippingCost).toFixed(2)}</strong></td></tr>
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

  );
}
