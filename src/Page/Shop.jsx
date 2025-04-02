import React, { useState, useEffect } from "react";
import { useProduct } from "../context/ProductContext";
import { Link } from "react-router-dom";

function Shop() {
  const { getAllShopProduct } = useProduct();
  const [sunglasses, setSunglasses] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  useEffect(() => {
    const fetchSunglasses = async () => {
      const response = await getAllShopProduct();
      setSunglasses(response);
      setFilteredProducts(response);
    };
    fetchSunglasses();
  }, []);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500);
  const handleMinPriceChange = (e) => {
    const newMinPrice = parseInt(e.target.value);
    if (newMinPrice >= 0 && newMinPrice <= maxPrice - 10) {
      setMinPrice(newMinPrice);
    }
  };

  const handleNavigation = (category) => {
    if (!category) return;

    const filtered = sunglasses.filter(
      (product) => product.category === category
    );
    setFilteredProducts(filtered);
  };
  const handleMaxPriceChange = (e) => {
    const newMaxPrice = parseInt(e.target.value);
    if (newMaxPrice >= minPrice + 10 && newMaxPrice <= 500) {
      setMaxPrice(newMaxPrice);
    }
  };
  useEffect(() => {
    const filtered = sunglasses.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice
    );

    setFilteredProducts(filtered);
  }, [minPrice, maxPrice, sunglasses]);

  return (
    <div className="pt-20 flex flex-wrap lg:flex-row">
      {/* <div className="sidebar bg-light lg:w-[20%] w-full px-10 lg:px-0 lg:pl-4 ">
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
            <Link
              className="list-group-item list-group-item-action"
              onClick={() => handleNavigation("Sunglasses")}
            >
              Sunglasses
            </Link>
            <Link
              className="list-group-item list-group-item-action"
              onClick={() => handleNavigation("Batting-Gloves")}
            >
              Batting Gloves
            </Link>
            <Link
              className="list-group-item list-group-item-action"
              onClick={() => handleNavigation("Equipment")}
            >
              Equipment
            </Link>
            <Link
              className="list-group-item list-group-item-action"
              onClick={() => handleNavigation("Accessories")}
            >
              Accessories
            </Link>
            <Link
              className="list-group-item list-group-item-action"
              onClick={() => handleNavigation("Apparel")}
            >
              Apparel
            </Link>
            
          </div>
        </div>
        <div className="price-input-container">
          <div className="slider-container">
            <div
              className="price-slider"
              style={{
                width: `${((maxPrice - minPrice) / 500) * 100}%`,
                left: `${(minPrice / 500) * 100}%`,
              }}
            ></div>
          </div>
        </div>
        <div className="range-input">
          <input
            type="range"
            className="min-range"
            min="0"
            max="500"
            value={minPrice}
            step="1"
            onChange={handleMinPriceChange}
          />
          <input
            type="range"
            className="max-range"
            min="0"
            max="500"
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
      </div> */}
      {/* Product Display */}
      <div className="flex flex-wrap justify-center lg:gap-8 pt-4 w-full">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((e) => (
            <div key={e._id} className="h-[450px]">
              <Link to={`/productDetails/${e._id}`}>
                <div className="shadow-lg lg:h-[380px] w-[400px]  lg:w-[350px] rounded flex flex-col justify-between gap-6 bg-white p-2">
                  <div className="flex justify-center lg:w-full bg-[#dddfe0]">
                    <img
                      src={e.image?.[0]}
                      className="object-contain h-[250px] w-[100%]"
                      alt="Product"
                    />
                  </div>
                  <div className="h-full space-y-1 px-2">
                    <h3 className="font-semibold text-xl">
                      {e.description.length > 25
                        ? `${e.description.slice(0, 35)}...`
                        : e.description}
                    </h3>
                    <h4 className="text-[#959595] font-bold text-2xl">
                      $ {e.price}
                    </h4>
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-xl text-gray-500">No products found.</p>
        )}
      </div>
    </div>
  );
}

export default Shop;
