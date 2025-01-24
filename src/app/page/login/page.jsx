'use client';
import React, { useState,useEffect } from 'react';
import Navbar from '../../components/Navbar';
import { useSession } from 'next-auth/react';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    // ตัวอย่าง: ตรวจสอบ token หรือ session เพื่ออัปเดต isLoggedIn
    const userLoggedIn = Boolean(localStorage.getItem('userToken')); // หรือ logic ที่ใช้จริง
    setIsLoggedIn(userLoggedIn);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      if (res.status === 200) {
        setIsLoggedIn(true);
        window.location.href = '/'; // ใช้ window.location.href เพื่อเปลี่ยนเส้นทาง
      } else {
        const errorData = await res.json();
        throw new Error(errorData.msg || 'Login failed');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-yellow-600 flex flex-col items-center justify-center">
      <Navbar isLoggedIn={isLoggedIn}/>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mt-8">
         <h3 className="text-2xl font-bold mb-6 text-center">LOG IN</h3>
         <form onSubmit={handleSubmit}>
          {error && (
                  <div className='bg-red-500 text-white p-2 my-2 rounded-md'>
                  {error}
                  </div>
              )}
          <div onChange={(e)  => setEmail(e.target.value)} className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Email
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="email"
            />
          </div>
          <div className="mb-6 relative">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="password"
            />
            <button
            type="button"
            className='absolute right-2 top-9 text-sm text-black flex items-center'
            onClick={() => setShowPassword(!showPassword)}
          >
              {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
            )}
          </button>
          </div>

          <div className="flex items-center justify-between">
            <button
              href="/"
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Login
            </button>
            <div>
              <a
                href="/"
                className="inline-block align-baseline font-bold text-sm text-green-500 hover:text-white hover:bg-green-700 py-2 px-2 rounded"
              >
                Return to home page
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

// 'use client'
// import React , {useState} from 'react';
// import Navbar from "../components/Navbar";
// import Link from 'next/link';

// function LoginPage() {
//   const [email, setEmail] = React.useState('')
//   const [password, setPassword] = React.useState('')
//   const [error, setError] = React.useState('')

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(""); 

//     try {
//       const res = await fetch('https://nodejs-for-test-vua7.onrender.com/api/v1/auth/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           "BusinessId": "1234567890",
//           "device-fingerprint" : "unique-device-123456",
//         },
//         body: JSON.stringify({ email, password }),
//       })
//       if (res.status === 200) {
//         window.location.href = '/'
//       } else {
//         throw new Error(await res.text())
//       }
//     } catch (error) {
//       setError(error.message)
//     }
//   }
//   return (
//     <div className="min-h-screen bg-yellow-600 flex flex-col items-center justify-center">
//       <Navbar />
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mt-8">
//         <h3 className="text-2xl font-bold mb-6 text-center">LOG IN</h3>
//         <form onSubmit={handleSubmit}>
//           {error && (
//                   <div className='bg-red-500 text-white p-2 my-2 rounded-md'>
//                   {error}
//                   </div>
//               )}
//           <div onChange={(e)  => setEmail(e.target.value)} className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
//               Email
//             </label>
//             <input
//               type="text"
//               id="username"
//               name="username"
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               placeholder="email"
//             />
//           </div>
//           <div onChange={(e)  => setPassword(e.target.value)} className="mb-6">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
//               placeholder="password"
//             />
//           </div>
//           <div className="flex items-center justify-between">
//             <button
//               href="/"
//               type="submit"
//               className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//             >
//               Login
//             </button>
//             <div>
//               <a
//                 href="/"
//                 className="inline-block align-baseline font-bold text-sm text-green-500 hover:text-white hover:bg-green-700 py-2 px-2 rounded"
//               >
//                 Return to home page
//               </a>
//               <a
//                 href="/register"
//                 className="inline-block align-baseline font-bold text-sm text-red-500 hover:text-white hover:bg-red-700 rounded py-2 px-2"
//               >
//                 Register?
//               </a>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default LoginPage;