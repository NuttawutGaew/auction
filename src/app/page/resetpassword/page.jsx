'use client';
import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

const ResetPasswordPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, newPassword: password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.msg}`);
        return;
      }

      setMessage('Password reset successful.');
      router.push('/page/login');
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen py-2 bg-cover bg-center"
      style={{ backgroundImage: "url('/images/sp.jpg')" }}
    >
      <Navbar />
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

export default ResetPasswordPage;