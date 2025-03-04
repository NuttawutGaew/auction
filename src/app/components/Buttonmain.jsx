// "use client";

// import React from 'react'

// function ButtonMain() {
//   return (
//     <div className="flex gap-4">
//        <button className=" text-yellow-400 px-4 py-2 rounded hover:bg-yellow-400 hover:text-white">หน้าหลัก</button>
//        <button className=" text-yellow-400 px-4 py-2 rounded hover:bg-yellow-400 hover:text-white">สินค้าประมูล</button>
//        <button className=" text-yellow-400 px-4 py-2 rounded hover:bg-yellow-400 hover:text-white">สินค้า</button>
//        <button className=" text-yellow-400 px-4 py-2 rounded hover:bg-yellow-400 hover:text-white">ติดต่อเรา</button>
//     </div>
//   )
// }

// export default ButtonMain

"use client";
import React from 'react'
import Link from 'next/link';

const ButtonMain = () => {
  return (
    <div className="flex gap-4">
      <Link href="/" legacyBehavior>
        <a className="text-yellow-400 px-4 py-2 rounded hover:bg-yellow-400 hover:text-white transition duration-50 ease-in-out transform hover:scale-105">หน้าหลัก</a>
      </Link>

      <Link href="#auction" legacyBehavior>
        <a className="text-yellow-400 px-4 py-2 rounded hover:bg-yellow-400 hover:text-white transition duration-50 ease-in-out transform ">สินค้าประมูล</a>
      </Link>

      <Link href="#product_v1" legacyBehavior>
        <a className="text-yellow-400 px-4 py-2 rounded hover:bg-yellow-400 hover:text-white transition duration-50 ease-in-out transform hover:scale-105">สินค้า</a>
      </Link>

      <Link href="#contactt" legacyBehavior>
        <a className="text-yellow-400 px-4 py-2 rounded hover:bg-yellow-400 hover:text-white transition duration-50 ease-in-out transform hover:scale-105">ติดต่อเรา</a>
      </Link>
    </div>
  );
};

export default ButtonMain ;