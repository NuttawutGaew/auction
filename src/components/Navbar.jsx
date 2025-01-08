import React from 'react';
import './Navbar.css'; // ถ้าคุณมีไฟล์ CSS สำหรับสไตล์

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <a href="/">BrandName</a>
      </div>
      <ul className="navbar-nav">
        <li className="nav-item">
          <a href="/home" className="nav-link">Home</a>
        </li>
        <li className="nav-item">
          <a href="/about" className="nav-link">About</a>
        </li>
        <li className="nav-item">
          <a href="/contact" className="nav-link">Contact</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;