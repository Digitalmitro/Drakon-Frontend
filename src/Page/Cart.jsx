import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
import Cookies from "js-cookie";
const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [coupon, setCoupon] = useState("");
  const shippingCost = 6.99;
  const shippingDiscount = -6.99;
  const token=Cookies.get("token")
  // Fetch Cart from API
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_API}/api/cart`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
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

  // Calculate Subtotal & Total
  const subtotal = cart.reduce((acc, item) => acc + item.total, 0);
  const estimatedTotal = subtotal + shippingCost + shippingDiscount;

  // Update Quantity
  const updateQuantity = async (productId, type) => {
    try {
      const existingItem = cart.find((item) => item.productId._id === productId);
      if (!existingItem) return;
  
      const newQuantity =
        type === "increase" ? existingItem.quantity + 1 : Math.max(1, existingItem.quantity - 1);
  
      // API call to update the quantity in the backend
      await axios.put(
        `${import.meta.env.VITE_BACKEND_API}/api/cart/update`,
        { productId, quantity: newQuantity }, // Correctly passing the body
        {
          headers: {
            Authorization: `Bearer ${token}`, // Moved headers to config object
          },
        }
      );
  
      // Update state after successful API call
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.productId._id === productId
            ? { ...item, quantity: newQuantity, total: newQuantity * item.price }
            : item
        )
      );
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };
  
  // Remove Item
  const removeItem = async (productId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_API}/api/cart/clear`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        })
      
      setCart(cart.filter((item) => item.productId._id !== productId));
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  // Checkout (Proceed to Order)
  const checkout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_API}/api/order/create`, {  paymentMethod: "Cash on Delivery" }, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      alert("Order placed successfully!");
      setCart([]); // Clear Cart on UI after order
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };
// console.log(cart)
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
                <h3 className="font-semibold">{item.productId.title}</h3>
                <p className="text-sm text-gray-500">SKU: {item.productId.sku}</p>
                <p className="text-sm text-gray-500">Brand: {item.productId.brand}</p>
                <p className="text-sm text-gray-500">
                  Price: ${item.productId.price.toFixed(2)}
                </p>
                <p
                  className={`text-sm ${
                    item.productId.stock ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {item.productId.stock ? "In Stock" : "Out of Stock"}
                </p>
              </div>

              <div className="text-center flex flex-col justify-around h-[200px]">
                <button onClick={() => removeItem(item.productId._id)} className="text-red-500">
                  <FaTrash />
                </button>
                <p className="font-semibold">${item.total.toFixed(2)}</p>
                <div className="flex items-center justify-center mt-2">
                  <button
                    className="px-2 py-1 border bg-gray-100"
                    onClick={() => updateQuantity(item.productId._id, "decrease")}
                  >
                    -
                  </button>
                  <span className="px-4">{item.quantity}</span>
                  <button
                    className="px-2 py-1 border bg-gray-100"
                    onClick={() => updateQuantity(item.productId._id, "increase")}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Coupon Section */}
      <div className="flex justify-between items-center bg-white p-4 rounded-md shadow-md mt-4">
        <input
          type="text"
          placeholder="Coupon Code"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
          className="border p-2 flex-1"
        />
        <button className="bg-red-500 text-white px-4 py-2 ml-2">APPLY</button>
      </div>

      {/* Price Summary */}
      <div className="bg-white p-4 rounded-md shadow-md mt-4">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p className="font-semibold">${subtotal.toFixed(2)}</p>
        </div>
        <div className="flex justify-between">
          <p>Shipping Cost</p>
          <p className="font-semibold">${shippingCost.toFixed(2)}</p>
        </div>
        <div className="flex justify-between text-green-500">
          <p>Shipping Discount</p>
          <p className="font-semibold">${shippingDiscount.toFixed(2)}</p>
        </div>
        <div className="border-t mt-2 pt-2 flex justify-between font-bold text-lg">
          <p>Estimated Total</p>
          <p>${estimatedTotal.toFixed(2)}</p>
        </div>
      </div>

      {/* Checkout Button */}
      <button
        onClick={checkout}
        className="bg-red-500 text-white w-full py-3 mt-4 text-lg font-semibold rounded-md"
      >
        CHECKOUT
      </button>
    </div>
  );
};

export default CartPage;
