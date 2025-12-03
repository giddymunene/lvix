import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-logo">IVIX</h3>
          <p className="footer-description">
            The ultimate platform for game enthusiasts to rate, review, and discover amazing games.
          </p>
        </div>
        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#top-games">Top Games</a></li>
            <li><a href="#new-releases">New Releases</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-links">
            <a href="#twitter" className="social-link">Twitter</a>
            <a href="#facebook" className="social-link">Facebook</a>
            <a href="#instagram" className="social-link">Instagram</a>
            <a href="#youtube" className="social-link">YouTube</a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} IVIX Game Ratings. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;