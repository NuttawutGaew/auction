"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import NavbarBids from '../../components/NavbarBids';

const ProductPage = () => {
  const [timeLeft, setTimeLeft] = useState(180);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/auctions", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          // credentials: "include",
        });

        if (!response.ok) {
          throw new Error("ไม่สามารถดึงข้อมูลสินค้าได้");
        }

        const data = await response.json();
        setAuctions(data);
      } catch (error) {
        console.error('Error fetching auctions', error);
        setError('Error fetching auctions');
      } finally {
        setLoading(false);
      }
    };

    fetchAuctions();
  }, []);

  if (loading) {
    return (
      <div className='flex flex-col justify-center items-center h-screen text-4xl text-center font-bold'>
        <div className='p-4'>Loading...</div>
        <img alt="Loading" src='https://i.pinimg.com/originals/f2/9f/02/f29f025c9ff5297e8083c52b01f1a709.gif' />
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex flex-col justify-center items-center h-screen text-4xl text-center font-bold'>
        <div className='p-4'>Error: {error}</div>
      </div>
    );
  }

  return (
    <div>
      <div className="max-w-full mx-auto bg-white  p-8">
        <h1 className="font-bold mb-4 text-center font-extrabold text-4xl p-2 shadow-xl">Auction Product List</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-4">
          {auctions.map((auction) => (
            <div key={auction._id} className="border rounded-lg p-4 bg-white shadow-xl">
              <Link href={{
                pathname: `/page/bid`,
                query: { 
                  id: auction._id,
                  name: auction.productName,
                  images: auction.productImages,
                  description: auction.productDescription,
                  size: auction.productSize,
                  startingBid: auction.startingBid,
                  bids: auction.bids,
                  currentBid: auction.currentBid,
                  minimumIncrement: auction.minimumIncrement,
                  endsIn: auction.endsIn,
                }
              }} legacyBehavior>
                <a>
                  <img src={auction.productImages} alt={auction.productName} className="w-full h-64 object-cover mb-4 rounded-lg cursor-pointer" />
                </a>
              </Link>
              <h2 className="font-bold text-xl mb-2">{auction.productName}</h2>
              {/* <p className="text-gray-700 mb-2">{auction.productDescription}</p> */}
              {/* <p className="text-gray-700 mb-2">Size: {auction.productSize}</p> */}
              {/* <p className="text-gray-700 mb-2">Starting Bid: {auction.startingBid} บาท</p> */}
              <p className="text-gray-700 mb-2">Current Bid: {auction.currentBid} บาท</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;