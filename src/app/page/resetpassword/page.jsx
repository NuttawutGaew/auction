"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation"; // ✅ ใช้ next/navigation
import axios from "axios";
import zxcvbn from "zxcvbn"; // ✅ เพิ่ม import ที่หายไป
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function ResetPassword() {
  const searchParams = useSearchParams(); // ✅ แก้ไข ไม่ใช้ destructuring
  const token = searchParams.get("token"); // ✅ ใช้ searchParams ตรงๆ
  const router = useRouter(); // ✅ ใช้ useRouter() แทน useNavigate()

  useEffect(() => {
    console.log("Token received:", token);

    if (!token || token === "undefined" || token === "null") {
      console.error("Invalid token detected. Redirecting...");
      router.push("/forgot-password"); // ✅ ใช้ router.push() แทน navigate()
    }
  }, [token, router]);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordStrength(zxcvbn(value).score);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!token || token === "undefined" || token === "null") {
      toast.error("❌ ไม่พบ Token กรุณาลองใหม่");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:3111/api/v1/accounts/reset-password", {
        token, // ✅ ส่ง Token ไปที่ API
        newPassword: password,
      });
  
      toast.success("Your password has been changed. Please log in again.");
      setTimeout(() => {
        router.push("/page/login");
      }, 3000);
    } catch (err) {
      toast.error("❌ " + (err.response?.data?.message || "เกิดข้อผิดพลาด"));
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen py-2 bg-cover bg-center"
      style={{ backgroundImage: "url('/images/sp.jpg')" }}
    >
      <ToastContainer />
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white p-6 rounded-xl shadow-md bg-opacity-70 backdrop-blur-lg"
      >
        <h1 className="text-2xl font-bold mb-4 flex items-center justify-center">
          Set New Password
        </h1>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            New Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="confirmPassword"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Confirm Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline"
        >
          Reset Password
        </button>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      </form>
    </div>
  );
};
