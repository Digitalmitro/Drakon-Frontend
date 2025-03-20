import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";

const CartPage = () => {
  const [cart, setCart] = useState([
    {
      id: 1,
      name: "Rawlings Electric Unicorn REV1X 11.5-Inch Glove",
      sku: "#R00711545",
      brand: "Rawlings",
      price: 399.99,
      quantity: 1,
      image:
        "https://example.com/glove.jpg",
      inStock: true,
      hand: "Right",
    },
  ]);

  const [coupon, setCoupon] = useState("");
  const shippingCost = 6.99;
  const shippingDiscount = -6.99;
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const estimatedTotal = subtotal + shippingCost + shippingDiscount;

  // Handle Quantity Change
  const updateQuantity = (id, type) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: type === "increase" ? item.quantity + 1 : Math.max(1, item.quantity - 1),
            }
          : item
      )
    );
  };

  // Handle Remove Item
  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  return (
    <div className="max-w-5xl mx-auto px-6 pt-24 pb-5">
      <h2 className="text-lg font-semibold">Shopping Cart</h2>
      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="bg-white p-4 rounded-md shadow-md mt-4">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center justify-between border-b pb-4 mb-4">
              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
              <div className="flex-1 px-4">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-500">SKU: {item.sku}</p>
                <p className="text-sm text-gray-500">Brand: {item.brand}</p>
                <p className="text-sm text-gray-500">Which hand do you throw with?: {item.hand}</p>
                <p className={`text-sm ${item.inStock ? "text-green-500" : "text-red-500"}`}>
                  {item.inStock ? "In Stock" : "Out of Stock"}
                </p>
              </div>
              <div className="text-center">
                <p className="font-semibold">${item.price.toFixed(2)}</p>
                <div className="flex items-center justify-center mt-2">
                  <button
                    className="px-2 py-1 border bg-gray-100"
                    onClick={() => updateQuantity(item.id, "decrease")}
                  >
                    -
                  </button>
                  <span className="px-4">{item.quantity}</span>
                  <button
                    className="px-2 py-1 border bg-gray-100"
                    onClick={() => updateQuantity(item.id, "increase")}
                  >
                    +
                  </button>
                </div>
              </div>
              <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
              <button onClick={() => removeItem(item.id)} className="text-red-500">
                <FaTrash />
              </button>
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
      <button className="bg-red-600 text-white w-full py-3 mt-4 text-lg font-semibold rounded-md">
        CHECKOUT
      </button>
    </div>
  );
};

export default CartPage;
