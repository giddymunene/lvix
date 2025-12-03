import React, { useState, useEffect } from 'react';
import './GameForm.css';

const GameForm = ({ onSubmit, user, onLoginRequest }) => {
  const [formData, setFormData] = useState({
    title: '',
    genre: '',
    platform: [],
    description: '',
    releaseYear: new Date().getFullYear(),
    developer: '',
    publisher: '',
    coverImage: '',
    website: '',
    trailerUrl: '',
    multiplayer: false,
    singlePlayer: true,
    tags: []
  });

  const [selectedTags, setSelectedTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  const genres = [
    'Action', 'Adventure', 'RPG', 'Strategy', 'Simulation',
    'Sports', 'Racing', 'Puzzle', 'Horror', 'MMO',
    'FPS', 'Battle Royale', 'MOBA', 'Survival', 'Open World',
    'Indie', 'Casual', 'Educational', 'Music', 'Fighting'
  ];

  const platforms = [
    'PC', 'PlayStation 5', 'PlayStation 4', 'Xbox Series X/S',
    'Xbox One', 'Nintendo Switch', 'Mobile', 'VR',
    'Mac', 'Linux', 'Stadia', 'Retro'
  ];

  const popularTags = [
    'Open World', 'Multiplayer', 'Story Rich', 'Co-op',
    'Competitive', 'Early Access', 'Free to Play', 'Horror',
    'Fantasy', 'Sci-fi', 'Sandbox', 'Survival', 'Crafting',
    'Pixel Graphics', 'Roguelike', 'Battle Royale'
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length < 2) {
      newErrors.title = 'Title must be at least 2 characters';
    }

    if (!formData.genre) {
      newErrors.genre = 'Please select a genre';
    }

    if (formData.platform.length === 0) {
      newErrors.platform = 'Please select at least one platform';
    }

    if (formData.releaseYear < 1970 || formData.releaseYear > currentYear) {
      newErrors.releaseYear = `Release year must be between 1970 and ${currentYear}`;
    }

    if (formData.coverImage && !/^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i.test(formData.coverImage)) {
      newErrors.coverImage = 'Please enter a valid image URL (jpg, png, webp, gif)';
    }

    if (formData.website && !/^https?:\/\/.+\..+/.test(formData.website)) {
      newErrors.website = 'Please enter a valid website URL';
    }

    if (formData.trailerUrl && !/^https?:\/\/.+/.test(formData.trailerUrl)) {
      newErrors.trailerUrl = 'Please enter a valid URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      onLoginRequest();
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const gameData = {
      ...formData,
      tags: selectedTags,
      addedBy: user.username,
      addedDate: new Date().toISOString()
    };

    onSubmit(gameData);
    
    // Reset form
    setFormData({
      title: '',
      genre: '',
      platform: [],
      description: '',
      releaseYear: currentYear,
      developer: '',
      publisher: '',
      coverImage: '',
      website: '',
      trailerUrl: '',
      multiplayer: false,
      singlePlayer: true,
      tags: []
    });
    setSelectedTags([]);
    setTagInput('');
    setPreviewImage('');
    setErrors({});
    setIsSubmitting(false);

    // Show success message
    alert('Game added successfully!');
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox' && name === 'platform') {
      const updatedPlatforms = checked
        ? [...formData.platform, value]
        : formData.platform.filter(p => p !== value);
      setFormData(prev => ({ ...prev, platform: updatedPlatforms }));
    } else if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }

    // Update preview image
    if (name === 'coverImage') {
      setPreviewImage(value);
    }
  };

  const handleTagAdd = (tag) => {
    if (!selectedTags.includes(tag) && selectedTags.length < 10) {
      setSelectedTags(prev => [...prev, tag]);
      setTagInput('');
    }
  };

  const handleTagRemove = (tag) => {
    setSelectedTags(prev => prev.filter(t => t !== tag));
  };

  const handleTagInputKeyDown = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      handleTagAdd(tagInput.trim());
    }
  };

  const handleQuickFill = () => {
    const sampleGames = [
      {
        title: 'Elden Ring',
        genre: 'Action RPG',
        platform: ['PC', 'PlayStation 5', 'Xbox Series X/S'],
        description: 'A fantasy action-RPG adventure set within a world created by Hidetaka Miyazaki and George R. R. Martin.',
        developer: 'FromSoftware',
        publisher: 'Bandai Namco Entertainment',
        coverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200',
        tags: ['Open World', 'Fantasy', 'Difficult', 'Souls-like']
      },
      {
        title: 'Starfield',
        genre: 'Sci-fi RPG',
        platform: ['PC', 'Xbox Series X/S'],
        description: 'The next generation role-playing game set in the vastness of space.',
        developer: 'Bethesda Game Studios',
        publisher: 'Bethesda Softworks',
        coverImage: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=1200',
        tags: ['Space', 'RPG', 'Exploration', 'Sci-fi']
      },
      {
        title: 'Hogwarts Legacy',
        genre: 'Action RPG',
        platform: ['PC', 'PlayStation 5', 'Xbox Series X/S', 'Nintendo Switch'],
        description: 'Experience Hogwarts in the 1800s in this open-world action RPG.',
        developer: 'Avalanche Software',
        publisher: 'Warner Bros. Games',
        coverImage: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200',
        tags: ['Harry Potter', 'Magic', 'Open World', 'Fantasy']
      }
    ];

    const randomGame = sampleGames[Math.floor(Math.random() * sampleGames.length)];
    setFormData(prev => ({
      ...prev,
      ...randomGame,
      releaseYear: currentYear,
      multiplayer: true,
      singlePlayer: true
    }));
    setSelectedTags(randomGame.tags);
    setPreviewImage(randomGame.coverImage);
  };

  // Show login required message if user is not logged in
  if (!user) {
    return (
      <div className="game-form">
        <h2 className="form-title">Add New Game</h2>
        <div className="login-required">
          <div className="login-icon">🎮</div>
          <h3>Login Required</h3>
          <p>Please login to add new games to LViX</p>
          <button 
            className="login-button"
            onClick={onLoginRequest}
          >
            Login Now
          </button>
          <p className="benefits-title">Benefits of creating an account:</p>
          <ul className="benefits-list">
            <li>🎯 Add and rate games</li>
            <li>⭐ Create personalized lists</li>
            <li>📝 Write detailed reviews</li>
            <li>👥 Follow other gamers</li>
            <li>🏆 Earn achievements</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="game-form">
      <div className="form-header">
        <h2 className="form-title">Add New Game</h2>
        <p className="form-subtitle">
          Share your favorite games with the IVIX community
          <span className="user-badge">Logged in as: {user.username}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="game-form-content">
        <div className="form-grid">
          {/* Basic Information Section */}
          <div className="form-section">
            <h3 className="section-title">Basic Information</h3>
            
            <div className="form-group">
              <label htmlFor="title">
                Game Title *
                {errors.title && <span className="error-indicator">!</span>}
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter game title"
                className={errors.title ? 'error' : ''}
                maxLength="100"
              />
              {errors.title && <span className="error-message">{errors.title}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="genre">
                  Genre *
                  {errors.genre && <span className="error-indicator">!</span>}
                </label>
                <select
                  id="genre"
                  name="genre"
                  value={formData.genre}
                  onChange={handleChange}
                  className={errors.genre ? 'error' : ''}
                >
                  <option value="">Select a genre</option>
                  {genres.map(genre => (
                    <option key={genre} value={genre}>{genre}</option>
                  ))}
                </select>
                {errors.genre && <span className="error-message">{errors.genre}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="releaseYear">
                  Release Year
                  {errors.releaseYear && <span className="error-indicator">!</span>}
                </label>
                <select
                  id="releaseYear"
                  name="releaseYear"
                  value={formData.releaseYear}
                  onChange={handleChange}
                  className={errors.releaseYear ? 'error' : ''}
                >
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
                {errors.releaseYear && <span className="error-message">{errors.releaseYear}</span>}
              </div>
            </div>

            <div className="form-group">
              <label>
                Platform(s) *
                {errors.platform && <span className="error-indicator">!</span>}
              </label>
              <div className="platform-grid">
                {platforms.map(platform => (
                  <label key={platform} className="platform-checkbox">
                    <input
                      type="checkbox"
                      name="platform"
                      value={platform}
                      checked={formData.platform.includes(platform)}
                      onChange={handleChange}
                    />
                    <span className="checkbox-label">{platform}</span>
                  </label>
                ))}
              </div>
              {errors.platform && <span className="error-message">{errors.platform}</span>}
            </div>
          </div>

          {/* Game Details Section */}
          <div className="form-section">
            <h3 className="section-title">Game Details</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="developer">Developer</label>
                <input
                  type="text"
                  id="developer"
                  name="developer"
                  value={formData.developer}
                  onChange={handleChange}
                  placeholder="Game developer"
                  maxLength="100"
                />
              </div>

              <div className="form-group">
                <label htmlFor="publisher">Publisher</label>
                <input
                  type="text"
                  id="publisher"
                  name="publisher"
                  value={formData.publisher}
                  onChange={handleChange}
                  placeholder="Game publisher"
                  maxLength="100"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the game... (minimum 50 characters)"
                rows="5"
                minLength="50"
                maxLength="2000"
                required
              />
              <div className="char-count">
                {formData.description.length}/2000 characters
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="tags">
                Tags
                <span className="hint">(Add up to 10 tags)</span>
              </label>
              <div className="tags-input-container">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagInputKeyDown}
                  placeholder="Type a tag and press Enter"
                  className="tags-input"
                />
                <button 
                  type="button" 
                  onClick={() => tagInput.trim() && handleTagAdd(tagInput.trim())}
                  className="add-tag-button"
                >
                  Add
                </button>
              </div>
              
              <div className="selected-tags">
                {selectedTags.map(tag => (
                  <span key={tag} className="tag">
                    {tag}
                    <button 
                      type="button" 
                      onClick={() => handleTagRemove(tag)}
                      className="remove-tag"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              
              <div className="popular-tags">
                <span className="popular-tags-label">Popular tags:</span>
                {popularTags.map(tag => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleTagAdd(tag)}
                    disabled={selectedTags.includes(tag)}
                    className="popular-tag"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Media & Links Section */}
          <div className="form-section">
            <h3 className="section-title">Media & Links</h3>
            
            <div className="form-group">
              <label htmlFor="coverImage">
                Cover Image URL
                {errors.coverImage && <span className="error-indicator">!</span>}
              </label>
              <input
                type="url"
                id="coverImage"
                name="coverImage"
                value={formData.coverImage}
                onChange={handleChange}
                placeholder="https://example.com/game-cover.jpg"
                className={errors.coverImage ? 'error' : ''}
              />
              {errors.coverImage && <span className="error-message">{errors.coverImage}</span>}
              
              {previewImage && (
                <div className="image-preview">
                  <img src={previewImage} alt="Preview" onError={(e) => e.target.style.display = 'none'} />
                  <span className="preview-label">Preview</span>
                </div>
              )}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="website">Official Website</label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="https://game-website.com"
                  className={errors.website ? 'error' : ''}
                />
                {errors.website && <span className="error-message">{errors.website}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="trailerUrl">Trailer URL</label>
                <input
                  type="url"
                  id="trailerUrl"
                  name="trailerUrl"
                  value={formData.trailerUrl}
                  onChange={handleChange}
                  placeholder="https://youtube.com/watch?v=..."
                  className={errors.trailerUrl ? 'error' : ''}
                />
                {errors.trailerUrl && <span className="error-message">{errors.trailerUrl}</span>}
              </div>
            </div>
          </div>

          {/* Game Features Section */}
          <div className="form-section">
            <h3 className="section-title">Game Features</h3>
            
            <div className="features-grid">
              <label className="feature-checkbox">
                <input
                  type="checkbox"
                  name="singlePlayer"
                  checked={formData.singlePlayer}
                  onChange={handleChange}
                />
                <span className="feature-label">
                  <span className="feature-icon">👤</span>
                  Single Player
                </span>
              </label>

              <label className="feature-checkbox">
                <input
                  type="checkbox"
                  name="multiplayer"
                  checked={formData.multiplayer}
                  onChange={handleChange}
                />
                <span className="feature-label">
                  <span className="feature-icon">👥</span>
                  Multiplayer
                </span>
              </label>

              <label className="feature-checkbox">
                <input
                  type="checkbox"
                  name="coop"
                  checked={formData.tags.includes('Co-op')}
                  onChange={(e) => {
                    if (e.target.checked) {
                      handleTagAdd('Co-op');
                    } else {
                      handleTagRemove('Co-op');
                    }
                  }}
                />
                <span className="feature-label">
                  <span className="feature-icon">🤝</span>
                  Co-op
                </span>
              </label>

              <label className="feature-checkbox">
                <input
                  type="checkbox"
                  name="online"
                  checked={formData.tags.includes('Online')}
                  onChange={(e) => {
                    if (e.target.checked) {
                      handleTagAdd('Online');
                    } else {
                      handleTagRemove('Online');
                    }
                  }}
                />
                <span className="feature-label">
                  <span className="feature-icon">🌐</span>
                  Online
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="form-actions">
          <button
            type="button"
            onClick={handleQuickFill}
            className="quick-fill-button"
            disabled={isSubmitting}
          >
            🎲 Quick Fill Sample
          </button>
          
          <div className="form-buttons">
            <button
              type="button"
              onClick={() => {
                setFormData({
                  title: '',
                  genre: '',
                  platform: [],
                  description: '',
                  releaseYear: currentYear,
                  developer: '',
                  publisher: '',
                  coverImage: '',
                  website: '',
                  trailerUrl: '',
                  multiplayer: false,
                  singlePlayer: true,
                  tags: []
                });
                setSelectedTags([]);
                setPreviewImage('');
                setErrors({});
              }}
              className="reset-button"
              disabled={isSubmitting}
            >
              Clear Form
            </button>
            
            <button
              type="submit"
              className="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner"></span>
                  Adding Game...
                </>
              ) : (
                'Add Game to LViX'
              )}
            </button>
          </div>
        </div>

        <div className="form-footer">
          <p className="form-note">
            <span className="required">*</span> Required fields
          </p>
          <p className="form-note">
            All submitted games will be reviewed by our community moderators.
          </p>
        </div>
      </form>
    </div>
  );
};

export default GameForm;