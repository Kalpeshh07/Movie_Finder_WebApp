import React from 'react'
import { useMovieContext } from '../context/MovieContext'
import MovieCard from './MovieCard'

const Favorites = () => {
  const { favorites } = useMovieContext()

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Favorites</h2>
      {favorites.length === 0 ? (
        <div className="text-gray-500 text-center py-8">No favorite movies yet.</div>
      ) : (
        <div className="grid gap-8 movie-grid">
          {favorites.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Favorites 