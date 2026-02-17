import React, { useEffect, useState } from 'react';
import Cookies from "js-cookie";
import API_BASE_URL from "../config/api";

function Order() {
    const [pastOrders, setPastOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = Cookies.get("token");

    const getOrders = async () => {
        try {
            if (!token) {
                setPastOrders([]);
                return;
            }

            const response = await fetch(
                `${API_BASE_URL}/order`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (response.status === 404) {
                setPastOrders([]);
                return;
            }
            if (!response.ok) throw new Error("Failed to fetch orders");

            const data = await response.json();
            setPastOrders(Array.isArray(data) ? data : []);
            console.log("Order Data:", data);
        } catch (error) {
            console.error("Error fetching orders:", error);
            setPastOrders([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getOrders();
    }, [token]);

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
                            {order.items?.map((item, index) => (
                                <div key={index} className="flex items-start gap-6">
                                    <div className="text-sm space-y-1">
                                        <p className="font-medium">{item?.name}</p>
                                        <p>Qty: <b>{item?.quantity}</b></p>
                                        <p>Price: $<b>{item?.unitPrice}</b></p>
                                        <p>Total: $<b>{(Number(item?.unitPrice || 0) * Number(item?.quantity || 0)).toFixed(2)}</b></p>
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
                            <p>Total Paid: ${order?.orderTotal}</p>
                            <p className="text-gray-500">
                                Ordered on: <br />
                                {new Date(order?.orderDate || order?.createdAt).toLocaleString()}
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
