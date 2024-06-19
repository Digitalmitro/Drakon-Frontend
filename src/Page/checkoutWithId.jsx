
import axios from "axios";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useNavigate, useParams } from "react-router-dom";

const Checkout = () => {

  const token = Cookies.get("token");
  const decodedToken = token && jwtDecode(token);
  const userId = decodedToken?._id;
  const { id }= useParams()
  const navigate = useNavigate()
  const [shippingData, setShippingData] = useState();
  const [billingData, setBillingData] = useState();
  const [data, setData] = useState();




  const handleProduct = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/products/${id}`
      );

      console.log("product response", response);

      setData(response.data);
    } catch (error) {
      console.error(error);
    }
    console.log("data", data);
  };

  useEffect(() => {
    handleProduct()
  })

  const getAddressData = async () => {
    try {
      const response1 = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/addressbookbilling/${userId}`
      );
      // console.log("Billing response:", response1);
      const response2 = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/addressbookshipping/${userId}`
      );
      await setBillingData(response1.data.addressbookbilling);
      await setShippingData(response2.data.addressbookShipping);
    } catch (error) {
      console.error("Error saving addresses:", error);
    }
    // console.log("shipping response:", shippingData);
    // console.log("billing response:", billingData);
  };
  useEffect(() => {
    getAddressData();
    handleProduct();
  }, []);

  const handleAddAddress = () => {
    navigate('/profile?tab=1');
 
  };

  return (
    <>
      <div
        className="container  d-flex align-items-center justify-content-center m-5"
        style={{ zoom: "1.1" }}
      >
        <div
          className="row w-100 px-3"
          style={{ display: "flex", gap: "7rem" }}
        >
          <div className="col-md-4">
            <h2 className="fs-2 text pb-3 ">
                 ADDRESSES</h2>
            <div className="login-box">
              <button type="btn" className="btn-add" onClick={handleAddAddress}>
                ADD ADDRESS
              </button>

              <div className="address-box">
                <p>
                  <strong>BILLING ADDRESS: </strong>{" "}
                  {billingData?.billingstreetAddress || " Chicago, USA"},{" "}
                  {billingData?.billingcity} ,{billingData?.billingstate},{" "}
                  {billingData?.billingcountry}
                </p>
                <p>
                  <strong>ZIPCODE: </strong> {billingData?.billingzipcode}
                </p>
                <button type="btn" className="btn-select ">
                  SELECT ADDRESS
                </button>
              </div>

              <div className="address-box">
                <p>
                  <strong>SHIPPING ADDRESS :</strong>{" "}
                  {shippingData?.shippingstreetAddress || " Chicago, USA"},{" "}
                  {shippingData?.shippingcity} ,{shippingData?.shippingstate},{" "}
                  {shippingData?.shippingcountry}
                </p>
                <p>
                  <strong>ZIPCODE :</strong> {shippingData?.shippingzipcode}
                </p>
                <button type="btn" className="btn-select ">
                  SELECT ADDRESS
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <h2 className="fs-2 text py-3">Your order</h2>

            <table className="table w-full mb-8">
              <thead>
                <tr className="p-3 m-3">
                  <th
                    scope="col"
                    colspan="2"
                    className="p-10 m-4 px-10 border-b-4 w-1/2"
                  >
                    Product
                  </th>
                  <th scope="col" className="p-8 m-4"></th>
                  <th scope="col" className="p-4 m-4">
                    Quantity
                  </th>
                  <th scope="col" className="p-4 m-4">
                    Price
                  </th>
                </tr>
              </thead>

              <tbody className="p-4 m-6 px-7 border-b-4">
             
                    <tr className="p-4 m-4 px-7 border-b-4">
                      <td className="p-4 m-4 px-7 border-b-4 w-1/2" colspan="2">
                        {data?.title}
                      </td>
                      <td className="p-4 m-4 px-7 border-b-4"></td>
                      <td className="p-4 m-4 px-7 border-b-4">{data?.qty}</td>
                      <td className="p-4 m-4 px-7 border-b-4">${data?.price}</td>
                    </tr>

                <tr className="p-4 m-4 px-7 border-b-4">
                  <td className="p-4 m-4 px-7 border-b-4 w-1/2" colspan="2">
                    <p className="text-orange-600">Coupon(0%)</p>
                    <p className="text-green-600">tax</p>
                  </td>
                  <td className="p-4 m-4 px-7 border-b-4"></td>
                  <td className="p-4 m-4 px-7 border-b-4"></td>
                  <td className="p-4 m-4 px-7 border-b-4 text-green-600">
                    <p className="text-orange-600">-$0</p>
                    <p className="text-green-600">+$24</p>
                  </td>
                </tr>
                <tr className="p-4 m-4 px-7 mb-8 border-b-4">
                  <td className="p-4 m-4 px-7 w-1/2" colspan="2">
                    You Pay
                  </td>
                  <td className="p-4 m-4 px-7 border-b-4"></td>
                  <td className="p-4 m-4 px-7"></td>
                  <td className="p-4 m-4 px-7 border-b-4">-$123456</td>
                </tr>
              </tbody>
            </table>

            <div className="text-center border-4">
              <p>
                Your personal details will be used to process your order,
                support your experience throughout this website
              </p>
              <button className="px-5 py-3 m-3 w-2/3 bg-orange-500 rounded-lg text-white">
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Checkout;
