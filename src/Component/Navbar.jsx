import * as React from "react";
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
import { Link, useNavigate } from "react-router-dom";

const drawerWidth = 240;
const navItems = ["Home", "Equipment", "Apparel", "About", "Contact"];

function Navbar(props) {
  const navigate = useNavigate();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <div className="flex justify-center p-5">
        <img
          onClick={() => navigate("/")}
          src={logo}
          alt="logo"
          style={{ zoom: "0.7", cursor: "pointer" }}
        />
      </div>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
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
  const isMobile = useMediaQuery("(max-width:900px)");

  const products = useSelector((state) => state.cartReducer.items);
  const isOpenCart = useSelector((state) => state.cartReducer.openCartModal);
  const dispatch = useDispatch();
  const handleOpenChange = () => {
    dispatch(cartModal(!isOpenCart));
  };
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ background: "#F3F3F3", boxShadow: "none" }}>
        <Box className="bg-black">
          <Box
            className="lg:max-w-full px-10 py-1 mx-auto gap-[30px] hidden lg:flex justify-between items-center"
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
          className="h-[90px] lg:h-0"
          sx={{ justifyContent: "space-between" }}
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
            className="w-36 cursor-pointer"
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
                <img src={search} width={""} className="cursor-pointer w-7" />
                <img src={heart} width={""} className="cursor-pointer w-7" />
              </>
            )}
            <div className="toggleFloatingCart">
              <Badge
                badgeContent={products.length > 0 ? products.length : 0}
                color="primary"
              >
                <img
                  onClick={() => navigate("/cart")}
                  src={shoppingBag}
                  width={""}
                  className="cursor-pointer w-10 lg:w-7"
                />
              </Badge>
              <div className="floatingCart cart-container h-[300px] w-80 overflow-y-auto absolute right-5 top-11 z-[1000] bg-black opacity-80 rounded-md">
                {products?.map((e) => (
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
            </div>
            <img
              src={profile}
              onClick={() => navigate("/account")}
              width={""}
              className="cursor-pointer w-10 lg:w-7"
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
