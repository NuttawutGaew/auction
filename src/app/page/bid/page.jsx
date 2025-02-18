"use client";
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NavbarBids from '../../components/NavbarBids';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BidPage = () => {
  const searchParams = useSearchParams();
  const [auction, setAuction] = useState(null);
  const [remainingTime, setRemainingTime] = useState('');
  const [bidAmount, setBidAmount] = useState('');
  const [showCard, setShowCard] = useState(false);
  const [minBidIncrement, setMinBidIncrement] = useState(0);
  const [showHistory, setShowHistory] = useState(false);

  const id = searchParams.get('id');
  const name = searchParams.get('name');
  const images = searchParams.get('images').split(','); // Convert comma-separated string to array
  const description = searchParams.get('description');
  const size = searchParams.get('size');
  const startingBid = searchParams.get('startingBid');
  const bids = searchParams.get('bids');
  const currentBid = searchParams.get('currentBid');
  const minimumIncrement = searchParams.get('minimumIncrement'); // Add this line
  const endsIn = searchParams.get('endsIn');

  useEffect(() => {
    const fetchAuction = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/auctions/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch auction data');
        }
        const data = await response.json();
        setAuction(data);
      } catch (error) {
        console.error('Error fetching auction data', error);
      }
    };

    if (id) {
      fetchAuction();
    }
  }, [id]);

  useEffect(() => {
    setMinBidIncrement(200); // Set the minimum bid increment to 200
    setBidAmount(currentBid); // Set bidAmount to currentBid initially
  }, [currentBid]);
  
  const handleIncrementBid = () => {
    setBidAmount((prevBid) => (parseFloat(prevBid) + minBidIncrement).toFixed(2));
  };
  
  const handleDecrementBid = () => {
    setBidAmount((prevBid) => Math.max(parseFloat(prevBid) - minBidIncrement, parseFloat(currentBid)).toFixed(2));
  };

  const handleBidNow = () => {
    if (parseFloat(bidAmount) < parseFloat(currentBid) + minBidIncrement) {
      toast.error(`Your bid Must be ${minBidIncrement} baht more than the current bid.`);
      return;
    }
    setShowCard(true);
  };

  const handleCancel = () => {
    setShowCard(false);
  };

  const handleConfirm = async () => {
    try {
      const response = await fetch(`http://localhost:3000/auctions/${auction._id}/bid`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bidAmount: bidAmount,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to place bid');
      }
      const data = await response.json();
      console.log('Bid placed', data);
      setAuction({ ...auction, currentBid: bidAmount });
      setShowCard(false);
    } catch (error) {
      console.error('Error placing bid', error);
    }
  };

  const handleAuctionHistory = () => {
    setShowHistory(true);
  };

  const handleCloseHistory = () => {
    setShowHistory(false);
  };

  if (!auction) {
    return (
      <div className='flex flex-col justify-center items-center h-screen text-4xl text-center font-bold'>
        <NavbarBids/>
        <div className='p-4'>Loading...</div>
        <img alt="Loading" src='https://i.pinimg.com/originals/f2/9f/02/f29f025c9ff5297e8083c52b01f1a709.gif' />
      </div>
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div>
      <NavbarBids />
      <div className="max-w-screen-2xl mx-auto bg-white pt-16 m-10 p-6">
        <h1 className="font-bold mb-4 text-center font-extrabold text-4xl p-2">{name}</h1>
        <div className="flex">
          <div className="w-1/2">
              <img 
                src={images} 
                alt={name} 
                className="w-full h-auto object-cover"
              />
            </div>
          <div className="w-1/2 pl-4">
            <div>
              <div className="mb-2 pl-4 ">
                <h2 className="text-xl font-semibold">{description}</h2>
              </div>

              <div className='mt-4 ml-4 pt-4 border-t-2 border-gray-300'>
                <h3 className="text-xl font-semibold p-2 text-gray-500">Product Details</h3>
              </div>

              <div className="mb-2 pl-4 py-2">
                <h4 className="text-lg font-semibold">{size}</h4>
              </div>
            </div>

            <div className='mt-4 ml-4 pt-4 border-t-2 border-gray-300'>
                <h3 className="text-xl font-semibold p-2 text-gray-500">Auction Details</h3>
            </div>

            <div className='py-3'>
              <div className="mb-2 pl-4">
                <h2 className="text-xl font-bold">
                  <span className='opacity-50'>Ends in : </span>
                  <span className='text-red-600'>{endsIn}00:10:00</span>
                </h2>
              </div>
              <div className="mb-2 pl-4">
                <h2 className="text-xl font-bold">
                  <span className='opacity-50'>Starting Bid : </span>
                  <span className='text-red-600'>{startingBid}</span>
                </h2>
              </div>
              {/* <div className="mb-2 pl-4">
                <h2 className="text-xl font-bold">
                  <span className='opacity-50'>Name of bidder : </span>
                  <span className='text-red-600'>{bids}-</span>
                </h2>
              </div> */}
              <div className="mb-2 pl-4">
                <h3 className="text-xl font-bold">
                  <span className='opacity-50'>Current Bid : </span>
                  <span>{currentBid} บาท</span>
                </h3>
              </div>
            </div>
            <div className='flex p-3 items-center space-x-4'>
              <h3 className="text-2xl font-bold">
                <span className='opacity-50'>Your Bid :</span>
              </h3>
              <button onClick={handleDecrementBid} className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded">
                -
              </button>
              <input 
                type="number" 
                className="border-2 border-gray-300 p-2 w-40 text-center" 
                value={bidAmount} 
                onChange={(e) => setBidAmount(e.target.value)} 
              />
              <button onClick={handleIncrementBid} className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded">
                +
              </button>
              <button onClick={handleBidNow} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Bid Now
              </button>
              <button onClick={handleAuctionHistory} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                Auction History
              </button>
            </div>
          </div>
        </div>
      </div>
      {showCard && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-72 bg-white rounded-2xl flex flex-col items-center justify-center gap-5 p-8 relative shadow-lg">
            <div className="w-full flex flex-col gap-1">
              <p className="text-xl font-bold text-gray-900">Confirm Bid</p>
              <p className="font-light text-gray-600">Are you sure you want to place this bid?</p>
            </div>
            <div className="w-full flex items-center justify-center gap-2">
              <button onClick={handleCancel} className="w-1/2 h-9 rounded-lg bg-gray-300 hover:bg-gray-400 font-semibold">
                Cancel
              </button>
              <button onClick={handleConfirm} className="w-1/2 h-9 rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold">
                Confirm
              </button>
            </div>
            <button onClick={handleCancel} className="absolute top-5 right-5 flex items-center justify-center bg-transparent cursor-pointer">
              <svg height="20px" viewBox="0 0 384 512" className="fill-gray-400 hover:fill-black">
                <path
                  d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      )}
      {showHistory && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-96 bg-white rounded-2xl flex flex-col items-center justify-center gap-5 p-8 relative shadow-lg">
            <div className="w-full flex flex-col gap-1">
              <p className="text-xl font-bold text-gray-900">Auction History</p>
              <ul className="list-disc pl-5">
                {auction.bids.map((bid, index) => (
                  <li key={index} className="font-light text-gray-600">
                    {bid.bidderName} bid {bid.bidAmount} บาท
                  </li>
                ))}
              </ul>
            </div>
            <button onClick={handleCloseHistory} className="absolute top-5 right-5 flex items-center justify-center bg-transparent cursor-pointer">
              <svg height="20px" viewBox="0 0 384 512" className="fill-gray-400 hover:fill-black">
                <path
                  d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default BidPage;