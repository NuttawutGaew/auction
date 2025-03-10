'use client';
import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import { useRouter } from 'next/navigation';

function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const res = await fetch('http://localhost:3111/api/v1/auth/login', {
        method: 'POST',
        credentials: "include", // ✅ ต้องเปิดให้ Cookies ถูกแนบไปด้วย
        headers: {
          'Content-Type': 'application/json',
          "BusinessId": "1234567890",
          "device-fingerprint" : "unique-device-123456",
        },
        body: JSON.stringify({ email, password }),
      })
      if (res.status === 200) {
        window.location.href = '/page/homepage';
      } else {
        throw new Error(await res.text())
      }
    } catch (error) {
      setError(error.message)
    }
  };

  const isFormValid = () => {
    return email.trim() !== '' && password.trim() !== '';
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/images/bgg.jpg')" }}
    >
      <Navbar isLoggedIn={isLoggedIn} />
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mt-8 bg-opacity-70 backdrop-blur-lg">
        <h3 className="text-2xl font-bold mb-6 text-center">LOG IN</h3>
        <form onSubmit={handleSubmit}>
          {error && (
            <div className='bg-red-500 text-white p-2 my-2 rounded-md'>
              {error}
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Email
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6 relative">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className='absolute right-2 top-9 text-sm text-black flex items-center'
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>

          <div className="flex items-center justify-between">
            <button
              href="/page/homepage"
              type="submit"
              disabled={!isFormValid() || isLoading}
              className="bg-gradient-to-tr from-red-500 to-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Login
            </button>
            <div>
              <a
                href="/page/forgotpassword"
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-white hover:bg-blue-700 py-2 px-2 rounded"
              >
                Forgot password?
              </a>
              <a
                href="/page/register"
                className="inline-block align-baseline font-bold text-sm text-red-500 hover:text-white hover:bg-red-700 rounded py-2 px-2"
              >
                Register?
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;