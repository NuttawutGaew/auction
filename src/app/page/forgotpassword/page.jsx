'use client';
import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false) // ✅ เพิ่มสถานะโหลด

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch('http://localhost:3111/api/v1/accounts/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      
      if (res.ok) {
        toast.success('A password reset link has been sent to your email.');
      } else {
        toast.error(`❌ ${data.message || 'An error occurred. Please try again.'}`);
      }
    } catch (error) {
      toast.error(`❌ ${error.message}`);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/bg_forget.jpg')" }}
    >
      <Navbar />
      <ToastContainer />
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 bg-opacity-70 backdrop-blur-lg">
        <h1 className="text-2xl font-bold mb-4 flex items-center justify-center">Forgot Password</h1>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Send Reset Link
        </button>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      </form>
    </div>
  );
};

export default ForgotPassword;