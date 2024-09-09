import slideimg1 from "../../assets/slide-img1.jpg";
import slideimg2 from "../../assets/slide-img2.jpg";
import slideimg3 from "../../assets/slide-img3.jpg";
import slideimg4 from "../../assets/slide-img4.jpg";
import slideimg5 from "../../assets/slide-img5.jpg";
import slideimg6 from "../../assets/slide-img6.jpg";
import slideimg7 from "../../assets/slide-img7.jpg";
import slideimg8 from "../../assets/slide-img8.jpg";
import slideimg9 from "../../assets/slide-img9.jpg";
import slideimg10 from "../../assets/slide-img10.jpg";

import c1 from "../../assets/c1.jpg";
import c2 from "../../assets/c2.jpg";
import c3 from "../../assets/c3.jpg";
import c4 from "../../assets/c4.jpg";
import c5 from "../../assets/c5.jpg";
import c6 from "../../assets/c6.jpg";
import c7 from "../../assets/c7.jpg";
import c8 from "../../assets/c8.jpg";
import c9 from "../../assets/c9.jpg";
import c10 from "../../assets/c10.jpg";
import c11 from "../../assets/c11.jpg";
import c12 from "../../assets/c12.jpg";
import c13 from "../../assets/c13.jpg";
import c14 from "../../assets/c14.jpg";
import c15 from "../../assets/c15.jpg";
import c16 from "../../assets/c16.jpg";

import base1 from "../../assets/base-1.jpg";
import base2 from "../../assets/base-2.jpg";
import base3 from "../../assets/base-3.jpg";
import base4 from "../../assets/base-4.jpg";

