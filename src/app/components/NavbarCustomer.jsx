'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signOut, getSession } from 'next-auth/react';
import axios from 'axios';


const NavbarCustomer = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null); // เพิ่ม state สำหรับ token
  const dropdownRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const checkSession = async () => {
      try {
        const session = await getSession();
        if (session) {
          setUser(session.user);
          setToken(session.accessToken); // เก็บ token จาก session
        }
      } catch (error) {
        console.error('Error fetching session:', error);
      }
    };
    checkSession();
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSignOut = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${token}`, // ตรวจสอบให้แน่ใจว่ามีการส่ง token ที่ถูกต้อง
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        // ทำการ sign out สำเร็จ
        console.log('Signed out successfully');
        setUser(null);
        router.push('/'); // เปลี่ยนเส้นทางไปยังหน้า login
      } else {
        console.error('Error signing out:', response.statusText);
      }
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="bg-white p-2 w-full fixed top-0 left-0 right-0 rounded-bl-lg rounded-br-lg shadow-lg z-10  bg-opacity-50 backdrop-blur-xl">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <div className="flex space-x-5 p-2">
          <div className="flex space-x-5 pl-2">
            {!user ? (
                  <div className="relative" ref={dropdownRef}>
                    <button onClick={toggleDropdown} className="flex items-center focus:outline-none">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-9">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      </svg>
                    </button>
                    {dropdownOpen && (
                      <div className="absolute mt-2 w-60 bg-white border border-gray-200 rounded-lg shadow-lg">
                        <Link href="/page/homepage" legacyBehavior>
                          <a className="flex items-center justify-center px-4 py-2 text-black hover:bg-yellow-400 hover:text-white rounded-lg">
                            Home
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 ml-2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                            </svg>
                          </a>
                        </Link>
                        <Link href="/page/profile" legacyBehavior>
                          <a className="flex items-center justify-center px-4 py-2 text-black hover:bg-yellow-400 hover:text-white rounded-lg">
                            Account Setting
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 ml-2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                          </a>
                        </Link>
                        <button
                          onClick={handleSignOut}
                          className="flex items-center justify-center w-full px-4 py-2 text-black hover:bg-red-800 hover:text-white rounded-lg"
                        >
                          Logout
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 ml-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center space-x-4">
                    <Link href="/page/login" className='text-white bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded-xl font-bold'>
                      Log in
                    </Link>
                    <Link href="/page/register" className='text-yellow-400 hover:bg-yellow-500 hover:text-white px-4 py-2 rounded-xl font-bold '>
                      Register
                    </Link>
                  </div>
                )}
                <Link href="/page/homepage" legacyBehavior>
                  <a className="text-black text-3xl md:text-4xl font-bold">UFA99</a>
                </Link>
              </div>
          </div>

          {/* input////////////////////////////////////////////////// */}
          <div className="flex items-center space-x-4">
            <input 
              type="text" 
              placeholder='ค้นหาสินค้า'
              className='border-2 border-gray-300 p-2 rounded-lg md:w-96'
            />
          </div>

          {/* icon contact////////////////////////////////////////////////// */}
          <div className="hidden md:flex flex-col items-center space-y-5 md:flex-row md:space-x-5 md:space-y-0 md:p-2">
            <div className='bg-yellow-400 px-4 py-2 rounded-full flex items-center hover:bg-yellow-500 hover:text-white'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 ">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
              </svg>
            </div>
            <div className='bg-yellow-400 px-5 py-2 rounded-full hover:bg-yellow-500 hover:text-white'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25" />
              </svg>
            </div>
            <div className='bg-yellow-400 px-4 py-2 rounded-full flex items-center hover:bg-yellow-500 hover:text-white'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
              </svg>
            </div>
            <div className='bg-yellow-400 px-4 py-2 rounded-full flex items-center hover:bg-yellow-500 hover:text-white'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
            </div>
          </div>
        </div>
      </nav>
    );
  };

export default NavbarCustomer;