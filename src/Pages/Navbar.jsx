import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import draglogo from "../assets/drag-logo.png";
import logo4 from "../assets/logo4.jpg";

const Navbar = () => {
  const [show, setShow] = useState(true);
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [load, setLoad] = useState(false);

  let lastScrollY = window.scrollY;
  console.log("data", data);
  const getData = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/products`
      );
      setData(res.data);
      setLoad(true);

      // Extract unique categories
      const uniqueCategories = [
        ...new Set(res.data.map((item) => item.category)),
      ];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoad(true);
    }
  };

  const controlNavbar = () => {
    if (window.scrollY > lastScrollY) {
      setShow(false);
    } else {
      setShow(true);
    }
    lastScrollY = window.scrollY;
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, []);

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className={`navbar ${show ? "show" : "hide"}`}>
        <div className="top-heading">
          <p style={{ color: "#fff", paddingTop: "10px", fontSize: "0.9rem" }}>
            Shop Our Fall Buying Guide: <u>Gear Up</u>
          </p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            color: "#222",
          }}
        >
          <div className="navbar-left p-3">
            <NavLink to={"/"}>
              <img src={draglogo} alt="Logo" className="navbar-logo" />
            </NavLink>
          </div>
          <div className="navbar-right">
            <div className="first">
              <div className="input-nav-search flex">
                <input
                  style={{ border: "none" }}
                  type="text"
                  placeholder="Search..."
                />

                <svg
                  viewBox="0 0 24 24"
                  width="26px"
                  height="26px"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M14.9536 14.9458L21 21M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                      stroke="#000000"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                </svg>
              </div>
              <a className="mx-3" href="#contact">

                <p>
                Our Brands  </p> <span>
                  
                </span>
              </a>
              <NavLink className="mx-3" to="/login">  <p>
                My Accounts  </p>
              </NavLink>
              <NavLink className="mx-3" to="/cart">
                {" "}  <p>
                Cart{" "}  </p>
              </NavLink>
              <NavLink className="mx-3" to="/">
                {" "}  <p>
                home{" "}  </p>
              </NavLink>
            </div>
            <div className="second">
              <img
                src={logo4}
                style={{ width: "40px", height: "30px" }}
                alt=""
              />
              {categories?.map((categoryName, index) => (
                <NavLink
                  key={index}
                  to={`/category/${encodeURIComponent(categoryName)}`}
                  className="mx-2"
                >
                  {categoryName}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
