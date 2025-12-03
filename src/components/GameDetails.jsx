import React, { useState } from 'react';
import './GameDetails.css';

const GameDetails = ({ game, onRate, onBack }) => {
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleRating = (rating) => {
    onRate(game.id, rating);
    setUserRating(rating);
  };

  const getStars = (rating) => {
    return Array.from({ length: 10 }, (_, i) => (
      <span
        key={i}
        className={`star ${i < rating ? 'filled' : ''}`}
        onClick={() => handleRating(i + 1)}
        onMouseEnter={() => setHoverRating(i + 1)}
        onMouseLeave={() => setHoverRating(0)}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="game-details">
      <button className="back-button" onClick={onBack}>
        ← Back to Games
      </button>
      
      <div className="details-container">
        <div className="details-image">
          <img src={game.image} alt={game.title} />
          <div className="overall-rating">
            <span className="rating-number">{game.rating.toFixed(1)}</span>
            <span className="rating-out-of">/10</span>
            <div className="total-reviews">{game.reviewCount} reviews</div>
          </div>
        </div>
        
        <div className="details-content">
          <h1 className="details-title">{game.title}</h1>
          <div className="details-meta">
            <span className="meta-item">🎮 {game.genre}</span>
            <span className="meta-item">🖥️ {game.platform.join(', ')}</span>
            <span className="meta-item">📅 {game.releaseYear}</span>
          </div>
          
          <p className="details-description">{game.description}</p>
          
          <div className="rating-section">
            <h3>Rate This Game</h3>
            <div className="star-rating">
              <div className="stars-display">
                {getStars(hoverRating || userRating || Math.round(game.rating))}
              </div>
              <div className="rating-value">
                {hoverRating > 0 ? hoverRating : userRating > 0 ? userRating : game.rating.toFixed(1)} / 10
              </div>
            </div>
            
            <div className="rating-buttons">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                <button
                  key={num}
                  className={`rating-button ${userRating === num ? 'selected' : ''}`}
                  onClick={() => handleRating(num)}
                >
                  {num}
                </button>
              ))}
            </div>
            
            <button 
              className="submit-rating"
              onClick={() => userRating > 0 && handleRating(userRating)}
              disabled={userRating === 0}
            >
              Submit Rating
            </button>
          </div>
          
          <div className="statistics">
            <h3>Statistics</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-value">{game.rating.toFixed(1)}</div>
                <div className="stat-label">Average Rating</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">{game.reviewCount}</div>
                <div className="stat-label">Total Reviews</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetails;