import  React, {useState, useEffect} from "react";
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
import Button from "@mui/material/Button";

import logo from "../assets/logo.png";
import search from "../assets/search.png";
import heart from "../assets/heart.png";
import shoppingBag from "../assets/shopping_bag.png";
import profile from "../assets/profile.png";
import location from "../assets/location.png";
import mail from "../assets/mail.png";
import twitter from "../assets/twitter.png";
import facebook from "../assets/facebook.png";
import pinterest from "../assets/pinterest.png";
import instagram from "../assets/instagram.png";
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
const navItems = ["Home", "Equipment", "Apparel", "About", "Contact"];

function Navbar(props) {
  const navigate = useNavigate();
 const location = useLocation()
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
  console.log("products", products)
console.log("loaction ",  location.pathname)
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
  console.log("NAV CART DATA", data );
  
  useEffect(() => {
    handleProduct();

  }, []);


  const handleDeleteCart = async(wishlistId, productId) => {
    dispatch(removeItem(productId))
    try {
      const  deletedData  = await axios.delete(
        `${import.meta.env.VITE_BACKEND_API}/wishlist/${wishlistId}`
      );
      handleProduct();
      
      console.log("deletedData", deletedData);
    } catch (error) {
      console.log(error);
    }
  }



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
          <ListItem key={item} disablePadding  >
            <ListItemButton sx={{ textAlign: "center"  }}   >
              <ListItemText
                onClick={() =>
                  navigate(
                    item.toLowerCase() === "home"
                      ? "/"
                      : item.toLowerCase() === "equipment" ||
                        item.toLowerCase() === "apparel"
                      ? `/product`
                      : `/${item.toLowerCase()}`
                  )
                }
                primary={item}
               
              />
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
    <Box sx={{ display: "flex", alignItems:"center" }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ background: "#F3F3F3", boxShadow: "none" }}>
        <Box className="bg-black">
          <Box
            className="lg:max-w-full px-10 py-1 mx-auto gap-[3px] hidden lg:flex justify-between items-center"
            sx={{
              zoom: isMobile ? "0.2" : "0.5",
            }}
          >
            <Box className="flex gap-24">
              <Typography variant="h5" className="flex gap-5">
                {" "}
                <img src={location} width={20} />
                2001 Timberloch Pl The Woodlands TX 77380
              </Typography>
              <Typography variant="h5" className="flex gap-5">
                {" "}
                <img src={mail} width={40} />
                info@drakon-sports.com
              </Typography>
            </Box>
            <Box className="flex gap-24"></Box>
            <Box className="flex gap-10">
              <div className="mt-2 gap-5 d-flex justify-content-center mx-5">
                <Typography variant="h5" className="flex gap-5">
                  <Link to={"/shippingpolicy"}>shipping policy</Link>
                </Typography>
                <Typography variant="h5" className="flex gap-5">
                  <Link to={"/returnrefund"}>return & refund</Link>
                </Typography>

                <Typography variant="h5" className="flex gap-5">
                  <Link to={"/privacypolicy"}>privacy policy</Link>
                </Typography>
                <Typography variant="h5" className="flex gap-5">
                  <Link to={"/termscondition"}>Terms & Condition</Link>
                </Typography>
                <Typography variant="h5" className="flex gap-5">
                  <Link to={"/faq"}>FAQ</Link>
                </Typography>
              </div>

              <img src={twitter} width={"25px"} />
              <img src={facebook} width={"25px"} />
              <img src={pinterest} width={"25px"} />
              <img
                style={{ height: "38px", marginTop: "3px" }}
                src={instagram}
                width={"28px"}
              />
            </Box>
          </Box>
        </Box>
        <Toolbar
          className="h-[100px] lg:h-10"
          sx={{ justifyContent: "space-between" ,  margin:".8rem" }}
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
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item, index) => (
              <Button
                key={item}
                sx={{ color: "#000000", fontWeight: index === 0 ? "700" : "" }}
                onClick={() =>
                  navigate(
                    item.toLowerCase() === "home"
                      ? "/"
                      : item.toLowerCase() === "equipment" ||
                        item.toLowerCase() === "apparel"
                      ? `/product`
                      : `/${item.toLowerCase()}`
                  )
                }
              >
                {item}
              </Button>
            ))}
          </Box>
          <Box sx={{ display: "flex", gap: "20px" }}>
            {isMobile ? (
              ""
            ) : (
              <>
                {/* <img src={search} width={""} className="cursor-pointer w-7" /> */}
                {/* search */}

                <div class="search-wrapper">
                  <button class="searchIcon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      height="25px"
                      width="25px"
                    >
                      <path
                        stroke-linejoin="round"
                        stroke-linecap="round"
                        stroke-width="1.5"
                        stroke="#fff"
                        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                      ></path>
                      <path
                        stroke-linejoin="round"
                        stroke-linecap="round"
                        stroke-width="1.5"
                        stroke="#fff"
                        d="M22 22L20 20"
                      ></path>
                    </svg>
                  </button>
                  <input
                    placeholder="search.."
                    class="inputSeacrh"
                    name="text"
                    type="text"
                  />
                </div>

                <img src={heart} width={""} className="cursor-pointer navHeart w-9" />
              </>
            )}
            <div className="toggleFloatingCart">
             <a href="/cart">
             <Badge
                badgeContent={data?.length > 0 ? data?.length : 0}
                color="primary"
              >
                <img
                  onClick={() => navigate("/cart")}
                  src={shoppingBag}
                  width={""}
                  className="cursor-pointer w-14 lg:w-7"
                  style={{width:"2.3rem"}}
                />
              </Badge>
             </a>
             { (location.pathname !== "/cart" ) && ( location.pathname !== "/checkout") && <div className="floatingCart cart-container h-[300px] w-80 overflow-y-auto absolute right-5 top-11 z-[1000] bg-black opacity-80 rounded-md">
                {   data?.map((e) => (
                  <>
                    <div className="cursor-pointer flex justify-between items-center p-5">
                      <div>
                        <img
                          onClick={() => navigate("/cart")}
                          src={e.image}
                          alt=""
                          width={50}
                        />
                      </div>
                      <h3
                        onClick={() => navigate("/cart")}
                        className="text-white"
                      >
                        {e.title}
                      </h3>
                      <h3
                        onClick={() => navigate("/cart")}
                        className="text-white"
                      >
                        $ {e.price}
                      </h3>
                      <CancelOutlined
                        onClick={() => handleDeleteCart(e._id, e.product_id)}
                        fontSize="1.5rem"
                        className="cursor-pointer"
                      />
                    </div>
                    <hr className="border-white" />
                  </>
                ))}
                {products?.length < 0 && (
                  <p className="text-white">No items in cart</p>
                )}
              </div>

             }
            </div>
            <img
              src={profile}
              onClick={() => navigate("/account")}
              width={""}
              className="cursor-pointer w-11 lg:w-9"
            />
          </Box>
          {/* {isOpenCart && (
            <div className="cart-container h-[300px] w-80 overflow-y-auto absolute right-5 top-14 z-[1000] bg-black opacity-80 rounded-md">
              {products?.map((e) => (
                <>
                  <div className="flex justify-between items-center p-5">
                    <div>
                      <img src={e.image} alt="" width={50} />
                    </div>
                    <h3 className="text-white">{e.title}</h3>
                    <h3 className="text-white">$ {e.price}</h3>
                    <CancelOutlined
                      onClick={() => dispatch(removeItem(e._id))}
                      fontSize="1.5rem"
                      className="cursor-pointer"
                    />
                  </div>
                  <hr className="border-white" />
                </>
              ))}
              {products?.length < 0 && (
                <p className="text-white">No items in cart</p>
              )}
            </div>
          )} */}
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
