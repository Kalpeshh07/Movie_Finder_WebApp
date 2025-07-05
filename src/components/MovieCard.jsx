import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaHeart, FaBookmark, FaStar, FaPlay } from 'react-icons/fa'
import { useMovieContext } from '../context/MovieContext'

const MovieCard = ({ movie }) => {
  const [imageError, setImageError] = useState(false)
  const { addToFavorites, removeFromFavorites, addToWatchlist, removeFromWatchlist, isFavorite, isInWatchlist } = useMovieContext()

  const handleFavoriteClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (isFavorite(movie.id)) {
      removeFromFavorites(movie.id)
    } else {
      addToFavorites(movie)
    }
  }

  const handleWatchlistClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (isInWatchlist(movie.id)) {
      removeFromWatchlist(movie.id)
    } else {
      addToWatchlist(movie)
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown'
    return new Date(dateString).getFullYear()
  }

  const formatRating = (rating) => {
    return rating ? rating.toFixed(1) : 'N/A'
  }

  const getImageSrc = () => {
    if (imageError || !movie.poster_path) {
      return 'https://via.placeholder.com/500x750/cccccc/666666?text=No+Poster'
    }
    return movie.poster_url
  }

  return (
    <div className="card movie-card group">
      <Link to={`/movie/${movie.id}`} className="block">
        {/* Movie Poster */}
        <div className="relative overflow-hidden">
          <img
            src={getImageSrc()}
            alt={movie.title}
            className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
            onError={() => setImageError(true)}
          />
          
          {/* Overlay with actions */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
              <button
                onClick={handleFavoriteClick}
                className={`p-3 rounded-full transition-colors ${
                  isFavorite(movie.id)
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'bg-white text-gray-800 hover:bg-red-500 hover:text-white'
                }`}
                title={isFavorite(movie.id) ? 'Remove from favorites' : 'Add to favorites'}
              >
                <FaHeart size={16} />
              </button>
              
              <button
                onClick={handleWatchlistClick}
                className={`p-3 rounded-full transition-colors ${
                  isInWatchlist(movie.id)
                    ? 'bg-blue-500 text-white hover:bg-blue-600'
                    : 'bg-white text-gray-800 hover:bg-blue-500 hover:text-white'
                }`}
                title={isInWatchlist(movie.id) ? 'Remove from watchlist' : 'Add to watchlist'}
              >
                <FaBookmark size={16} />
              </button>
              
              <button className="p-3 rounded-full bg-white text-gray-800 hover:bg-primary-500 hover:text-white transition-colors">
                <FaPlay size={16} />
              </button>
            </div>
          </div>

          {/* Rating badge */}
          <div className="absolute top-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded-lg flex items-center space-x-1">
            <FaStar className="text-yellow-400" size={12} />
            <span className="text-sm font-medium">{formatRating(movie.vote_average)}</span>
          </div>

          {/* Release year badge */}
          <div className="absolute top-2 left-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded-lg">
            <span className="text-sm font-medium">{formatDate(movie.release_date)}</span>
          </div>
        </div>

        {/* Movie Info */}
        <div className="p-4">
          <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
            {movie.title}
          </h3>
          
          {movie.overview && (
            <p className="text-gray-600 text-sm line-clamp-3 mb-3">
              {movie.overview}
            </p>
          )}

          {/* Additional info */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>{formatDate(movie.release_date)}</span>
            <div className="flex items-center space-x-1">
              <FaStar className="text-yellow-400" size={12} />
              <span>{formatRating(movie.vote_average)}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default MovieCard 