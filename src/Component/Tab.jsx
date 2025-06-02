import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import product1 from "../assets/product1.png";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import OrdersTabPanel from "../Component/tabsPanel/orders";
import axios from "axios";
import {
  Link,
  useParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { message } from "antd";
const pastOrders = [
  {
    userId: "13h5sh3",
    products: [
      {
        productId: "pr0d1d1",
        quantity: 2,
        price: 499.99,
        total: 999.98,
      },
      {
        productId: "pr0d2d2",
        quantity: 1,
        price: 299.99,
        total: 299.99,
      },
    ],
    subtotal: 1299.97,
    shippingCost: 50,
    discount: 100,
    totalAmount: 1249.97,
    paymentMethod: "Credit Card",
    paymentStatus: "Paid",
    orderStatus: "Shipped",
    shippingAddress: {
      fullName: "Jane Doe",
      address: "123 SkinCare Lane",
      city: "Glowtown",
      postalCode: "123456",
      country: "Skintopia",
    },
    createdAt: "2025-04-04T00:00:00.000Z",
  },
];

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
  // reset password
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleForgetPasswordSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!oldPassword || !newPassword || !confirmPassword) {
      setError("All fields are required.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }
    try {
      const token = Cookies.get("token");
      console.log(token);
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_API}/reset-password`,
        { oldPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess(response.data.message);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  // reset password ends here

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
      setShowBillingForm(false);
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
      setShowShippingForm(false);
      getAddresses();
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

  const [pastOrders, setPastOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const getOrders = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_API}/api/user/${id}`
      );
      if (!response.ok) throw new Error("Failed to fetch orders");

      const data = await response.json();
      setPastOrders(data);
      console.log("Order Data:", data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  // get user by id
  const [user, setUser] = useState([]);
  const getUserById = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_API}/user/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res.ok) {
        throw new Error(`Error ${res.status}: ${res.statusText}`);
      }

      const data = await res.json();
      setUser(data);
    } catch (err) {
      console.error("Failed to fetch user profile:", err.message);
    }
  };

  useEffect(() => {
    getOrders(userId);
    getUserById();
  }, []);
  return (
    <Box
      className="tabSection"
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
          width: { xs: "auto", lg: "300px" },
          borderRight: 1,
          borderColor: "divider",
          color: "orangeline",
          "& .MuiTab-indicator": { backgroundColor: "orangeline" },
        }}
      >
        <Tab className="sidenav" label="Profile" {...a11yProps(0)} />
        <Tab className="sidenav" label="Address" {...a11yProps(3)} />

        <Tab className="sidenav" label="Reset Password" {...a11yProps(5)} />
        <Tab className="sidenav" label="Order" {...a11yProps(4)} />

        <Tab
          onClick={handelLogout}
          className="sidenav"
          label="Logout"
          {...a11yProps(2)}
        />
      </Tabs>
      <TabPanel value={value} index={0}>
        <div
          className="profile flex justify-evenly flex-wrap w-full "
          style={{ margin: "10px" }}
        >
          <div className=" profileDetails  lg:w-[600px] my-3 text-center border p-5">
            <h1 className="mb-8">PROFILE DETAILS</h1>
            <div className=" flex space-x-4 mb-3 items-center">
              <h4>Name: </h4>
              <p>{user.name}</p>
            </div>
            <div className="flex space-x-4  items-center">
              <h4>Email: </h4>
              <p>{user.email}</p>
            </div>
          </div>
          <div className="profile-box" style={{ width: "500px" }}>
            <form>
              <div class="my-3">
                <label for="username" className="form-label fs-5 text">
                  Full Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  value={user.name}
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
                  value={user.name}
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
                  value={user.email}
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
        <div className="d-flex m-3 gap-5 adressess sm:flex-column">
          <div className="w-1/2 p-2 addressForm">
            <h2 className="w-1/2  pb-3">Billing Address</h2>
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
                ) : (
                  <p className="mt-2">BillingAddress is not set</p>
                )}
              </div>
              {showBillingForm && (
                <form
                  className="address-form w-[89%] pl-3 "
                  onSubmit={saveAddressesToDatabase}
                >
                  <>
                    <label
                      htmlFor="billingFirstName"
                      className="form-label  text-[16px]"
                    >
                      First Name <span className="text-[#ff0024]">*</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      className="form-control placeholder-left mb-3"
                      id="billingFirstName"
                      placeholder="Enter First Name"
                      value={billingFormData.firstName}
                      onChange={handleBillingFormChange}
                    />

                    <label
                      htmlFor="billingLastName"
                      className="form-label  text-[16px] "
                    >
                      Last Name <span className="text-[#ff0024]">*</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      className="form-control placeholder-left mb-3"
                      id="billingLastName"
                      placeholder="Enter Last Name"
                      value={billingFormData.lastName}
                      onChange={handleBillingFormChange}
                    />

                    <label
                      htmlFor="billingCountry"
                      className="form-label  text-[16px]"
                    >
                      Country/Region <span className="text-[#ff0024]">*</span>
                    </label>
                    <input
                      type="text"
                      name="country"
                      className="form-control mb-3"
                      id="billingCountry"
                      placeholder="Enter Country/ Region"
                      value={billingFormData.country}
                      onChange={handleBillingFormChange}
                      required
                    />

                    <label
                      htmlFor="billingStreet"
                      className="form-label  text-[16px]"
                    >
                      Street address
                    </label>
                    <input
                      type="text"
                      name="streetAddress"
                      className="form-control mb-3"
                      id="billingStreet"
                      placeholder="Enter Street Address"
                      value={billingFormData.streetAddress}
                      onChange={handleBillingFormChange}
                    />

                    <label
                      htmlFor="billingCity"
                      className="form-label  text-[16px]"
                    >
                      Town / City <span className="text-[#ff0024]">*</span>
                    </label>
                    <input
                      type="text"
                      name="city"
                      className="form-control mb-3"
                      id="billingCity"
                      placeholder="Enter City / Town"
                      value={billingFormData.city}
                      onChange={handleBillingFormChange}
                    />

                    <label
                      htmlFor="billingState"
                      className="form-label  text-[16px]"
                    >
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      className="form-control mb-3"
                      id="billingState"
                      placeholder="Enter State"
                      value={billingFormData.state}
                      onChange={handleBillingFormChange}
                    />

                    <label
                      htmlFor="billingZip"
                      className="form-label  text-[16px]"
                    >
                      Zip Code <span className="text-[#ff0024]">*</span>
                    </label>
                    <input
                      type="number"
                      className="form-control mb-3"
                      name="zipcode"
                      id="billingZip"
                      placeholder="Enter Zipcode"
                      value={billingFormData.zipcode}
                      onChange={handleBillingFormChange}
                    />

                    <label
                      htmlFor="billingPhone"
                      className="form-label  text-[16px]"
                    >
                      Phone <span className="text-[#ff0024]">*</span>
                    </label>
                    <input
                      type="number"
                      name="phone"
                      className="form-control mb-3"
                      id="billingPhone"
                      placeholder="Enter Phone no."
                      value={billingFormData.phone}
                      onChange={handleBillingFormChange}
                    />

                    <label
                      htmlFor="billingEmail"
                      className="form-label  text-[16px]"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="form-control mb-3 "
                      id="billingEmail"
                      placeholder="Enter Email Address"
                      value={billingFormData.email}
                      onChange={handleBillingFormChange}
                    />

                    <div>
                      <button className="btn btn-outline-danger w-full mt-3" type="submit">
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
                    {shippingAddresses.map((el) => {
                      return (
                        <div className="address-box">
                          <p>
                            <strong>SHIPPING ADDRESS :</strong>{" "}
                            {el?.shippingstreetAddress || " Chicago, USA"},{" "}
                            {el?.shippingcity} ,{el?.shippingstate},{" "}
                            {el?.shippingcountry}
                          </p>
                          <p>
                            <strong>ZIPCODE :</strong> {el?.shippingzipcode}
                          </p>
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <p>Shipping Address is not set up yet.</p>
                )}
              </div>
              {showShippingForm && (
                <form
                  className="address-form px-3 w-[91%]"
                  onSubmit={saveAddressesToDatabase}
                >
                  <>
                    <label
                      htmlFor="shippingFirstName"
                      className="form-label  text-[16px]"
                    >
                      First Name <span className="text-[#ff0024]">*</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      className="form-control placeholder-left mb-3"
                      id="shippingFirstName"
                      placeholder="Enter First Name"
                      value={shippingFormData.firstName}
                      onChange={handleShippingFormChange}
                    />
                    <label
                      htmlFor="shippingLastName"
                      className="form-label  text-[16px]"
                    >
                      Last Name <span className="text-[#ff0024]">*</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      className="form-control placeholder-left mb-3"
                      id="shippingLastName"
                      placeholder="Enter Last Name"
                      value={shippingFormData.lastName}
                      onChange={handleShippingFormChange}
                    />
                    <label
                      htmlFor="shippingCountry"
                      className="form-label  text-[16px]"
                    >
                      Country/Region <span className="text-[#ff0024]">*</span>
                    </label>
                    <input
                      type="text"
                      name="country"
                      className="form-control mb-3"
                      id="shippingCountry"
                      placeholder="Enter Country/ Region"
                      value={shippingFormData.country}
                      onChange={handleShippingFormChange}
                      required
                    />
                    <label
                      htmlFor="shippingStreet"
                      className="form-label  text-[16px]"
                    >
                      Street address
                    </label>
                    <input
                      type="text"
                      name="streetAddress"
                      className="form-control mb-3"
                      id="shippingStreet"
                      placeholder="Enter Street Address"
                      value={shippingFormData.streetAddress}
                      onChange={handleShippingFormChange}
                    />

                    <label
                      htmlFor="shippingCity"
                      className="form-label  text-[16px]"
                    >
                      Town / City <span className="text-[#ff0024]">*</span>
                    </label>
                    <input
                      type="text"
                      name="city"
                      className="form-control mb-3"
                      id="shippingCity"
                      placeholder="Enter City / Town"
                      value={shippingFormData.city}
                      onChange={handleShippingFormChange}
                    />

                    <label
                      htmlFor="shippingState"
                      className="form-label  text-[16px]"
                    >
                      State <span className="text-[#ff0024]">*</span>
                    </label>
                    <input
                      type="text"
                      name="state"
                      className="form-control mb-3"
                      id="shippingState"
                      placeholder="Enter State"
                      value={shippingFormData.state}
                      onChange={handleShippingFormChange}
                    />

                    <label
                      htmlFor="shippingZip"
                      className="form-label  text-[16px]"
                    >
                      Zip Code <span className="text-[#ff0024]">*</span>
                    </label>
                    <input
                      type="number"
                      name="zipcode"
                      className="form-control mb-3"
                      id="shippingZip"
                      placeholder="Enter Zipcode"
                      value={shippingFormData.zipcode}
                      onChange={handleShippingFormChange}
                    />

                    <label
                      htmlFor="shippingPhone"
                      className="form-label  text-[16px]"
                    >
                      Phone <span className="text-[#ff0024]">*</span>
                    </label>
                    <input
                      type="number"
                      name="phone"
                      className="form-control mb-3"
                      id="shippingPhone"
                      placeholder="Enter Phone no."
                      value={shippingFormData.phone}
                      onChange={handleShippingFormChange}
                    />

                    <label
                      htmlFor="shippingEmail"
                      className="form-label  text-[16px]"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="form-control mb-3"
                      id="shippingEmail"
                      placeholder="Enter Email Address"
                      value={shippingFormData.email}
                      onChange={handleShippingFormChange}
                    />

                    <button className="btn btn-outline-danger mt-3   w-full" type="submit">
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
        <div className="flex justify-center items-center pt-4">
          <div className="bg-white p-6 rounded-lg  lg:w-[40%]">
            <form onSubmit={handleForgetPasswordSubmit} className="space-y-4">
              <div>
                <label className="block font-medium">Old Password</label>
                <input
                  type="password"
                  className="w-full border rounded-md p-2"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block font-medium">New Password</label>
                <input
                  type="password"
                  className="w-full border rounded-md p-2"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block font-medium">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  className="w-full border rounded-md p-2"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              {success && <p className="text-green-500 text-sm">{success}</p>}
              <button
                type="submit"
                className="w-full bg-[#ff5B00] text-white py-2 rounded-md hover:bg-blue-600"
              >
                Change Password
              </button>
            </form>
          </div>
        </div>
      </TabPanel>

      <TabPanel value={value} index={3}>
        <div className="p-4 space-y-8 ">
          {pastOrders?.map((order) => (
            <div
              key={order._id}
              className="border p-4  rounded-lg shadow flex flex-col lg:flex-row  lg:justify-around space-y-6"
            >
              <div className="">
                <h3 className="font-semibold  text-[16px]">Products:</h3>
                {order?.products?.map((item, index) => (
                  <div key={index} className=" lg:flex gap-10">
                    <div>
                      <img
                        src={item?.productId?.image[0]}
                        alt={item?.productId?.title}
                        className="w-28 h-28 "
                      />
                    </div>
                    <div className="text-[16px]">
                      <p>
                        Quantity: <b>{item?.quantity}</b>
                      </p>
                      <p>
                        Price: ₹<b>{item?.price}</b>
                      </p>
                      <p>
                        Total: ₹<b>{item?.total}</b>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <h2 className="text-lg font-bold mb-2">
                  Order ID: {order?._id}
                </h2>
                <p className="text-sm text-gray-600">
                  Status: {order?.orderStatus}
                </p>
                <p className="text-sm">
                  Payment: {order?.paymentMethod} ({order?.paymentStatus})
                </p>
                <p className="text-sm">Total: ₹{order?.totalAmount}</p>
                <p className="text-sm text-gray-500">
                  Ordered on: {new Date(order?.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </TabPanel>
      <TabPanel value={value} index={5}></TabPanel>
    </Box>
  );
}
