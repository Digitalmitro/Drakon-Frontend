import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import axios from "axios";
import product1 from "../../assets/product1.png";

import {
  Link,
  useParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { message } from "antd";

const Orders = () => {

  const token = Cookies.get("token");
  const decodedToken = token && jwtDecode(token);
  const userId = decodedToken?._id;
  const [orderData, setOrderData] = useState();

  const getOrders = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_API}/order/${userId}`
    );
    setOrderData(response.data.order);
  };

  useEffect(() => {
    getOrders();
  },[]);
  console.log("orderData", orderData);

  const pastOrders = [
    {
      id: 1,
      img: product1,
      deliveredDate: "Sat, Mar 25, 2024 07:15 pm",
      orderDate: "Sat, Mar 22, 2024, 5:00 pm",
      title: "Full Sleeve Jacket",
      orderNumber: "14524156451268",
      totalPaid: 142,
    },
    {
      id: 2,
      img: product1,
      deliveredDate: "Sat, ",
      orderDate: "Sat, Mar 22, 2024, 5:00 pm",
      title: "  Jacket",
      orderNumber: "14524156451268",
      totalPaid: 142,
    },

    // Add more orders as needed
  ];
  console.log("orderData", orderData);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 1; // You can adjust this value
  const totalPages = Math.ceil(orderData?.length / productsPerPage);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = orderData?.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="text-center">
        <h2 className="fs-1 text my-3">Past Orders</h2>
      </div>
      <div className="past-order d-flex justify-content-center">
        {currentProducts?.map((order) => (
          <div key={order?._id} className="past-order-box">
            <div className="wrap">
              <img src={order?.image} alt="Product" />
              <div className="burger-text">
                <p className="text-end pb-4">
                  Delivered on {order?.deliveredDate || "due date"}{" "}
                  <i className="fa-solid fa-circle-check"></i>
                </p>
                <h3 className="fs-2 text fw-bold">{order?.title}</h3>
                <br></br>
                <p>
                  orderId#{order?._id} 
                </p>
                <p>Order Date :{order?.createdDate}</p>
                <br></br>

                
                <div className="order-history " style={{ marginTop: "10px" }}>
              
              <span className=""> <b> total payment :  </b> ${order?.totalpay || order?.price}</span>
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
              <div className="pagination-controlsborder ">
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => paginate(index + 1)}
                    className={` border  pagination-button  p-2 px-3 m-1 mx-2 rounded-circle ${
                      currentPage === index + 1 ? "active" : ""
                    }`}
                    style={{borderColor:"coral", 
                      backgroundColor: currentPage === index + 1 ? "coral" : "transparent",
                     color: currentPage === index + 1 ? "white" : "coral"
                  }}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
