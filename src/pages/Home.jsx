import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieGrid from '../components/MovieGrid';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import {
  getPopularMovies,
  searchMovies,
} from '../services/movieService';

function Home({ favorites, addToFavorites, removeFromFavorites }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchParams] = useSearchParams();

  const searchQuery = searchParams.get('search') || '';

  useEffect(() => {
    async function fetchMovies() {
      try {
        setLoading(true);
        setError('');

        const movieData = searchQuery.trim()
          ? await searchMovies(searchQuery)
          : await getPopularMovies();

        setMovies(movieData);
      } catch (err) {
        setError(err.message || 'Unable to load movies.');
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, [searchQuery]);

  return (
    <main className="main-content">
      <div className="content-header">
        <h2>
          {searchQuery
            ? `Search Results for "${searchQuery}"`
            : 'Popular Movies'}
        </h2>

        <p>
          {searchQuery
            ? 'Here are the movies we found.'
            : 'Discover and save your favorite films'}
        </p>
      </div>

      {loading && <LoadingSpinner />}

      {error && <ErrorMessage message={error} />}

      {!loading && !error && movies.length === 0 && (
        <p>No movies found. Try another search!</p>
      )}

      {!loading && !error && movies.length > 0 && (
        <MovieGrid
          movies={movies}
          favorites={favorites}
          addToFavorites={addToFavorites}
          removeFromFavorites={removeFromFavorites}
        />
      )}
    </main>
  );
}

export default Home;
