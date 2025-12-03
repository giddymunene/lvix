import React from 'react';
import './GameList.css';

const GameList = ({ games, onSelectGame }) => {
  const getRatingColor = (rating) => {
    if (rating >= 8.5) return '#4caf50';
    if (rating >= 7.0) return '#ff9800';
    return '#f44336';
  };

  return (
    <div className="game-list">
      <h2 className="section-title">Top Rated Games</h2>
      <div className="games-grid">
        {games.map(game => (
          <div 
            key={game.id} 
            className="game-card"
            onClick={() => onSelectGame(game)}
          >
            <div className="game-image">
              <img src={game.image} alt={game.title} />
              <div 
                className="rating-badge"
                style={{ backgroundColor: getRatingColor(game.rating) }}
              >
                {game.rating.toFixed(1)}
              </div>
            </div>
            <div className="game-info">
              <h3 className="game-title">{game.title}</h3>
              <div className="game-meta">
                <span className="game-genre">{game.genre}</span>
                <span className="game-platform">{game.platform.join(', ')}</span>
                <span className="game-year">{game.releaseYear}</span>
              </div>
              <p className="game-description">{game.description}</p>
              <div className="review-count">
                ⭐ {game.reviewCount} reviews
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameList;