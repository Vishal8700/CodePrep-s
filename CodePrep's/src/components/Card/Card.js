import React from 'react';
import './Card.css';

function Card() {
  return (
    <div className="card-app">
      <div className="card-header">
        <h2 className="header-title">Achieve Your Career <span className='highlight'>Ambitions</span></h2>
        <p className="header-description">
          Realize your career aspirations by connecting with top companies through hiring challenges 
          and accessing a range of full-time and part-time job opportunities and internships.
        </p>
      </div>
      
      <div className="card-container">
        <div className="card-item">
          <h2 className="card-title">Full-Time Jobs</h2>
          <p className="card-description">Discover thousands of amazing job opportunities in different industries. From tech titans to hidden gems, find your perfect fit!</p>
          <button className="card-button">Learn More</button>
          <img src="https://www.proelevate.in/assets/Home/Archive1.svg" alt="Full-Time Jobs" className="card-image" />
        </div>
        <div className="card-item">
          <h2 className="card-title">Internships</h2>
          <p className="card-description">Gain real-world experience, network with pros, and ignite your passion. Step into your future with internships that pave the way to success.</p>
          <button className="card-button">Learn More</button>
          <img src="https://www.proelevate.in/assets/Home/Archive2.svg" alt="Internships" className="card-image" />
        </div>
        <div className="card-item">
          <h2 className="card-title">Competitions</h2>
          <p className="card-description">Push your limits, win big, and get noticed! Compete in diverse challenges, sharpen your skills, and leave your mark on the world.</p>
          <button className="card-button">Learn More</button>
          <img  src="https://www.proelevate.in/assets/Home/Archive3.svg" alt="Competitions" className="card-image" />
        </div>
        <div className="card-item">
          <h2 className="card-title">Hackathons</h2>
          <p className="card-description">Build awesome projects, solve real-world problems, and network with tech leaders. Hack the future with like-minded peers and unlock endless possibilities.</p>
          <button className="card-button">Learn More</button>
          <img src="https://www.proelevate.in/assets/Home/Archive4.svg" alt="Hackathons" className="card-image" />
        </div>
      </div>
    </div>
  );
}

export default Card;
