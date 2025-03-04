"use client";

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NavbarBids from '../../components/NavbarBids';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProductDetailsPage() {
  const searchParams = useSearchParams();
  const [showBidHistory, setShowBidHistory] = useState(false);
  const [bidHistory, setBidHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bidAmount, setBidAmount] = useState(""); // ใช้ "" แทน null
  const [timeLeft, setTimeLeft] = useState('กำลังโหลด...');
  const [startingPrice, setStartingPrice] = useState(0);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [minimumBidIncrement, setMinimumBidIncrement] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [bidsPerPage] = useState(5);
  const [product, setProduct] = useState([])

  const id = searchParams.get('id');
  const name = searchParams.get('name');
  const image = searchParams.get('image');
  const price = Number(searchParams.get('price'));
  const prices = searchParams.get('prices');
  const expiresAt = searchParams.get('expiresAt');


  // 📌 ดึงข้อมูลสินค้าจาก API
  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:3111/api/v1/auction/${id}`)
    .then(res => res.json())
    .then(data => {
      if (data.status === 'success') {
        const auction = data.data;
        setStartingPrice(auction.startingPrice);
        setCurrentPrice(auction.currentPrice);
        setMinimumBidIncrement(auction.minimumBidIncrement);

        // ✅ ตั้งเวลาหมดอายุ
        const endTime = new Date(auction.expiresAt).getTime();
        const interval = setInterval(() => {
          const now = new Date().getTime();
          const diff = endTime - now;
          if (diff <= 0) {
            clearInterval(interval);
            setTimeLeft('หมดเวลา');
          } else {
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / (1000 * 60)) % 60);
            const seconds = Math.floor((diff / 1000) % 60);
            setTimeLeft(`${hours}:${minutes}:${seconds}`);
          }
        }, 1000);

        return () => clearInterval(interval); // Clear interval on component unmount
      }
    });
}, [id]);

  // 📌 ดึงประวัติการบิดจาก API
  const fetchBidHistory = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3111/api/v1/auction/${id}/bids`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      if (!response.ok) throw new Error('There is no auction yet.');
      const data = await response.json();
      setBidHistory(data.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 📌 ฟังก์ชันสำหรับการประมูล
  const handleBid = async () => {
    if (!bidAmount || bidAmount < currentPrice + minimumBidIncrement) {
      toast.error(`Please enter a price greater than or equal to ${currentPrice + minimumBidIncrement} บาท`);
      return;
    }

    try {
      const response = await fetch(`http://localhost:3111/api/v1/auction/${id}/bids`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ amount: Number(bidAmount) }),
      });
      const data = await response.json();
      if (data.status === 'success') {
        toast.success(
          <div>
            Successful bid!
            <div>
              <button onClick={() => window.location.reload()} className="bg-green-500 text-white py-1 px-2 rounded mt-2">
                Confirm
              </button>
            </div>
          </div>
        );
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error('An error occurred.!');
    }
  };

  const handleCloseBidHistory = (e) => {
    if (e.target.id === "bidHistoryOverlay") {
      setShowBidHistory(false);
    }
  };

  const handleIncrementBid = () => {
    setBidAmount((prevBid) => (Number(prevBid) + minimumBidIncrement).toFixed(2));
  };

  const handleDecrementBid = () => {
    if (Number(bidAmount) <= currentPrice) {
      toast.error("Can't be reduced any more than this.");
      return;
    }
    setBidAmount((prevBid) => (Number(prevBid) - minimumBidIncrement).toFixed(2));
  };

  useEffect(() => {
    setBidAmount(currentPrice.toFixed(2));
  }, [currentPrice]);


  const indexOfLastBid = currentPage * bidsPerPage;
  const indexOfFirstBid = indexOfLastBid - bidsPerPage;
  const currentBids = bidHistory.slice(indexOfFirstBid, indexOfLastBid);
  const totalPages = Math.ceil(bidHistory.length / bidsPerPage);
  
  return (
    <div>
      <NavbarBids />
      <ToastContainer />
      <div className="max-w-screen-2xl mx-auto bg-white pt-20 m-10 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-lg overflow-hidden">
            <img src={image} alt={name} className="w-full h-auto object-cover" />
          </div>

          <div className="space-y-6">
            <h1 className="text-3xl font-bold">{name}</h1>

            <div className="border-t border-b py-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Starting price</span>
                <span className="text-2xl font-bold">{startingPrice} ฿</span>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="text-gray-600">Current price</span>
                <span className="text-2xl font-bold text-green-600">{currentPrice} ฿</span>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="text-gray-600">Remaining time</span>
                <span className="text-2xl font-bold text-red-500">{timeLeft}</span>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Product details</h2>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-600 ml-8 mb-2">Auction price</label>
                <div className="flex items-center space-x-2 justify-center">
                  <button onClick={handleDecrementBid} className="bg-[#FF0000] hover:bg-red-400 text-black font-bold py-2 px-4 rounded">
                    -
                  </button>
                  <input
                    type="number"
                    className="w-50 p-2 border rounded"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    min={price}
                  />
                  <button onClick={handleIncrementBid} className="bg-[#00FF00] hover:bg-green-400 text-black font-bold py-2 px-4 rounded">
                    +
                  </button>
                </div>
              </div>
              <div className='flex justify-center items-center space-x-4 mt-4'>
                <button className="w-full bg-[#00FFFF] text-white py-3 rounded-lg hover:bg-blue-600 mt-2" 
                  onClick={handleBid}>
                  Bid Now!
                </button>
                <div className="flex justify-end">
                  <button
                    className="flex items-center space-x-2 px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-200"
                    onClick={() => { setShowBidHistory(true); fetchBidHistory(); }}
                  >
                    <span>Auction history</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showBidHistory && (
        <div 
          id="bidHistoryOverlay" 
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleCloseBidHistory}
        >
          <div 
            className="fixed top-1/2 left-1/2 w-full max-w-sm min-h-[300px] max-h-[80vh] 
                      bg-white rounded-xl flex flex-col items-center gap-5 p-10 shadow-lg 
                      overflow-y-auto"
            style={{ transform: 'translate(-50%, -45%)' }} 
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex flex-col gap-4 px-4">
              <h1 className="text-2xl font-bold text-gray-900">Auction history</h1>
              {loading ? (
                <div className="text-center py-4">Loading...</div>
              ) : error ? (
                <div className="text-center py-4 text-red-500">{error}</div>
              ) : bidHistory.length === 0 ? (
                <div className="text-center py-4">There is no auction history yet.</div>
              ) : (
                <div className="divide-y">
                  {bidHistory.map(bid => (
                    <div key={bid._id} className="py-4 flex justify-between">
                      <p className="font-medium">{bid.user?.user?.name || bid.userName || 'ไม่ทราบชื่อ'}</p>
                      <p className="text-lg font-semibold">{bid.amount} บาท</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetailsPage;

// 'use client';

// import React, { useState, useEffect } from 'react';
// import { useSearchParams } from 'next/navigation';
// import NavbarBids from '../../components/NavbarEditProfile';

// function ProductDetailsPage() {
//   const searchParams = useSearchParams();
//   const [showBidHistory, setShowBidHistory] = useState(false);
//   const [bidHistory, setBidHistory] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [bidAmount, setBidAmount] = useState('');
//   const [timeLeft, setTimeLeft] = useState('กำลังโหลด...');
//   const [startingPrice, setStartingPrice] = useState(0);
//   const [currentPrice, setCurrentPrice] = useState(0);
//   const [minimumBidIncrement, setMinimumBidIncrement] = useState(0);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [bidsPerPage] = useState(5);

//   const id = searchParams.get('id');
//   const name = searchParams.get('name');
//   const image = searchParams.get('image');

//   // 📌 ดึงข้อมูลสินค้าจาก API
//   useEffect(() => {
//     if (!id) return;

//     fetch(`http://localhost:3111/api/v1/auction/${id}`)
//       .then(res => res.json())
//       .then(data => {
//         if (data.status === 'success') {
//           const auction = data.data;
//           setStartingPrice(auction.startingPrice);
//           setCurrentPrice(auction.currentPrice);
//           setMinimumBidIncrement(auction.minimumBidIncrement);

//           // ✅ ตั้งเวลาหมดอายุ
//           const endTime = new Date(auction.expiresAt).getTime();
//           const interval = setInterval(() => {
//             const now = new Date().getTime();
//             const diff = endTime - now;
//             if (diff <= 0) {
//               clearInterval(interval);
//               setTimeLeft('หมดเวลา');
//             } else {
//               const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
//               const minutes = Math.floor((diff / (1000 * 60)) % 60);
//               const seconds = Math.floor((diff / 1000) % 60);
//               setTimeLeft(`${hours}:${minutes}:${seconds}`);
//             }
//           }, 1000);
//         }
//       });
//   }, [id]);

//   // 📌 ดึงประวัติการบิดจาก API
//   const fetchBidHistory = async () => {
//     if (!id) return;
//     setLoading(true);
//     try {
//       const response = await fetch(`http://localhost:3111/api/v1/auction/${id}/bids`, {
//         method: 'GET',
//         headers: { 'Content-Type': 'application/json' },
//         credentials: 'include',
//       });
//       if (!response.ok) throw new Error('ไม่สามารถดึงข้อมูลประวัติการประมูลได้');
//       const data = await response.json();
//       setBidHistory(data.data || []);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 📌 ฟังก์ชันสำหรับการประมูล
//   const handleBid = async () => {
//     if (!bidAmount || bidAmount < currentPrice + minimumBidIncrement) {
//       alert(`กรุณาใส่ราคาที่มากกว่าหรือเท่ากับ ${currentPrice + minimumBidIncrement} บาท`);
//       return;
//     }

//     try {
//       const response = await fetch(`http://localhost:3111/api/v1/auction/${id}/bids`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         credentials: 'include',
//         body: JSON.stringify({ amount: Number(bidAmount) }),
//       });
//       const data = await response.json();
//       if (data.status === 'success') {
//         alert('ประมูลสำเร็จ!');
//         window.location.reload();
//       } else {
//         alert(data.message);
//       }
//     } catch (err) {
//       alert('เกิดข้อผิดพลาด!');
//     }
//   };

//   const indexOfLastBid = currentPage * bidsPerPage;
//   const indexOfFirstBid = indexOfLastBid - bidsPerPage;
//   const currentBids = bidHistory.slice(indexOfFirstBid, indexOfLastBid);
//   const totalPages = Math.ceil(bidHistory.length / bidsPerPage);

//   return (
//     <div>
//       <NavbarBids />
//       <div className="container mx-auto px-4 py-8">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           <div className="rounded-lg overflow-hidden">
//             <img src={image} alt={name} className="w-full h-auto object-cover" />
//           </div>

//           <div className="space-y-6">
//             <h1 className="text-3xl font-bold">{name}</h1>

//             <div className="border-t border-b py-4">
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-600">ราคาเริ่มต้น</span>
//                 <span className="text-2xl font-bold">{startingPrice} บาท</span>
//               </div>
//               <div className="flex justify-between items-center mt-4">
//                 <span className="text-gray-600">ราคาปัจจุบัน</span>
//                 <span className="text-2xl font-bold text-green-600">{currentPrice} บาท</span>
//               </div>
//               {/* <div className="flex justify-between items-center mt-4">
//                 <span className="text-gray-600">ราคาขั้นต่ำ</span>
//                 <span className="text-2xl font-bold text-blue-600">{minimumBidIncrement} บาท</span>
//               </div> */}
//               <div className="flex justify-between items-center mt-4">
//                 <span className="text-gray-600">เวลาที่เหลือ</span>
//                 <span className="text-2xl font-bold text-red-500">{timeLeft}</span>
//               </div>
//             </div>

//             <div className="flex justify-end">
//               <button
//                 className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
//                 onClick={() => {
//                   setShowBidHistory(true);
//                   fetchBidHistory();
//                 }}
//               >
//                 <span>ประวัติการประมูล</span>
//               </button>
//             </div>

//             <div>
//                <h2 className="text-xl font-semibold mb-2">รายละเอียดสินค้า</h2>
//              <p className="text-gray-600">
//                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//               </p>
//              </div>

//             <div className="space-y-4">
//               <div>
//                 <label className="block text-gray-600 mb-2">ราคาประมูล</label>
//                 <input
//                   type="number"
//                   className="w-full p-2 border rounded"
//                   value={bidAmount}
//                   onChange={e => setBidAmount(e.target.value)}
//                   min={currentPrice + minimumBidIncrement}
//                 />
//                 <p className="text-red-500 text-sm mt-1">
//                   *ราคาประมูลขั้นต่ำ {minimumBidIncrement} บาท*
//                 </p>
//               </div>
//               <button
//                 className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 mt-2"
//                 onClick={handleBid}
//               >
//                 ประมูลสินค้า
//               </button>
//             </div>
//           </div>
//           {/* Seller Information - Centered */}
//           <div className="mt-8 flex justify-center">
//               <div className="bg-white p-6 rounded-lg w-96">
//                 <div className="flex flex-col items-center space-y-4 border-2 border-black rounded-lg p-4">
//                 <h2 className="text-xl font-semibold mb-4 text-center">ข้อมูลผู้ขาย</h2>
//                   <img
//                     src="/image/profile1.jpg"
//                     alt="Seller Profile"
//                     className="w-16 h-16 rounded-full"
//                   />
//                   <div className="text-center">
//                     <h3 className="font-medium">ชื่อผู้ขาย</h3>
//                     {/* <p className="text-sm text-gray-500">สมาชิกตั้งแต่: January 2024</p> */}
//                     <div className="flex items-center justify-center mt-1">
//                       <span className="text-yellow-400">★★★★★</span>
//                       <span className="text-sm text-gray-500 ml-1">(5.0)</span>
//                     </div>
//                   </div>
//                   <button className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200">
//                     ติดต่อผู้ขาย
//                   </button>
//                 </div>
//               </div>
//             </div>
//         </div>
//       </div>

//       {showBidHistory && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-semibold">ประวัติการประมูล</h2>
//               <button onClick={() => setShowBidHistory(false)} className="text-gray-500 hover:text-gray-700">
//                 ✖
//               </button>
//             </div>
//             {loading ? (
//               <div className="text-center py-4">กำลังโหลด...</div>
//             ) : error ? (
//               <div className="text-center py-4 text-red-500">{error}</div>
//             ) : bidHistory.length === 0 ? (
//               <div className="text-center py-4">ยังไม่มีประวัติการประมูล</div>
//             ) : (
//               <>
//                 <div className="divide-y">
//                   {currentBids.map(bid => (
//                     <div key={bid._id} className="py-4 flex justify-between">
//                       <p className="font-medium">{bid.user?.user?.name || bid.userName || 'ไม่ทราบชื่อ'}</p>
//                       <p className="text-lg font-semibold">{bid.amount} บาท</p>
//                     </div>
//                   ))}
//                 </div>
//                 {totalPages > 1 && (
//                   <div className="flex justify-end items-center gap-2 mt-4">
//                     {[...Array(totalPages)].map((_, index) => (
//                       <button
//                         key={index + 1}
//                         onClick={() => setCurrentPage(index + 1)}
//                         className={`px-3 py-1 rounded ${
//                           currentPage === index + 1
//                             ? 'bg-blue-500 text-white'
//                             : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//                         }`}
//                       >
//                         {index + 1}
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ProductDetailsPage;