export const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 1024 },
    items: 4,
    slidesToSlide: 2,
  },
  desktop: {
    breakpoint: { max: 1024, min: 800 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 800, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export const productData = [
  {
    id: 1,
    imageurl: slideimg1,
    name: "Rawlings 2024 Texas All-Star Game REV1X Glove, Right Hand Throw",
    price: "$19.99",
    description: "Some text about the product..",
  },
  {
    id: 2,
    imageurl: slideimg2,
    name: "Heart of the Hide 2024 MLB All-Star Game Glove",
    price: "$21.99",
    description: "Some text about the product..",
  },
  {
    id: 3,
    imageurl: slideimg3,
    name: "Rawlings REV1X 11.75'' USA Infield Glove",
    price: "$99.99",
    description: "Some text about the product..",
  },
  {
    id: 4,
    imageurl: slideimg4,
    name: "Exclusive Hot Dog Heart of the Hide Infield Glove",
    price: "$14.99",
    description: "Some text about the product..",
  },
  {
    id: 5,
    imageurl: slideimg5,
    name: "Gameday 57 Series Harrison Bader Pro Preferred Outfield Glove",
    price: "$38.99",
    description: "Some text about the product..",
  },
  {
    id: 6,
    imageurl: slideimg6,
    name: "Exclusive REV1X 11.75-inch Spring Edition Infield Glove",
    price: "$149.99",
    description: "Some text about the product..",
  },
  {
    id: 7,
    imageurl: slideimg7,
    name: "Exclusive Bo Bichette REV1X 11.75'' Infield Glove",
    price: "$38.99",
    description: "Some text about the product..",
  },
  {
    id: 8,
    imageurl: slideimg8,
    name: "Exclusive Carlos Correa REV1X 11.7'' Infield Glove",
    price: "$49.99",
    description: "Some text about the product..",
  },
  {
    id: 9,
    imageurl: slideimg9,
    name: "REV1X 11.5'' Infield Pro-I Web Glove",
    price: "$49.99",
    description: "Some text about the product..",
  },
  {
    id: 10,
    imageurl: slideimg10,
    name: "REV1X 11.5'' Infield Pro-I Web Glove",
    price: "$49.99",
    description: "Some text about the product..",
  },
];
export const productData2 = [
  {
    id: 1,
    images: [c1],
    imageurl: c1,
    name: "Rawlings 2024 Texas All-Star Game REV1X Glove, Right Hand Throw",
    price: "$19.99",
    description: "Some text about the product..",
  },
  {
    id: 2,
    images: [c2],
    imageurl: c2,
    name: "Heart of the Hide 2024 MLB All-Star Game Glove",
    price: "$21.99",
    description: "Some text about the product..",
  },
  {
    id: 3,
    images: [c3],
    imageurl: c3,
    name: "Rawlings REV1X 11.75'' USA Infield Glove",
    price: "$99.99",
    description: "Some text about the product..",
  },
  {
    id: 4,
    images: [c4],
    imageurl: c4,
    name: "Exclusive Hot Dog Heart of the Hide Infield Glove",
    price: "$14.99",
    description: "Some text about the product..",
  },
  {
    id: 5,
    images: [c5],
    imageurl: c5,
    name: "Gameday 57 Series Harrison Bader Pro Preferred Outfield Glove",
    price: "$38.99",
    description: "Some text about the product..",
  },
  {
    id: 6,
    images: [c6],
    imageurl: c6,
    name: "Exclusive REV1X 11.75-inch Spring Edition Infield Glove",
    price: "$149.99",
    description: "Some text about the product..",
  },
  {
    id: 7,
    images: [c7],
    imageurl: c7,
    name: "Exclusive Bo Bichette REV1X 11.75'' Infield Glove",
    price: "$38.99",
    description: "Some text about the product..",
  },
  {
    id: 8,
    images: [c8],
    imageurl: c8,
    name: "Exclusive Carlos Correa REV1X 11.7'' Infield Glove",
    price: "$49.99",
    description: "Some text about the product..",
  },
  {
    id: 9,
    images: [c9],
    imageurl: c9,
    name: "REV1X 11.5'' Infield Pro-I Web Glove",
    price: "$49.99",
    description: "Some text about the product..",
  },
  {
    id: 10,
    imageurl: c10,
    name: "REV1X 11.5'' Infield Pro-I Web Glove",
    price: "$49.99",
    description: "Some text about the product..",
  },
  {
    id: 11,
    imageurl: c11,
    name: "REV1X 11.5'' Infield Pro-I Web Glove",
    price: "$49.99",
    description: "Some text about the product..",
  },
  {
    id: 12,
    imageurl: c12,
    name: "REV1X 11.5'' Infield Pro-I Web Glove",
    price: "$49.99",
    description: "Some text about the product..",
  },
  {
    id: 13,
    imageurl: c13,
    name: "REV1X 11.5'' Infield Pro-I Web Glove",
    price: "$49.99",
    description: "Some text about the product..",
  },
  {
    id: 14,
    imageurl: c14,
    name: "REV1X 11.5'' Infield Pro-I Web Glove",
    price: "$49.99",
    description: "Some text about the product..",
  },
  {
    id: 15,
    imageurl: c15,
    name: "REV1X 11.5'' Infield Pro-I Web Glove",
    price: "$49.99",
    description: "Some text about the product..",
  },
  {
    id: 16,
    imageurl: c16,
    name: "REV1X 11.5'' Infield Pro-I Web Glove",
    price: "$49.99",
    description: "Some text about the product..",
  },
];

export const productData3 = [
  {
    id: 1,
    imageurl: base1,
    name: "Rawlings 2024 Texas All-Star Game REV1X Glove, Right Hand Throw",
    price: "$19.99",
    description: "Some text about the product..",
  },
  {
    id: 2,
    imageurl: base2,
    name: "Heart of the Hide 2024 MLB All-Star Game Glove",
    price: "$21.99",
    description: "Some text about the product..",
  },
  {
    id: 3,
    imageurl: base3,
    name: "Rawlings REV1X 11.75'' USA Infield Glove",
    price: "$99.99",
    description: "Some text about the product..",
  },
  {
    id: 4,
    imageurl: base4,
    name: "Exclusive Hot Dog Heart of the Hide Infield Glove",
    price: "$14.99",
    description: "Some text about the product..",
  },
  {
    id: 5,
    imageurl: base1,
    name: "Gameday 57 Series Harrison Bader Pro Preferred Outfield Glove",
    price: "$38.99",
    description: "Some text about the product..",
  },
  {
    id: 6,
    imageurl: base2,
    name: "Exclusive REV1X 11.75-inch Spring Edition Infield Glove",
    price: "$149.99",
    description: "Some text about the product..",
  },
];
