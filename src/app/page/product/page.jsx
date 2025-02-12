"use client";

import React from 'react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const products = [
  { id: 1, name: 'เก้าอี้สไตล์หลุยส์', images: ['/images/imgg.jpg','/images/p11.jpg','/images/p111.jpg','/images/p1111.jpg'], price: "7,000", description: 'เก้าอี้ สไตล์หลุยส์ เบาะหุ้มหนังแท้สีน้ำตาล ดึงดุมยึดหมุดทองเหลือง โครงไม้โอ๊ค(มี 2 ตัว)', description2: 'ขนาดกว้าง 53 ลึก 50 สูงนั่ง 36 สูงหลัง 79 เซนติเมตร', currentBid: "12,000" },
  { id: 2, name: 'เก้าอี้โครงไม้สนประสาน', images: ['/images/p22222.jpg','/images/p22.jpg','/images/p222.jpg','/images/p2222.jpg'], price: "900", description: 'เก้าอี้โครงไม้สนประสาน เบาะหนัง PU สีขาว 2 ตัว', description2: 'รายละเอียดเพิ่มเติมสำหรับเก้าอี้โครงไม้สนประสาน', currentBid: "900" },
  { id: 3, name: 'โซฟาแอล 3 ที่นั่ง ปรับเบดได้', images: ['/images/imgg33.jpg','/images/imgg333.jpg','/images/imgg3333.jpg','/images/imgg333333.jpg'], price: "7,200", description: 'โซฟาแอล 3 ที่นั่ง สามารถปรับเป็นเบดได้ เบาะหนังกลับ PU สีน้ำตาล มีลิ้นชักดึงเป็นเบดได้พิงหลังปรับเอนได้ 3 ระดับ โครงขาโซฟาไม้ โครงลิ้นชักเหล็ก', description2: 'รายละเอียดเพิ่มเติมสำหรับโซฟาแอล 3 ที่นั่ง', currentBid: "12,600" },
  { id: 4, name: 'โซฟา 3 ที่นั่งเบาะหนังPU สีเทา', images: ['/images/imgg44.jpg','/images/imgg444.jpg','/images/imgg4444.jpg'], price: "4,500", description: 'โซฟา 3 ที่นั่ง เบาะหนัง PU สีเทา โครงไม้ ขาพลาสติกสีดำ', description2: 'รายละเอียดเพิ่มเติมสำหรับโซฟา 3 ที่นั่ง', currentBid: "9,800" },
  { id: 5, name: 'ชุดโต๊ะทานอาหาร 3 ที่นั่ง', images: ['/images/imgg55555.jpg','/images/imgg555.jpg','/images/imgg5555.jpg','/images/imgg55.jpg'], price: "4,600", description: 'ชุดโต๊ะทานอาหาร 3 ที่นั่ง ท็อปกระจกเทมเปอร์สีดำ เก้าอี้มีพนักพิง เบาะผ้าสีเทาโครงขาเหล็กสีดำ', description2: 'โต๊ะ ขนาดกว้าง 80 ลึก 80 สูง 73 เซนติเมตร เก้าอี้ ขนาดกว้าง 43 ลึก 43 สูงนั่ง 45 สูงหลัง 92 เซนติเมตร', currentBid: "2,200" },
  { id: 6, name: 'โต๊ะเครื่องแป้ง 6 ลิ้นชัก', images: ['/images/p6.jpg','/images/imgg66.jpg','/images/imgg666.jpg','/images/imgg6666.jpg','/images/imgg66666.jpg'], price: "2,500", description: 'โต๊ะเครื่องแป้ง 6 ลิ้นชัก ท็อปปิดผิวลายหินอ่อน โครงไม้ MDF สีบีช', description2: 'รายละเอียดเพิ่มเติมสำหรับโต๊ะเครื่องแป้ง 6 ลิ้นชัก', currentBid: "4,500" },
  { id: 7, name: 'ตู้เสื้อผ้า 3 บาน', images: ['/images/p7.jpg','/images/imgg77.jpg','/images/imgg777.jpg','/images/imgg7777.jpg','/images/imgg777777.jpg'], price: "2,700", description: 'ตู้เสื้อผ้า 2 บานเปิดทึบ 1 บานเปิดกระจก โครงอลูมิเนียมิ 2 ลิ้นชักหน้าบานติดกระจกเงาสีชา โครงฐานไม้ MDF ปิดผิวสีเทา', description2: 'รายละเอียดเพิ่มเติมสำหรับตู้เสื้อผ้า 3 บาน', currentBid: "3,700" },
  { id: 8, name: 'โคมไฟติดพนัง โป๊ะทรงกระบอก', images: ['/images/p8.jpg','/images/imgg88.jpg','/images/imgg888.jpg','/images/imgg8888.jpg','/images/imgg88888.jpg','/images/imgg888888.jpg'], price: "2,600", description: 'โคมไฟติดผนัง โป๊ะทรงกระบอกแก้วขุ่นสีขาว โครงทองเหลือง', description2: 'รายละเอียดเพิ่มเติมสำหรับโคมไฟติดพนัง', currentBid: "2,400" },
];

const ProductPage = () => {
  const [timeLeft, setTimeLeft] = useState(180);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className="p-2 max-w-7xl mx-auto bg-white"> 
    <h1 className="text-2xl font-bold mb-4 text-center font-extrabold text-4xl">สินค้าประมูล</h1>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {products.map((product) => (
        <div key={product.id} className="border rounded-lg p-4 bg-white">
            <Link href={{
              pathname: '/page/bid',
              query: { 
                id: product.id,
                name: product.name,
                images: JSON.stringify(product.images),
                price: product.price,
                description: product.description,
                description2: product.description2,
                currentBid: product.currentBid
              }
            }} legacyBehavior>
              <a>
                <img src={product.images[0]} alt={product.name} className="w-full h-auto mb-4 rounded-lg cursor-pointer" />
              </a>
            </Link>
          <div className="mb-2 text-center">
            <h3 className="text-lg font-semibold">{product.name}</h3>
          </div>
          <div className="flex justify-between">
            <h3 className="text-lg font-semibold">{product.price} บาท</h3>
            <h3 className="text-lg font-semibold text-red-500">{formatTime(timeLeft)}</h3>
          </div>
        </div>
      ))}
    </div>
  </div>
  );
}
export default ProductPage;