import { useState } from "react";
import pad2 from "../assets/pad2.png";
import RangeSlider from "./rangeSlider"
import { Link } from "react-router-dom";

const Product = () => {

    const [minPrice, setMinPrice] = useState(2500);
  const [maxPrice, setMaxPrice] = useState(8500);

  const handleMinPriceChange = (e) => {
    const newMinPrice = parseInt(e.target.value);
    if (newMinPrice >= 0 && newMinPrice <= maxPrice - 500) {
      setMinPrice(newMinPrice);
    }
  };

  const handleMaxPriceChange = (e) => {
    const newMaxPrice = parseInt(e.target.value);
    if (newMaxPrice >= minPrice + 500 && newMaxPrice <= 10000) {
      setMaxPrice(newMaxPrice);
    }
  };

  return (
    <>
      <section>
        <div className="container-fliud">
          <div className="row">
            <div className="col-md-3">
              <div className="sidebar p-3 bg-light">
                <div className="mb-3">
                  <label
                    for="searchBox"
                    className="form-label"
                    style={{ fontWeight: "600", fontSize: "20px" }}
                  >
                    Search
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="searchBox"
                    placeholder="Search products..."
                  />
                </div>

                <div className="mb-3 py-2">
                  <h3
                    style={{
                      fontWeight: "600",
                      fontSize: "20px",
                      padding: ".9rem 0",
                    }}
                  >
                    Categories
                  </h3>
                  <div className="list-group">
                    <a
                      href="#"
                      className="list-group-item list-group-item-action"
                    >
                      Electronics
                    </a>
                    <a
                      href="#"
                      className="list-group-item list-group-item-action"
                    >
                      Fashion
                    </a>
                    <a
                      href="#"
                      className="list-group-item list-group-item-action"
                    >
                      Home & Kitchen
                    </a>
                    <a
                      href="#"
                      className="list-group-item list-group-item-action"
                    >
                      Books
                    </a>
                    <a
                      href="#"
                      className="list-group-item list-group-item-action"
                    >
                      Sports
                    </a>
                  </div>
                </div>

                
                <div className="price-input-container">
        <div className="slider-container">
          <div
            className="price-slider"
            style={{
              width: `${((maxPrice - minPrice) / 10000) * 100}%`,
              left: `${(minPrice / 10000) * 100}%`,
            }}
          ></div>
        </div>
      </div>
      <div className="range-input">
        <input
          type="range"
          className="min-range"
          min="0"
          max="10000"
          value={minPrice}
          step="1"
          onChange={handleMinPriceChange}
        />
        <input
          type="range"
          className="max-range"
          min="0"
          max="10000"
          value={maxPrice}
          step="1"
          onChange={handleMaxPriceChange}
        />
      </div>
      <div className="price-input">
        <div className="price-field">
          <input
            type="number"
            className="min-input"
            value={minPrice}
            onChange={handleMinPriceChange}
          />
        </div>
        <div className="price-field">
          <input
            type="number"
            className="max-input"
            value={maxPrice}
            onChange={handleMaxPriceChange}
          />
        </div>
      </div>
               

                <div>
                  <select
                    style={{
                      width: "100%",
                      padding: "10px",
                      margin: "10px 0",
                    }}
                  >
                    <option value="0">All Ratings</option>
                    <option value="4">4★ & above</option>
                    <option value="3">3★ & above</option>
                    <option value="2">2★ & above</option>
                    <option value="1">1★ & above</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="col-md-9 my-5">
              <div class="row ">
              
               <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
               <Link to={"/productDetails"}>  <div class="card h-100">
                    <img src={pad2} />
                    <div class="card-body">
                      <h5 class="card-title ">Wireless Headphones</h5>
                      <p class="card-text">$99.99</p>
                      <p class="card-text">
                        <span class="text-warning star">⭐⭐⭐⭐☆</span>
                      </p>
                    </div>
                  </div> </Link>
                </div>
              
            
                <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
                <Link to={"/productDetails"}>   <div class="card h-100">
                    <img src={pad2} />
                    <div class="card-body">
                      <h5 class="card-title">Smartwatch</h5>
                      <p class="card-text">$199.99</p>
                      <p class="card-text">
                        <span class="text-warning star">⭐⭐⭐⭐⭐</span>
                      </p>
                    </div>
                       </div>
                       </Link ></div>
               
               
                <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
                <Link to={"/productDetails"}> <div class="card h-100">
                    <img src={pad2} />
                    <div class="card-body">
                      <h5 class="card-title">Bluetooth Speaker</h5>
                      <p class="card-text">$49.99</p>
                      <p class="card-text">
                        <span class="text-warning star">⭐⭐⭐⭐☆</span>
                      </p>
                    </div>
                  </div>
               
                   </Link>  </div>
                <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
                <Link to={"/productDetails"}>

                  <div class="card h-100">
                    <img src={pad2} />
                    <div class="card-body">
                      <h5 class="card-title">Laptop Stand</h5>
                      <p class="card-text"> $29.99</p>
                      <p class="card-text">
                        <span class="text-warning star">⭐⭐⭐⭐☆</span>
                      </p>
                    </div>
                  </div>
             </Link>
             </div>

             <div class="col-lg-3 col-md-4 col-sm-6 mb-4">

             <Link to={"/productDetails"}>
                  <div class="card h-100">
                    <img src={pad2} />
                    <div class="card-body">
                      <h5 class="card-title">Smartphone</h5>
                      <p class="card-text">$699.99</p>
                      <p class="card-text">
                        <span class="text-warning star">⭐⭐⭐⭐⭐</span>
                      </p>
                    </div>
                  </div>
               
                </Link>
                </div>
                <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
                <Link to={"/productDetails"}>
                  <div class="card h-100">
                    <img src={pad2} />
                    <div class="card-body">
                      <h5 class="card-title">Tablet</h5>
                      <p class="card-text">$399.99</p>
                      <p class="card-text">
                        <span class="text-warning star">⭐⭐⭐⭐☆</span>
                      </p>
                    </div>
                  </div>
              
</Link>
</div>
<div class="col-lg-3 col-md-4 col-sm-6 mb-4">

<Link to={"/productDetails"}>
                  <div class="card h-100">
                    <img src={pad2} />
                    <div class="card-body">
                      <h5 class="card-title">Camera</h5>
                      <p class="card-text">$299.99</p>
                      <p class="card-text">
                        <span class="text-warning star">⭐⭐⭐⭐☆</span>
                      </p>
                    </div>
                  </div>
                
</Link>
</div>
                <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
                <Link to={"/productDetails"}>
                  <div class="card h-100">
                    <img src={pad2} />
                    <div class="card-body">
                      <h5 class="card-title">Gaming Console</h5>
                      <p class="card-text">$499.99</p>
                      <p class="card-text">
                        <span class="text-warning star">⭐⭐⭐⭐⭐</span>
                      </p>
                    </div>
                  </div>
                  </Link>
                </div>

                <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
                  <div class="card h-100">
                    <img src={pad2} />
                    <div class="card-body">
                      <h5 class="card-title">Fitness Tracker</h5>
                      <p class="card-text">$149.99</p>
                      <p class="card-text">
                        <span class="text-warning star">⭐⭐⭐⭐☆</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
                  <div class="card h-100">
                    <img src={pad2} />
                    <div class="card-body">
                      <h5 class="card-title">E-Reader</h5>
                      <p class="card-text">$129.99</p>
                      <p class="card-text">
                        <span class="text-warning star">⭐⭐⭐⭐☆</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
                  <div class="card h-100">
                    <img src={pad2} />
                    <div class="card-body">
                      <h5 class="card-title">Drone</h5>
                      <p class="card-text"> $799.99</p>
                      <p class="card-text">
                        <span class="text-warning star">⭐⭐⭐⭐⭐</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
                  <div class="card h-100">
                    <img src={pad2} />
                    <div class="card-body">
                      <h5 class="card-title">Smart Thermostat</h5>
                      <p class="card-text">$199.99</p>
                      <p class="card-text">
                        <span class="text-warning star">⭐⭐⭐⭐☆</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Product;
