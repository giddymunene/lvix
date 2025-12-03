import React, { useState, useEffect } from 'react';
import './App.css';
import GameList from './components/GameList';
import GameForm from './components/GameForm';
import GameDetails from './components/GameDetails';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import SignupModal from './components/SignupModal';

function App() {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [user, setUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [authError, setAuthError] = useState('');

  // Check for saved user session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('ivix_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    
    const initialGames = [
      {
        id: 1,
        title: 'The Legend of Zelda: Breath of the Wild',
        genre: 'Action-Adventure',
        platform: ['Nintendo Switch', 'Wii U'],
        rating: 9.5,
        reviewCount: 1250,
        description: 'An epic open-world adventure in the kingdom of Hyrule.',
        releaseYear: 2017,
        image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600',
        reviews: [],
      },
      {
        id: 2,
        title: 'Red Dead Redemption 2',
        genre: 'Action-Adventure',
        platform: ['PlayStation 4', 'Xbox One', 'PC'],
        rating: 9.7,
        reviewCount: 980,
        description: 'An epic tale of life in America\'s unforgiving heartland.',
        releaseYear: 2018,
        image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600',
        reviews: [],
      },
      {
        id: 3,
        title: 'Cyberpunk 2077',
        genre: 'RPG',
        platform: ['PC', 'PlayStation', 'Xbox'],
        rating: 7.8,
        reviewCount: 2150,
        description: 'An open-world, action-adventure RPG set in Night City.',
        releaseYear: 2020,
        image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w-600',
        reviews: [],
      },
      {
        id: 4,
        title: 'God of War',
        genre: 'Action',
        platform: ['PlayStation 4', 'PC'],
        rating: 9.4,
        reviewCount: 850,
        description: 'A father and son journey through Norse realms.',
        releaseYear: 2018,
        image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600',
        reviews: [],
      },
      {
        id: 5,
        title: 'Minecraft',
        genre: 'Sandbox',
        platform: ['All Platforms'],
        rating: 9.0,
        reviewCount: 3500,
        description: 'A sandbox game that lets players build and explore.',
        releaseYear: 2011,
        image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600',
        reviews: [],
      },
    ];
    
    // Load games from localStorage or use initial data
    const savedGames = localStorage.getItem('ivix_games');
    if (savedGames) {
      setGames(JSON.parse(savedGames));
    } else {
      setGames(initialGames);
      localStorage.setItem('ivix_games', JSON.stringify(initialGames));
    }
  }, []);

  // Save games to localStorage whenever they change
  useEffect(() => {
    if (games.length > 0) {
      localStorage.setItem('ivix_games', JSON.stringify(games));
    }
  }, [games]);

  const addGame = (newGame) => {
    const gameWithId = {
      ...newGame,
      id: Date.now(),
      rating: 0,
      reviewCount: 0,
      reviews: [],
    };
    const updatedGames = [...games, gameWithId];
    setGames(updatedGames);
    setSelectedGame(gameWithId);
  };

  const updateRating = (gameId, newRating, reviewText = '') => {
    const updatedGames = games.map(game => {
      if (game.id === gameId) {
        const userReview = {
          id: Date.now(),
          userId: user?.id,
          username: user?.username,
          rating: newRating,
          text: reviewText,
          date: new Date().toISOString(),
        };
        
        const reviews = [...(game.reviews || []), userReview];
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = totalRating / reviews.length;
        
        return {
          ...game,
          rating: parseFloat(averageRating.toFixed(1)),
          reviewCount: reviews.length,
          reviews,
        };
      }
      return game;
    });
    
    setGames(updatedGames);
  };

  const handleLogin = (email, password) => {
    // In a real app, this would be an API call
    const users = JSON.parse(localStorage.getItem('ivix_users') || '[]');
    const foundUser = users.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('ivix_user', JSON.stringify(foundUser));
      setShowLoginModal(false);
      setAuthError('');
      return true;
    } else {
      setAuthError('Invalid email or password');
      return false;
    }
  };

  const handleSignup = (userData) => {
    const users = JSON.parse(localStorage.getItem('ivix_users') || '[]');
    
    // Check if user already exists
    if (users.some(u => u.email === userData.email)) {
      setAuthError('Email already registered');
      return false;
    }
    
    if (users.some(u => u.username === userData.username)) {
      setAuthError('Username already taken');
      return false;
    }
    
    const newUser = {
      id: Date.now(),
      ...userData,
      createdAt: new Date().toISOString(),
    };
    
    const updatedUsers = [...users, newUser];
    localStorage.setItem('ivix_users', JSON.stringify(updatedUsers));
    
    setUser(newUser);
    localStorage.setItem('ivix_user', JSON.stringify(newUser));
    setShowSignupModal(false);
    setAuthError('');
    return true;
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('ivix_user');
  };

  const filteredGames = games.filter(game =>
    game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    game.genre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <Header 
        onSearch={setSearchTerm}
        onLogoClick={() => setSelectedGame(null)}
        user={user}
        onLoginClick={() => setShowLoginModal(true)}
        onSignupClick={() => setShowSignupModal(true)}
        onLogoutClick={handleLogout}
      />
      
      <main className="main-content">
        {selectedGame ? (
          <GameDetails 
            game={selectedGame}
            onRate={updateRating}
            onBack={() => setSelectedGame(null)}
            user={user}
            onLoginRequest={() => setShowLoginModal(true)}
          />
        ) : (
          <div className="content-wrapper">
            <div className="left-panel">
              <GameForm onSubmit={addGame} user={user} />
            </div>
            <div className="right-panel">
              <GameList 
                games={filteredGames}
                onSelectGame={setSelectedGame}
              />
            </div>
          </div>
        )}
      </main>
      
      <Footer />
      
      <LoginModal 
        isOpen={showLoginModal}
        onClose={() => {
          setShowLoginModal(false);
          setAuthError('');
        }}
        onLogin={handleLogin}
        error={authError}
        onSwitchToSignup={() => {
          setShowLoginModal(false);
          setShowSignupModal(true);
          setAuthError('');
        }}
      />
      
      <SignupModal 
        isOpen={showSignupModal}
        onClose={() => {
          setShowSignupModal(false);
          setAuthError('');
        }}
        onSignup={handleSignup}
        error={authError}
        onSwitchToLogin={() => {
          setShowSignupModal(false);
          setShowLoginModal(true);
          setAuthError('');
        }}
      />
    </div>
  );
}

export default App;