import React from 'react';
import Image from "next/image";
import Navbar from "./components/Navbar";
import logo from '../app/images/Logo.png';
import Slideimage from './components/Slideimage';
import ProductpageNouser from './page/product_copy/page';
import ButtonMain from "./components/ButtonMain";
import ProducttPage from './page/product-1/page';
import ContactPage from './page/contact/page';
import ScrollToTop from './components/ScolltoTop'

export default function Home() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  return (
    <div className="min-h-screen p-0 m-0 font-[family-name:var(--font-geist-sans)] bg-[#333333]">
      <div>
        <Navbar />
      </div>
      <div className="pt-16"> 
        <div className="flex flex-col items-center gap-4 pt-8 mx-0">
          <Image 
            src={logo}
            width={400}
            height={300}
            alt="logo"
          />
          <div>
            <ButtonMain />
          </div>
        </div>
        <main >
          <div className="pt-2 w-full bg-[#787878] p-4 mx-0">
            <Slideimage />
          </div>
          <div id="auction" className="w-full bg-white mx-0">
            <ProductpageNouser />
          </div>
          <div id="product_v1" className="pt-2 w-full h-auto bg-[#787878] mx-0 p-4">
            <ProducttPage />
          </div>
          <div id="contactt" className="w-full h-auto bg-[#333333]  ">
            <ContactPage />
          </div>
          <div>
            <ScrollToTop />
          </div>
        </main>
      </div>
    </div>
  );
}