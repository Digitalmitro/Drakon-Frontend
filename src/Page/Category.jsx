import React, { useState } from 'react';

const Category = () => {
  const [priceRange, setPriceRange] = useState([0, 800]);
  const [ratingFilter, setRatingFilter] = useState(0);

  const products = [
    { id: 1, name: 'Elbow Guard', price: 265, rating: 5, image: 'path/to/image.jpg' },
    { id: 2, name: 'Elbow Guard', price: 265, rating: 5, image: 'path/to/image.jpg' },
    // Add more products as needed
  ];

  const filteredProducts = products.filter(product => 
    product.price >= priceRange[0] && 
    product.price <= priceRange[1] &&
    product.rating >= ratingFilter
  );

  const handlePriceChange = (e) => {
    const value = Number(e.target.value);
    if (e.target.name === 'min') {
      setPriceRange([value, priceRange[1]]);
    } else {
      setPriceRange([priceRange[0], value]);
    }
  };

  const handleRatingChange = (e) => {
    setRatingFilter(Number(e.target.value));
  };

  return (
    <div className="Category">
      <div className="sidebar">
        <h3 style={{fontWeight:"600"}}>Categories</h3>
        <div>Elbow Guard</div>
        <h3>Price</h3>
        <input type="range" min="0" max="800" value={priceRange[0]} name="min" onChange={handlePriceChange} />
        <input type="range" min="0" max="800" value={priceRange[1]} name="max" onChange={handlePriceChange} />
        <div>
          <input type="number" value={priceRange[0]} name="min" onChange={handlePriceChange} />
          <input type="number" value={priceRange[1]} name="max" onChange={handlePriceChange} />
        </div>
        
      </div>
      <div className="product-grid">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <div>{product.name}</div>
            <div>${product.price.toFixed(2)}</div>
            <div>{'★'.repeat(product.rating)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Category;
