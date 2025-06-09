import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { UserIcon, EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import UserProfileForm from "./UserProfileForm";
import axios from "axios";

export default function UserProfilePage() {
  const [user, setUser] = useState({});
  const token = Cookies.get("token");
  const decodedToken = token && jwtDecode(token);
  const userId = decodedToken?._id;

  const getUserById = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_API}/user/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(res.data);
    } catch (err) {
      console.error("Failed to fetch user profile:", err.message);
    }
  };

  useEffect(() => {
    getUserById();
  }, []);

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 md:p-8 rounded-2xl transition-all duration-300">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
          My <span className="text-orange-600">Profile</span>
        </h2>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* User Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200/80 hover:shadow-md transition-all duration-300 col-span-1"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-blue-100/80 p-3 rounded-xl">
                <UserIcon className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Personal Info</h3>
                <p className="text-sm text-gray-500">Your account details</p>
              </div>
            </div>

            <div className="space-y-4 divide-y divide-gray-100">
              <div className="pt-3">
                <span className="text-xs font-medium text-gray-400 uppercase">Full Name</span>
                <p className="text-gray-800 font-medium py-2.5 px-3 rounded-lg bg-gray-50/50 mt-1 flex items-center gap-2">
                  <UserIcon className="h-4 w-4 text-gray-400" />
                  {user.name || "N/A"}
                </p>
              </div>
              <div className="pt-3">
                <span className="text-xs font-medium text-gray-400 uppercase">Email</span>
                <p className="text-gray-800 font-medium py-2.5 px-3 rounded-lg bg-gray-50/50 mt-1 flex items-center gap-2 break-all">
                  <EnvelopeIcon className="h-4 w-4 text-gray-400" />
                  {user.email || "N/A"}
                </p>
              </div>
              <div className="pt-3">
                <span className="text-xs font-medium text-gray-400 uppercase">Phone</span>
                <p className="text-gray-800 font-medium py-2.5 px-3 rounded-lg bg-gray-50/50 mt-1 flex items-center gap-2">
                  <PhoneIcon className="h-4 w-4 text-gray-400" />
                  {user.phone || <span className="italic text-gray-400">Not Provided</span>}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Edit Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200/80 hover:shadow-md transition-all duration-300 xl:col-span-2"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-purple-100/80 p-3 rounded-xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-purple-600"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                  <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Edit Profile</h3>
                <p className="text-sm text-gray-500">Update your information</p>
              </div>
            </div>

            <UserProfileForm />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
