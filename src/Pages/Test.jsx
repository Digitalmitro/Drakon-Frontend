import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import axios from 'axios';
import Layout from './Layout';
import DotLoader from 'react-spinners/DotLoader'; // Import DotLoader
import Slider from 'react-slider'; // Import Slider

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // General loading state
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 30000]); // Price range state
  const [filteringLoading, setFilteringLoading] = useState(false); // Loading for filter/search operations

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle price range change
  const handlePriceRangeChange = (range) => {
    setPriceRange(range);
  };

  // Introduce a delay and loading state for filtering
  useEffect(() => {
    setFilteringLoading(true); // Show spinner during filtering

    const filterTimeout = setTimeout(() => {
      setFilteringLoading(false); // Hide spinner after filtering completes
    }, 500); // Delay of 500ms

    return () => clearTimeout(filterTimeout); // Cleanup timeout on unmount or new filter
  }, [searchQuery, priceRange]);

  // Filter the products based on search query and price range
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
    product.price >= priceRange[0] &&
    product.price <= priceRange[1]
  );

  const getData = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_API}/products`);
      setProducts(res.data); // Set all products to products state
      setLoading(false);

      // Extract unique categories
      const uniqueCategories = [...new Set(res.data.map(item => item.category))];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (categoryName) {
      const fetchProducts = async () => {
        try {
          setLoading(true); // Set loading state
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_API}/products-filters?category=${categoryName}`);
          setProducts(response.data);
          setLoading(false); // Stop loading after data is fetched
        } catch (error) {
          console.error('Error fetching products:', error);
          setLoading(false); // Stop loading in case of error
        }
      };

      fetchProducts();
    } else {
      // If no category is selected, fetch all products
      getData();
    }
  }, [categoryName]);

  // Show a spinner if the main loading state is true
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <DotLoader color="#c75840" size={60} /> {/* Spinner for main loading */}
      </div>
    );
  }

  return (
    <Layout>
      <div style={{ display: 'flex' }}>
        {/* Left Sidebar */}
        <div style={{ width: '25%', padding: '20px', borderRight: '1px solid #ddd' }}>
          <div>
            <h3>Search</h3>
            <input
              type="text"
              value={searchQuery}
              placeholder="Search products..."
              style={{ width: '100%', padding: '8px', marginBottom: '20px' }}
              onChange={handleSearchChange}
            />
          </div>

          <div className="fetch-all-products" onClick={getData} style={{ cursor: 'pointer' }}>
            <h5>All Products</h5>
          </div>
          
          <div>
            <h3>Categories</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {categories?.map((category, index) => (
                <li key={index}>
                  <NavLink 
                    to={`/category/${encodeURIComponent(category)}`} 
                    className="mx-2"
                  >
                    {category}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3>Filter by Price</h3>
            <div style={{ marginBottom: '20px' }}>
              <Slider
                range
                min={0}
                max={30000}
                value={priceRange}
                onChange={handlePriceRangeChange}
                renderTrack={(props, state) => <div {...props} className="slider-track" />}
                renderThumb={(props, state) => <div {...props} className="slider-thumb" />}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px' }}>
                <span className='my-2'>₹{priceRange[0]}</span>
                <span className='my-2'>₹{priceRange[1]}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Product Display */}
        <div style={{ width: '75%', padding: '20px' }}>
          <h1>Products</h1>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {filteringLoading ? (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                <DotLoader color="#ff5722" size={60} /> {/* Spinner for filtering/loading */}
              </div>
            ) : (
              filteredProducts.length === 0 ? (
                <p>No products found within the selected price range.</p>
              ) : (
                filteredProducts.map(product => (
                  <NavLink 
                    key={product._id}
                    to={`/product/${product._id}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <div
                      style={{
                        border: '1px solid #ddd',
                        borderRadius: '10px',
                        padding: '20px',
                        width: 'calc(33% - 40px)',
                        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <img
                        src={product.image[0]}
                        alt={product.title}
                        style={{ width: '100%', height: 'auto', borderRadius: '5px', marginBottom: '10px' }}
                      />
                      <h2 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>{product.title}</h2>
                      <p style={{ textAlign: 'center', marginBottom: '10px' }}>{product.description}</p>
                      <p style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>₹{product.price}</p>
                      <button
                        style={{
                          backgroundColor: '#ff5722',
                          color: '#fff',
                          border: 'none',
                          padding: '10px 20px',
                          borderRadius: '5px',
                          cursor: 'pointer'
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
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;
