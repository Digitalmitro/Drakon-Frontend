import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import user from "../assets/user.png";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { message } from "antd";
import './Styles/Tabs.scss'
import { LogoutModal } from "../Pages/modals/Logoutmodals";
import { AddressPanel } from "./TabsPanel/AddressPanel"
import { ProfilePanel } from "./TabsPanel/ProfilePanel"
import { PaymentPanel } from "./TabsPanel/PaymentMethod";
import { OrderPanel } from "./TabsPanel/OrderPanel";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);

  const token = Cookies.get("token");
  const decodedToken = token && jwtDecode(token);
  const user_id = decodedToken?._id;
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState();


  const [clientDetails, setClientDetails] = useState();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handelLogout = () => {
    Cookies.remove("token");
    window.location.href = "/login";
  };

  const openLogoutModal = () => {
    setShowLogoutModal(true);  // Show modal when logout button is clicked
  };

  const closeLogoutModal = () => {
    setShowLogoutModal(false); // Hide modal
  };

  // useEffect(() => {
  //   if (token) {
  //   } else {
  //     return navigate("/login");
  //   }
  // }, [token]);


  useEffect(() => {
    const storedValue = localStorage.getItem('tabIndex');
    if (storedValue !== null) {
      setValue(parseInt(storedValue, 10));
    }
  }, []);


  const handleOrderDetails = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SOME_KEY}/order/${user_id}`
      );
      console.log("order details", res.data.order);
      setOrderDetails(res.data.order);
    } catch (error) {
      // message.warning(error.response.data.status, {});
      console.log(error);
    }
  };



  React.useEffect(() => {
    handleOrderDetails();
  }, []);
  console.log(orderDetails);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);
  // Calculate the index of the first and last item of the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Slice the array of taskers to display only the items for the current page
  const currentOrderDetails =
    orderDetails && orderDetails.slice(indexOfFirstItem, indexOfLastItem) || [];

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    localStorage.setItem('tabIndex', newValue);
  };

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.paper",
          display: "flex",
          height: "auto",
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: "divider" }}
        >
          <Tab
            style={{ marginBottom: "20px", height: "100px" }}
            className="sidenav"
            label={<i className="fa-solid fa-address-book"> <span className="tab-text">Profile</span> </i>}
            {...a11yProps(0)}
          />
          <Tab
            style={{ marginBottom: "20px", height: "100px" }}
            className="sidenav"
            label={<i className="fa-solid fa-address-book"> <span className="tab-text">Address</span> </i>}
            {...a11yProps(1)}
          />
          <Tab
            style={{ marginBottom: "20px", height: "100px" }}
            className="sidenav"
            label={<i className="fa-solid fa-bag-shopping"> <span className="tab-text">Order History</span> </i>}
            {...a11yProps(2)}
          />
            <Tab
            style={{ marginBottom: "20px", height: "100px" }}
            className="sidenav"
            label={<i className="fa-solid fa-bag-shopping"> <span className="tab-text">Payment</span> </i>}
            {...a11yProps(3)}
          />
          <Tab
            style={{ marginBottom: "20px", height: "100px" }}
            onClick={openLogoutModal}
            className="sidenav"
            label={<i className="fa-solid fa-right-from-bracket"> <span className="tab-text">Logout</span> </i>}
            {...a11yProps(4)}
          />
        </Tabs>
        <TabPanel value={value} index={0}>
          <ProfilePanel />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <AddressPanel />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <OrderPanel/>
          {/* <div className="past-order" style={{ textAlign: "center" }}>
            <h2 className="py-3">Orders</h2>
            <div className="orderDetails">
              {currentOrderDetails.length > 0 ?
                currentOrderDetails.map((data) => {
                  return (
                    <>
                      <div className="past-order-box" style={{ zoom: ".9" }}>
                        <div className="wrap">
                          <div className="burger-text">
                            <h5 className="fw-bold">Task Completed</h5>
                            <br></br>
                            <span>
                              {data.serviceCategory}, Medium-EST 2-3hr,{" "}
                              {data.vehicle === "Yes"
                                ? "Task requires a car"
                                : "Task doesn't require car"}
                            </span>
                            <br></br>
                            <span>{data.orderTime}</span>
                          </div>
                        </div>

                        <div className="row" style={{ marginTop: "20px" }}>
                          <div className="col-md-4">
                            <img
                              className="rounded-circle"
                              style={{ width: "100px", height: "100px" }}
                              src={`${import.meta.env.VITE_SOME_KEY}/uploads/${data?.image}`}
                            />
                          </div>
                          <div className="col-md-8 py-4 px-5">
                            <h2 className="fw-bold">{data.userName}</h2>
                            <p>
                              You rated{" "}
                              <span style={{ fontSize: "20px" }}> ★ 5</span>
                            </p>
                          </div>
                        </div>
                        <div
                          style={{
                            margin: "40px",
                            display: "flex",
                            gap: "40px",
                          }}
                        >
                          <button
                            type="button"
                            className="btn tab-btn"
                            onClick={() => navigate("/products")}
                          >
                            Book Again
                          </button>
                          <button
                            className="btn tab-btn"
                            type="button"
                          >
                            Share Profile
                          </button>
                        </div>
                      </div>
                    </>
                  );
                })
                : (
                  <div className="past-order-box" style={{ zoom: ".9" }}>
                    <div className="wrap">
                      <div className="burger-text">
                        <h5 className="fw-bold">Task Completed</h5>
                        <br></br>
                        <span>
                          ,Medium-EST 2-3hr,{" "}

                          Task doesn't require car
                        </span>
                        <br></br>
                        <span>01-12-24 16:40</span>
                      </div>
                    </div>

                    <div className="row" style={{ marginTop: "20px" }}>
                      <div className="col-md-4">
                        <img
                          className="rounded-circle mt-1"
                          style={{ width: "135px", height: "135px" }}
                          src={user}
                        />
                      </div>
                      <div className="col-md-8 py-4 px-5 mt-2">
                        <h4 className="fw-bold"
                          style={{ whiteSpace: "nowrap" }}>John doe carpenter</h4>
                        <p>
                          You rated{" "}
                          <span style={{ fontSize: "20px" }}> ★ 5</span>
                        </p>
                      </div>
                    </div>
                    <div
                      style={{
                        margin: "40px",
                        display: "flex",
                        gap: "40px",
                      }}
                    >
                      <button
                        type="button"
                        className="btn orderBtn tab-btn"
                        onClick={() => navigate("/products")}
                      >
                        Book Again
                      </button>
                      <button
                        className="btn orderBtn tab-btn"
                        type="button"
                      >
                        Share Profile
                      </button>
                    </div>
                  </div>
                )}
            </div>

            <div style={{ textAlign: "center" }} className="orderPagination">
              <nav aria-label="Page navigation example">
                <ul className="pagination">
                  <li className="page-item">
                    <a
                      className="page-link"
                      href="#"
                      onClick={() => paginate(currentPage - 1)}
                    >
                      Previous
                    </a>
                  </li>
                  {orderDetails &&
                    Array.from({
                      length: Math.ceil(orderDetails.length / itemsPerPage),
                    }).map((_, index) => (
                      <li
                        key={index}
                        className={`page-item ${currentPage === index + 1 ? "active" : ""
                          }`}
                      >
                        <a
                          onClick={() => paginate(index + 1)}
                          className="page-link"
                          href="#"
                        >
                          {index + 1}
                        </a>
                      </li>
                    ))}
                  <li className="page-item">
                    <a
                      className="page-link"
                      href="#"
                      onClick={() => paginate(currentPage + 1)}
                    >
                      Next
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div> */}
        </TabPanel>
        <TabPanel value={value} index={3}>
          <PaymentPanel/>
        </TabPanel>
        <LogoutModal handelLogout={handelLogout} closeLogoutModal={closeLogoutModal} showLogoutModal={showLogoutModal} />
      </Box>

    </>
  );
}
