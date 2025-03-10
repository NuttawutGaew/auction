"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import NavbarBids from '../../components/NavbarBids';

const ProductPageNouser = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [timeLeft, setTimeLeft] = useState({})

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3111/api/v1/auction", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        })
    
        if (!response.ok) {
          throw new Error("Unable to retrieve product information")
        }
    
        const data = await response.json()

        // ✅ กรองเฉพาะสินค้าที่กำลังเปิดประมูล
        const activeProducts = data.data.filter(product => product.status === "active")
        setProducts(activeProducts)

        // ✅ เริ่มต้นคำนวณเวลาคงเหลือ
        const initialTimeLeft = {}
        activeProducts.forEach(product => {
          initialTimeLeft[product._id] = calculateTimeLeft(product.expiresAt)
        })
        setTimeLeft(initialTimeLeft)

        // ✅ ใช้ `setInterval` ให้นับเวลาถอยหลังทุกวินาที
        const interval = setInterval(() => {
          const updatedTimeLeft = {}
          activeProducts.forEach(product => {
            updatedTimeLeft[product._id] = calculateTimeLeft(product.expiresAt)
          })
          setTimeLeft(updatedTimeLeft)
        }, 1000)

        return () => clearInterval(interval) // เคลียร์ `setInterval` เมื่อ Component Unmount
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  // 📌 ฟังก์ชันคำนวณเวลาคงเหลือ
  const calculateTimeLeft = (expiresAt) => {
    const endTime = new Date(expiresAt).getTime()
    const now = new Date().getTime()
    const diff = endTime - now

    if (diff <= 0) return "Time Out!!"

    const hours = String(Math.floor(diff / (1000 * 60 * 60))).padStart(2, '0')
    const minutes = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, '0')
    const seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, '0')

    return `${hours}:${minutes}:${seconds}`
  }

  if (loading) return (
    <div className='flex flex-col justify-center items-center h-screen text-4xl text-center font-bold'>
      <div className='p-4'>Loading...</div>
      <img alt="Loading" src='https://i.pinimg.com/originals/f2/9f/02/f29f025c9ff5297e8083c52b01f1a709.gif' />
    </div>
  );
  if (error) return (
    <div className='flex flex-col justify-center items-center h-screen text-4xl text-center font-bold'>
      <div className='p-4'>Loading...</div>
      <img alt="Loading" src='https://i.pinimg.com/originals/f2/9f/02/f29f025c9ff5297e8083c52b01f1a709.gif' />
    </div>
  );



  return (
    <div>
      <div className="max-w-full mx-auto bg-white  p-8">
        <h1 className="font-bold mb-4 text-center font-extrabold text-4xl p-2 shadow-xl bg-gradient-to-tr from-yellow-400 to-red-300">Auction Product List</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-4">
          {products.map((product) => (
            <div key={product._id} className="border rounded-lg p-4 bg-white shadow-xl">
              <Link href={{
                pathname: `/page/bid_copy`,
                query: { 
                  id: product._id,
                  name: product.name,
                  image: product.image,
                  price: product.currentPrice,
                  prices: product.startingPrice,
                  Date: product.expiresAt,
                  bids: product.bids.length,
                  discription: product.description
                }
              }} legacyBehavior>
                <a>
                  <img src={product.image} alt={product.name} className="w-full h-64 object-cover mb-4 rounded-lg cursor-pointer" />
                </a>
              </Link>
              <h2 className="font-bold text-xl mb-2">{product.name}</h2>
              {/* <p className="text-gray-700 mb-2">{auction.productDescription}</p> */}
              {/* <p className="text-gray-700 mb-2">Size: {auction.productSize}</p> */}
              {/* <p className="text-gray-700 mb-2">Starting Bid: {auction.startingBid} บาท</p> */}
              <p className="text-gray-700 mb-2">Current Bid: {product.currentPrice} ฿</p>
              <p className="text-md text-red-500 font-semibold">{timeLeft[product._id] || "Loading..."}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPageNouser;