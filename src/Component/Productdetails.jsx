import ReactStars from "react-rating-stars-component";
import Payment from "../assets/method.png";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import product1 from "../assets/pad.png";
import { useEffect } from "react";
import { useState } from "react";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { addItem } from "../Redux/CartSlice";

const Productdetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = Cookies.get("token");
  const decodedToken = token && jwtDecode(token);
  const user = decodedToken?.email;
  const user_id = decodedToken?._id;
  const [data, setData] = useState();
  let defaultImage = data?.image.map((img) => img?.[0]);
  // console.log("ghtghytuh",data)
  const [selectedImage, setSelectedImage] = useState(defaultImage);
  // console.log("show the first image",defaultImage)
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
    getAllProductData();
  }, []);

  const ratingChanged = (newRating) => {
    setRating(newRating);
    // console.log("newRating", newRating);
  };

  const navigateToLogin = () => {
    navigate("/account");

    message.success("please Login");
  };

  const getAllProductData = async () => {
    // try {
    //   const feature = await axios.get(
    //     `${import.meta.env.VITE_BACKEND_API}/products/${id}`
    //   );
    //   // fetchProducts = invRes.data
    //   // console.log("get product by id", feature);
    //   setData(feature.data);
    //   // console.log("invRes", data);
    // } catch (err) {
    //   console.log(err);
    // }

    try {
      const productRes = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/products/${id}`
      );

      setData(productRes.data);
      // console.log("productRes", data);
    } catch (err) {
      console.log(err);
    }


    // setData(res.data);
  };
  // console.log("allProduct", allProduct);

  const handleCart = async (e) => {
    dispatch(addItem(e));
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/api/add`,
        {
          image: data?.image,
          title: data?.title,
          price: data?.price,
          quantity: quantity,
          productId: id,
          userId: user_id,
        }
      );
      message.success("Added to Cart");

      setTimeout(() => {
        window.location.href = "/cart";
        // navigate(`/cart`)
      }, 500);
      console.log("cart data post", response);
    } catch (error) {
      console.error(error);
      message.success("cartItem not added");
    }
  };

  // const [cartData, setCartData] = useState([]);
  // async function getCartData() {
  //   try {
  //     const { data } = await axios.get(
  //       `${import.meta.env.VITE_BACKEND_API}/wishlist/${user_id}`
  //     );
  //     setCartData(data.wishlist);
  //     console.log("get cart data", cartData);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  let isProductInCart;

  // useEffect(() => {
  //   // getCartData();
  //   isProductInCart = cartData?.find((e) => e.product_id === id);
  //   // console.log("isProductInCart", isProductInCart)
  // }, [data]);

  // console.log("duct", data);

  return (
    <>
      <div className="pt-32 w-full max-w-1200 max-auto px-4">
        <div className="row productDetails">
          <div className="col-6 flex flex-col items-center ">
            {/* Centering the Main Image */}
            <div className="lg:w-[500px] lg:h-[500px] w-[300px] h-[300px] flex justify-center items-center">
              <img
                src={selectedImage || data?.image?.[0]}
                className=" w-full h-full object-conatin"
              />
            </div>

            {/* Thumbnail Images */}
            <div className="flex lg:gap-4 overflow-x-auto">
              {data?.image.map((img, i) => (
                <div
                  key={i}
                  className="w-[100px] h-[100px]  p-2 flex justify-center items-center "
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-conatin"
                    onClick={() => setSelectedImage(img)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="col-6">
            <div className="details ">
              <h3 className="fs-1 text fw-normal">{data?.title}</h3>
              <h5 className="pb-4 mt-1">
                <b>Category: {data?.category}</b>
              </h5>
              <p className="fw-bold" style={{ color: "#61ce70" }}>
                <span
                  style={{
                    fontSize: "30px",
                    color: "#858484",
                    fontWeight: "500",
                  }}
                >
                  ${data?.price}
                </span>{" "}
                {data?.stock > 0 ? (
                  <p>IN STOCK</p>
                ) : (
                  <p style={{ color: "grey" }}>OUT OF STOCK</p>
                )}
              </p>
            </div>
            <ReactStars
              count={5}
              onChange={ratingChanged}
              size={30}
              isHalf={true}
              value={4}
              color="#ccc"
              activeColor="#ffd700"
            />

            {(data?.stock || data?.stock > 0) && (
              <div class="product-counter d-flex  gap-3 py-4">
                <div className="d-flex gap-3 ">
                  <button
                    id="decrease"
                    onClick={() => setQuantity((prev) => prev - 1)}
                    disabled={quantity === 1}
                  >
                    -
                  </button>

                  <span id="count">{quantity}</span>
                  <button
                    id="increase"
                    onClick={() => setQuantity((prev) => prev + 1)}
                  >
                    +
                  </button>
                </div>

                <div className="d-flex" style={{ gap: "25px" }}>
                  <button
                    type="submit"
                    className="btn rounded-2xl text-white bg-[#ff5B00] "
                    onClick={() => navigate(`/checkout/${id}`,{ state: { quantity } })}
                  >
                    Buy Now
                  </button>

                  {isProductInCart ? (
                    <button
                      type="submit"
                      className="btn bg-[#ff0024] rounded-2xl text-white"
                      onClick={() => navigate(`/cart`)}
                    >
                      Add to Cart
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="btn bg-[#ff0024] rounded-2xl text-white"
                      onClick={
                        user_id ? () => handleCart(data) : navigateToLogin
                      }
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            )}

            <div className="method">
              <img src={Payment} style={{ zoom: "1.1" }} />
            </div>
          </div>
        </div>
      </div>

      <section>
        <nav>
          <div style={{ borderBottom: "1px solid #dee2e6" }} className="mt-4">
            <div
              className="nav nav-tabs"
              id="nav-tab"
              role="tablist"
              style={{ width: "90%", margin: "auto" }}
            >
              <button
                className="nav-link active tabs-btn"
                id="nav-home-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-home"
                type="button"
                role="tab"
                aria-controls="nav-home"
                aria-selected="true"
              >
                DESCRIPTION
              </button>
              <button
                className="nav-link tabs-btn2"
                id="nav-profile-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-profile"
                type="button"
                role="tab"
                aria-controls="nav-profile"
                aria-selected="false"
              >
                REVIEWS
              </button>
            </div>
          </div>
        </nav>
        <div
          className="tab-content"
          id="nav-tabContent"
          style={{ width: "90%", margin: "auto", padding: "40px " }}
        >
          <div
            className="tab-pane fade show active"
            id="nav-home"
            role="tabpanel"
            aria-labelledby="nav-home-tab"
          >
            <h2 className="fs-2 text">DESCRIPTION</h2>
            <p className="pb-4"> {data?.description}</p>
          </div>
          <div
            className="tab-pane fade"
            id="nav-profile"
            role="tabpanel"
            aria-labelledby="nav-profile-tab"
          >
            <h2 className="fs-2 text">REVIEWS</h2>
          </div>
        </div>
      </section>
    </>
  );
};
export default Productdetails;
