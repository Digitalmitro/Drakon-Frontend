import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import Payment from "../assets/method.png";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import product1 from "../assets/pad.png";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { addItem } from "../Redux/CartSlice";

const Productdetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = Cookies.get("token");
  const decodedToken = token && jwtDecode(token);
  const user_id = decodedToken?._id;

  const [data, setData] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
    getAllProductData();
  }, []);

  const getAllProductData = async () => {
    try {
      const productRes = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/products/${id}`
      );
      setData(productRes.data);
      setSelectedImage(productRes.data.image?.[0] || null);
    } catch (err) {
      console.error(err);
    }
  };

  const ratingChanged = (newRating) => {
    // ...
  };

  const handleCart = async () => {
    if (!data) return;

    // item shape for both guest & logged-in
    const cartItem = {
      productId: {
        _id: data._id,
        title: data.title,
        price: data.price,
        image: data.image,
        stock: data.stock,
      },
      quantity,
      total: data.price * quantity,
    };

    if (user_id) {
      // logged-in: hit server
      dispatch(addItem(data));
      try {
        await axios.post(
          `${import.meta.env.VITE_BACKEND_API}/api/add`,
          {
            image: data.image,
            title: data.title,
            price: data.price,
            quantity,
            productId: data._id,
            userId: user_id,
          }
        );
        message.success("Added to Cart");
        setTimeout(() => navigate("/cart"), 500);
      } catch (error) {
        console.error(error);
        message.error("Cart item not added");
      }
    } else {
      // guest: write to localStorage
      const guestCart =
        JSON.parse(localStorage.getItem("guest_cart") || "[]");
      const existing = guestCart.find(
        (i) => i.productId._id === data._id
      );
      if (existing) {
        existing.quantity += quantity;
        existing.total = existing.quantity * data.price;
      } else {
        guestCart.push(cartItem);
      }
      localStorage.setItem("guest_cart", JSON.stringify(guestCart));
      message.success("Added to Cart");
      setTimeout(() => navigate("/cart"), 500);
    }
  };

  return (
    <>
      <div className=" w-full max-w-1200 max-auto px-4">
        <div className="row productDetails ">
          <div className="col-6 flex flex-col items-center ">
            {/* Centering the Main Image */}
            <div className="lg:w-[500px] border-b lg:h-[500px] w-[300px] h-[300px] flex flex-col justify-center items-center overflow-hidden">
              {/* <p className="text-gray-300">move cursor on the image to zoom</p> */}
              <img
                src={selectedImage || data?.image?.[0]}
                className="lg:max-w-[300px] lg:max-h-[300px] object-contain transition-transform duration-300 ease-in-out hover:scale-125"
              />
            </div>

            {/* Thumbnail Images */}
            <div className="flex lg:gap-4 overflow-x-auto">
              {data?.image.map((img, i) => (
                <div
                  key={i}
                  className="w-[80px] h-[80px] lg:w-[120px] lg:h-auto p-2 flex justify-center items-center "
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

          <div className="col-6 pt-32">
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
              <div className="product-counter d-flex gap-3 py-4">
                {/* quantity controls */}
                <div className="d-flex gap-3">
                  <button
                    onClick={() => setQuantity((p) => Math.max(1, p - 1))}
                    disabled={quantity === 1}
                  >
                    –
                  </button>
                  <span>{quantity}</span>
                  <button onClick={() => setQuantity((p) => p + 1)}>+</button>
                </div>

                {/* Buy Now / Add to Cart both go through handleCart */}
                <div className="d-flex" style={{ gap: "25px" }}>
                  <button
                    className="btn rounded-2xl text-white bg-[#ff5B00]"
                    onClick={handleCart}
                  >
                    Buy Now
                  </button>
                  <button
                    className="btn bg-[#ff0024] rounded-2xl text-white"
                    onClick={handleCart}
                  >
                    Add to Cart
                  </button>
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
