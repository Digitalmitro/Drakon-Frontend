import { useEffect, useState } from 'react';
import ReactStars from 'react-rating-stars-component';
import Payment from '../assets/method.png';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import { addItem } from '../Redux/CartSlice';

const Productdetails = () => {
   let fitTypeShowing = true;
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState(null);
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [fitType, setFitType] = useState('youth');
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    fitTypeShowing = true;
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

  console.log('Product Data:', data);
  const handleCart = async () => {
    if (!data) return;

    // Check if product or selected size is sold out
    if (data.isSoldOut) {
      message.error('This product is sold out');
      return;
    }

    console.log('Selected Size:', selectedSize);
    console.log('Fit Type Showing:', fitTypeShowing);

    if (data?.size?.length > 0 ) {
      console.log('Size selection is required', selectedSize);
      if (!selectedSize || selectedSize === null) {
        message.error('Please select a size');
        return;
      }
    }

    if (data?.soldOutSizes?.length > 0 && !data.soldOutSizes.includes(selectedSize)) {
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

 
  const renderFitTypeButtons = (category = '', name = '') => {
    if (category.toLowerCase() == 'sunglasses' || category.toLowerCase() == 'eyewear') {fitTypeShowing = false; return null;}
    if (name.toLowerCase().includes('sunglasses') || name.toLowerCase().includes('headband') || name.toLowerCase().includes('compression sleeve')){ fitTypeShowing = false; return null;}
    
    if(category.toLowerCase().includes('equipment')){ fitTypeShowing = false; return null;}
    return (
      <div className="flex flex-col items-start gap-1 mb-3">
        <h4 className="text-lg font-semibold">FIT TYPE</h4>
        <div className="flex gap-3">
          {['youth', 'adult'].map((type) => (
            <button
              key={type}
              onClick={() => setFitType(type)}
              className={`px-4 py-1 rounded-md border text-sm font-medium transition
                                  ${
                                    fitType === type
                                      ? 'bg-black text-white border-black'
                                      : 'bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200'
                                  }
                                `}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>
    );
  };

  // Helpers (can live above the component)
  const normalizeSize = (value) => String(value ?? '').trim();
  const toKey = (value) => normalizeSize(value).toUpperCase();

  const sortSizes = (sizes, sizeOrderMap) =>
    [...sizes].sort((sizeA, sizeB) => {
      const aKey = toKey(sizeA);
      const bKey = toKey(sizeB);

      const rankA = sizeOrderMap[aKey] ?? Number.MAX_SAFE_INTEGER;
      const rankB = sizeOrderMap[bKey] ?? Number.MAX_SAFE_INTEGER;

      if (rankA !== rankB) return rankA - rankB;
      return aKey.localeCompare(bKey);
    });

  const filterSizesByFitType = (sizes, fitType) =>
    sizes.filter((size) => {
      if(fitTypeShowing === false) return true;
      const raw = normalizeSize(size);
      const lower = raw.toLowerCase();
      const upper = raw.toUpperCase();

      // never show literal "youth" / "adult"
      if (lower === 'youth' || lower === 'adult') return false;

      if (fitType === 'all') return true;

      if (fitType === 'youth') {
        // YS, YM, YL, YXL etc.
        return upper.startsWith('Y');
      }

      if (fitType === 'adult') {
        // XS, S, M, L, XL, XXL etc.
        return !upper.startsWith('Y');
      }

      return true;
    });

  const getSizeButtonClasses = (size, selectedSize, isSoldOut) => {
    if (isSoldOut) {
      return 'size-btn px-2 text-xl font-medium bg-gray-300 text-gray-500 cursor-not-allowed line-through';
    }

    if (selectedSize === size) {
      return 'size-btn px-2 text-xl font-medium bg-orange-500 text-white';
    }

    return 'size-btn px-2 text-xl font-medium bg-gray-100';
  };

  const renderSizeButtons = (data) => {
    const allSizes = Array.isArray(data.size) ? data.size : [];

    const sortedSizes = sortSizes(allSizes, SIZE_ORDER_MAP);
    const visibleSizes = filterSizesByFitType(sortedSizes, fitType);

    if (!visibleSizes.length) {
      return null; // or fallback UI if you want
    }

    return (
      <div className="flex items-center gap-5 mb-3">
        <div className="flex flex-col items-start gap-1">
          <h4 className="text-lg font-semibold">SIZE</h4>

          <div className="flex flex-wrap gap-2">
            {visibleSizes.map((size) => {
              const isSoldOut = data.soldOutSizes?.includes(size);
              const classes = getSizeButtonClasses(size, selectedSize, isSoldOut);

              return (
                <button
                  key={size}
                  className={classes}
                  onClick={() => !isSoldOut && setSelectedSize(size)}
                  disabled={isSoldOut}
                  title={isSoldOut ? 'This size is sold out' : ''}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

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

              {renderFitTypeButtons(data?.category, data?.title)}

              {data?.category && renderSizeButtons(data)}

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
