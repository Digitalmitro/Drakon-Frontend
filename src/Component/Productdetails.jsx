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

const Productdetails = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const [data, setData] = useState();
  const [quantity, setQuantity] = useState(1);

  const ratingChanged = (newRating) => {
    setRating(newRating);
    console.log("newRating", newRating);
  };

  const token = Cookies.get("token");
  const decodedToken = token && jwtDecode(token);
  const user = decodedToken?.email;
  const user_id = decodedToken?._id;
  

  const handleSubmit = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/products/${id}`
      );
      // console.log(response);

      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCart = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/wishlist`, {
          image: data?.image,
          title: data?.title,
          price: data?.price,
          qty: quantity, 
          product_id: id,
          user_id: user_id,
        }
      );
     message.success("Added to Cart")

      navigate(`/cart`)
      // console.log("wishlist", response);
    } catch (error) {
      console.error(error);
     message.success("cartItem not added")

    }
  };
  
  
  useEffect(() => {
    handleSubmit();
 
  }, []);

  
  const [cartData, setCartData] = useState([]);
  async function getCartData() {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_SOME_KEY}/wishlist/${user_id}`
      );
      setCartData(data.wishlist);
    } catch (error) {
      console.log(error);
    }
  }
  let isProductInCart 
  useEffect(() => {
    getCartData()
     isProductInCart = cartData?.find((e) => e.product_id === id);
    // console.log("isProductInCart", isProductInCart)
  }, [data]);


  return (
    <>
      <div className="container my-5">
        <div className="row">
          <div className="col-6">
            <img src={data?.image[0]} />
          </div>
          <div className="col-6">
            <div className="details">
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
                IN STOCK
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

            <div class="product-counter d-flex gap-3 py-4">
              <button id="decrease" onClick={() => setQuantity(prev => prev-1)} disabled={quantity === 1}>-</button>

              <span id="count" >{quantity}</span>
              <button id="increase" onClick={() => setQuantity(prev => prev+1)}>+</button>

              <div className="d-flex" style={{ gap: "25px" }}>
                <button type="submit" className="btn btn-primary orange" onClick={() => navigate(`/checkout/${id}`)}>
                  Buy Now
                </button>

               {isProductInCart ? 
                <button type="submit" className="btn btn-primary black" onClick={() => navigate("/cart")}>
                Add to whishlist
              </button> : 
               <button type="submit" className="btn btn-primary black" onClick={
                user_id
                  ? handleCart
                  : () => {
                      navigate("/Login");
                    }
              }>
               Add to whishlist
             </button>}
              </div>
            </div>
            <div className="method">
              <img src={Payment} style={{ zoom: "1.1" }} />
            </div>
          </div>
        </div>
      </div>

      <section>
        <nav>
          <div style={{ borderBottom: "1px solid #dee2e6" }}>
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
            <p>
              {data?.review[0] || "No Reviews yet"}
            </p>
          </div>
        </div>
      </section>
    </>
  );
};
export default Productdetails;
