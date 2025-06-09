import axios from 'axios';
import React, { useState } from 'react'
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

function Address() {

    const [billingAddresses, setBillingAddresses] = React.useState([]);
    const [shippingAddresses, setShippingAddresses] = React.useState([]);
    const [showBillingForm, setShowBillingForm] = useState(false);
    const [showShippingForm, setShowShippingForm] = useState(false);
    const token = Cookies.get("token");
    const decodedToken = token && jwtDecode(token);
    const userId = decodedToken?._id;


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


    async function getAddresses() {
        try {
            const billing = await axios.get(
                `${import.meta.env.VITE_BACKEND_API}/addressbookbilling/${userId}`
            );
            console.log("billing", billing);

            setBillingAddresses(billing.data);

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


    return (
        <div className="d-flex  gap-5 adressess sm:flex-column " style={{ marginTop: "100px", paddingInline: "40px" }} >
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
                        {billingAddresses && billingAddresses.length > 0 ? (
                            <div className="space-y-4">
                                {billingAddresses.map((address, index) => (
                                    <div
                                        className="address-box p-4 border rounded-md shadow-sm"
                                        key={address._id || index}
                                    >
                                        <p>
                                            <strong>BILLING ADDRESS #{index + 1}:</strong>{" "}
                                            {address.billingstreetAddress}, {address.billingcity},{" "}
                                            {address.billingstate}, {address.billingcountry}
                                        </p>
                                        <p>
                                            <strong>ZIPCODE:</strong> {address.billingzipcode}
                                        </p>

                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="mt-2">Billing Address is not set</p>
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
                                    <button
                                        className="btn btn-outline-danger w-full mt-3"
                                        type="submit"
                                    >
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

                                <button
                                    className="btn btn-outline-danger mt-3   w-full"
                                    type="submit"
                                >
                                    Save Address
                                </button>
                            </>
                        </form>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Address