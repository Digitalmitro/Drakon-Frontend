import React from "react";
import { Link, useLocation } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import Navbar from "./Navbar";

const ProductDetails = () => {
  const location = useLocation();

  // Mock data or use location.state.product
  const product = location.state?.Product || {
    name: "2025 Rawlings Icon USA Baseball Bat",
    originalPrice: 349.99,
    discountPrice: 329.99,
    description:
      "The 2025 Rawlings Icon USA Baseball Bat is designed for players who want a balanced swing and maximum performance.",
    images: [
      "/images/product1.jpg", // Replace with actual image URLs
      "/images/product2.jpg",
      "/images/product3.jpg",
    ],
    similarProducts: [
      // Add actual similar products here
    ],
  };

  // Inline styles
  const styles = {
    productDetailsPage: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "20px",
      marginTop: "12rem"
    },
    productDetailsContainer: {
      display: "flex",
      justifyContent: "space-between",
    },
    productImageSection: {
      flex: 1,
      marginRight: "20px",
    },
    productInfoSection: {
      flex: 1,
    },
    price: {
      fontSize: "20px",
      marginBottom: "20px",
    },
    originalPrice: {
      textDecoration: "line-through",
      color: "#888",
      marginRight: "10px",
    },
    discountPrice: {
      fontWeight: "bold",
      color: "#f00",
    },
    actions: {
      display: "flex",
      gap: "10px",
    },
    addToCartBtn: {
      backgroundColor: "#28a745",
      color: "#fff",
      padding: "10px 20px",
      border: "none",
      cursor: "pointer",
    },
    wishlistBtn: {
      backgroundColor: "#ffc107",
      color: "#fff",
      padding: "10px 20px",
      border: "none",
      cursor: "pointer",
    },
    similarProducts: {
      marginTop: "40px",
    },
    similarProductsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: "20px",
    },
    productCard: {
      border: "1px solid #ddd",
      padding: "10px",
      textAlign: "center",
    },
  };

  return (
    <>
      <Navbar />
      <div style={styles.productDetailsPage}>
        {/* Main Section with Product Details */}
        <div style={styles.productDetailsContainer}>
          {/* Left: Carousel for Product Images */}
          <div style={styles.productImageSection}>
            <Carousel className="product-carousel">
              {product.images.map((img, index) => (
                <Carousel.Item key={index}>
                  <img
                    className="d-block w-100"
                    src={img}
                    alt={`Slide ${index + 1}`}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          </div>

          {/* Right: Product Info */}
          <div style={styles.productInfoSection}>
            <h1>{product.name}</h1>
            <p style={styles.price}>
              {product.discountPrice ? (
                <>
                  <span style={styles.originalPrice}>
                    ${product.originalPrice}
                  </span>
                  <span style={styles.discountPrice}>
                    ${product.discountPrice}
                  </span>
                </>
              ) : (
                <span>${product.originalPrice}</span>
              )}
            </p>
            <p>{product.description}</p>

            {/* Add to Cart and Other Actions */}
            <div style={styles.actions}>
              <button style={styles.addToCartBtn}>Add to Cart</button>
              <button style={styles.wishlistBtn}>Add to Wishlist</button>
            </div>
          </div>
        </div>

        {/* You May Also Like Section */}
        <div style={styles.similarProducts}>
          <h2>You May Also Like</h2>
          <div style={styles.similarProductsGrid}>
            {product.similarProducts?.length ? (
              product.similarProducts.map((item) => (
                <div key={item.id} style={styles.productCard}>
                  <Link to={`/product/${item.id}`}>
                    <img src={item.image} alt={item.name} />
                    <h3>{item.name}</h3>
                    <p>
                      {item.discountPrice ? (
                        <>
                          <span style={styles.originalPrice}>
                            ${item.originalPrice}
                          </span>
                          <span style={styles.discountPrice}>
                            ${item.discountPrice}
                          </span>
                        </>
                      ) : (
                        <span>${item.originalPrice}</span>
                      )}
                    </p>
                  </Link>
                </div>
              ))
            ) : (
              <p>No similar products available</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
