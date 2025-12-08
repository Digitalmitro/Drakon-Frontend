import React, { useState, useEffect } from "react";
import { useProduct } from "../context/ProductContext";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { addItem } from "../Redux/CartSlice";
import axios from "axios";
import { message } from "antd";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";


function Shop() {
  const { getAllShopProduct } = useProduct();
  const [sunglasses, setSunglasses] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500);
  const dispatch = useDispatch();
  const token = Cookies.get("token");
  const decodedToken = token && jwtDecode(token);
  const user_id = decodedToken?._id;
  const navigate = useNavigate();

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


  const handleCart = async (id) => {
    console.log("handleCart called");
    const topProduct = currentProducts.find((item) => item._id === id);

    if (!topProduct) {
      console.error("Product not found");
      return;
    }

    // item shape for both guest & logged-in
    const cartItem = {
      productId: {
        _id: topProduct._id,
        title: topProduct.title,
        price: topProduct.price,
        image: topProduct.image,
        stock: topProduct.stock,
      },
      quantity: 1,
      total: topProduct.price * 1,
    };

    if (user_id) {
      // logged-in: hit server
      dispatch(addItem(topProduct));
      try {
        await axios.post(`https://api.drakon-sports.com/api/add`, {
          image: topProduct.image,
          title: topProduct.title,
          price: topProduct.price,
          quantity: 1,
          productId: topProduct._id,
          userId: user_id,
        });
        message.success("Added to Cart");
        setTimeout(() => navigate("/cart"), 500);
      } catch (error) {
        console.error(error);
        message.error("Cart item not added");
      }
    } else {
      // guest: write to localStorage
      const guestCart = JSON.parse(localStorage.getItem("guest_cart") || "[]");
      const existing = guestCart.find(
        (i) => i.productId._id === topProduct._id
      );
      if (existing) {
        existing.quantity += 1;
        existing.total = existing.quantity * topProduct.price;
      } else {
        guestCart.push(cartItem);
      }
      localStorage.setItem("guest_cart", JSON.stringify(guestCart));
      message.success("Added to Cart");
      setTimeout(() => navigate("/cart"), 500);
    }
  };


  return (
    <div className="pt-20 flex flex-wrap lg:flex-row">
      <Helmet>
        <title>Shop Premium Baseball Gear Online | Drakon Sports Apparel</title>
        <meta
          name="description"
          content="Dive into a passion for baseball and shop premium baseball gear online at Drakon Sports. Our products are crafted specially for game lovers."
        />
        <meta
          name="keywords"
          content="Baseball Accessories Online,
          Baseball Gloves Online,
          Baseball Lifestyle Apparel,
          Baseball Sunglasses,
          Baseball Batting Gloves,
          Pro Batting Gloves,
          Baseball Equipment,
          Baseball Apparel,
          Baseball Clothing,
          Baseball t-shirts,
          Baseball Outfits,
          Custom baseball jerseys,
          baseball gear,
          Baseball gear shop,
          baseball clothing online"
        />
        <link rel="canonical" href={`https://drakon-sports.com/shop`} />
      </Helmet>
      {/* Product Display */}
      <div className="flex flex-wrap justify-center lg:gap-8 pt-4 w-full">
        {currentProducts.length > 0 ? (
          currentProducts.map((e) => (
            <div key={e._id} className="lg:h-[500px] h-[440px]">
              <div className="shadow-lg rounded-lg w-full lg:w-[360px] bg-white flex flex-col justify-between p-2 hover:shadow-xl transition-all duration-300 relative">
                {/* LIMITED Badge - Added like in second UI */}
                <div className="absolute bg-zinc-800 text-white text-base font-bold px-2 py-1 rounded-md uppercase ml-4 mt-2 z-10">
                  LIMITED
                </div>

                {/* Product Image - Updated to match second UI */}
                <Link
                  to={`/productDetails/${e._id}`}
                  className="bg-[#dddfe0] rounded-md overflow-hidden flex justify-center items-center h-[240px] lg:h-[270px]"
                >
                  <img
                    src={e.image?.[0]}
                    alt="Product"
                    className="object-contain h-full w-full"
                  />
                </Link>

                {/* Product Info - Updated to match second UI */}
                <div className="mt-4 px-1 flex flex-col gap-1">
                  <Link
                    to={`/productDetails/${e._id}`}
                    className=""
                  >
                    <h3 className="font-semibold text-black text-[1.3rem] leading-tight">
                      {e.description.length > 35
                        ? `${e.description.slice(0, 35)}...`
                        : e.description}
                    </h3>
                  </Link>

                  <h4 className="text-[#4b4b4b] font-bold text-[1.5rem]">
                    $ {e.price}
                  </h4>
                </div>

                {/* Buttons - Added like in second UI */}
                <div className="flex mt-3 gap-2">
                  <button className="bg-[#0f172a] text-white text-lg font-medium py-2 px-2 rounded w-full hover:bg-[#1e293b] transition" onClick={() => handleCart(e._id)}>
                    Add to cart
                  </button>
                  <Link
                    to={`/productDetails/${e._id}`}
                    className="bg-[#f97316] text-white text-lg font-medium py-2 lg:pl-8 pl-10 rounded w-full hover:bg-[#ea580c] transition"
                  >
                    QUICK VIEW
                  </Link>
                </div>
              </div>
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
                className={`px-4 py-2 border rounded-md ${currentPage === index + 1
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
              various sports products at Drakon Sports Apparel—from pro batting
              gloves to baseball accessories online, we've got everything for
              all the baseball enthusiasts. From custom baseball jerseys to
              baseball batting gloves—our baseball gear shop ensures premium
              quality products suitable for new and pro game players.
            </p>
            <p>
              Each and every product in our shop is crafted with premium
              materials that prioritize comfort, durability, and style. Whether
              you are searching for baseball t-shirts, sunglasses, or gloves,
              our baseball gear shop has all the collection of apparel and
              necessities you need for the game. Not only this, but you can also
              purchase custom apparel solutions for fitness groups, teams, and
              organizations looking to represent their brand with quality gear.
              Enjoy the fast blend of fashion and style with Drakon Sports
              Apparel.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shop;
