import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        if (typeof window !== "undefined") {
            try {
                const savedCart = localStorage.getItem("guest_cart");
                return savedCart ? JSON.parse(savedCart) : [];
            } catch (error) {
                console.error("Failed to parse cart from localStorage", error);
                return [];
            }
        }
        return [];
    });
    const [loading, setLoading] = useState(true);

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