import React from 'react'
import { useProduct } from '../context/ProductContext'
import { useState } from 'react';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

function AllProductByCategory() {
    const urlname=useParams();
    console.log(urlname)
    const product=Object.values(urlname)[0]
    const {getAllProductsByCategories}=useProduct();
    const [sunglasses,setSunglasses]=useState([])
    const [filteredProducts, setFilteredProducts] = useState([]);
    const fetchSunglasses=async()=>{
        let response
            if(product=="sunglasses"){
                response=await getAllProductsByCategories("Sunglasses");
            }
            if(product=="batting-gloves"){
                response=await getAllProductsByCategories("Batting Gloves");
            }
            if(product=="apparel"){
                response=await getAllProductsByCategories("Apparel");
            }
            if(product=="accessories"){
                response=await getAllProductsByCategories("Accessories");
            }
            if(product=="equipment"){
                response=await getAllProductsByCategories("Equipment");
            }
           
        setSunglasses(response);
        setFilteredProducts(response);
    }
    useEffect(()=>{
        fetchSunglasses();
    },[urlname]);

    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(500);
  
    const handleMinPriceChange = (e) => {
      const newMinPrice = parseInt(e.target.value);
      if (newMinPrice >= 0 && newMinPrice <= maxPrice - 10) {
        setMinPrice(newMinPrice);
      }
    };
  
    const handleMaxPriceChange = (e) => {
      const newMaxPrice = parseInt(e.target.value);
      if (newMaxPrice >= minPrice + 10 && newMaxPrice <= 500) {
        setMaxPrice(newMaxPrice);
      }
    };

    useEffect(() => {
      if (sunglasses.length > 0) {
        const filtered = sunglasses.filter(
          (item) => item.price >= minPrice && item.price <= maxPrice
        );
        setFilteredProducts(filtered);
      }
    }, [minPrice, maxPrice]);

  return (
    <div className='pt-20 flex flex-wrap lg:flex-row'>
      <div className='flex flex-wrap justify-center lg:gap-8 pt-4  w-full'>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((e) => (
            <div className="h-[450px]" key={e._id}>
              <Link to={`/productDetails/${e._id}`}>
                <div className="shadow-lg lg:h-[380px] lg:w-[350px] w-[400px] rounded flex flex-col justify-between gap-6 bg-white p-2">
                  <div className="flex justify-center lg:w-full bg-[#dddfe0]">
                    <img src={e.image?.[0]} className="object-contain h-[250px] w-[100%]" alt="Product" />
                  </div>
                  <div className="h-full space-y-1 px-2">
                    <h3 className="font-semibold text-xl">
                      {e.description.length > 25 ? `${e.description.slice(0, 35)}...` : e.description}
                    </h3>
                    <h4 className="text-[#959595] font-bold text-2xl">$ {e.price}</h4>
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-xl text-gray-500">No products found in this price range.</p>
        )}
      </div>
    </div>
  )
}

export default AllProductByCategory