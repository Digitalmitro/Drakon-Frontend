// src/components/Orders.js

import React, { useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode"; // Correct import
import Cookies from "js-cookie";
import axios from "axios";
import product1 from "../../assets/product1.png";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "../Pagination";

const Orders = () => {
  const token = Cookies.get("token");
  const decodedToken = token && jwtDecode(token);
  const userId = decodedToken?._id;
  const [orderData, setOrderData] = useState([]);
  const navigate = useNavigate();

  const getOrders = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_API}/order/${userId}`
    );
    setOrderData(response.data.order.reverse());
    navigate("/profile?tab=3");
  };

  useEffect(() => {
    getOrders();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 1; // You can adjust this value
  const totalPages = Math.ceil(orderData?.length / productsPerPage);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = orderData?.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="">
      <div className="text-center">
        <h2 className="fs-1 text my-3 pastOrderHead">All Orders</h2>
      </div>
      <div className="past-order order-response d-sm-flex flex-column flex-sm-row justify-center ">
        {currentProducts?.map((order) => (
          <div key={order?._id} className="past-order-box fit-content">
            <div className="wrap productwrap">
              <img src={order?.image} className="" alt="Product" />
              <div className="burger-text">
                <p className=" pb-5 text-sm-center">
                  Delivered on {order?.deliveredDate || " - due date"}{" "}
                  <i className="fa-solid fa-circle-check"></i>
                </p>
                <h3 className="fs-2 text fw-bold">{order?.title}</h3>
                <br></br>
                <p>
                  orderId#{order?._id}
                </p>
                <p>Order Date :{order?.createdDate}</p>
                <br></br>
                <div className="order-history" style={{ marginTop: "10px" }}>
                  <span className=""><b>total payment: </b>${order?.totalpay || order?.price}</span>
                </div>
                <button className="btn-1" type="button">
                  view details
                </button>
              </div>
            </div>
            <div
              style={{
                marginTop: "10px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <button className="btn" type="button">
                Get HELP
              </button>
              <br />
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
