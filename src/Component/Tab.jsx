import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import product1 from "../assets/product1.png";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import OrdersTabPanel from '../Component/tabsPanel/orders'
import axios from "axios";
import {
  Link,
  useParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { message } from "antd";

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

  const [searchParams] = useSearchParams();
  const token = Cookies.get("token");
  const decodedToken = token && jwtDecode(token);
  const userId = decodedToken?._id;
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    displayName: "",
    email: "",
    oldPassword: "",
    newPassword: "",
    user_id: userId,
  });


  useEffect(() => {
    const tabIndex = searchParams.get("tab");
    if (tabIndex !== null) {
      setValue(Number(tabIndex));
    } else {
      const storedValue = localStorage.getItem("selectedTab");
      if (storedValue !== null) {
        setValue(Number(storedValue));
      }
    }
  }, [searchParams]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    localStorage.setItem("selectedTab", newValue);
  };

  // State variables for form fields
  const [billingFormData, setBillingFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    country: "",
    streetAddress: "",
    city: "",
    state: "",
   
    zipcode: null,
    phone: null,
  });

  const [shippingFormData, setShippingFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    country: "",
    streetAddress: "",
    city: "",
    state: "",
    zipcode: null,
    phone: null,
  });

  // Function to handle form field changes
  const handleBillingFormChange = (e) => {
    const { name, value } = e.target;
    setBillingFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleShippingFormChange = (e) => {
    const { name, value } = e.target;
    setShippingFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const saveAddressesToDatabase = async (e) => {
    e.preventDefault();
    // console.log("billingFormData", billingFormData);
    // console.log("shippingFormData", shippingFormData);

    try {
      const payload = {
        billingAddress: {
          billingfirstName: billingFormData.firstName,
          billinglastName: billingFormData.lastName,
          billingcountry: billingFormData.country,
          billingstreetAddress: billingFormData.streetAddress,
          billingcity: billingFormData.city,
          billingstate: billingFormData.state,
          billingzipcode: billingFormData.zipcode,
          billingphone: billingFormData.phone,
          billingemail: billingFormData.email,
          user_id: userId,
        },
        shippingAddress: {
          shippingfirstName: shippingFormData.firstName,
          shippinglastName: shippingFormData.lastName,
          shippingcountry: shippingFormData.country,
          shippingstreetAddress: shippingFormData.streetAddress,
          shippingcity: shippingFormData.city,
          shippingstate: shippingFormData.state,
          shippingzipcode: shippingFormData.zipcode,
          shippingphone: shippingFormData.phone,
          user_id: userId,
        },
        userId,
      };
      // console.log("payload", payload);
      if (payload.billingAddress.billingcountry !== "") {
        const response1 = await axios.post(
          `${import.meta.env.VITE_BACKEND_API}/addressbookbilling`,
          payload.billingAddress
        );
        // console.log("Billing response:", response1);
        // window.location.href = "/my-account";
      } else {
        const response2 = await axios.post(
          `${import.meta.env.VITE_BACKEND_API}/addressbookshipping`,
          payload.shippingAddress
        );
        // console.log("Billing response:", response1);
        // window.location.href = "/my-account";
      }

      setBillingFormData({
        firstName: "",
        lastName: "",

        country: "",
        streetAddress: "",
        city: "",
        state: "",
        zipcode: null,
        phone: null,
        email: "",
      });

      setShippingFormData({
        firstName: "",
        lastName: "",
        country: "",
        streetAddress: "",
        city: "",
        state: "",
        zipcode: null,
        phone: null,
      });
      // console.log("after postData", billingFormData, shippingFormData);
    } catch (error) {
      console.error("Error saving addresses:", error);
    }
  };

  const [billingAddresses, setBillingAddresses] = React.useState([]);
  const [shippingAddresses, setShippingAddresses] = React.useState([]);

  async function getAddresses() {
    try {
      const billing = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/addressbookbilling/${userId}`
      );
      // console.log("billing", billing);

      setBillingAddresses(billing.data.addressbookbilling);

      const shipping = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/addressbookshipping/${userId}`
      );
      // console.log("shipping", shipping);

      setShippingAddresses(shipping.data.addressbookShipping);
    } catch (error) {
      console.log(error);
    }
  }
  React.useEffect(() => {
    getAddresses();
  }, []);
  const [addBilling, setAddBilling] = React.useState(false);
  const [addShipping, setAddShipping] = React.useState(false);

  async function deleteBillingAddress(id) {
    try {
      const { data, statusText } = await axios.delete(
        `${import.meta.env.VITE_BACKEND_API}/addressbookbilling/${id}`
      );
      // console.log(data);

      if (statusText === "OK") {
        getAddresses();
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function deleteShippingAddress(id) {
    try {
      const { data, statusText } = await axios.delete(
        `${import.meta.env.VITE_BACKEND_API}/addressbookshipping/${id}`
      );
      // console.log(data);
      if (statusText === "OK") {
        getAddresses();
      }
    } catch (error) {
      console.log(error);
    }
  }

  // console.log("formData", billingFormData)

  const handleAccountDetailsChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleUpdate = async () => {
    const { oldPassword, ...rest } = formData;
    // Ensure old password is provided
    if (!oldPassword) {
      alert("Old password is required");
      return;
    }
    // Make PUT request to "/updateclient"
    const { data, statusText } = await axios.put(
      `${import.meta.env.VITE_BACKEND_API}/updateclient`,
      formData
    );
    if (statusText === "OK") {
      // Handle successful response
      // console.log("Update successful");
    } else {
      // Handle error response
      console.error("Update failed");
    }
  };
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/order`
      );
      // console.log(" order", data);
      setData(data);
    } catch (error) {}
  };

  useEffect(() => {
    getData();
  }, []);

  const handelLogout = () => {
    Cookies.remove("token");
    window.location.href = "/account";
  };

  const [showBillingForm, setShowBillingForm] = useState(false);
  const [showShippingForm, setShowShippingForm] = useState(false);

  const toggleBillingForm = () => {
    setShowBillingForm((prev) => !prev);
  };

  const toggleShippingForm = () => {
    setShowShippingForm((prev) => !prev);
  };
  // const pastOrders = [
  //   {
  //     id: 1,
  //     img: product1,
  //     deliveredDate: "Sat, Mar 25, 2024 07:15 pm",
  //     orderDate: "Sat, Mar 22, 2024, 5:00 pm",
  //     title: "Full Sleeve Jacket",
  //     orderNumber: "14524156451268",
  //     totalPaid: 142,
  //   },
  //   {
  //     id: 2,
  //     img: product1,
  //     deliveredDate: "Sat, ",
  //     orderDate: "Sat, Mar 22, 2024, 5:00 pm",
  //     title: "  Jacket",
  //     orderNumber: "14524156451268",
  //     totalPaid: 142,
  //   },

  //   // Add more orders as needed
  // ];

  // const [currentPage, setCurrentPage] = useState(1);
  // const productsPerPage = 1; // You can adjust this value
  // const totalPages = Math.ceil(pastOrders.length / productsPerPage);

  // const indexOfLastProduct = currentPage * productsPerPage;
  // const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  // const currentProducts = pastOrders.slice(
  //   indexOfFirstProduct,
  //   indexOfLastProduct
  // );

  // const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
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
        sx={{
          borderRight: 1,
          borderColor: "divider",
          color: "orangeline",
          "& .MuiTab-indicator": { backgroundColor: "orangeline" },
        }}
      >
        <Tab className="sidenav" label="Profile" {...a11yProps(0)} />
        <Tab className="sidenav" label="Address" {...a11yProps(3)} />

        <Tab className="sidenav" label="account details" {...a11yProps(5)} />
        <Tab className="sidenav" label="Order" {...a11yProps(4)} />
        {/* <Tab className="sidenav" label="BILLING DETAILS" {...a11yProps(1)} /> */}
        <Tab
          onClick={handelLogout}
          className="sidenav"
          label="Logout"
          {...a11yProps(2)}
        />
      </Tabs>
      <TabPanel value={value} index={0}>
        <div
          className="profile d-flex justify-content-around w-full "
          style={{ margin: "10px" }}
        >
          <div className="gap-5 my-5 w-1/3 text-center border p-5">
            <h1>PROFILE DETAILS</h1>
            <div className=" d-flex justify-content-between  items-center my-5 py-2">
              <h4>Name: </h4>
              <p> suvo suvo</p>
            </div>
            <div className="d-flex justify-content-between items-center">
              <h4>Email: </h4>
              <p>Suvo@gmail.com</p>
            </div>
          </div>
          <div className="profile-box" style={{ width: "500px" }}>
            <form>
              <div class="my-3">
                <label for="username" className="form-label fs-5 text">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="name" className="form-label fs-5 text">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="email" className="form-label  fs-5 text">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="phone" className="form-label  fs-5 text">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="form-control"
                  id="phone"
                  required
                />
              </div>
            </form>
            <button
              type="submit"
              className="btn btn-danger"
              style={{ backgroundColor: "#FF7F50 " }}
            >
              Submit
            </button>
          </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div className="d-flex m-3 gap-5">
          <div className="w-1/2 p-2 addressForm">
            <h2 className="w-1/2 pb-3">Billing Address</h2>
            <div className="mb-3 border p-4">
              <div className="m-3">
                <button
                  type="button"
                  className="btn btn-outline-danger m-1"
                  onClick={toggleBillingForm}
                >
                  ADD
                </button>
                {billingAddresses ? (
                  <>
                    <div className="address-box">
                      <p>
                        <strong>BILLING ADDRESS: </strong>{" "}
                        {billingAddresses?.billingstreetAddress ||
                          " Chicago, USA"}
                        , {billingAddresses?.billingcity} ,
                        {billingAddresses?.billingstate},{" "}
                        {billingAddresses?.billingcountry}
                      </p>
                      <p>
                        <strong>ZIPCODE: </strong>{" "}
                        {billingAddresses?.billingzipcode}
                      </p>
                     
                    </div>
                  </>
                ): <p>BillingAddress is not set</p>}
              </div>
              {showBillingForm && (
                <form
                  className="address-form"
                  onSubmit={saveAddressesToDatabase}
                >
                  <>
                    <label htmlFor="billingFirstName" className="form-label">
                      First Name*
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      className="form-control placeholder-left"
                      id="billingFirstName"
                      placeholder="Enter First Name"
                      value={billingFormData.firstName}
                      onChange={handleBillingFormChange}
                    />

                    <label htmlFor="billingLastName" className="form-label">
                      Last Name*
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      className="form-control placeholder-left"
                      id="billingLastName"
                      placeholder="Enter Last Name"
                      value={billingFormData.lastName}
                      onChange={handleBillingFormChange}
                    />

                    <label htmlFor="billingCountry" className="form-label">
                      Country/Region *
                    </label>
                    <input
                      type="text"
                      name="country"
                      className="form-control"
                      id="billingCountry"
                      placeholder="Enter Country/ Region"
                      value={billingFormData.country}
                      onChange={handleBillingFormChange}
                      required
                    />

                    <label htmlFor="billingStreet" className="form-label">
                      Street address
                    </label>
                    <input
                      type="text"
                      name="streetAddress"
                      className="form-control"
                      id="billingStreet"
                      placeholder="Enter Street Address"
                      value={billingFormData.streetAddress}
                      onChange={handleBillingFormChange}
                    />

                    <label htmlFor="billingCity" className="form-label">
                      Town / City*
                    </label>
                    <input
                      type="text"
                      name="city"
                      className="form-control"
                      id="billingCity"
                      placeholder="Enter City / Town"
                      value={billingFormData.city}
                      onChange={handleBillingFormChange}
                    />

                    <label htmlFor="billingState" className="form-label">
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      className="form-control"
                      id="billingState"
                      placeholder="Enter State"
                      value={billingFormData.state}
                      onChange={handleBillingFormChange}
                    />

                    <label htmlFor="billingZip" className="form-label">
                      Zip Code
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      name="zipcode"
                      id="billingZip"
                      placeholder="Enter Zipcode"
                      value={billingFormData.zipcode}
                      onChange={handleBillingFormChange}
                    />

                    <label htmlFor="billingPhone" className="form-label">
                      Phone *
                    </label>
                    <input
                      type="number"
                      name="phone"
                      className="form-control"
                      id="billingPhone"
                      placeholder="Enter Phone no."
                      value={billingFormData.phone}
                      onChange={handleBillingFormChange}
                    />

                    <label htmlFor="billingEmail" className="form-label">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      id="billingEmail"
                      placeholder="Enter Email Address"
                      value={billingFormData.email}
                      onChange={handleBillingFormChange}
                    />

                    <div>
                      <button className="btn btn-outline-danger" type="submit">
                        Save Address
                      </button>
                    </div>
                  </>
                </form>
              )}
            </div>
          </div>

          <div className="mb-3 w-1/2 p-2 addressForm">
            <h2 className="w-1/2 pb-3">Shipping Address</h2>
            <div className="mb-3 border p-4">
              <div className="m-3">
                <button
                  type="button"
                  className="btn btn-outline-danger m-1"
                  onClick={toggleShippingForm}
                >
                  ADD
                </button>
                {shippingAddresses ? (
                  <>

                    <div className="address-box">
                      <p>
                        <strong>SHIPPING ADDRESS :</strong>{" "}
                        {shippingAddresses?.shippingstreetAddress || " Chicago, USA"}
                        , {shippingAddresses?.shippingcity} ,
                        {shippingAddresses?.shippingstate},{" "}
                        {shippingAddresses?.shippingcountry}
                      </p>
                      <p>
                        <strong>ZIPCODE :</strong>{" "}
                        {shippingAddresses?.shippingzipcode}
                      </p>
                     
                    </div>
                  </>
                ): <p>Shipping Address is not set up yet.</p>}
              </div>
              {showShippingForm && (
                <form
                  className="address-form"
                  onSubmit={saveAddressesToDatabase}
                >
                  <>
                    <label htmlFor="shippingFirstName" className="form-label">
                      First Name*
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      className="form-control placeholder-left"
                      id="shippingFirstName"
                      placeholder="Enter First Name"
                      value={shippingFormData.firstName}
                      onChange={handleShippingFormChange}
                    />
                    <label htmlFor="shippingLastName" className="form-label">
                      Last Name*
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      className="form-control placeholder-left"
                      id="shippingLastName"
                      placeholder="Enter Last Name"
                      value={shippingFormData.lastName}
                      onChange={handleShippingFormChange}
                    />
                    <label htmlFor="shippingCountry" className="form-label">
                      Country/Region *
                    </label>
                    <input
                      type="text"
                      name="country"
                      className="form-control"
                      id="shippingCountry"
                      placeholder="Enter Country/ Region"
                      value={shippingFormData.country}
                      onChange={handleShippingFormChange}
                      required
                    />
                    <label htmlFor="shippingStreet" className="form-label">
                      Street address
                    </label>
                    <input
                      type="text"
                      name="streetAddress"
                      className="form-control"
                      id="shippingStreet"
                      placeholder="Enter Street Address"
                      value={shippingFormData.streetAddress}
                      onChange={handleShippingFormChange}
                    />

                    <label htmlFor="shippingCity" className="form-label">
                      Town / City*
                    </label>
                    <input
                      type="text"
                      name="city"
                      className="form-control"
                      id="shippingCity"
                      placeholder="Enter City / Town"
                      value={shippingFormData.city}
                      onChange={handleShippingFormChange}
                    />

                    <label htmlFor="shippingState" className="form-label">
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      className="form-control"
                      id="shippingState"
                      placeholder="Enter State"
                      value={shippingFormData.state}
                      onChange={handleShippingFormChange}
                    />

                    <label htmlFor="shippingZip" className="form-label">
                      Zip Code
                    </label>
                    <input
                      type="number"
                      name="zipcode"
                      className="form-control"
                      id="shippingZip"
                      placeholder="Enter Zipcode"
                      value={shippingFormData.zipcode}
                      onChange={handleShippingFormChange}
                    />

                    <label htmlFor="shippingPhone" className="form-label">
                      Phone *
                    </label>
                    <input
                      type="number"
                      name="phone"
                      className="form-control"
                      id="shippingPhone"
                      placeholder="Enter Phone no."
                      value={shippingFormData.phone}
                      onChange={handleShippingFormChange}
                    />

                    <label htmlFor="shippingEmail" className="form-label">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      id="shippingEmail"
                      placeholder="Enter Email Address"
                      value={shippingFormData.email}
                      onChange={handleShippingFormChange}
                    />

                    <button className="btn btn-outline-danger" type="submit">
                      Save Address
                    </button>
                  </>
                </form>
              )}
            </div>
          </div>
        </div>
      </TabPanel>

      <TabPanel value={value} index={2}>
        <div class="d-flex justify-content-center align-items-center mt-5 addressDetails">
          <form class="row g-3 m-3 d-flex justify-content-center align-items-center addressDetails">
            <div class="col-md-4">
              <input
                type="text"
                class="form-control"
                id="inputCity"
                placeholder="First Name"
              />
            </div>
            <div class="col-md-4">
              <input
                type="text"
                class="form-control"
                id="inputCity"
                placeholder="Last Name"
              />
            </div>
            <div class="col-md-4">
              <input
                type="text"
                class="form-control"
                id="inputZip"
                placeholder="Display Name"
              />
            </div>
            <div class="col-md-4">
              <input
                type="text"
                class="form-control"
                id="inputCity"
                placeholder="Email Address"
              />
            </div>
            <div class="col-md-4">
              <input
                type="text"
                class="form-control"
                id="inputCity"
                placeholder="Old Password"
              />
            </div>
            <div class="col-md-4">
              <input
                type="text"
                class="form-control"
                id="inputZip"
                placeholder="New Password"
              />
            </div>
            <button type="button" class="btn w-1/3">
              Add Account
            </button>
          </form>
        </div>
      </TabPanel>

      <TabPanel value={value} index={3}>
        {/* <div className="text-center">
          <h2 className="fs-1 text my-3">Past Orders</h2>
        </div>
        <div className="past-order d-flex justify-content-center">
          {currentProducts.map((order) => (
            <div key={order.id} className="past-order-box">
              <div className="wrap">
                <img src={order.img} alt="Product" />
                <div className="burger-text">
                  <p className="text-end pb-4">
                    Delivered on {order.deliveredDate}{" "}
                    <i className="fa-solid fa-circle-check"></i>
                  </p>
                  <h3 className="fs-2 text fw-bold">{order.title}</h3>
                  <br></br>
                  <span>
                    order#{order.orderNumber} {order.orderDate}
                  </span>
                  <br></br>

                  <button className="btn-1" type="button">
                    view details
                  </button>
                </div>
              </div>
              <div className="order-history " style={{ marginTop: "20px" }}>
                <b className="px-4">
                  {order.title} {" : "}{" "}
                </b>
                <span className="px-4"> total spanaid $ {order.totalPaid}</span>
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
                <div className="pagination-controlsborder d-flex justify-content-center">
                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index}
                      onClick={() => paginate(index + 1)}
                      className={`p-2 border  pagination-button ${
                        currentPage === index + 1 ? "active" : ""
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div> */}
        <OrdersTabPanel/>
      </TabPanel>
      <TabPanel value={value} index={5}></TabPanel>
    </Box>
  );
}
