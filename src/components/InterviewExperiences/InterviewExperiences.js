import React from 'react';
import './InterviewExperiences.css';

const InterviewExperiences = () => {
  return (
    <div className="container_xyz">
      <div className="interview-header">
        <h1>Most Viewed Interview <span className="highlight">Experiences</span></h1>
     
      </div>
      
      <div className="card">
        <p className="subtitle">Embrace the Code Master Within</p>
        <h2>Embark on a Coding Adventure with ProElevate!
        We've got the perfect toolkit to make coding a breeze. Just bring your curiosity and a dash of 
        dedication, and let's dive into the world of coding fun together!
        </h2>
        
        
        <div className="features">
          <div className="feature">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
            </svg>
            <p>Content designed by IIT & Stanford alumni</p>
          </div>
          <div className="feature">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            <p>Instant 1:1 doubt resolution</p>
          </div>
          <div className="feature">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
              <line x1="8" y1="21" x2="16" y2="21"></line>
              <line x1="12" y1="17" x2="12" y2="21"></line>
            </svg>
            <p>Practical learning with 100+ problems & 10+ projects in each course</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewExperiences;