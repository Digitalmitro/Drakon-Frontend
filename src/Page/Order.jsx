import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

function Order() {
    const [pastOrders, setPastOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = Cookies.get("token");
    const decodedToken = token && jwtDecode(token);
    const userId = decodedToken?._id;

    const getOrders = async (id) => {
        try {
            const response = await fetch(
                `https://api.drakon-sports.com/api/user/${id}`
            );
            if (!response.ok) throw new Error("Failed to fetch orders");

            const data = await response.json();
            setPastOrders(data);
            console.log("Order Data:", data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (userId) getOrders(userId);
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-lg text-gray-600 animate-pulse">
                    Fetching your legendary orders... 🧾
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 md:p-10 space-y-8 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-bold text-center text-gray-800">Your Orders</h1>
            {pastOrders && pastOrders.length > 0 ? (
                pastOrders.map((order) => (
                    <div
                        key={order._id}
                        className="border border-gray-200 bg-white p-6 rounded-xl shadow-md space-y-6 flex flex-col lg:flex-row lg:justify-between"
                    >
                        {/* Products List */}
                        <div className="space-y-4 flex-1">
                            <h3 className="font-semibold text-lg text-orange-600">Items</h3>
                            {order.products?.map((item, index) => (
                                <div key={index} className="flex items-start gap-6">
                                    <img
                                        src={item?.productId?.image[0]}
                                        alt={item?.productId?.title}
                                        className="w-24 h-24 object-cover rounded-md border"
                                    />
                                    <div className="text-sm space-y-1">
                                        <p className="font-medium">{item?.productId?.title}</p>
                                        <p>Qty: <b>{item?.quantity}</b></p>
                                        <p>Price: ₹<b>{item?.price}</b></p>
                                        <p>Total: ₹<b>{item?.total}</b></p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Details */}
                        <div className="text-sm space-y-2 text-right lg:text-left lg:ml-10">
                            <h2 className="text-base font-bold text-gray-800">
                                Order ID: <span className="text-xs text-gray-500">{order?._id}</span>
                            </h2>
                            <p>Status: <span className="text-blue-600 font-medium">{order?.orderStatus}</span></p>
                            <p>Payment: {order?.paymentMethod} ({order?.paymentStatus})</p>
                            <p>Total Paid: ₹{order?.totalAmount}</p>
                            <p className="text-gray-500">
                                Ordered on: <br />
                                {new Date(order?.createdAt).toLocaleString()}
                            </p>
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-center py-20">
                    <p className="text-gray-600 text-lg">No orders yet 🛒</p>
                    <p className="text-sm text-gray-400">Go grab something awesome!</p>
                </div>
            )}
        </div>
    );
}

export default Order;
