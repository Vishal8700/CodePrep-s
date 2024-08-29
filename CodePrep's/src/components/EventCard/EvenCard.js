import React from 'react';
import './EventCard.css';
import discover4 from '../assets/Discover4.svg';
import discover3 from '../assets/Discover3.svg';
import discover2 from '../assets/Discover2.svg';
import discover1 from '../assets/Discover1.svg';
function EventCard() {
  return (
    <div className="event-card-app">
      <div className="event-card-container">
        <div className="event-card-header">
          <h1>Discover your path <span className="event-card-highlight">to success</span></h1>
          <p>Unlock a world of possibilities, from online challenges to showcasing your skills. Build your portfolio and enhance your CV with ProElevate's diverse opportunities.</p>
        </div>
        <div className="event-card-cards">
          <div className="event-card-card">
            <div className="event-card-card-header">
              <h2>Open to Online Events</h2>
              <h3>College Students</h3>
            </div>
            <div className="event-card-card-body">
              <img src={discover1} alt="Online Event" />
            </div>
          </div>
          <div className="event-card-card">
            <div className="event-card-card-header">
              <h2>Open to Offline Events</h2>
              <h3>College Students</h3>
            </div>
            <div className="event-card-card-body">
              <img src={discover2} alt="Offline Event" />
            </div>
          </div>
          <div className="event-card-card">
            <div className="event-card-card-header">
              <h2>With the</h2><br/>
              <h3>Team Participations</h3>
            </div>
            <div className="event-card-card-body">
              <img src={discover3} alt="Team Participation" />
            </div>
          </div>
          <div className="event-card-card">
            <div className="event-card-card-header">
              <h2>With the</h2>
              <h3>Individual Participations</h3>
            </div>
            <div className="event-card-card-body">
              <img src={discover4} alt="Individual Participation" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
