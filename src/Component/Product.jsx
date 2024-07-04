import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

const Product = () => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(30000);
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getData = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_API}/products`);
      setData(res.data);
      setLoad(true);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoad(true);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleMinPriceChange = (e) => {
    const newMinPrice = parseInt(e.target.value);
    if (newMinPrice >= 0 && newMinPrice <= maxPrice - 500) {
      setMinPrice(newMinPrice);
    }
  };

  const handleMaxPriceChange = (e) => {
    const newMaxPrice = parseInt(e.target.value);
    if (newMaxPrice >= minPrice + 500 && newMaxPrice <= 30000) {
      setMaxPrice(newMaxPrice);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredData = data.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
    item.price >= minPrice &&
    item.price <= maxPrice
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <>
      <section>
        <div className="container-fliud">
          <div className="row">
            <div className="col-md-2">
              <div className="sidebar p-3 bg-light">
                <div className="mb-3">
                  <label
                    htmlFor="searchBox"
                    className="form-label"
                    style={{ fontWeight: "600", fontSize: "20px" }}
                  >
                    Search
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="searchBox"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                </div>
                <div className="mb-3 py-2">
                  <h3
                    style={{
                      fontWeight: "600",
                      fontSize: "20px",
                      padding: ".9rem 0",
                    }}
                  >
                    Categories
                  </h3>
                  <div className="list-group">
                    <a href="#" className="list-group-item list-group-item-action">Electronics</a>
                    <a href="#" className="list-group-item list-group-item-action">Fashion</a>
                    <a href="#" className="list-group-item list-group-item-action">Home & Kitchen</a>
                    <a href="#" className="list-group-item list-group-item-action">Books</a>
                    <a href="#" className="list-group-item list-group-item-action">Sports</a>
                  </div>
                </div>
                <div className="price-input-container">
                  <div className="slider-container">
                    <div
                      className="price-slider"
                      style={{
                        width: `${((maxPrice - minPrice) / 30000) * 100}%`,
                        left: `${(minPrice / 30000) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
                <div className="range-input">
                  <input
                    type="range"
                    className="min-range"
                    min="0"
                    max="30000"
                    value={minPrice}
                    step="1"
                    onChange={handleMinPriceChange}
                  />
                  <input
                    type="range"
                    className="max-range"
                    min="0"
                    max="30000"
                    value={maxPrice}
                    step="1"
                    onChange={handleMaxPriceChange}
                  />
                </div>
                <div className="price-input">
                  <div className="price-field">
                    <input
                      type="number"
                      className="min-input"
                      value={minPrice}
                      onChange={handleMinPriceChange}
                    />
                  </div>
                  <div className="price-field">
                    <input
                      type="number"
                      className="max-input"
                      value={maxPrice}
                      onChange={handleMaxPriceChange}
                    />
                  </div>
                </div>
                <div>
                  <select
                    style={{
                      width: "100%",
                      padding: "10px",
                      margin: "10px 0",
                    }}
                  >
                    <option value="0">All Ratings</option>
                    <option value="4">4★ & above</option>
                    <option value="3">3★ & above</option>
                    <option value="2">2★ & above</option>
                    <option value="1">1★ & above</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="col-md-10 my-5">
              <div className="row">
                {load ? (
                  paginatedData.length > 0 ? (
                    paginatedData.map((info) => (
                      <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={info._id}>
                        <Link to={`/productDetails/${info._id}`}>
                          <div className="card h-100">
                            <img src={info.image} alt={info.title} />
                            <div className="card-body">
                              <h5 className="card-title">{info.title}</h5>
                              <p className="card-text">${info.price}</p>
                              <p className="card-text">
                                <span className="text-warning star">⭐⭐⭐⭐☆</span>
                              </p>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))
                  ) : (
                    <p>No matching products found</p>
                  )
                ) : (
                  "Loading..."
                )}
                <div className=" py-3">
                <nav aria-label="Page navigation example  mx-3">
                  <ul className="pagination p-1 px-5 ">
                    <li className={`page-item  ${currentPage === 1 ? 'disabled' : ''}`}
                   
                    >
                      <button
                       style={{borderColor:"coral", color:"coral"}}
                        className="page-link p-2 px-3 m-1 mx-2 rounded-circle"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        <span aria-hidden="true">&laquo;</span>
                      </button>
                    </li>
                    {Array.from({ length: totalPages }).map((_, index) => (
                      <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                        <button className="page-link p-2 px-3 m-1 mx-2 rounded-circle"  style={{borderColor:"coral", 
                        backgroundColor: currentPage === index + 1 ? "coral" : "transparent",
                       color: currentPage === index + 1 ? "white" : "coral"
                          
                          }} onClick={() => handlePageChange(index + 1)}>
                          {index + 1}
                        </button>
                      </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                      <button
                        className="page-link p-2 px-3 m-1 mx-2 rounded-circle"
                        style={{borderColor:"coral", color:"coral"}}
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        <span aria-hidden="true">&raquo;</span>
                      </button>
                    </li>
                  </ul>
                </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Product;
