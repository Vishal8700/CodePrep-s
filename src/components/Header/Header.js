import React, { useState } from 'react';
import { FaBell, FaChevronDown } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import './Header.css';
import logo from '../assets/logo.png'
import user from '../assets/user.png'
const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();

  // Helper function to check if a link is active
  const isActive = (path) => location.pathname === path;

  return (
    <header className="header">
      <a href="/" className="logo">
        <img src={logo} alt="ProElevate Logo" className="logo-img" />
        <span className="logo-text">CodePrep's</span>
      </a>

      <nav className="nav-menu">
        <ul className="nav-list">
          <li>
            <a href="/" className={isActive('/') ? 'active' : ''}>Home</a>
          </li>
          <li >
            <a
              href="https://nsutmagnet.tech/"

              target="_blank"
              rel="noopener noreferrer"
            >
              Magnet - DSA
            </a>
          </li>

          <li><a href="/jobs" className={isActive('/jobs') ? 'active' : ''}>Jobs</a></li>
          <li><a href="https://aeronauts.vercel.app/events" target="_blank"
            rel="noopener noreferrer" >Events</a></li>
          <li><a href="/dsa-courses" className={isActive('/dsa-courses') ? 'active' : ''}>Courses</a></li>
        </ul>
      </nav>
      <div className="user-actions">
        <img src={user} alt="User Avatar" className="user-avatar" />
        <FaBell className="notification-bell" />
      </div>
    </header>
  );
};

export default Header;
