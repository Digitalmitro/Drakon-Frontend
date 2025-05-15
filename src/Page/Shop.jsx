import React, { useState, useEffect } from "react";
import { useProduct } from "../context/ProductContext";
import { Link } from "react-router-dom";

function Shop() {
  const { getAllShopProduct } = useProduct();
  const [sunglasses, setSunglasses] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500);

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  useEffect(() => {
    const fetchSunglasses = async () => {
      const response = await getAllShopProduct();
      setSunglasses(response);
      setFilteredProducts(response);
    };
    fetchSunglasses();
  }, [getAllShopProduct]);

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
    setCurrentPage(1); // Reset to first page when filtering
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
    setCurrentPage(1); // Reset to first page when price range changes
  }, [minPrice, maxPrice, sunglasses]);

  return (
    <div className="pt-20 flex flex-wrap lg:flex-row">
      {/* Product Display */}
      <div className="flex flex-wrap justify-center lg:gap-8 pt-4 w-full">
        {currentProducts.length > 0 ? (
          currentProducts.map((e) => (
            <div key={e._id} className="h-[450px]">
              <Link to={`/productDetails/${e._id}`}>
                <div className="shadow-lg lg:h-[380px] w-[400px] lg:w-[350px] rounded flex flex-col justify-between gap-6 bg-white p-2">
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

      {/* Pagination */}
      {filteredProducts.length > 0 && (
        <div className="w-full flex justify-center my-8">
          <div className="flex items-center gap-2">
            <button
              className="px-4 py-2 border rounded-md disabled:opacity-50"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            >
              Previous
            </button>

            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                className={`px-4 py-2 border rounded-md ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}

            <button
              className="px-4 py-2 border rounded-md disabled:opacity-50"
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Added content section */}
      <div className="w-full px-4 lg:px-8 py-12 bg-white">
        <div className="max-w-6xl mx-auto text-justify">
          <h2 className="text-3xl font-bold text-center mb-8">
            Gear Up with Drakon Sports Apparel—Premium Quality Sportswear
          </h2>
          <div className="text-lg text-gray-700 space-y-4">
            <p>
              Welcome to the shop side of Drakon Sports Apparel. Purchase
              various sports products at Drakon Sports Apparel—from pro
              batting gloves to baseball accessories online, we've got
              everything for all the baseball enthusiasts. From custom
              baseball jerseys to baseball batting gloves—our baseball
              gear shop ensures premium quality products suitable for new
              and pro game players.
            </p>
            <p>
              Each and every product in our shop is crafted with premium
              materials that prioritize comfort, durability, and style.
              Whether you are searching for baseball t-shirts, sunglasses,
              or gloves, our baseball gear shop has all the collection of
              apparel and necessities you need for the game. Not only
              this, but you can also purchase custom apparel solutions for
              fitness groups, teams, and organizations looking to
              represent their brand with quality gear. Enjoy the fast
              blend of fashion and style with Drakon Sports Apparel.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shop;