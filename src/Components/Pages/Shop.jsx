import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // For fetching products
import "../../css/shop.css";
import Navbar from "./Navbar";
import { productData, productData2, productData3 } from "./data";

const Shop = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from an API
    axios
      .get(`${import.meta.env.VITE_BACKEND_API}/api/products`) // Replace with your API
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // Dummy filter states
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [rating, setRating] = useState(0);

  // Handler for category change
  const handleCategoryChange = (e) => setCategory(e.target.value);

  // Handler for price range change
  const handlePriceRangeChange = (e) => {
    const { name, value } = e.target;
    setPriceRange((prevRange) => ({
      ...prevRange,
      [name]: value,
    }));
  };

  // Handler for rating change
  const handleRatingChange = (e) => setRating(e.target.value);

  return (
    <>
      <Navbar />
      <div className="shop-page">
        <h1>BATS</h1>
        <p>70 Results</p>
        <div className="filter-bar">
          <select value={category} onChange={handleCategoryChange}>
            <option value="">All Categories</option>
            <option value="wood">Wood</option>
            <option value="metal">Metal</option>
            <option value="composite">Composite</option>
          </select>
          <select
            name="min"
            value={priceRange.min}
            onChange={handlePriceRangeChange}
          >
            <option value="0">Min Price</option>
            <option value="10">10</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="500">500</option>
          </select>
          <select
            name="max"
            value={priceRange.max}
            onChange={handlePriceRangeChange}
          >
            <option value="1000">Max Price</option>
            <option value="100">100</option>
            <option value="200">200</option>
            <option value="500">500</option>
            <option value="1000">1000</option>
          </select>
          <select value={rating} onChange={handleRatingChange}>
            <option value="0">Rating</option>
            <option value="1">1 Star</option>
            <option value="2">2 Stars</option>
            <option value="3">3 Stars</option>
            <option value="4">4 Stars</option>
            <option value="5">5 Stars</option>
          </select>
        </div>
        <div className="product-grid">
          {productData2.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <Link
                  to={`/product/${product.id}`}
                  state={{ Product: product }}
                >
                  <img src={product.imageurl} alt={product.name} />
                </Link>
                {product.isNew && <span className="new-label">NEW</span>}
                {product.discountPrice && (
                  <span className="discount-label">SALE</span>
                )}
              </div>
              <h3>{product.name}</h3>
              <p>
                {product.discountPrice ? (
                  <span>
                    <span className="original-price">
                      {product.originalPrice}
                    </span>
                    <span className="discount-price">
                      {product.discountPrice}
                    </span>
                  </span>
                ) : (
                  <span>{product.price}</span>
                )}
              </p>
              <Link
                to={`/product/${product.id}`}
                state={{ Product: product }}
                className="view-details-btn"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
        <div
          style={{ display: "flex", width: "100%", justifyContent: "center" }}
        >
          <button className="load-more">MORE RESULTS</button>
        </div>
      </div>
    </>
  );
};

export default Shop;
