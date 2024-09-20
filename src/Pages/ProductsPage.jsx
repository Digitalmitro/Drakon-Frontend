import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { NavLink } from "react-router-dom";
import Layout from './Layout';
import DotLoader from 'react-spinners/DotLoader';
import Slider from 'react-slider'; 
import productImage from '../assets/slide-img4.jpg'
import "../Components/styles/products.css"
const CategoryPage = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 30000]);
  const [filteringLoading, setFilteringLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const productsPerPage = 6; // Number of products per page

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset page when filtering
    setFilteringLoading(true); // Show spinner during search
  };

  // Handle price range change
  const handlePriceRangeChange = (range) => {
    setPriceRange(range);
    setCurrentPage(1); // Reset page when filtering
    setFilteringLoading(true); // Show spinner during price range filtering
  };

  // Filter the products based on search query and price range
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
    product.price >= priceRange[0] &&
    product.price <= priceRange[1]
  );

  // Get the current products to display on the page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Scroll to top when the page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const getData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_API}/products`);
      setProducts(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const getCategoryData = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_API}/products`);
      const uniqueCategories = [...new Set(res.data.map(item => item.category))];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (categoryName) {
      const fetchProducts = async () => {
        try {
          setLoading(true);
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_API}/products-filters?category=${categoryName}`);
          setProducts(response.data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching products:', error);
          setLoading(false);
        }
      };

      fetchProducts();
    } else {
      getData();
    }
  }, [categoryName]);

  useEffect(() => {
    getCategoryData();
  }, []);

  // Update filtering loading state based on filtering
  useEffect(() => {
    if (filteringLoading) {
      const timer = setTimeout(() => {
        setFilteringLoading(false);
      }, 500); // Adjust timeout as needed
      return () => clearTimeout(timer); // Clean up timer on component unmount
    }
  }, [filteredProducts]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <DotLoader color="#c75840" size={50} />
      </div>
    );
  }

  return (
    <Layout>
      <div className='category-page-container my-3 flex'>
        {/* Left Sidebar */}
        <div
          className="search-func"
          style={{
            width: "18%",
            padding: "20px",
            marginTop: "45px",
            borderRight: "1px solid #ddd",
          }}
        >
          {/* Filter UI */}
          <div>
            <h5>Search</h5>
            <input
              type="text"
              value={searchQuery}
              placeholder="Search products..."
              style={{
                width: "100%",
                padding: "8px",
                marginBottom: "20px",
                height: "5vh",
              }}
              onChange={handleSearchChange}
            />
          </div>
          <hr />
          <div
            className="fetch-all-products"
            onClick={getData}
            style={{ cursor: "pointer" }}
          >
            <h5>All Products</h5>
            <hr />
          </div>

          <div>
            <h5 className="my-3">Categories</h5><hr/>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {categories?.map((category, index) => (
                <li key={index} className="my-2 mx-3">
                  <NavLink
                    to={`/category/${encodeURIComponent(category)}`}
                    className="mx-2"
                  >
                    {category}
                  </NavLink>
                  <hr/>
                </li>
              ))}
            </ul>
          </div>

          <div className="my-4">
            <h5 className="my-4">Filter by Price</h5>
            <div style={{ marginBottom: "20px" }}>
              <Slider
                range
                min={0}
                max={30000}
                value={priceRange}
                onChange={handlePriceRangeChange}
                renderTrack={(props, state) => (
                  <div {...props} className="slider-track" />
                )}
                renderThumb={(props, state) => (
                  <div {...props} className="slider-thumb" />
                )}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "15px",
                }}
              >
                <span className="my-2">₹{priceRange[0]}</span>
                <span className="my-2">₹{priceRange[1]}</span>
              </div>
            </div>
          </div>
          <hr/>
        </div>

        {/* Right Product Display */}
        <div className='product-display' >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {filteringLoading ? (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                <DotLoader color="#ff5722" size={60} />
              </div>
            ) : (
              products.length === 0 ? (
                <NavLink  to={`/product-details/123`} style={{ textDecoration: 'none'}}>
                <div className='prod-card'>
                  <img
                    src={productImage}
                    alt="productImage"
                    style={{ width: "150px", height: '21vh', borderRadius: '5px', marginBottom: '10px' }}
                  />
                  <h4 style={{ fontSize: '0.9rem', marginBottom: '10px' }}>Sports Gloves </h4>
                  <p style={{ textAlign: 'center', marginBottom: '10px',fontSize:"0.8rem" }}>Products Golves for good grip...</p>
                  <p style={{ fontSize: '1.1rem', fontWeight: 'bold', opacity:"0.8" }}>₹7000</p>
                  <button
                    style={{
                      backgroundColor: '#ff5722',
                      color: '#fff',
                      border: 'none',
                      width:"100%",
                      padding: '5px 10px',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      fontSize:"0.8rem"
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </NavLink>
                // <p>No products found within the selected price range.</p>
              ) : (
                products.map(product => (
                  <NavLink key={product._id} to={`/product-details/${product._id}`} style={{ textDecoration: 'none'}}>
                    <div className='prod-card'>
                      <img
                        src={product.image[0]}
                        alt={product.title}
                        style={{ width: "150px", height: '21vh', borderRadius: '5px', marginBottom: '10px' }}
                      />
                      <h4 style={{ fontSize: '0.9rem', marginBottom: '10px' }}>{product.title.substring(0,18)}</h4>
                      <p style={{ textAlign: 'center', marginBottom: '10px',fontSize:"0.8rem" }}>{product.description.substring(0,32)}...</p>
                      <p style={{ fontSize: '1.1rem', fontWeight: 'bold', opacity:"0.8" }}>₹{product.price}</p>
                      <button
                        style={{
                          backgroundColor: '#ff5722',
                          color: '#fff',
                          border: 'none',
                          width:"100%",
                          padding: '5px 10px',
                          borderRadius: '5px',
                          cursor: 'pointer',
                          fontSize:"0.8rem"
                        }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </NavLink>
                ))
              )
            )}
          </div>

          {/* Pagination */}
          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
            {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }, (_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                style={{
                  padding: '8px 16px',
                  margin: '0 5px',
                  border: '1px solid #ddd',
                  backgroundColor: currentPage === index + 1 ? '#ff5722' : '#fff',
                  color: currentPage === index + 1 ? '#fff' : '#000',
                  cursor: 'pointer',
                  borderRadius: '4px',
                }}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;
