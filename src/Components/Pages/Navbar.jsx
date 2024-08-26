import React, { useState, useEffect } from "react";
import logo from "../../assets/logo.png";
import logo4 from "../../assets/logo4.jpg";


const Navbar = () => {
  const [show, setShow] = useState(true);
  let lastScrollY = window.scrollY;

  const controlNavbar = () => {
    if (window.scrollY > lastScrollY) {
      // if scroll down hide the navbar
      setShow(false);
    } else {
      // if scroll up show the navbar
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

  return (
    <>
      <div className={`navbar ${show ? "show" : "hide"}`}>
        <div className="top-heading">
          <p style={{ color: "#fff",paddingTop:"10px",fontSize:"0.9rem" }}>
            Shop Our Fall Buying Guide: <u>Gear Up</u>{" "}
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
          <div className="navbar-left p-3 ">
            <img src={logo} alt="Logo" className="navbar-logo" />
          </div>
          <div className="navbar-right">
            <div className="first">
              <div className="input-nav-search">
                <input
                  style={{ border: "none" }}
                  type="text"
                  placeholder="Search..."
                />
                <span>
                  <svg
                    fill="#000000"
                    height="12px"
                    width="12px"
                    version="1.1"
                    id="Capa_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 183.792 183.792"
                    xml:space="preserve"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path d="M54.734,9.053C39.12,18.067,27.95,32.624,23.284,50.039c-4.667,17.415-2.271,35.606,6.743,51.22 c12.023,20.823,34.441,33.759,58.508,33.759c7.599,0,15.139-1.308,22.287-3.818l30.364,52.592l21.65-12.5l-30.359-52.583 c10.255-8.774,17.638-20.411,21.207-33.73c4.666-17.415,2.27-35.605-6.744-51.22C134.918,12.936,112.499,0,88.433,0 C76.645,0,64.992,3.13,54.734,9.053z M125.29,46.259c5.676,9.831,7.184,21.285,4.246,32.25c-2.938,10.965-9.971,20.13-19.802,25.806 c-6.462,3.731-13.793,5.703-21.199,5.703c-15.163,0-29.286-8.146-36.857-21.259c-5.676-9.831-7.184-21.284-4.245-32.25 c2.938-10.965,9.971-20.13,19.802-25.807C73.696,26.972,81.027,25,88.433,25C103.597,25,117.719,33.146,125.29,46.259z"></path>{" "}
                    </g>
                  </svg>
                </span>
              </div>
              <a className="mx-3" href="#contact">Our Brands</a>
              <a className="mx-3" href="#profile">My Accounts <span><svg height="18px" width="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></span></a>
              <a className="mx-3" href="#profile"> Cart <span><svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6.29977 5H21L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></span></a>

            </div>
            <div className="second">
                <img src={logo4} style={{width:"40px",height:"30px"}} alt="" />
              <a className="mx-2" href="#home">CUSTOM</a>
              <a className="mx-2" href="#contact">GLOVES</a>
              <a className="mx-2" href="#profile">BATS</a>
              <a className="mx-2" href="#home">BALLS</a>
              <a className="mx-2" href="#contact">PROTECTIVE</a>
              <a className="mx-2" href="#profile">BAGS</a>
              <a className="mx-2" href="#home">APPAREL</a>
              <a className="mx-2" href="#contact">BATTING GLOVES</a>
              <a className="mx-2" href="#profile">ACCESSORIES</a>
              <a className="mx-2" href="#profile">CLEARANCE</a>

              <a className="mx-2" href="#profile">TEAM RAWLINGS</a>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
