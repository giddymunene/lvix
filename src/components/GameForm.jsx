import React, { useState } from 'react';
import './GameForm.css';

const GameForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    genre: '',
    platform: '',
    description: '',
    releaseYear: new Date().getFullYear(),
  });

  const genres = [
    'Action', 'Adventure', 'RPG', 'Strategy', 'Simulation',
    'Sports', 'Racing', 'Puzzle', 'Horror', 'MMO'
  ];

  const platforms = [
    'PC', 'PlayStation 5', 'PlayStation 4', 'Xbox Series X/S',
    'Xbox One', 'Nintendo Switch', 'Mobile', 'VR'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const gameData = {
      ...formData,
      platform: formData.platform.split(',').map(p => p.trim())
    };
    onSubmit(gameData);
    setFormData({
      title: '',
      genre: '',
      platform: '',
      description: '',
      releaseYear: new Date().getFullYear(),
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="game-form">
      <h2 className="form-title">Add New Game</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Game Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Enter game title"
          />
        </div>

        <div className="form-group">
          <label htmlFor="genre">Genre *</label>
          <select
            id="genre"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            required
          >
            <option value="">Select a genre</option>
            {genres.map(genre => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="platform">Platform(s) *</label>
          <select
            id="platform"
            name="platform"
            value={formData.platform}
            onChange={handleChange}
            required
            multiple
            size="3"
          >
            {platforms.map(platform => (
              <option key={platform} value={platform}>{platform}</option>
            ))}
          </select>
          <small>Hold Ctrl/Cmd to select multiple</small>
        </div>

        <div className="form-group">
          <label htmlFor="releaseYear">Release Year</label>
          <input
            type="number"
            id="releaseYear"
            name="releaseYear"
            value={formData.releaseYear}
            onChange={handleChange}
            min="1980"
            max={new Date().getFullYear()}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            placeholder="Enter game description"
          />
        </div>

        <button type="submit" className="submit-button">
          Add Game
        </button>
      </form>
    </div>
  );
};

export default GameForm;