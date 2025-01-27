'use client'
import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/forget-password', { email });
      if (response.status === 200) {
        setMessage('Password reset link has been sent to your email.');
      }
    } catch (error) {
      setMessage('Error sending password reset link.');
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/bg_forget.jpg')" }}
    >
        <Navbar />
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 bg-opacity-70 backdrop-blur-lg">
        <h1 className="text-2xl font-bold mb-4 flex items-center justify-center ">Forget Password</h1>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline rounded-l"
                >
                Send Reset Link
            </button>
        </div>
      </form>
      {message && <p className="mt-4 p-2 text-white bg-red-500 rounded-xl">{message}</p>}
    </div>
  );
};

export default ForgetPassword;