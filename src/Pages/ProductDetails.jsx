import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import DotLoader from "react-spinners/DotLoader";
import Layout from "./Layout";
import paypic from "../assets/paypic.png";
import "../Components/styles/products.css";
import productImage from "../assets/slide-img4.jpg";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("description");
  const [cartCount, setCartCount] = useState(0); // Dynamic cart count
  const [message, setMessage] = useState(""); // Feedback message
  const [quantity, setQuantity] = useState(1); // Track product quantity
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_API}/products/${id}`
        );
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Function to add product to wishlist
  const addToCart = async () => {
    try {
      const wishlistData = {
        image: product.image[0],
        title: product.title,
        price: product.price,
        qty: quantity, // Send the selected quantity in payload
        product_id: product._id,
      };

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/wishlist`,
        wishlistData,
        { headers: { token } }
      );

      if (response.status === 200) {
        setMessage("Product added to cart");
        setCartCount(cartCount + 1); // Increment cart count
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      navigate("/login");
      setMessage("Failed to add product to cart");
    }
  };

  // Function to handle quantity change
  const handleQuantityChange = (action) => {
    if (action === "increment") {
      setQuantity((prevQty) => prevQty + 1);
    } else if (action === "decrement") {
      setQuantity((prevQty) => (prevQty > 1 ? prevQty - 1 : prevQty));
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <DotLoader color="#c75840" size={60} />
      </div>
    );
  }

  return (
    <Layout>
      {message && <p className="feedback-message">{message}</p>}{" "}
      {/* Feedback message */}
      {!product ? (
        <div className="productDetails container">
          {/* Placeholder when product is not loaded */}
          <div className="left-div">
            <img src={productImage} alt="Products-image" />
            <div className="tabs">
              <button
                onClick={() => setActiveTab("description")}
                className={`tab-button ${
                  activeTab === "description" ? "active" : ""
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`tab-button ${
                  activeTab === "reviews" ? "active" : ""
                }`}
              >
                Reviews
              </button>
              <div className="tab-content">
                {activeTab === "description" && (
                  <p>Products Gloves for good grip...</p>
                )}
                {activeTab === "reviews" && <p>No reviews available.</p>}
              </div>
            </div>
          </div>

          <div className="right-div">
            <h3>Sports Gloves</h3>
            <p>
              <strong style={{ opacity: "0.8" }}>Category:</strong> Sports
            </p>
            <p className="price">$7000</p>

            <p
              className={`stock-status ${
                product?.stock.length === 0 ? "out-of-stock" : "in-stock"
              }`}
            >
              {product?.stock.length === 0 ? "Out of Stock" : "In Stock"}
            </p>
            <div className="rating">
              <p>Rating: {"★★★★★".slice(0, 4.5)}4.5</p>
            </div>
            <div className="quantity-controls">
              <button onClick={() => handleQuantityChange("decrement")}>-</button>
              <span>{quantity}</span>
              <button onClick={() => handleQuantityChange("increment")} className="mx-2">
                +
              </button>
            </div>
            <div className="d-flex gap-4">
              <button className="buynow-button">Buy Now</button>

              <button className="add-to-cart-button" onClick={addToCart}>
                Add to Cart
              </button>
            </div>
            <img
              className="my-5"
              style={{ width: "100%" }}
              src={paypic}
              alt=""
            />
          </div>
        </div>
      ) : (
        <div className="productDetails container">
          <div className="left-div">
            <img src={product.image[0]} alt={product.title} />
            <div className="tabs">
              <button
                onClick={() => setActiveTab("description")}
                className={`tab-button ${
                  activeTab === "description" ? "active" : ""
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`tab-button ${
                  activeTab === "reviews" ? "active" : ""
                }`}
              >
                Reviews
              </button>
              <div className="tab-content">
                {activeTab === "description" && <p>{product.description}</p>}
                {activeTab === "reviews" && <p>No reviews available.</p>}
              </div>
            </div>
          </div>

          <div className="right-div">
            <h3>{product.title}</h3>
            <p>
              <strong style={{ opacity: "0.8" }}>Category:</strong>{" "}
              {product.category}
            </p>
            <p className="price">${product.price}</p>

            <p
              className={`stock-status ${
                product.stock.length === 0 ? "out-of-stock" : "in-stock"
              }`}
            >
              {product.stock.length === 0 ? "Out of Stock" : "In Stock"}
            </p>
            <div className="rating">
              <p>
                Rating: {"★★★★★".slice(0, product.rating)}
                {product.rating}
              </p>
            </div>
            <div className="quantity-controls">
              <button onClick={() => handleQuantityChange("decrement")}>-</button>
              <span>{quantity}</span>
              <button onClick={() => handleQuantityChange("increment")} className="mx-2">
                +
              </button>
            </div>
            <div className="d-flex gap-4">
              <button className="buynow-button">Buy Now</button>

              <button className="add-to-cart-button" onClick={addToCart}>
                Add to Cart
              </button>
            </div>
            <img
              className="my-5"
              style={{ width: "100%" }}
              src={paypic}
              alt=""
            />
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ProductDetails;
