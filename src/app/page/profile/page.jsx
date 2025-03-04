'use client';

import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import NavbarProfile from '../../components/NavbarProfile';
import Button from '@mui/material/Button';
import Link from 'next/link';

function ProfilePage() {
  const [profile, setProfile] = useState({
    wonAuctions: 5, // mock up value for Winning bid
    participatedAuctions: 10, // mock up value for Participating auctions
    listedItems: 3 // mock up value for My auction
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [selectedStat, setSelectedStat] = useState('wonAuctions'); // เพิ่ม state สำหรับหัวข้อที่เลือก
  const [showDetails, setShowDetails] = useState(false); // เพิ่ม state สำหรับการแสดงรายละเอียด

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('http://localhost:3111/api/v1/profile', {
          credentials: 'include'
        });

        if (!response.ok) throw new Error('Unable to retrieve profile information.');

        const data = await response.json();
        setProfile(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchProfileImage = async () => {
      try {
        const res = await fetch(`http://localhost:3111/api/v1/profile/image`, { 
          credentials: 'include'
        });
        
        if (!res.ok) throw new Error("Failed to load image.");

        const data = await res.json();
        setProfileImage(data.image);
      } catch (err) {
        console.error("ไม่สามารถโหลดรูปภาพโปรไฟล์ได้", err);
      }
    };

    fetchProfile();
    fetchProfileImage();
  }, [refresh]);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  const renderProfileStats = () => {
    switch (selectedStat) {
      case 'wonAuctions':
        return (
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center space-x-3">
              {/* <p className="text-xl font-bold text-blue-600">{profile?.wonAuctions || 0}</p> */}
              <h3 className="font-semibold text-xl">Details about the winning bids...</h3>
            {/* <p className="text-gray-600 mt-2">Details about the winning bids...</p> */}
            </div>
            <ul className="list-disc list-inside mt-2">
              <li className='mt-2'>
                Auction 1: $100
                <Link href="/page/wonAuctionsDetails/1">
                  <button className="ml-4 bg-blue-500 text-white px-2 py-1 rounded-lg hover:bg-blue-600 transition-all">
                    👁️
                  </button>
                </Link>
              </li>
              <li className='mt-2'>
                Auction 2: $150
                <Link href="/page/wonAuctionsDetails/2">
                  <button className="ml-4 bg-blue-500 text-white px-2 py-1 rounded-lg hover:bg-blue-600 transition-all">
                    👁️
                  </button>
                </Link>
              </li>
              <li className='mt-2'>
                Auction 3: $200
                <Link href="/page/wonAuctionsDetails/3">
                  <button className="ml-4 bg-blue-500 text-white px-2 py-1 rounded-lg hover:bg-blue-600 transition-all">
                    👁️
                  </button>
                </Link>
              </li>
            </ul>
          </div>
        );
      case 'participatedAuctions':
        return (
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center space-x-3">
              {/* <p className="text-xl font-bold text-green-600">{profile?.participatedAuctions || 0}</p> */}
              <h3 className="font-semibold text-xl">Details about the participated auctions...</h3>
            {/* <p className="text-gray-600 mt-2">Details about the participated auctions...</p> */}
            </div>
            <ul className="list-disc list-inside mt-2">
              <li className='mt-2'>
                Auction 1: $3450
                <Link href="/page/participatedAuctionsDetails/1">
                  <button className="ml-4 bg-green-500 text-white px-2 py-1 rounded-lg hover:bg-green-600 transition-all">
                    👁️
                  </button>
                </Link>
              </li>
              <li className='mt-2'>
                Auction 2: $6275
                <Link href="/page/participatedAuctionsDetails/2">
                  <button className="ml-4 bg-green-500 text-white px-2 py-1 rounded-lg hover:bg-green-600 transition-all">
                    👁️
                  </button>
                </Link>
              </li>
              <li className='mt-2'>
                Auction 3: $9120
                <Link href="/page/participatedAuctionsDetails/3">
                  <button className="ml-4 bg-green-500 text-white px-2 py-1 rounded-lg hover:bg-green-600 transition-all">
                    👁️
                  </button>
                </Link>
              </li>
            </ul>
          </div>
        );
      case 'listedItems':
        return (
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center space-x-3">
              {/* <p className="text-xl font-bold text-purple-600">{profile?.listedItems || 0}</p> */}
              <h3 className="font-semibold text-xl">Details about the listed items...</h3>
            {/* <p className="text-gray-600 mt-2">Details about the listed items...</p> */}
            </div>
            <ul className="list-disc list-inside mt-2">
              <li className='mt-2'>
                Item 1: Starting bid $30
                <Link href="/page/listedItemsDetails/1">
                  <button className="ml-4 bg-purple-500 text-white px-2 py-1 rounded-lg hover:bg-purple-600 transition-all">
                    👁️
                  </button>
                </Link>
              </li>
              <li className='mt-2'>
                Item 2: Starting bid $45
                <Link href="/page/listedItemsDetails/2">
                  <button className="ml-4 bg-purple-500 text-white px-2 py-1 rounded-lg hover:bg-purple-600 transition-all">
                    👁️
                  </button>
                </Link>
              </li>
              <li className='mt-2'>
                Item 3: Starting bid $60
                <Link href="/page/listedItemsDetails/3">
                  <button className="ml-4 bg-purple-500 text-white px-2 py-1 rounded-lg hover:bg-purple-600 transition-all">
                    👁️
                  </button>
                </Link>
              </li>
            </ul>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <NavbarProfile />
      <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-16 m-5">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex flex-col items-center md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-6">
            <div className="relative">
              <img 
                src={profileImage || "/image/profile1.jpg"}
                alt="Profile"
                className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-gray-300"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-4">
                <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
                  {profile?.profile?.name || 'Not specified'}
                </h1>
              </div>
              <p className="text-gray-500">Email : {profile?.email || 'Not specified'}</p>
              <p className="text-gray-500">Phone : {profile?.phone || 'Not specified'}</p>

              {/* <p className="text-sm text-gray-400 mt-2">
                สมาชิกตั้งแต่: {profile?.profile?.createdAt ? new Date(profile.profile.createdAt).toLocaleDateString('th-TH') : 'ไม่ระบุ'}
              </p> */}
              <div className='mt-2 '>
                <Link href="/page/editprofile">
                  <button className="bg-gradient-to-tr from-yellow-500 to-red-500 text-white px-3 py-2 text-sm rounded-lg hover:bg-red-600 transition-all">
                    Edit profile
                  </button>
                </Link>
              </div>  
            </div>
          </div>

          {/* Personal Information */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Personal information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-gray-600">Phone number: {profile?.phone || 'Not specified'}</p>
              </div>
            </div>
          </div>

           {/* Profile Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <button
              className={`p-4 rounded-lg ${selectedStat === 'wonAuctions' ? 'bg-blue-100 border-2 border-blue-500' : 'bg-gray-50'}`}
              onClick={() => setSelectedStat('wonAuctions')}
            >
              <p className="text-xl font-bold text-blue-600">{profile?.wonAuctions || 0}</p>
              Winning bid
            </button>
            <button
              className={`p-4 rounded-lg ${selectedStat === 'participatedAuctions' ? 'bg-green-100 border-2 border-green-500' : 'bg-gray-50'}`}
              onClick={() => setSelectedStat('participatedAuctions')}
            >
              <p className="text-xl font-bold text-green-600">{profile?.participatedAuctions || 0}</p>
              Participating auctions
            </button>
            <button
              className={`p-4 rounded-lg ${selectedStat === 'listedItems' ? 'bg-purple-100 border-2 border-purple-500' : 'bg-gray-50'}`}
              onClick={() => setSelectedStat('listedItems')}
            >
              <p className="text-xl font-bold text-purple-600">{profile?.listedItems || 0}</p>
              My auction
            </button>
          </div>

          {/* Render selected profile stats */}
          <div className="mt-6">
            {renderProfileStats()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
