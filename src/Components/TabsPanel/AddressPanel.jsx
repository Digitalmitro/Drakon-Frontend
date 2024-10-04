import React, { useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/AddressPanel.scss"
export const AddressPanel = () => {
  const navigate = useNavigate();
  const [showBillingForm, setShowBillingForm] = useState(false);
  const [showShippingForm, setShowShippingForm] = useState(false);
  const [billingAddresses, setBillingAddresses] = useState([]);
  const [shippingAddresses, setShippingAddresses] = useState([]);
  const toggleBillingForm = () => {
    setShowBillingForm((prev) => !prev);
  };

  const toggleShippingForm = () => {
    setShowShippingForm((prev) => !prev);
  };

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
  useEffect(() => {
    getAddresses();
  }, []);


  return (
    <>
      <div className="d-flex m-3 gap-2 addresses sm:flex-column">
        <div className="w-1/2 p-2 addressForm">
          <h3 className="w-1/2  pb-3">Billing Address</h3>
          <div className=" address-shadow mb-3 border p-4">
            <div className="m-3">
              <button
                type="button"
                className="btn addressBtn "
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
                <p>BillingAddress is not set</p>
              )}
            </div>
            {showBillingForm && (
              <form className="address-form" onSubmit={saveAddressesToDatabase}>
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
                    <button className="btn " type="submit">
                      Save Address
                    </button>
                  </div>
                </>
              </form>
            )}
          </div>
        </div>

        <div className="mb-3 w-1/2 p-2 addressForm">
          <h3 className="w-1/2 pb-3">Shipping Address</h3>
          <div className="address-shadow mb-3 border p-4">
            <div className="m-3">
              <button
                type="button"
                className="btn addressBtn "
                onClick={toggleShippingForm}
              >
                ADD
              </button>
              {shippingAddresses ? (
                <>
                  <div className="address-box">
                    <p>
                      <strong>SHIPPING ADDRESS :</strong>{" "}
                      {shippingAddresses?.shippingstreetAddress ||
                        " Chicago, USA"}
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
              ) : (
                <p>Shipping Address is not set up yet.</p>
              )}
            </div>
            {showShippingForm && (
              <form className="address-form" onSubmit={saveAddressesToDatabase}>
                <>
                  <label htmlFor="shippingFirstName pt-3" className="form-label">
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
                  <label htmlFor="shippingLastName pt-3" className="form-label">
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
                  <label htmlFor="shippingCountry pt-3" className="form-label">
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
                  <label htmlFor="shippingStreet pt-3" className="form-label">
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

                  <label htmlFor="shippingCity pt-3" className="form-label">
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

                  <label htmlFor="shippingState pt-3" className="form-label">
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

                  <label htmlFor="shippingZip pt-3" className="form-label">
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

                  <label htmlFor="shippingPhone pt-3" className="form-label">
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

                  <label htmlFor="shippingEmail pt-3" className="form-label">
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

                  <button className="btn my-3" type="submit">
                    Save Address
                  </button>
                </>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};


