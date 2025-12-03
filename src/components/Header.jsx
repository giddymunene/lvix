import React from 'react';
import './Header.css';

const Header = ({ 
  onSearch, 
  onLogoClick, 
  user, 
  onLoginClick, 
  onSignupClick, 
  onLogoutClick 
}) => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo" onClick={onLogoClick}>
          <h1 className="logo-text">IViX</h1>
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
          {user ? (
            <div className="user-info">
              <span className="welcome-text">
                Welcome, <strong>{user.username}</strong>!
              </span>
              <button 
                className="logout-button"
                onClick={onLogoutClick}
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <button 
                className="login-button"
                onClick={onLoginClick}
              >
                Login
              </button>
              <button 
                className="signup-button"
                onClick={onSignupClick}
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;