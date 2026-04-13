import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import API_BASE_URL from "../config/api";



export function useUser() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const token = Cookies.get("token");
    let decodedToken = null;
    try {
        decodedToken = token ? jwtDecode(token) : null;
    } catch (error) {
        Cookies.remove("token");
        decodedToken = null;
    }

    const getUserById = async () => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`${API_BASE_URL}/user/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) {
                throw new Error(`Error ${res.status}: ${res.statusText}`);
            }

            const data = await res.json();
            setUser(data);
        } catch (err) {
            console.error("Failed to fetch user profile:", err.message);
            setError(err.message || "Unknown error occurred");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            getUserById();
        } else {
            setLoading(false);
        }
    }, [token]);

    return {
        user,
        user_id: decodedToken?._id || null,
        email: decodedToken?.email || null,
        loading,
        error,
        token,
        setUser
    };
}
