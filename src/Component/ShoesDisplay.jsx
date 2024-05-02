import React from "react";
import shoesTieing1 from "../assets/shoes-tieing-1.png";
import shoesTieing2 from "../assets/shoes-tieing-2.png";
import womenWithShoes from "../assets/women-with-shoes.png";
import { Button } from "@mui/material";

const ShoesDisplay = ({closeCart}) => {
  return (
    <div className="container mx-auto my-20" onClick={closeCart}>
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-0 justify-between">
        <div className="card">
          <img
            src={shoesTieing1}
            className="object-cover lg:w-[400px]"
            alt=""
          />
          <div className="textBox">
            <p class="text head mb-10">How to buy sport shoes</p>
            <Button
              sx={{
                borderRadius: "100vw",
                padding: "10px 30px",
                fontSize: "1rem",
                fontWeight: "bold",
                backgroundColor: "#F5743B",
                "&:hover": {
                  backgroundColor: "#be410c",
                },
              }}
              variant="contained"
            >
              Read tips
            </Button>
          </div>
        </div>
        <div className="card">
          <img src={womenWithShoes} className="object-cover lg:w-[400px]" alt="" />
          <div className="textBox">
            <p class="text head mb-10">How to buy sport shoes</p>
            <Button
              sx={{
                borderRadius: "100vw",
                padding: "10px 30px",
                fontSize: "1rem",
                fontWeight: "bold",
                backgroundColor: "#F5743B",
                "&:hover": {
                  backgroundColor: "#be410c",
                },
              }}
              variant="contained"
            >
              Read tips
            </Button>
          </div>
        </div>
        <div className="card">
          <img src={shoesTieing2} className="object-cover lg:w-[400px]" alt="" />
          <div className="textBox">
            <p class="text head mb-10">How to buy sport shoes</p>
            <Button
              sx={{
                borderRadius: "100vw",
                padding: "10px 30px",
                fontSize: "1rem",
                fontWeight: "bold",
                backgroundColor: "#F5743B",
                "&:hover": {
                  backgroundColor: "#be410c",
                },
              }}
              variant="contained"
            >
              Read tips
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoesDisplay;
