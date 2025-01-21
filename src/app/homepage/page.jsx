import React from 'react';
import Navbar from '../components/Navbar';

function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar isLoggedIn={true} />
      <div className="pt-16">
        <h1 className="text-3xl font-bold text-center">ยินดีต้อนรับสู่หน้าแรก</h1>
      </div>
    </div>
  );
}

export default HomePage;