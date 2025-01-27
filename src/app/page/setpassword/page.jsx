'use client'
import React, { useState } from 'react';
import axios from 'axios';
import { useSearchParams, useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';

const SetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post('/api/auth/set-password', { token, password });
      if (response.status === 200) {
        setMessage('Password has been reset successfully.');
        // Redirect to login page or another page
        router.push('/page/login');
      }
    } catch (error) {
      setMessage('Error setting password.');
      console.error('Error:', error);
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen py-2 bg-cover bg-center"
      style={{ backgroundImage: "url('/images/sp.jpg')" }}
    >
      <Navbar />
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white p-6 rounded-xl shadow-md bg-opacity-70 backdrop-blur-lg">
        <h1 className="text-2xl font-bold mb-4 flex items-center justify-center">Set New Password</h1>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
            New Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
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
          Set Password
        </button>
      </form>
      {message && <p className="mt-4 p-2 text-white bg-red-500 rounded-xl">{message}</p>}
    </div>
  );
};

export default SetPassword;