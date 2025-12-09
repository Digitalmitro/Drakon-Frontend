import React, { useEffect, useState } from 'react';
import ReactStars from 'react-rating-stars-component';
import Payment from '../assets/method.png';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import product1 from '../assets/pad.png';
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import { addItem } from '../Redux/CartSlice';

const Productdetails = () => {
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState(null);
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [fitType, setFitType] = useState('all');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = Cookies.get('token');
  const decodedToken = token && jwtDecode(token);
  const user_id = decodedToken?._id;

  const [data, setData] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
    getAllProductData();
  }, []);

  const getAllProductData = async () => {
    try {
      const productRes = await axios.get(`https://api.drakon-sports.com/products/${id}`);
      setData(productRes.data);
      setSelectedImage(productRes.data.image?.[0] || null);
    } catch (err) {
      console.error(err);
    }
  };

  const ratingChanged = (newRating) => {
    // ...
  };

  const handleCart = async () => {
    if (!data) return;

    // Check if product or selected size is sold out
    if (data.isSoldOut) {
      message.error('This product is sold out');
      return;
    }

    if (selectedSize && data.soldOutSizes?.includes(selectedSize)) {
      message.error(`Size ${selectedSize} is sold out`);
      return;
    }

    // item shape for both guest & logged-in
    const cartItem = {
      productId: {
        _id: data._id,
        title: data.title,
        price: data.price,
        size: selectedSize,
        weight: data.weight,
        image: data.image,
        stock: data.stock,
      },
      quantity,
      total: data.price * quantity,
    };

    if (user_id) {
      // logged-in: hit server
      dispatch(addItem(data));
      try {
        await axios.post(`https://api.drakon-sports.com/api/add`, {
          image: data.image,
          title: data.title,
          price: data.price,
          quantity,
          size: selectedSize,
          productId: data._id,
          userId: user_id,
        });
        message.success('Added to Cart');
        setTimeout(() => navigate('/cart'), 500);
      } catch (error) {
        console.error(error);
        message.error('Cart item not added');
      }
    } else {
      // guest: write to localStorage
      const guestCart = JSON.parse(localStorage.getItem('guest_cart') || '[]');
      const existing = guestCart.find((i) => i.productId._id === data._id);
      if (existing) {
        existing.quantity += quantity;
        existing.total = existing.quantity * data.price;
      } else {
        guestCart.push(cartItem);
      }
      localStorage.setItem('guest_cart', JSON.stringify(guestCart));
      message.success('Added to Cart');
      setTimeout(() => navigate('/cart'), 500);
    }
  };

  const getSizesForCategory = (category) => {
    switch (category?.toLowerCase()) {
      case 'sunglasses':
      case 'headband':
        return 'no-size'; // text only
      case 'hat':
        return 'snapback';
      case 'elbow guard':
      case 'sliding mitt':
      case 'shin guard':
        return ['Youth', 'Adult'];
      case 'compression sleeve':
        return ['M', 'L', 'XL'];
      case 'batting gloves':
        return {
          youth: ['YS', 'YM', 'YL', 'YXL'],
          standard: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
        };
      default:
        return ['S', 'M', 'L', 'XL', 'XXL'];
    }
  };

  // console.log(data)
