import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { movieAPI, getPosterUrl, getBackdropUrl } from '../services/api'
import { FaArrowLeft, FaStar, FaHeart, FaBookmark } from 'react-icons/fa'
import { useMovieContext } from '../context/MovieContext'

const MovieDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [imageError, setImageError] = useState(false)
  const { addToFavorites, removeFromFavorites, addToWatchlist, removeFromWatchlist, isFavorite, isInWatchlist } = useMovieContext()

  useEffect(() => {
    setLoading(true)
    setError(null)
    movieAPI.getMovieDetails(id)
      .then(res => setMovie(res.data))
      .catch(() => setError('Failed to load movie details.'))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return <div className="flex justify-center items-center py-16"><div className="loading-spinner" /></div>
  }
  if (error) {
    return <div className="text-center text-red-500 py-8">{error}</div>
  }
  if (!movie) return null

  const handleFavoriteClick = () => {
    if (isFavorite(movie.id)) {
      removeFromFavorites(movie.id)
    } else {
      addToFavorites(movie)
    }
  }
  const handleWatchlistClick = () => {
    if (isInWatchlist(movie.id)) {
      removeFromWatchlist(movie.id)
    } else {
      addToWatchlist(movie)
    }
  }

  const getPosterSrc = () => {
    if (imageError || !movie.poster_path) {
      return 'https://via.placeholder.com/500x750/cccccc/666666?text=No+Poster'
    }
    return getPosterUrl(movie.poster_path)
  }

  return (
    <div>
      <button onClick={() => navigate(-1)} className="btn-secondary mb-6 flex items-center space-x-2">
        <FaArrowLeft /> <span>Back</span>
      </button>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Poster */}
        <div className="flex-shrink-0 w-full md:w-72">
          <img 
            src={getPosterSrc()} 
            alt={movie.title} 
            className="rounded-xl w-full h-auto shadow-lg" 
            onError={() => setImageError(true)}
          />
        </div>
        {/* Details */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-2">{movie.title}</h2>
          <div className="flex items-center space-x-4 mb-4">
            <span className="flex items-center text-yellow-500 font-semibold"><FaStar className="mr-1" /> {movie.vote_average?.toFixed(1)}</span>
            <span className="text-gray-500">{movie.release_date?.slice(0, 4)}</span>
            <span className="text-gray-500">{movie.runtime} min</span>
            <span className="text-gray-500">{movie.original_language?.toUpperCase()}</span>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {movie.genres?.map(genre => (
              <span key={genre.id} className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-xs font-medium">{genre.name}</span>
            ))}
          </div>
          <div className="flex items-center gap-4 mb-6">
            <button onClick={handleFavoriteClick} className={`btn-secondary flex items-center gap-2 ${isFavorite(movie.id) ? 'bg-red-500 text-white' : ''}`}>
              <FaHeart /> {isFavorite(movie.id) ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
            <button onClick={handleWatchlistClick} className={`btn-secondary flex items-center gap-2 ${isInWatchlist(movie.id) ? 'bg-blue-500 text-white' : ''}`}>
              <FaBookmark /> {isInWatchlist(movie.id) ? 'Remove from Watchlist' : 'Add to Watchlist'}
            </button>
          </div>
          <p className="mb-6 text-gray-700 text-lg">{movie.overview}</p>
          {/* Cast */}
          {movie.credits?.cast && (
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Cast</h3>
              <div className="flex flex-wrap gap-2">
                {movie.credits.cast.slice(0, 8).map(actor => (
                  <span key={actor.cast_id} className="bg-gray-200 px-2 py-1 rounded text-xs">{actor.name}</span>
                ))}
              </div>
            </div>
          )}
          {/* Recommendations */}
          {movie.recommendations?.results?.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Recommended</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {movie.recommendations.results.slice(0, 6).map(rec => (
                  <Link to={`/movie/${rec.id}`} key={rec.id} className="block">
                    <div className="bg-gray-100 rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow">
                      <img 
                        src={getPosterUrl(rec.poster_path)} 
                        alt={rec.title} 
                        className="w-full h-40 object-cover"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/500x750/cccccc/666666?text=No+Poster'
                        }}
                      />
                      <div className="p-2 text-sm font-medium text-gray-800 truncate">{rec.title}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MovieDetail 