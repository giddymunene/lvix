import React from 'react';
import './Header.css';

const Header = ({ onSearch, onLogoClick }) => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo" onClick={onLogoClick}>
          <h1 className="logo-text">LViX</h1>
          <span className="logo-subtitle">Game Ratings</span>
        </div>
        
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search games by title or genre..."
            onChange={(e) => onSearch(e.target.value)}
            className="search-input"
          />
          <button className="search-button">
            <i className="search-icon">🔍</i>
          </button>
        </div>
        
        <div className="user-section">
          <button className="login-button">Login</button>
          <button className="signup-button">Sign Up</button>
        </div>
      </div>
    </header>
  );
};

export default Header;