const SIZE_ORDER = ['YS', 'YM', 'YL', 'YXL', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

// precompute rank
const sizeRank = SIZE_ORDER.reduce((acc, size, index) => {
  acc[size] = index;
  return acc;
}, {});

const SIZE_ORDER_MAP = {
  YS: 0,
  YM: 1,
  YL: 2,
  YXL: 3,
  XS: 4,
  S: 5,
  M: 6,
  L: 7,
  XL: 8,
  XXL: 9,
  XXXL: 10,
};


const normalizedFitType = (fitType || 'all').toLowerCase();
  return (
    <>
      <div className=" w-full max-w-1200 max-auto px-4">
        <div className="row productDetails  flex justify-center w-full items-center">
          <div className="col-6 flex  flex-col  items-center justify-center">
            {/* Centering the Main Image */}
            <div className="lg:w-[500px] border-b lg:h-[500px] w-[300px] h-[300px] flex flex-col justify-center items-center overflow-hidden">
              {/* <p className="text-gray-300">move cursor on the image to zoom</p> */}
              <img
                src={selectedImage || data?.image?.[0]}
                className="lg:max-w-[300px] lg:max-h-[300px] object-contain transition-transform duration-300 ease-in-out hover:scale-125"
              />
            </div>

            {/* Thumbnail Images */}
            <div className="flex lg:gap-4 overflow-x-auto">
              {data?.image.map((img, i) => (
                <div key={i} className="w-[80px] h-[80px] lg:w-[120px] lg:h-auto p-2 flex justify-center items-center ">
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-conatin"
                    onClick={() => setSelectedImage(img)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="col-6  md:pt-32 lg:w-[50%]  pt-10 w-full md:w-auto flex flex-col justify-start items-start">
            <div className="details ">
              <h3 className="fs-1 text fw-normal">{data?.title}</h3>
              <h5 className="pb-4 mt-1">
                <b>
                  Category: <span className="font-medium">{data?.category}</span>
                </b>
              </h5>
              {/* {data?.category && (
                <div className="size-selector mb-6">
                  <h4 className="text-lg font-semibold mb-3">SIZE</h4>

                  {(() => {
                    const sizes = getSizesForCategory(data.category);

                    if (sizes === "no-size") {
                      return <p className="text-gray-600">One size fits most</p>;
                    }

                    if (sizes === "snapback") {
                      return <p className="text-gray-600">Snapback hat - one size fits most</p>;
                    }

                    if (Array.isArray(sizes)) {
                      return (
                        <div className="flex flex-wrap gap-2">
                          {sizes.map((size) => (
                            <button
                              key={size}
                              className={`size-btn px-2 text-xl font-medium ${selectedSize === size ? "bg-orange-500 text-white" : "bg-gray-100"
                                }`}
                              onClick={() => setSelectedSize(size)}
                            >
                              {size}
                            </button>
                          ))}
                        </div>
                      );
                    }

                    if (typeof sizes === "object") {
                      return (
                        <div className="glove-sizing">
                          <div className="youth-sizing mb-4">
                            <h5 className="font-medium mb-2">Youth Sizing</h5>
                            <div className="flex flex-wrap gap-2">
                              {sizes.youth.map((size) => (
                                <button
                                  key={size}
                                  className={`size-btn text-xl px-2 font-medium ${selectedSize === size ? "bg-orange-500 text-white" : "bg-gray-100"
                                    }`}
                                  onClick={() => setSelectedSize(size)}
                                >
                                  {size}
                                </button>
                              ))}
                            </div>
                          </div>
                          <div className="standard-sizing">
                            <h5 className="font-medium mb-2">Standard Sizing</h5>
                            <div className="flex flex-wrap gap-2">
                              {sizes.standard.map((size) => (
                                <button
                                  key={size}
                                  className={`size-btn text-xl px-2 font-medium ${selectedSize === size ? "bg-orange-500 text-white" : "bg-gray-100"
                                    }`}
                                  onClick={() => setSelectedSize(size)}
                                >
                                  {size}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      );
                    }

                    return null;
                  })()}
                </div>
              )} */}
              <div className="flex flex-col items-start gap-1 mb-3">
                <h4 className="text-lg font-semibold ">FIT TYPE</h4>
                <div className="flex flex-wrap gap-2">
                  <select
                    className="size-btn px-2 text-xl font-medium bg-gray-100"
                    onChange={(e) => setFitType(e.target.value)}
                    value={fitType || 'all'}
                  >
                    <option className="size-btn px-2 text-xl font-medium bg-gray-100" value="all">
                      All
                    </option>
                    <option className="size-btn px-2 text-xl font-medium bg-gray-100" value="youth">
                      Youth
                    </option>
                    <option className="size-btn px-2 text-xl font-medium bg-gray-100" value="adult">
                      Adult
                    </option>
                  </select>
                </div>
              </div>
              {data?.category && (
                <div className="flex items-center gap-5 mb-3">
                  <div className="flex flex-col items-start gap-1 ">
                    <h4 className="text-lg font-semibold ">SIZE</h4>

<div className="flex flex-wrap gap-2">
  {Array.isArray(data.size) &&
    [...data.size] // don't mutate original
      .sort((sizeA, sizeB) => {
        const a = String(sizeA).trim().toUpperCase();
        const b = String(sizeB).trim().toUpperCase();

        const rankA =
          SIZE_ORDER_MAP[a] !== undefined ? SIZE_ORDER_MAP[a] : Number.MAX_SAFE_INTEGER;
        const rankB =
          SIZE_ORDER_MAP[b] !== undefined ? SIZE_ORDER_MAP[b] : Number.MAX_SAFE_INTEGER;

        if (rankA !== rankB) return rankA - rankB;
        // if both unknown or same rank, fallback to alpha for stable order
        return a.localeCompare(b);
      })
      .filter((size) => {
        const raw = String(size).trim();
        const lower = raw.toLowerCase();

        // never show literal "youth" / "adult"
        if (lower === "youth" || lower === "adult") return false;

        if (fitType === "all") return true;

        if (fitType === "youth") {
          return raw.toUpperCase().startsWith("Y"); // YS, YM, YL, YXL
        }

        if (fitType === "adult") {
          return !raw.toUpperCase().startsWith("Y"); // XS, S, M, L, XL, XXL, ...
        }

        return true;
      })
      .map((size) => {
        const isSoldOut = data.soldOutSizes?.includes(size);

        return (
          <button
            key={size}
            className={`size-btn px-2 text-xl font-medium ${
              isSoldOut
                ? "bg-gray-300 text-gray-500 cursor-not-allowed line-through"
                : selectedSize === size
                ? "bg-orange-500 text-white"
                : "bg-gray-100"
            }`}
            onClick={() => !isSoldOut && setSelectedSize(size)}
            disabled={isSoldOut}
            title={isSoldOut ? "This size is sold out" : ""}
          >
            {size}
          </button>
        );
      })}
</div>


                  </div>
                </div>
              )}

              {/* Size Chart Modal */}
              {showSizeChart && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white p-6 rounded-lg max-w-2xl w-full">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-bold">Size Guide</h3>
                      <button onClick={() => setShowSizeChart(false)}>✕</button>
                    </div>
                    <div className="glove-size-chart">
                      <h4 className="font-semibold mb-2">Batting Gloves Sizing</h4>
                      <table className="w-full border-collapse mt-10 lg:mt-32">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="p-2 border">Size</th>
                            <th className="p-2 border">Hand Circumference</th>
                            <th className="p-2 border">Age</th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* Youth Sizes */}
                          <tr>
                            <td colSpan="3" className="font-medium p-2 bg-gray-50">
                              Youth Sizes
                            </td>
                          </tr>
                          {[
                            {
                              size: 'YS',
                              circumference: '5.5"-6"',
                              age: '6-8',
                            },
                            {
                              size: 'YM',
                              circumference: '6"-6.5"',
                              age: '8-10',
                            },
                            {
                              size: 'YL',
                              circumference: '6.5"-7"',
                              age: '10-12',
                            },
                            {
                              size: 'YXL',
                              circumference: '7"-7.5"',
                              age: '12-14',
                            },
                          ].map((row) => (
                            <tr key={row.size} className="border-t">
                              <td className="p-2 border">{row.size}</td>
                              <td className="p-2 border">{row.circumference}</td>
                              <td className="p-2 border">{row.age}</td>
                            </tr>
                          ))}

                          {/* Standard Sizes */}
                          <tr>
                            <td colSpan="3" className="font-medium p-2 bg-gray-50">
                              Standard Sizes
                            </td>
                          </tr>
                          {[
                            {
                              size: 'S',
                              circumference: '7"-7.5"',
                              age: '13+',
                            },
                            {
                              size: 'M',
                              circumference: '7.5"-8"',
                              age: 'Adult',
                            },
                            {
                              size: 'L',
                              circumference: '8"-8.5"',
                              age: 'Adult',
                            },
                            {
                              size: 'XL',
                              circumference: '8.5"-9"',
                              age: 'Adult',
                            },
                            {
                              size: 'XXL',
                              circumference: '9"-9.5"',
                              age: 'Adult',
                            },
                            {
                              size: 'XXXL',
                              circumference: '9.5"+',
                              age: 'Adult',
                            },
                          ].map((row) => (
                            <tr key={row.size} className="border-t">
                              <td className="p-2 border">{row.size}</td>
                              <td className="p-2 border">{row.circumference}</td>
                              <td className="p-2 border">{row.age}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {/* {data?.category.toLowerCase() === "batting gloves" ? (
                    
                    ) : (
                     
                    )} */}
                    <div className="standard-size-chart">
                      <h4 className="font-semibold mb-2">Standard Sizing</h4>
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="p-2 border">Size</th>
                            <th className="p-2 border">Chest (in)</th>
                            <th className="p-2 border">Waist (in)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            { size: 'S', chest: '34-36', waist: '28-30' },
                            { size: 'M', chest: '38-40', waist: '32-34' },
                            { size: 'L', chest: '42-44', waist: '36-38' },
                            { size: 'XL', chest: '46-48', waist: '40-42' },
                            { size: 'XXL', chest: '50-52', waist: '44-46' },
                          ].map((row) => (
                            <tr key={row.size} className="border-t">
                              <td className="p-2 border">{row.size}</td>
                              <td className="p-2 border">{row.chest}</td>
                              <td className="p-2 border">{row.waist}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <button
                      className="mt-4 bg-orange-500 text-white px-4 py-2 rounded"
                      onClick={() => setShowSizeChart(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
              <p className="fw-bold" style={{ color: '#61ce70' }}>
                <span
                  style={{
                    fontSize: '30px',
                    color: '#858484',
                    fontWeight: '500',
                  }}
                >
                  ${data?.price}
                </span>{' '}
                {data?.isSoldOut ? (
                  <p style={{ color: 'red', fontWeight: 'bold' }}>SOLD OUT</p>
                ) : data?.stock > 0 ? (
                  <p>IN STOCK</p>
                ) : (
                  <p style={{ color: 'grey' }}>OUT OF STOCK</p>
                )}
              </p>
              <ReactStars
                count={5}
                onChange={ratingChanged}
                size={30}
                isHalf={true}
                value={4}
                color="#ccc"
                activeColor="#ffd700"
              />
            </div>

            {(data?.stock || data?.stock > 0) && !data?.isSoldOut && (
              <div className="product-counter flex justify-start items-center gap-3 py-4">
                {/* quantity controls */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity((p) => Math.max(1, p - 1))}
                    disabled={quantity === 1}
                    className={`px-3 py-1 text-lg font-semibold border rounded ${
                      quantity === 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white hover:bg-gray-100'
                    }`}
                  >
                    –
                  </button>
                  <span className="px-4 py-1 text-lg font-medium border rounded bg-white">{quantity}</span>
                  <button
                    onClick={() => setQuantity((p) => p + 1)}
                    className="px-3 py-1 text-lg font-semibold border rounded bg-white hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>

                {/* Buy Now / Add to Cart both go through handleCart */}
                <div className="flex justify-center items-center" style={{ gap: '20px' }}>
                  <button className="btn rounded-2xl text-white bg-[#ff5B00]" onClick={handleCart}>
                    Buy Now
                  </button>
                  <button className="btn bg-[#ff0024] rounded-2xl text-white" onClick={handleCart}>
                    Add to Cart
                  </button>
                </div>
              </div>
            )}

            <div className="method">
              <img src={Payment} style={{ zoom: '1.1' }} />
            </div>
          </div>
        </div>
      </div>

      <section>
        <nav>
          <div style={{ borderBottom: '1px solid #dee2e6' }} className="mt-4">
            <div className="nav nav-tabs" id="nav-tab" role="tablist" style={{ width: '90%', margin: 'auto' }}>
              <button
                className="nav-link active tabs-btn"
                id="nav-home-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-home"
                type="button"
                role="tab"
                aria-controls="nav-home"
                aria-selected="true"
              >
                DESCRIPTION
              </button>
              <button
                className="nav-link tabs-btn2"
                id="nav-profile-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-profile"
                type="button"
                role="tab"
                aria-controls="nav-profile"
                aria-selected="false"
              >
                REVIEWS
              </button>
            </div>
          </div>
        </nav>
        <div className="tab-content" id="nav-tabContent" style={{ width: '90%', margin: 'auto', padding: '40px ' }}>
          <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
            <h2 className="fs-2 text">DESCRIPTION</h2>
            <p className="pb-4"> {data?.description}</p>
          </div>
          <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
            <h2 className="fs-2 text">REVIEWS</h2>
          </div>
        </div>
      </section>
    </>
  );
};
export default Productdetails;
