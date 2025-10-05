import React from 'react';
import './Footer.css';
import logo from'../assets/logo.png'; // Import your CSS file

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-row">
          <div className="footer-col">
            <img src={logo} alt="ProElevate Logo" className="footer-logo" />
            <p className="footer-text">Join Our Community: Connect with like-minded individuals and grow your network.</p>
          </div>
          <div className="footer-col">
            <h4 className="footer-heading">CodePrep's</h4>
            <ul className="footer-links">
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4 className="footer-heading">Contact Us</h4>
            <ul className="footer-links">
              <li><a href="mailto:arshgoyal98@gmail.com">vishalkumar09837@gmail.com</a></li>
              <li><a href="#">Feedback</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4 className="footer-heading">Useful Links</h4>
            <ul className="footer-links">
              <li><a href="#">DSA Practice</a></li>
              <li><a href="#">Interviews</a></li>
              <li><a href="#">Jobs</a></li>
              <li><a href="#">Competitions</a></li>
              <li><a href="#">Resources</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-row">
          <div className="footer-col">
            <h4 className="footer-heading">Follow us on</h4>
            <ul className="footer-social-links">
              <li>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#ecf0f1" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2.2c-5.41 0-9.8 4.39-9.8 9.8 0 4.89 3.57 8.94 8.28 9.75v-6.91H8.24v-2.84h2.23v-2.17c0-2.2 1.35-3.41 3.31-3.41.94 0 1.75.07 1.99.1v2.31h-1.37c-1.08 0-1.29.51-1.29 1.26v1.66h2.57l-.34 2.84h-2.23v6.91c4.71-.81 8.28-4.86 8.28-9.75 0-5.41-4.39-9.8-9.8-9.8z"/>
                  </svg>
                </a>
              </li>
              <li>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#ecf0f1" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.954 4.569c-.885.392-1.83.656-2.825.775 1.014-.608 1.794-1.572 2.163-2.724-.951.555-2.005.959-3.127 1.184-.897-.957-2.173-1.555-3.591-1.555-2.717 0-4.917 2.201-4.917 4.917 0 .386.044.762.127 1.124-4.083-.205-7.699-2.161-10.118-5.13-.424.728-.666 1.571-.666 2.475 0 1.71.87 3.215 2.188 4.099-.807-.026-1.566-.247-2.228-.617v.062c0 2.385 1.698 4.374 3.95 4.827-.414.112-.852.172-1.302.172-.319 0-.63-.031-.931-.087.631 1.972 2.463 3.404 4.63 3.444-1.698 1.33-3.835 2.123-6.155 2.123-.4 0-.791-.023-1.175-.068 2.194 1.406 4.796 2.228 7.594 2.228 9.104 0 14.077-7.544 14.077-14.076 0-.214-.005-.426-.014-.637.965-.698 1.8-1.568 2.462-2.558z"/>
                  </svg>
                </a>
              </li>
              <li>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#ecf0f1" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.615 3h-15.23c-1.585 0-2.385 1.285-2.385 2.87v12.26c0 1.585.8 2.87 2.385 2.87h15.23c1.585 0 2.385-1.285 2.385-2.87v-12.26c0-1.585-.8-2.87-2.385-2.87zm-10.771 15.034v-10.137l10.497 5.069-10.497 5.068z"/>
                  </svg>
                </a>
              </li>
            </ul>
          </div>
          
          <div className="footer-col footer-col-center">
            <p className="footer-copyright">&copy; 2025 CodePrep's - All Rights Reserved</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
