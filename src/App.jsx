import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import './App.css';

function App() {
  const [favorites, setFavorites] = useState(() => {
    try {
      const savedFavorites = localStorage.getItem('favorites');
      return savedFavorites ? JSON.parse(savedFavorites) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  function addToFavorites(movie) {
    setFavorites((currentFavorites) => {
      if (currentFavorites.some((favorite) => favorite.id === movie.id)) {
        return currentFavorites;
      }

      return [...currentFavorites, movie];
    });
  }

  function removeFromFavorites(movieId) {
    setFavorites((currentFavorites) =>
      currentFavorites.filter((movie) => movie.id !== movieId)
    );
  }

  return (
    <Router>
      <div className="app">
        <Header />

        <Routes>
          <Route
            path="/"
            element={
              <Home
                favorites={favorites}
                addToFavorites={addToFavorites}
                removeFromFavorites={removeFromFavorites}
              />
            }
          />

          <Route
            path="/favorites"
            element={
              <Favorites
                favorites={favorites}
                removeFromFavorites={removeFromFavorites}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
