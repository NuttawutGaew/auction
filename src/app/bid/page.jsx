"use client";

import React from 'react';
import { useParams } from 'next/navigation';

const products = [
  { id: 1, name: 'เก้าอี้สไตล์หลุยส์', image: '/images/p1.jpg', price: 7000 , description: 'Description of Product 3', currentBid: 300 },
  { id: 2, name: 'เก้าอี้โครงไม้สนประสาน', image: '/images/p2.jpg', price: 900 , description: 'Description of Product 3', currentBid: 300},
  { id: 3, name: 'โซฟาแอล 3 ที่นั่ง ปรับเบดได้', image: '/images/p3.jpg', price: 7200 , description: 'Description of Product 3', currentBid: 300},
  { id: 4, name: 'โซฟา 3 ที่นั่งเบาะหนังPU สีเทา', image: '/images/p4.jpg', price: 4500 , description: 'Description of Product 3', currentBid: 300},
  { id: 5, name: 'ชุดโต๊ะทานอาหาร 3 ที่นั่ง', image: '/images/p5.jpg', price: 4600 , description: 'Description of Product 3', currentBid: 300},
  { id: 6, name: 'โต๊ะเครื่องแป้ง 6 ลิ้นชัก', image: '/images/p6.jpg', price: 2500 , description: 'Description of Product 3', currentBid: 300},
  { id: 7, name: 'ตู้เสื้อผ้า 3 บาน', image: '/images/p7.jpg', price: 2700 , description: 'Description of Product 3', currentBid: 300},
  { id: 8, name: 'โคมไฟติดพนัง โป๊ะทรงกระบอก', image: '/images/p8.jpg', price: 2600 , description: 'Description of Product 3', currentBid: 300},
];

function BidPage() {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">{product.name}</h1>
      <img src={product.image} alt={product.name} className="w-full h-auto mb-4 rounded-lg" />
      <p className="text-gray-700 mb-4">{product.description}</p>
      <p className="text-gray-700 mb-4">Current Bid: ${product.currentBid}</p>
      <button className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded">
        Place Bid
      </button>
    </div>
  );
}

export default BidPage;