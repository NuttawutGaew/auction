'use client';
import React from 'react';

const ScrollToTop = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className='flex justify-center items-center'>
      <button onClick={scrollToTop} className="fixed bottom-10 right-5 px-4 py-2 text-2xl bg-yellow-500 text-white border-none rounded cursor-pointer ">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
        </svg>
         Top
      </button>
    </div>
  );
};
export default ScrollToTop;