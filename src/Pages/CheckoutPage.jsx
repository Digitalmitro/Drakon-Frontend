import axios from "axios";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import Layout from './Layout';

import { message } from "antd";
const Checkout = () => {
  const token = Cookies.get("token");
  const decodedToken = token && jwtDecode(token);
  const userId = decodedToken?._id;
  const user = decodedToken?.email;
  const navigate = useNavigate();
  const [shippingData, setShippingData] = useState();
  const [billingData, setBillingData] = useState();

  const [cartData, setCartData] = useState();
  const [allProductData, setAllProductData] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [enableTax, setEnabletax] = useState();
  const [enableCurrency, setEnableCurrency] = useState();
  const [tax, setTax] = useState(0);
  const [taxValue, setTaxValue] = useState(0);
  const [coupon, setCoupon] = useState([]);
  const [enableCoupon, setEnableCoupon] = useState([]);
  const [couponName, setCouponName] = useState(""); // State variable for coupon percentage
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [finalPayment, setFinalPayment] = useState(0);
  const [deliveryAddress, setDeliveryAddress] = useState(null);

  useEffect(() => {
    getAddressData();
    handleProduct();
    // handleOrderPlaced()
  }, []);

  // Addrress
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
    console.log("shipping response:", shippingData);
    console.log("billing response:", billingData);
  };
  const handleAddAddress = () => {
    navigate("/profile?tab=1");
  };

  const DeliveryAddressbill = async () => {};

  const getAllProductData = async () => {
    try {
      const res1 = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/feature-products`
      );
      const featureProduct = res1.data;
      // fetchProducts = featureRes.data
      console.log("feature-data", featureProduct);

      const res2 = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/products`
      );
      const prodData = res2.data;

      const res3 = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/inv-products`
      );
      const invProduct = res3.data;
      setAllProductData([
        
        ...featureProduct,
        ...invProduct,
        ...prodData,
      ]);
    } catch (err) {
      console.log(err);
    }


  };
  // console.log("productDatat", allProductData);

  useEffect(() => {
    getAllProductData();
  }, []);


  // wishlist Products
  const handleProduct = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/wishlist/${userId}`
      );

      // console.log("response", response);

      setCartData(response.data.wishlist);
    } catch (error) {
      console.error(error);
    }
  };

  // Tax
  const getTax = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_API}/general-settings`
    );
    const ress = await axios.get(`${import.meta.env.VITE_BACKEND_API}/coupon`);
    setEnabletax(res.data[0].EnableTax);
    setEnableCoupon(res.data[0].EnableCoupon);
    setTax(res.data[0].TaxRate);
    setCoupon(ress.data);
    setEnableCurrency(res.data[0].Currency);
    if (enableTax) {
      let taxAmount = (subtotal * tax) / 100;
      let youPay = subtotal + taxAmount;
      setTaxValue(taxAmount);
      setFinalPayment(youPay);
    }
  };

  const applyCoupon = async () => {
    if (!enableCoupon) {
      message.error("coupon is not applicable");
      return;
    } else {
      const cpName = coupon?.find((e) => e.couponName === couponName);
      if (cpName) {
        let discoundAmount = await cpName?.discount;
        // await setCouponDiscount(cpName ? cpName?.discount : 0);

        if (discoundAmount) {
          let taxAmount = (subtotal * tax) / 100;

          let couponAmount = (subtotal * discoundAmount) / 100;
          let youPay = subtotal + taxAmount - couponAmount;

          setCouponDiscount(couponAmount);
          setFinalPayment(youPay);
          message.success("Coupon applied");
        } else {
          message.error("Discount is not Applied");
        }
      } else {
        message.error("Coupon Name is Invalid");
      }
    }
  };
  // console.log("couponDiscount", couponDiscount);

  // subtotal
  useEffect(() => {
    // Calculate subtotal whenever cartData changes
    const subTotal = cartData?.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    );
    setSubtotal(subTotal);
    getTax();
  }, [cartData]);

  // console.log("cartData", cartData);

  async function handleOrderPlaced() {
    await getAllProductData();

    try {
      const res = await axios.get("https://api.ipify.org");
      // Iterate through each item in the cart

      for (const item of cartData) {
        const payload = {
          image: item.image?.map((img) => img),
          title: item.title,
          price: item.price,
          qty: item.qty,
          billing: billingData,
          shipping: shippingData,
          product_id: item.product_id,
          user: "#" + Math.floor(Math.random() * 1000) + " " + user,
          user_id: userId,
          ip: res.data,
          createdDate: moment().format("MMM Do YY"),
          status: "Processing",
          totalpay: Number(finalPayment),
        };

        const orderedStock = allProductData.filter(
          (info) => info._id === item.product_id
        );


        console.log("orderedStock", orderedStock[0]._id);
        if(orderedStock[0].stock){
          const productPayload = {
            stock: orderedStock[0].stock - item.qty
         }
        if(orderedStock[0].type === 'products'){
          const productRes = await axios.put(
            `${import.meta.env.VITE_BACKEND_API}/products/${item.product_id}` , productPayload
          );
        }
        else  if(orderedStock[0].type === 'inventory'){
          const inventory = await axios.put(
            `${import.meta.env.VITE_BACKEND_API}/inv-products/${item.product_id}`, productPayload
          );
        }
        else{
          const feature = await axios.put(
            `${import.meta.env.VITE_BACKEND_API}/feature-products/${item.product_id}`, productPayload
          );
        }
        }

   
        console.log("payload", payload);
        // // Send a request to place the order
        await axios.post(`${import.meta.env.VITE_BACKEND_API}/order`, payload);

       
        // setLoaderPlacingOrder(true);
        // setTimeout(() => {
        //   setLoaderPlacingOrder(false);
        //   setCardOrderPlaced(true);
        // }, 5100);


        const rescartdelete = await axios.delete(
          `${import.meta.env.VITE_BACKEND_API}/wishlist/${item._id}`
        );

        // navigate("/tab");
        console.log(rescartdelete.data);
        handleProduct();
      }
        message.success("Product ordered");
         window.location.href = "/profile?tab=3";
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
    } catch (error) {
      console.error("Error placing order:", error);
    }
  }


  return (
    <>
<Layout>  
      <div
        className="container  d-flex align-items-center justify-content-center m-2 m-auto"
        // style={{ zoom: ".8" }}

      >
        <div
          className="row w-100 px-3 mt-5"
          style={{ display: "flex", gap: "7rem" }}
        >
          <div className="col-md-4 my-5">
            <h2 className="fs-2 text pb-3 ">ADDRESSES</h2>
            <div className="login-box">
              <button type="btn" className="btn-add" onClick={handleAddAddress}>
                ADD ADDRESS
              </button>
              {/* 
              <div className="address-box">
                <p>
                  <strong>BILLING ADDRESS: </strong>{" "}
                </p>
                <p>
                  {billingData
                    ? `${billingData?.billingstreetAddress}, 
                  ${billingData?.billingcity} ,${billingData?.billingstate}, 
                  ${billingData?.billingcountry}`
                    : "Add your billing  Address"}
                </p>
                <p>
                  <strong>ZIPCODE: </strong> {billingData?.billingzipcode}
                </p>
                <button type="btn" className="btn-select ">
                  SELECT ADDRESS
                </button>
              </div> */}

              <div className="address-box">
                <p>
                  <strong>SHIPPING ADDRESS :</strong>{" "}
                  {shippingData
                    ? `${shippingData?.shippingstreetAddress}, 
                  ${shippingData?.shippingcity} ,${shippingData?.shippingstate}, 
                  ${shippingData?.shippingcountry}`
                    : " Add your shipping address"}
                </p>
                <p>
                  <strong>ZIPCODE :</strong> {shippingData?.shippingzipcode}
                </p>
                {/* <button type="btn" className="btn-select ">
                  SELECT ADDRESS
                </button> */}
              </div>
            </div>

            <div
              className="login-box w-100 my-4"
              style={{ display: "flex", gap: "20px" }}
            >
              <input
                type="text"
                className="form-control  h-10"
                id="exampleFormControlInput1"
                placeholder=" Coupon Name "
                value={couponName}
                onChange={(e) => setCouponName(e.target.value)}
              />
              <button
                type="sumbit"
                className="btn btn-primary coupon-btn"
                style={{ backgroundColor: "coral" }}
                onClick={applyCoupon}
              >
                Apply coupon
              </button>
            </div>
          </div>

          <div className="col-md-6">
            <h2 className="fs-2 text ">YOUR ORDER</h2>

            <table className="table w-full ">
              <thead>
                <tr className="p-3 m-3">
                  <th
                    scope="col"
                    colspan="2"
                    className="p-4 px-2 m-4  border-b-4 w-1/2"
                  >
                    Product
                  </th>
                  <th scope="col" className="p-2 m-4"></th>
                  <th scope="col" className="p-4 m-4">
                    Quantity
                  </th>
                  <th scope="col" className="p-4 m-4">
                    Price
                  </th>
                </tr>
              </thead>

              <tbody className="p-4 m-6 px-7 border-b-4">
                {cartData?.map((info) => {
                  return (
                    <tr className="p-4 m-4 px-7 border-b-4">
                      <td className="p-4 m-4 px-7 border-b-4 w-1/2" colspan="2">
                        {info.title}
                      </td>
                      <td className="p-4 m-4 px-7 border-b-4"></td>
                      <td className="p-4 m-4 px-7 border-b-4">{info.qty}</td>
                      <td className="p-4 m-4 px-7 border-b-4">
                        {enableCurrency} {info.price * info.qty}
                      </td>
                    </tr>
                  );
                })}
                <tr className="p-4 m-4 px-7 border-b-4">
                  <td className="p-4 m-4 px-7 border-b-4 w-1/2" colspan="2">
                    <p className="pb-2 mb-4 ">Sub Total : </p>
                    <p className="text-orange-600  mb-2">Coupon : </p>

                    <p className="text-green-600  mb-2">tax</p>
                  </td>
                  <td className="p-4 m-4 px-7 border-b-4"></td>
                  <td className="p-4 m-4 px-7 border-b-4"></td>
                  <td className="p-4 m-4 px-7 border-b-4">
                    <p className="pb-2 mb-4">
                      {enableCurrency} {subtotal}
                    </p>
                    <p className="text-orange-600  mb-2">
                      -{enableCurrency} {couponDiscount}
                    </p>
                    <p className="text-green-600  mb-2">
                      +{enableCurrency} {taxValue}
                    </p>
                  </td>
                </tr>
                <tr className="p-4 m-4 px-7 mb-8 border-b-4">
                  <td className="p-4 m-4 px-7 w-1/2" colspan="2">
                    You Pay
                  </td>
                  <td className="p-4 m-4 px-7 border-b-4"></td>
                  <td className="p-4 m-4 px-7"></td>
                  <td className="p-4 m-4 px-7 border-b-4">
                    {enableCurrency} {finalPayment || subtotal}
                  </td>
                </tr>
              </tbody>
            </table>

            <p className="p-4 border  border-b-4">
              <span className="">
                <strong>Delivery Location : </strong>
              </span>
              {!shippingData ? (
                <span className="text-orange-500 ">
                  {" "}
                  ! Please Add Shipping Address
                </span>
              ) : (
                `${shippingData?.shippingstreetAddress} ${shippingData?.shippingzipcode}, 
                  ${shippingData?.shippingcity} ,${shippingData?.shippingstate}, 
                  ${shippingData?.shippingcountry}`
              )}
            </p>

            <div className="text-center border-4">
              <p>
                Your personal details will be used to process your order,
                support your experience throughout this website
              </p>

              <button
                className="px-5 py-3 m-3 w-2/3 bg-orange-500 rounded-lg text-white"
                disabled={!shippingData}
                style={{
                  backgroundColor: !shippingData ? "grey" : "coral",
                }}
                onClick={handleOrderPlaced}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
      </Layout>
    </>
  );
};
export default Checkout;
