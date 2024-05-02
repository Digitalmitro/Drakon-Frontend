import { Button, useMediaQuery } from "@mui/material";
import "./App.css";
import Featured from "./Component/Featured";
import Footer from "./Component/Footer";
import Hero from "./Component/Hero";
import Navbar from "./Component/Navbar";
import NewlyAvailable from "./Component/NewlyAvailable";
import ShoesDisplay from "./Component/ShoesDisplay";
import WhyChooseUs from "./Component/WhyChooseUs";
import { useDispatch } from "react-redux";
import { cartModal } from "./Redux/CartSlice";

function App() {
  const isMobile = useMediaQuery("(max-width:900px)");
  const dispatch = useDispatch();
  const hideCartModal = () => {
    dispatch(cartModal(false));
  };
  return (
    <div className="" style={{ zoom: "0.8" }}>
      <Navbar closeCart={hideCartModal} />
      <Hero closeCart={hideCartModal} />
      <Featured closeCart={hideCartModal} />
      <WhyChooseUs closeCart={hideCartModal} />
      <NewlyAvailable closeCart={hideCartModal} />
      <ShoesDisplay closeCart={hideCartModal} />
      <div
        onClick={hideCartModal}
        className="bg-[#F5743B] h-[200px]"
        style={{}}
      >
        <div className="container mx-auto flex justify-between items-center h-full px-5">
          <p className="text-white lg:text-2xl font-bold">
            STAY TUNED WITH UPDATES
          </p>
          <input
            style={{ zoom: isMobile ? "0.5" : "" }}
            type="text"
            className="w-1/2 rounded-full p-5 mr-5 bg-transparent border-2 border-white outline-white text-white placeholder-white"
            placeholder="Enter your email"
          />
          <Button
            sx={{
              borderRadius: "100vw",
              padding: "15px 40px",
              fontSize: "1rem",
              fontWeight: "bold",
              backgroundColor: "white",
              color: "black",
              "&:hover": {
                backgroundColor: "#cccccc",
              },
              zoom: isMobile ? "0.5" : "",
            }}
            variant="contained"
          >
            View product
          </Button>
        </div>
      </div>
      <Footer closeCart={hideCartModal} />
    </div>
  );
}

export default App;
