import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios'; // Don’t forget to import axios if you use it!
import Cookies from "js-cookie";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = Cookies.get("token");
    // Assume you get token from localStorage or any auth context


    const fetchCart = async () => {
        if (token) {
            try {
                const res = await axios.get(
                    `https://api.drakon-sports.com/api/cart`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                const userCart = res.data.products || [];

                // Step 1: Parse guest cart from localStorage
                let guestCart = [];
                try {
                    const guestCartStr = localStorage.getItem("guest_cart");
                    guestCart = guestCartStr ? JSON.parse(guestCartStr) : [];
                } catch (e) {
                    console.error("Failed to read guest cart", e);
                }

                // Step 2: Merge guest items (skip duplicates)
                const mergedCart = [...userCart];

                guestCart.forEach(guestItem => {
                    const alreadyExists = userCart.some(
                        userItem => userItem.productId._id === guestItem.productId._id
                    );
                    if (!alreadyExists) {
                        mergedCart.push(guestItem);
                    }
                });

                setCart(mergedCart);

                // Optional: Clear guest cart from localStorage after merge
                localStorage.removeItem("guest_cart");
            } catch (err) {
                console.error("Error fetching user cart:", err);
                setCart([]);
            }
        } else {
            // Guest user
            try {
                const guestCartStr = localStorage.getItem("guest_cart");
                const guestCart = guestCartStr ? JSON.parse(guestCartStr) : [];
                setCart(guestCart);
            } catch (err) {
                console.error("Error reading guest cart from localStorage:", err);
                setCart([]);
            }
        }

        setLoading(false);
    };

    useEffect(() => {
        fetchCart();
    }, [token]); // Re-run when token changes

    return (
        <CartContext.Provider value={{ cart, setCart, loading, setLoading }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
