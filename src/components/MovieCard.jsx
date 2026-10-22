function MovieCard({ movie, favorites = [], addToFavorites, removeFromFavorites }) {
  const isFavorite = favorites.some(
    (favorite) => favorite.id === movie.id
  );

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://placehold.co/300x450/667eea/ffffff?text=No+Poster";

  const releaseYear = movie.release_date
    ? movie.release_date.substring(0, 4)
    : "Year unknown";

  function handleFavoriteClick() {
    if (isFavorite) {
      removeFromFavorites?.(movie.id);
    } else {
      addToFavorites?.(movie);
    }
  }

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img src={posterUrl} alt={movie.title} />
      </div>

      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>

        <div className="movie-details">
          <span className="movie-rating">
            ⭐ {movie.vote_average?.toFixed(1) ?? "N/A"}
          </span>

          <span className="movie-year">{releaseYear}</span>
        </div>

        <button
          className="favorite-button"
          onClick={handleFavoriteClick}
          type="button"
        >
          {isFavorite ? "♥ Remove from Favorites" : "♡ Add to Favorites"}
        </button>
      </div>
    </div>
  );
}

export default MovieCard;
