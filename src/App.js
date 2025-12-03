import React, { useState, useEffect } from 'react';
import './App.css';
import GameList from './components/GameList';
import GameForm from './components/GameForm';
import GameDetails from './components/GameDetails';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Load initial games
  useEffect(() => {
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
      },
    ];
    setGames(initialGames);
  }, []);

  const addGame = (newGame) => {
    const gameWithId = {
      ...newGame,
      id: games.length + 1,
      rating: 0,
      reviewCount: 0,
    };
    setGames([...games, gameWithId]);
    setSelectedGame(gameWithId);
  };

  const updateRating = (gameId, newRating) => {
    setGames(games.map(game => {
      if (game.id === gameId) {
        const updatedRating = ((game.rating * game.reviewCount) + newRating) / (game.reviewCount + 1);
        return {
          ...game,
          rating: parseFloat(updatedRating.toFixed(1)),
          reviewCount: game.reviewCount + 1
        };
      }
      return game;
    }));
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
      />
      
      <main className="main-content">
        {selectedGame ? (
          <GameDetails 
            game={selectedGame}
            onRate={updateRating}
            onBack={() => setSelectedGame(null)}
          />
        ) : (
          <div className="content-wrapper">
            <div className="left-panel">
              <GameForm onSubmit={addGame} />
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
    </div>
  );
}

export default App;