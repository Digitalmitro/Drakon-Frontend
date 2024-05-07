import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, removeItem } from "../Redux/CartSlice";

const Cart = () => {
  const products = useSelector((state) => state.cartReducer.items);
  const dispatch = useDispatch();

  const totalPrice = products.reduce((acc, curr) => acc + curr.price, 0);
  const netPayable = totalPrice - totalPrice * 0.3;
  const handleChekcout = () => {
    dispatch(clearCart());

    window.location.href = "/";
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="container mx-auto flex flex-col lg:flex-row lg:gap-10">
      <div className="flex-1 p-14 my-20 lg:border">
        <table className="table-auto w-full text-left">
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th>Product</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-b-2">
                <td
                  className="cursor-pointer"
                  onClick={() => dispatch(removeItem(product._id))}
                >
                  <svg
                    width={40}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="M16 8L8 16M8.00001 8L16 16"
                        stroke="#000000"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>{" "}
                    </g>
                  </svg>
                </td>
                <td>
                  <img className="w-24 h-24" src={product.image} alt="" />
                </td>
                <td>{product.title}</td>
                <td>$ {product.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex-1 p-14 lg:my-20 border">
        <h2 className="text-3xl font-bold mb-5">Cart Total</h2>
        <div className="flex justify-between mb-5">
          <h3 className="text-xl font-bold text-gray-400">Subtotal</h3>
          <h3 className="text-xl font-bold text-gray-400">$ {totalPrice}</h3>
        </div>
        <div className="flex justify-between mb-10">
          <h3 className="text-xl font-bold text-red-400">(-) Tax</h3>
          <h3 className="text-xl font-bold text-red-400">3%</h3>
        </div>
        <hr />
        <div className="flex justify-between my-10">
          <h3 className="text-xl font-bold text-gray-400">You Pay</h3>
          <h3 className="text-xl font-bold text-gray-400">
            $ {netPayable.toFixed(2)}
          </h3>
        </div>
        <Button
          onClick={handleChekcout}
          sx={{
            paddingY: "10px",
            width: "100%",
            background: "#F5743B",
            "&:hover": {
              backgroundColor: "#be410c", // Adjust the brightness to darken the color
            },
          }}
          variant={"contained"}
        >
          Proceed To Checkout
        </Button>
      </div>
    </div>
  );
};

export default Cart;
