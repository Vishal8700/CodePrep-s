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
      <div className="logo">
        <img src={logo} alt="ProElevate Logo" className="logo-img" />
        <span className="logo-text">CodePrep's</span>
      </div>
      <nav className="nav-menu">
        <ul className="nav-list">
          <li>
            <a href="/" className={isActive('/') ? 'active' : ''}>Home</a>
          </li>
          <li className={`dropdown ${isDropdownOpen ? 'open' : ''}`}>
            <button 
              className="dropdown-toggle"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              DSA Practice <FaChevronDown className="dropdown-icon" />
            </button>
            <ul className="dropdown-menu">
            <li className="dropdown-item">
              <a href="https://drive.google.com/drive/folders/1Z0zt1xmnw18VWtrJ-jf1qvOEcSos3gzw?usp=sharing" className={isActive('/dsa-practice/6-company-30-days') ? 'active' : ''} target="_blank" rel="noopener noreferrer">
                <div className="dropdown-item-title">6 Company 30 Days</div>
                <div className="dropdown-item-description">Challenge to solve 90 questions from 6 companies in 30 days</div>
              </a>
            </li>
            <li className="dropdown-item">
              <a href="https://docs.google.com/spreadsheets/d/1musJMnRIYEoZtoBsP2S-8gcBnkkaI0EptGxnQjM8g8I/edit?usp=sharing" className={isActive('/dsa-practice/arsh-dsa-sheet') ? 'active' : ''}target="_blank" rel="noopener noreferrer" >
                <div className="dropdown-item-title">DSA Sheet</div>
                <div className="dropdown-item-description">280+ DSA questions designed by gitalien</div>
              </a>
            </li>
            <li className="dropdown-item">
              <a href="https://leetcode.com/studyplan/leetcode-75/" className={isActive('/dsa-practice/blind-75') ? 'active' : ''} target="_blank" rel="noopener noreferrer">
                <div className="dropdown-item-title">Blind 75</div>
                <div className="dropdown-item-description">LeetCode's 75 essential coding interview questions</div>
              </a>
            </li>
          </ul>

          </li>
          <li><a href="/jobs" className={isActive('/jobs') ? 'active' : ''}>Jobs</a></li>
          <li><a href="/events" className={isActive('/events') ? 'active' : ''}>Events</a></li>
          <li><a href="/dsa-courses" className={isActive('/dsa-courses') ? 'active' : ''}>DSA Courses</a></li>
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
