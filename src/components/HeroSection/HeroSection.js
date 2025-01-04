// HeroSection.js
import React from 'react';
import './HeroSection.css'; // Create this file for styling

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>One Stop Destination To Your <span className="highlight">First Job</span></h1>
        <p>Your one-stop destination for DSA practice, interview experiences, and career opportunities.</p>
        <div className="buttons">
          <button className="primary-btn">Get Started</button>
          <button className="secondary-btn">Find Jobs</button>
        </div>
      </div>
      <div className="hero-labels">
        <span className="label-red">Interview Experiences</span>
        <span className="label-orange">Jobs & Internships</span>
        <span className="label-green">Company Wise Interviews</span>
        <span className="label-blue">Problem Solving</span>
      </div>
    </section>
  );
};

export default HeroSection;
