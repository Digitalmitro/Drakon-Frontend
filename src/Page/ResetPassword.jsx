import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";

function ResetPassword() {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleForgetPasswordSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        if (!oldPassword || !newPassword || !confirmPassword) {
            setError("All fields are required.");
            return;
        }
        if (newPassword !== confirmPassword) {
            setError("New password and confirm password do not match.");
            return;
        }
        try {
            const token = Cookies.get("token");
            const response = await axios.put(
                `https://api.drakon-sports.com/reset-password`,
                { oldPassword, newPassword },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setSuccess(response.data.message);
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (error) {
            if (error.response) {
                setError(error.response.data.error);
            } else {
                setError("Something went wrong. Please try again.");
            }
        }
    };

    return (
        <section className="bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 min-h-screen flex items-center justify-center px-4">
            <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md animate-fade-in">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                    Change Your Password
                </h2>
                <form onSubmit={handleForgetPasswordSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Old Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="text-red-600 text-sm text-center">{error}</p>}
                    {success && <p className="text-green-600 text-sm text-center">{success}</p>}
                    <button
                        type="submit"
                        className="w-full bg-[#ff5B00] hover:bg-orange-600 text-white font-semibold py-2 rounded-md transition duration-200"
                    >
                        Change Password
                    </button>
                </form>
            </div>
        </section>
    );
}

export default ResetPassword;
