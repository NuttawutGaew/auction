'use client';
import React, { useState } from 'react';
import Navbar from '../components/Navbar';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('https://mytest-eco5.onrender.com/api/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'BusinessId': '1234567890',
          'device-fingerprint': 'unique-device-123456',
        },
        body: JSON.stringify({ email, password }),
      });
      if (res.status === 200) {
        setIsLoggedIn(true);
        window.location.href = '/'; // ใช้ window.location.href เพื่อเปลี่ยนเส้นทาง
      } else {
        throw new Error(await res.text());
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-yellow-600 flex flex-col items-center justify-center">
      <Navbar isLoggedIn={isLoggedIn} />
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
          <div onChange={(e)  => setPassword(e.target.value)} className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="password"
            />
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
                href="/register"
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