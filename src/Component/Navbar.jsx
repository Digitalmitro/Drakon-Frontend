import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { IoCart } from "react-icons/io5";
import logo from "../assets/logo.png";
import search from "../assets/search.png";
import profile from "../assets/profile.png";
import logo1 from "../assets/logo4-remove.png";
import { Badge, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { CancelOutlined } from "@mui/icons-material";
import { cartModal, removeItem } from "../Redux/CartSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { message } from "antd";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

const drawerWidth = 240;
const navItems = [
  { name: "HOME", path: "/" },
  { name: "ABOUT", path: "/about" },
  { name: "SHOP", path: "/shop" },
  { name: "SUNGLASSES", path: "/sunglasses" },
  { name: "BATING GLOVES", path: "/batting-gloves" },
  { name: "EQUIPMENT", path: "/equipment" },
  { name: "ACCESSORIES", path: "/accessories" },
  { name: "APPAREL", path: "/apparel" },
  { name: "CONTACT US", path: "/contact" },
];

function Navbar(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const { window } = props;
  const token = Cookies.get("token");
  const decodedToken = token && jwtDecode(token);
  const user = decodedToken?.email;
  const user_id = decodedToken?._id;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [data, setData] = useState();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  // CART PRODUCTS
  const products = useSelector((state) => state.cartReducer.items);
  const isOpenCart = useSelector((state) => state.cartReducer.openCartModal);
  const dispatch = useDispatch();
  // const pathname = window.location
  console.log("products", products);
  console.log("loaction ", location.pathname);
  const handleOpenChange = () => {
    dispatch(cartModal(!isOpenCart));
  };

  // cartData
  const handleProduct = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/wishlist/${user_id}`
      );

      setData(response.data.wishlist.reverse());
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleProduct();
  }, []);

  const handleDeleteCart = async (wishlistId, productId) => {
    dispatch(removeItem(productId));
    try {
      const deletedData = await axios.delete(
        `${import.meta.env.VITE_BACKEND_API}/wishlist/${wishlistId}`
      );
      handleProduct();

      console.log("deletedData", deletedData);
    } catch (error) {
      console.log(error);
    }
  };

  // NAV Items
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <div className="flex justify-center p-5 ">
        <img
          onClick={() => navigate("/")}
          src={logo}
          alt="logo"
          className=""
          style={{ zoom: "0.7", cursor: "pointer" }}
        />
      </div>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton
              sx={{ textAlign: "center" }}
              onClick={() => navigate(item.path)}
            >
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;
  const isMobile = useMediaQuery("(max-width:90px)");

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ background: "#F3F3F3", boxShadow: "none" }}>
        <Box className="bg-[#ff5B00]">
          <Box
            className="lg:max-w-full px-10 py-4 mx-auto gap-[3px] hidden lg:flex justify-center items-center"
            sx={{
              zoom: isMobile ? "0.2" : "0.5",
            }}
          >
            <Box className="flex">
              <Typography variant="h4" className="flex gap-2">
                Shop Our Fall Buying Guide:<Link>Gear Up</Link>
              </Typography>
            </Box>
          </Box>
        </Box>

        <Toolbar
          className="h-[100px] lg:h-25"
          sx={{ justifyContent: "space-between", margin: ".8rem" }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" }, color: "black" }}
          >
            <MenuIcon sx={{ fontSize: "2.5rem" }} />
          </IconButton>
          <img
            onClick={() => navigate("/")}
            src={logo}
            alt="logo"
            width={""}
            className="w-36 cursor-pointer logoMobile"
          />

            <div className="flex flex-col lg:justify-end justify-center items-center lg:items-end">
              <div className="text-black lg:pt-6 flex lg:gap-12 gap-6">
                <div className="flex bg-white rounded-lg ">
                  <input
                    type="text"
                    className="outline-none border-none px-2 py-1 rounded-lg w-[200px] lg:w-full"
                    placeholder="Search..."
                  />
                  <img src={search} alt="" className="h-8 p-1 pt-2" />
                </div>

                <div
                  className="flex justify-center items-center cursor-pointer"
                  onClick={() => navigate("/account")}
                >
                  <p className="hidden lg:block">My Accounts</p>{" "}
                  <img src={profile} alt="" className="h-10 p-1 pb-2 block" />
                </div>
                <div
                  className="flex justify-center space-x-1 items-center cursor-pointer"
                  onClick={() => navigate("/cart")}
                >
                  <p className="hidden lg:block">Cart</p>
                  <IoCart size={28} />
                </div>
              </div>
              <Box>
                <div>
                  <List sx={{ display: { xs: "none", sm: "block" } }}>
                    <ListItem disablePadding>
                      {navItems.map((item) => (
                        <ListItemButton
                          key={item.name}
                          sx={{
                            textAlign: "center",
                            "&:hover": { backgroundColor: "transparent" },
                          }}
                          onClick={() => navigate(item.path)}
                        >
                          <ListItemText
                            primary={item.name}
                            className="text-black hover:transition hover:scale-105 hover:-translate-y-1 hover:delay-100 hover:ease-in-out hover:duration-300 hover:text-[#0024ff]"
                          />
                        </ListItemButton>
                      ))}
                    </ListItem>
                  </List>
                </div>
              </Box>
            </div>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: isMobile ? "" : 2 }}>
        <Toolbar />
      </Box>
    </Box>
  );
}

Navbar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Navbar;
