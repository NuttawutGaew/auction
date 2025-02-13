'use client';
import React from 'react'
import 'tailwindcss/tailwind.css'
import NavbarProfile from '../../components/NavbarProfile';
import { useState } from 'react';
import Button from '@mui/material/Button'
import Link from 'next/link';

const user = {
  name: 'My Test',
  email: 'test01@gmail.com',
  profilePicture: '../images/pf333.jpg',
  auctionHistory: [
    { id: 1, item: 'เก้าอี้สไตล์หลุยส์', bid: '7,000' },
    { id: 2, item: 'เก้าอี้โครงไม้สนประสาน', bid: '900' },
  ],
  purchaseHistory: [
    { id: 1, item: 'ชุดโต๊ะทานอาหาร 3 ที่นั่ง', bid: '4,600' },
    { id: 2, item: 'โต๊ะเครื่องแป้ง 6 ลิ้นชัก', bid: '2,500' },
    { id: 3, item: 'ตู้เสื้อผ้า 3 บาน', bid: '2,700' },
    { id: 4, item: 'โคมไฟติดพนัง โป๊ะทรงกระบอก', bid: '2,600' },
  ]
};

function ProfilePage() {
  const [userData, setUserData] = useState(user);

  return (
    <div>
      <NavbarProfile />
      <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-16 m-5">
        <div className="bg-yellow-100 p-8 rounded-lg shadow-lg w-full max-w-2xl">
          <div className="flex flex-col items-center">
            {userData.profilePicture && (
              <img
                src={userData.profilePicture}
                alt="Profile"
                className="w-40 h-40 rounded-full transition-transform duration-300 hover:scale-125"
              />
            )}
            <h2 className="text-2xl font-semibold mt-4">{userData.name}</h2>
            <p className="text-gray-600">{userData.email}</p>

            <Link href="/page/editprofile" className="mt-4 px-4 py-2 bg-yellow-400 text-white hover:text-white hover:bg-yellow-600 hover:scale-125 rounded">
              Edit Profile
            </Link>
          </div>
          <div className="mt-8 w-full">
            <h3 className="text-2xl font-bold mb-4">Auction History</h3>
            <ul className="space-y-4">
              {userData.auctionHistory.map((auction) => (
                <li key={auction.id} className="flex justify-between bg-white p-4 rounded-lg hover:scale-105">
                  <span>{auction.item}</span>
                  <span>{auction.bid} บาท</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-8 w-full">
            <h3 className="text-2xl font-bold mb-4">Purchase History</h3>
            <ul className="space-y-4">
              {userData.purchaseHistory.map((auction) => (
                <li key={auction.id} className="flex justify-between bg-white p-4 rounded-lg hover:scale-105">
                  <span>{auction.item}</span>
                  <span>{auction.bid} บาท</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
