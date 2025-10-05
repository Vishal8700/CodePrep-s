// src/components/ComingSoon/ComingSoon.js
import React from 'react';
import './ComingSoon.css'; // Import the CSS file for styling
import commingsoon from '../assets/coming-soon.png';
import Header from '../Header/Header'; // Import Header component
import Footer from '../Footer/Footer'; // Import Footer component

const ComingSoon = ({ page }) => {
  return (
    <div className="coming-soon-page">
      <Header /> {/* Add Header */}
      <div className="coming-soon-container">
        <img
          src={commingsoon} // Update this path to your image
          alt="Coming Soon"
          className="coming-soon-image"
        />
        <h1 className="coming-soon-text">{page} Coming Soon!</h1>
      </div>
      <Footer /> {/* Add Footer */}
    </div>
  );
};

export default ComingSoon;
