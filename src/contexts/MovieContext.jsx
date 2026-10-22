import { createContext, useContext, useEffect, useState } from 'react';

const MovieContext = createContext();

export function MovieProvider({ children }) {
  const [watchlist, setWatchlist] = useState(() => {
    try {
      const savedWatchlist = localStorage.getItem('watchlist');
      return savedWatchlist ? JSON.parse(savedWatchlist) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  function addToWatchlist(movie) {
    setWatchlist((currentWatchlist) => {
      const alreadyAdded = currentWatchlist.some(
        (item) => item.id === movie.id
      );

      if (alreadyAdded) {
        return currentWatchlist;
      }

      return [...currentWatchlist, movie];
    });
  }

  function removeFromWatchlist(movieId) {
    setWatchlist((currentWatchlist) =>
      currentWatchlist.filter((movie) => movie.id !== movieId)
    );
  }

  const value = {
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
  };

  return (
    <MovieContext.Provider value={value}>
      {children}
    </MovieContext.Provider>
  );
}

export function useMovieContext() {
  return useContext(MovieContext);
}
