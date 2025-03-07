'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getSession } from 'next-auth/react';
import { FaCheckCircle, FaExclamationTriangle, FaInfo, FaClock } from 'react-icons/fa';


const NavbarCustomer = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null); // เพิ่ม state สำหรับ token
  const dropdownRef = useRef(null);
  const router = useRouter();

  

  useEffect(() => {
    // Fetch user and token from local storage or API
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    setUser(storedUser);
    setToken(storedToken);
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3111/api/v1/auth/logout', {
        method: 'POST', // หรือ 'GET' ขึ้นอยู่กับ backend ของคุณ
        credentials: 'include', // ส่ง cookies ไปกับ request
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log('Logged out successfully');
        // ลบ session หรือรีเฟรชหน้า
        window.location.href = '/';
      } else {
        console.error('Failed to log out:', response.status);
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
    const [searchText, setSearchText] = React.useState("")

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

    // Add new state for notification dropdown
    const [notificationOpen, setNotificationOpen] = useState(false)
    const notificationRef = useRef(null)
  
    // Add new state for expanded view
    const [showAllNotifications, setShowAllNotifications] = useState(false)
  
    // Add more notifications data
    const notifications = [
      {
        id: 1,
        type: 'success',
        message: 'LAZBOY_10T-554 Dreamtime (Half Leather)',
        time: '2 นาทีที่แล้ว',
        icon: 'check'
      },
      // {
      //   id: 2,
      //   type: 'warning',
      //   message: 'มีผู้ประมูลสูงกว่าคุณ Figma Nendoroid',
      //   time: '5 นาทีที่แล้ว',
      //   icon: 'warning'
      // },
      {
        id: 3,
        type: 'info',
        message: 'การประมูล P33-554 Dreamtime จะสิ้นสุดในอีก 30 นาที',
        time: '15 นาทีที่แล้ว',
        icon: 'clock'
      },
      // More notifications...
      {
        id: 4,
        type: 'success',
        message: 'P33-554 Dreamtime',
        time: '1 ชั่วโมงที่แล้ว',
        icon: 'check'
      },
      {
        id: 5,
        type: 'info',
        message: 'มีสินค้าใหม่ในหมวดหมู่ที่คุณสนใจ',
        time: '2 ชั่วโมงที่แล้ว',
        icon: 'info'
      }
    ]
  
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (notificationRef.current && !notificationRef.current.contains(event.target)) {
          setNotificationOpen(false)
        }
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setDropdownOpen(false)
        }
      }
  
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

  return (
    <nav className="bg-white p-2 w-full fixed top-0 left-0 right-0 rounded-bl-lg rounded-br-lg shadow-lg z-10  bg-opacity-50 backdrop-blur-xl">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <div className="flex space-x-5 p-2">
          <div className="flex space-x-5 pl-2">
            <div className="relative" ref={dropdownRef}>
              <button onClick={toggleDropdown} className="flex items-center focus:outline-none hover:text-yellow-400 hover:scale-125">
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
                      Account
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 ml-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      </svg>
                    </a>
                  </Link>
                  <button
                    onClick={handleLogout}
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
            <Link href="/page/homepage" legacyBehavior>
              <a className="text-black text-3xl md:text-4xl font-bold hover:text-yellow-400 hover:scale-125">UFA99</a>
            </Link>
            <div className='bg-gradient-to-tr from-yellow-400 to-red-300 p-2 rounded-full flex items-center hover:bg-yellow-500 hover:text-white cursor-pointer hover:scale-125'>
              <Link href="/page/cart" legacyBehavior>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
              </Link>
            </div>
            <div>

            </div>
          </div>
        </div>

        {/* input////////////////////////////////////////////////// */}
        <div className="flex items-center space-x-4">
          <input 
            type="text" 
            placeholder='ค้นหาสินค้า'
            className='border-2 border-gray-300 p-2 rounded-lg md:w-96'
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        {/* icon contact////////////////////////////////////////////////// */}
        <div className="hidden md:flex flex-col items-center space-y-5 md:flex-row md:space-x-5 md:space-y-0 md:p-2">
          {/* <div className='bg-gradient-to-tr from-yellow-400 to-red-300 px-4 py-2 rounded-full flex items-center hover:bg-yellow-500 hover:text-white cursor-pointer'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 ">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
            </svg>
          </div>
          <div className='bg-gradient-to-tr from-yellow-400 to-red-300 px-4 py-2 rounded-full hover:bg-yellow-500 hover:text-white cursor-pointer'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25" />
            </svg>
          </div>
          <div className='bg-gradient-to-tr from-yellow-400 to-red-300 px-4 py-2 rounded-full flex items-center hover:bg-yellow-500 hover:text-white cursor-pointer'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
            </svg>
          </div> */}
          {/* <div className='bg-gradient-to-tr from-yellow-400 to-red-300 px-4 py-2 rounded-full flex items-center hover:bg-yellow-500 hover:text-white cursor-pointer'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
            </svg>
          </div> */}
          {/* Notification Bell */}
          <div className="relative flex items-center" ref={notificationRef}>
                  <button 
                    className="bg-gradient-to-tr from-yellow-400 to-red-300 px-4 py-2 rounded-full flex items-center hover:bg-yellow-500 hover:text-white cursor-pointer"
                    onClick={() => setNotificationOpen(!notificationOpen)}
                  >
                    <div className="relative">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                      </svg>
                      {/* Notification Badge */}
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        4
                      </span>
                    </div>
                  </button>

                  {/* Notification Dropdown */}
                  {notificationOpen && (
                    <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
                      <div className="p-4 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
                      </div>
                      
                      {/* Notification Items */}
                      <div className="divide-y divide-gray-200">
                        {notifications.slice(0, showAllNotifications ? notifications.length : 3).map(notification => (
                          <div 
                            key={notification.id} 
                            className="p-4 hover:bg-gray-50 cursor-pointer"
                            onClick={() => {
                              if (notification.type === 'success') {
                                window.location.href = '/page/cart';
                              }
                            }}
                          >
                            <div className="flex items-start">
                              <div className="flex-shrink-0">
                                {notification.icon === 'clock' ? (
                                  <FaClock className="h-6 w-6 text-purple-500" />
                                ) : notification.type === 'success' ? (
                                  <FaCheckCircle className="h-6 w-6 text-green-500" />
                                ) : notification.type === 'warning' ? (
                                  <FaExclamationTriangle className="h-6 w-6 text-yellow-500" />
                                ) : notification.type === 'info' ? (
                                  <FaInfo className="h-6 w-6 text-blue-500" />
                                ) : null}
                              </div>
                              <div className="ml-3">
                                <p className="text-sm text-gray-800">{notification.message}</p>
                                <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* View All Link */}
                      <div className="p-4 text-center border-t border-gray-200">
                        <button onClick={() => setShowAllNotifications(!showAllNotifications)} className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          {showAllNotifications ? 'แสดงน้อยลง' : 'ดูการแจ้งเตือนทั้งหมด'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarCustomer;