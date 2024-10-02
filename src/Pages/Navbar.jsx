import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import draglogo from "../assets/drag-logo.png";
import logo4 from "../assets/logo4.jpg";
import { Button, Drawer } from "antd";
import menuImage from "../assets/7216128.png";
import "../Components/styles/navbar.css";
const Navbar = () => {
  const [show, setShow] = useState(true);
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [load, setLoad] = useState(false);
  const [modal, setModal] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  const token = localStorage.getItem("token");
  const showLoading = () => {
    setOpen(true);
    setLoading(true);

    // Simple loading mock. You should add cleanup logic in real world.
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  let lastScrollY = window.scrollY;
  // console.log("data", data);
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

  const getproducts = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/products`
      );
      setData(res.data);
      setLoad(true);

      // Extract unique categories

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
          <p style={{ color: "#fff" }}>
            Shop Our Fall Buying Guide: <u>Gear Up</u>
          </p>
        </div>
        <div
          className="nav-item"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            color: "#222",
          }}
        >
          <div className="navbar-left">
            <NavLink to={"/"}>
              <img src={draglogo} alt="Logo" className="navbar-logo" />
            </NavLink>
          </div>
          <div className="mobileView" onClick={showLoading}>
            <img className="menuImage" src={menuImage} alt="menu" />
          </div>
          <div className="navbar-right desktopView">
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
              <a className="mx-3 flex" href="/products">
                <p className="mt-1">Our Brands </p>
                <span className="mx-2 mt-1">
                  <svg
                    fill="#000000"
                    width="12px"
                    height="12px"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path d="M11.178 19.569a.998.998 0 0 0 1.644 0l9-13A.999.999 0 0 0 21 5H3a1.002 1.002 0 0 0-.822 1.569l9 13z"></path>
                    </g>
                  </svg>
                </span>
              </a>
              <NavLink
                className="mx-3 flex gap-2"
                to={token ? "/profile" : "/login"}
              >
                {" "}
                <span className="mt-1">{token ? "My Account" : "Login"}</span>
                <span className="">
                  <svg
                    width="25px"
                    height="25px"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="M8 7C9.65685 7 11 5.65685 11 4C11 2.34315 9.65685 1 8 1C6.34315 1 5 2.34315 5 4C5 5.65685 6.34315 7 8 7Z"
                        fill="#000000"
                      ></path>{" "}
                      <path
                        d="M14 12C14 10.3431 12.6569 9 11 9H5C3.34315 9 2 10.3431 2 12V15H14V12Z"
                        fill="#000000"
                      ></path>{" "}
                    </g>
                  </svg>
                </span>
              </NavLink>
              <NavLink className="mx-3 flex gap-1" to="/cart">
                {" "}
                <p className="mt-1">Cart </p>
                <span>
                  <svg
                    viewBox="0 0 24 24"
                    width="26px"
                    height="26px"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="#000000"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="M2.23737 2.28845C1.84442 2.15746 1.41968 2.36983 1.28869 2.76279C1.15771 3.15575 1.37008 3.58049 1.76303 3.71147L2.02794 3.79978C2.70435 4.02524 3.15155 4.17551 3.481 4.32877C3.79296 4.47389 3.92784 4.59069 4.01426 4.71059C4.10068 4.83049 4.16883 4.99538 4.20785 5.33722C4.24907 5.69823 4.2502 6.17 4.2502 6.883L4.2502 9.55484C4.25018 10.9224 4.25017 12.0247 4.36673 12.8917C4.48774 13.7918 4.74664 14.5497 5.34855 15.1516C5.95047 15.7535 6.70834 16.0124 7.60845 16.1334C8.47542 16.25 9.57773 16.25 10.9453 16.25H18.0002C18.4144 16.25 18.7502 15.9142 18.7502 15.5C18.7502 15.0857 18.4144 14.75 18.0002 14.75H11.0002C9.56479 14.75 8.56367 14.7484 7.80832 14.6468C7.07455 14.5482 6.68598 14.3677 6.40921 14.091C6.17403 13.8558 6.00839 13.5398 5.9034 13H16.0222C16.9817 13 17.4614 13 17.8371 12.7522C18.2128 12.5045 18.4017 12.0636 18.7797 11.1817L19.2082 10.1817C20.0177 8.2929 20.4225 7.34849 19.9779 6.67422C19.5333 5.99996 18.5058 5.99996 16.4508 5.99996H5.74526C5.73936 5.69227 5.72644 5.41467 5.69817 5.16708C5.64282 4.68226 5.52222 4.2374 5.23112 3.83352C4.94002 3.42965 4.55613 3.17456 4.1137 2.96873C3.69746 2.7751 3.16814 2.59868 2.54176 2.38991L2.23737 2.28845Z"
                        fill="#000000"
                      ></path>{" "}
                      <path
                        d="M7.5 18C8.32843 18 9 18.6716 9 19.5C9 20.3284 8.32843 21 7.5 21C6.67157 21 6 20.3284 6 19.5C6 18.6716 6.67157 18 7.5 18Z"
                        fill="#000000"
                      ></path>{" "}
                      <path
                        d="M16.5 18.0001C17.3284 18.0001 18 18.6716 18 19.5001C18 20.3285 17.3284 21.0001 16.5 21.0001C15.6716 21.0001 15 20.3285 15 19.5001C15 18.6716 15.6716 18.0001 16.5 18.0001Z"
                        fill="#000000"
                      ></path>{" "}
                    </g>
                  </svg>
                </span>
              </NavLink>
            </div>
            <div className="second">
              <img
                src={logo4}
                style={{ width: "40px", height: "30px" }}
                alt=""
              />
              {categories.length > 0 ? (
                categories?.map((categoryName, index) => (
                  <NavLink
                    key={index}
                    to={`/category/${encodeURIComponent(categoryName)}`}
                    className="mx-2"
                  >
                    {categoryName}
                  </NavLink>
                ))
              ) : (
                <>
                  <NavLink to={`/products`} className="mx-2">
                    Watches
                  </NavLink>
                  <NavLink to={`/products`} className="mx-2">
                    Gloves
                  </NavLink>
                  <NavLink to={`/products`} className="mx-2">
                    Sports
                  </NavLink>

                  <NavLink to={`/products`} className="mx-2">
                    Sun Glasses
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </div>

        <Drawer
          closable
          destroyOnClose
          title={
            <NavLink to={"/"}>
              <img src={draglogo} alt="Logo" className="navbar-logo" />
            </NavLink>
          }
          placement="left"
          open={open}
          loading={loading}
          onClose={() => setOpen(false)}
        >
          <div
            style={{
              width: "100%",
              color: "#222",
            }}
          >
            <div className="mobileView">
              <div className="">
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

                <a className="mx-3 flex my-3" href="/products">
                  <span>
                    <svg
                      width="26px"
                      height="26px"
                      viewBox="0 0 64 64"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      aria-hidden="true"
                      role="img"
                      class="iconify iconify--emojione"
                      preserveAspectRatio="xMidYMid meet"
                      fill="#000000"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <circle cx="32" cy="32" r="30" fill="#00000"></circle>
                        <path
                          d="M37.7 18.1c2 .7 3.7 1.9 4.9 3.7c1 1.4 1.7 3 2.1 4.7s.6 3.3.6 4.8c0 3.9-.8 7.1-2.3 9.8c-2.1 3.6-5.3 5.4-9.7 5.4H20.7v-29h12.5c1.8 0 3.3.2 4.5.6m-11.1 4.4v18.9h5.6c2.9 0 4.9-1.4 6-4.2c.6-1.5.9-3.4.9-5.5c0-3-.5-5.2-1.4-6.8c-.9-1.6-2.8-2.4-5.5-2.4h-5.6"
                          fill="#ffffff"
                        ></path>
                      </g>
                    </svg>
                  </span>
                  <p className="mx-3 mt-3">Our Brands </p>
                </a>
                <div className="line"></div>
                <NavLink className="mx-3 my-3 flex" to="/login">
                  {" "}
                  <span>
                    <svg
                      width="24px"
                      height="24px"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                          d="M8 7C9.65685 7 11 5.65685 11 4C11 2.34315 9.65685 1 8 1C6.34315 1 5 2.34315 5 4C5 5.65685 6.34315 7 8 7Z"
                          fill="#000000"
                        ></path>{" "}
                        <path
                          d="M14 12C14 10.3431 12.6569 9 11 9H5C3.34315 9 2 10.3431 2 12V15H14V12Z"
                          fill="#000000"
                        ></path>{" "}
                      </g>
                    </svg>
                  </span>
                  <p className="mx-3 mt-3">My Accounts </p>
                </NavLink>
                <div className="line"></div>
                <NavLink className="mx-3 flex my-3" to="/cart">
                  {" "}
                  <span>
                    <svg
                      viewBox="0 0 24 24"
                      width="26px"
                      height="26px"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      stroke="#000000"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                          d="M2.23737 2.28845C1.84442 2.15746 1.41968 2.36983 1.28869 2.76279C1.15771 3.15575 1.37008 3.58049 1.76303 3.71147L2.02794 3.79978C2.70435 4.02524 3.15155 4.17551 3.481 4.32877C3.79296 4.47389 3.92784 4.59069 4.01426 4.71059C4.10068 4.83049 4.16883 4.99538 4.20785 5.33722C4.24907 5.69823 4.2502 6.17 4.2502 6.883L4.2502 9.55484C4.25018 10.9224 4.25017 12.0247 4.36673 12.8917C4.48774 13.7918 4.74664 14.5497 5.34855 15.1516C5.95047 15.7535 6.70834 16.0124 7.60845 16.1334C8.47542 16.25 9.57773 16.25 10.9453 16.25H18.0002C18.4144 16.25 18.7502 15.9142 18.7502 15.5C18.7502 15.0857 18.4144 14.75 18.0002 14.75H11.0002C9.56479 14.75 8.56367 14.7484 7.80832 14.6468C7.07455 14.5482 6.68598 14.3677 6.40921 14.091C6.17403 13.8558 6.00839 13.5398 5.9034 13H16.0222C16.9817 13 17.4614 13 17.8371 12.7522C18.2128 12.5045 18.4017 12.0636 18.7797 11.1817L19.2082 10.1817C20.0177 8.2929 20.4225 7.34849 19.9779 6.67422C19.5333 5.99996 18.5058 5.99996 16.4508 5.99996H5.74526C5.73936 5.69227 5.72644 5.41467 5.69817 5.16708C5.64282 4.68226 5.52222 4.2374 5.23112 3.83352C4.94002 3.42965 4.55613 3.17456 4.1137 2.96873C3.69746 2.7751 3.16814 2.59868 2.54176 2.38991L2.23737 2.28845Z"
                          fill="#000000"
                        ></path>{" "}
                        <path
                          d="M7.5 18C8.32843 18 9 18.6716 9 19.5C9 20.3284 8.32843 21 7.5 21C6.67157 21 6 20.3284 6 19.5C6 18.6716 6.67157 18 7.5 18Z"
                          fill="#000000"
                        ></path>{" "}
                        <path
                          d="M16.5 18.0001C17.3284 18.0001 18 18.6716 18 19.5001C18 20.3285 17.3284 21.0001 16.5 21.0001C15.6716 21.0001 15 20.3285 15 19.5001C15 18.6716 15.6716 18.0001 16.5 18.0001Z"
                          fill="#000000"
                        ></path>{" "}
                      </g>
                    </svg>
                  </span>
                  <p className="mx-3 mt-3">Cart </p>
                </NavLink>
                <div className="line"></div>
                <div className="mt-4 mx-2 my-3 d-flex gap-3 align-items-center">
                  <img
                    src={logo4}
                    style={{ width: "40px", height: "30px" }}
                    alt=""
                  />
                  <p className="fw-bold my-3">CUSTOMS</p>
                </div>
                <div className="line"></div>
                {categories?.map((categoryName, index) => (
                  <>
                    <NavLink
                      key={index}
                      to={`/category/${encodeURIComponent(categoryName)}`}
                      className="my-2 mx-5 d-flex"
                    >
                      <p>{categoryName}</p>
                    </NavLink>
                    <div className="line"></div>
                  </>
                ))}
              </div>
            </div>
          </div>
        </Drawer>
      </div>
    </>
  );
};

export default Navbar;
