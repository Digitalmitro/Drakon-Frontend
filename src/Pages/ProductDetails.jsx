import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DotLoader from 'react-spinners/DotLoader'; // Import DotLoader
import Layout from './Layout';
import paypic from '../assets/paypic.png'


const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('description');

  console.log("productss",product)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_API}/products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product details:', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="loading-container">
        <DotLoader color="#c75840" size={60} /> {/* Spinner for loading */}
      </div>
    );
  }

  if (!product) {
    return <p>Product not found.</p>;
  }

  return (
    <Layout>
      <div className="container">
      {/* Left Div */}
      <div className="left-div">
        <img
          src={product.image[0]}
          alt={product.title}
        />
        <div className="tabs">
          <button
            onClick={() => setActiveTab('description')}
            className={`tab-button ${activeTab === 'description' ? 'active' : ''}`}
          >
            Description
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`tab-button ${activeTab === 'reviews' ? 'active' : ''}`}
          >
            Reviews
          </button>
          <div className="tab-content">
            {activeTab === 'description' && (
              <p>{product.description}</p>
            )}
            {activeTab === 'reviews' && (
              <p>No reviews available.</p>
            )}
          </div>
        </div>
      </div>

      {/* Right Div */}
      <div className="right-div">
        <h3>{product.title}</h3>
        <p><strong style={{opacity:"0.8"}}>Category:</strong> {product.category}</p>
        <p className="price">${product.price}</p>

        <p className={`stock-status ${product.stock.length === 0 ? 'out-of-stock' : 'in-stock'}`}>
        {product.stock.length === 0 ? 'Out of Stock' : 'In Stock'}
      </p>
        {/* <p>{product.stock}</p> */}
        <div className="rating">
          <p>Rating: {'★★★★★'.slice(0, product.rating)}{product.rating}</p>
        </div>
        <div className="quantity-controls">
          <button>-</button>
          <span >1</span>
          <button className='mx-2'> +</button>
        </div>
        <div className='d-flex gap-4'>
          <button className="buynow-button">
            Buy Now
          </button>

          <button className="add-to-cart-button">
            Add to Cart
          </button>
        </div>
        <img className='my-5' style={{width:"100%"}} src={paypic} alt="" />
      </div>
    </div>
    </Layout>
    
  );
};

export default ProductDetails;
