import React from 'react'
import { useProduct } from '../context/ProductContext'
import { useState } from 'react';
import { useEffect } from 'react';
import { Link, } from 'react-router-dom';

function Shop() {
    const { getAllShopProduct } = useProduct();
    const [sunglasses, setSunglasses] = useState([])
    const fetchSunglasses = async () => {
        const response = await getAllShopProduct()
        setSunglasses(response)
    }
    useEffect(() => {
        fetchSunglasses();
    }, []);
    return (
        <div className='pt-20'>
            <div className='flex flex-wrap  gap-8 pt-4 lg:px-24'>
                {sunglasses?.map((e) => (
                    <div className="h-[450px] ">
                        <Link to={`/productDetails/${e._id}`}>
                            <div className="shadow-lg lg:h-[380px] lg:w-[350px] rounded  flex flex-col justify-between gap-6 bg-white p-2 ">
                                <div className="flex justify-center lg:w-full bg-[#dddfe0]">
                                    <img
                                        src={e.image?.[0]}
                                        className="object-contain h-[250px] w-[100%]"
                                        alt="Product"
                                    />
                                </div>
                                <div className=" h-full space-y-1 px-2">
                                    <h3 className="font-semibold text-xl">
                                        {e.description.length > 25
                                            ? `${e.description.slice(0, 35)}...`
                                            : e.description}
                                    </h3>
                                    <h4 className="text-[#959595] font-bold text-2xl">
                                        $ {e.price}
                                    </h4>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Shop;