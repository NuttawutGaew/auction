"use client";

import React from 'react';
import Link from 'next/link';

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

function ProductPage() {
  return (
    <div className="p-2 max-w-7xl mx-auto bg-white"> 
      <h1 className="text-2xl font-bold mb-4 text-center font-extrabold text-4xl">สินค้าประมูล</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg p-4 bg-white">
            <img src={product.image} alt={product.name} className="w-full h-auto mb-4 rounded-lg" />
            <div className="mb-2 text-center">
              <h3 className="text-lg font-semibold">{product.name}</h3>
            </div>
            <div className="flex justify-between">
              <h3 className="text-lg font-semibold">{product.price} บาท</h3>
              <h3 className="text-lg font-semibold text-red-500">00:10:00</h3>
            </div>
            <Link href={`/bid`} legacyBehavior >
              <a className="text-black rounded flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
export default ProductPage;