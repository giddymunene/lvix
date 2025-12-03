import React, { useState } from 'react';
import './GameDetails.css';

const GameDetails = ({ game, onRate, onBack, user, onLoginRequest }) => {
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  const handleRating = (rating) => {
    if (!user) {
      onLoginRequest();
      return;
    }
    
    if (userRating === 0) {
      onRate(game.id, rating, reviewText);
      setUserRating(rating);
    }
  };

  const handleSubmitReview = () => {
    if (!user) {
      onLoginRequest();
      return;
    }
    
    if (userRating > 0) {
      onRate(game.id, userRating, reviewText);
      setReviewText('');
    }
  };

  const getStars = (rating) => {
    return Array.from({ length: 10 }, (_, i) => (
      <span
        key={i}
        className={`star ${i < rating ? 'filled' : ''} ${!user ? 'disabled' : ''}`}
        onClick={() => handleRating(i + 1)}
        onMouseEnter={() => user && setHoverRating(i + 1)}
        onMouseLeave={() => setHoverRating(0)}
      >
        ★
      </span>
    ));
  };

  // Check if user has already reviewed this game
  const userReview = game.reviews?.find(review => review.userId === user?.id);

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
          
          {userReview ? (
            <div className="user-review-section">
              <h3>Your Review</h3>
              <div className="user-review">
                <div className="user-review-header">
                  <span className="user-review-rating">
                    {Array.from({ length: 10 }, (_, i) => (
                      <span key={i} className={i < userReview.rating ? 'filled' : ''}>★</span>
                    ))}
                    <span className="rating-value">{userReview.rating}/10</span>
                  </span>
                  <span className="review-date">
                    {new Date(userReview.date).toLocaleDateString()}
                  </span>
                </div>
                {userReview.text && (
                  <p className="user-review-text">{userReview.text}</p>
                )}
              </div>
            </div>
          ) : (
            <div className="rating-section">
              <h3>Rate This Game</h3>
              
              {!user && (
                <div className="login-prompt">
                  <p>Please login to rate this game</p>
                  <button 
                    className="login-to-rate"
                    onClick={onLoginRequest}
                  >
                    Login to Rate
                  </button>
                </div>
              )}
              
              {user && (
                <>
                  <div className="star-rating">
                    <div className="stars-display">
                      {getStars(hoverRating || userRating || Math.round(game.rating))}
                    </div>
                    <div className="rating-value">
                      {hoverRating > 0 ? hoverRating : userRating > 0 ? userRating : game.rating.toFixed(1)} / 10
                    </div>
                  </div>
                  
                  <div className="review-input">
                    <textarea
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      placeholder="Write a review (optional)"
                      rows="3"
                      maxLength="500"
                    />
                    <div className="review-char-count">
                      {reviewText.length}/500 characters
                    </div>
                  </div>
                  
                  <div className="rating-buttons">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                      <button
                        key={num}
                        className={`rating-button ${userRating === num ? 'selected' : ''}`}
                        onClick={() => {
                          setUserRating(num);
                        }}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                  
                  <button 
                    className="submit-rating"
                    onClick={handleSubmitReview}
                    disabled={userRating === 0}
                  >
                    Submit Rating{reviewText ? ' & Review' : ''}
                  </button>
                </>
              )}
            </div>
          )}
          
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