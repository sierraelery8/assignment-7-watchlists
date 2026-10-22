import MovieCard from './MovieCard';

function MovieGrid({
  movies,
  favorites = [],
  addToFavorites,
  removeFromFavorites,
}) {
  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          favorites={favorites}
          addToFavorites={addToFavorites}
          removeFromFavorites={removeFromFavorites}
        />
      ))}
    </div>
  );
}

export default MovieGrid;