import React from 'react'
import { useMovieContext } from '../context/MovieContext'
import MovieCard from './MovieCard'

const Watchlist = () => {
  const { watchlist } = useMovieContext()

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Watchlist</h2>
      {watchlist.length === 0 ? (
        <div className="text-gray-500 text-center py-8">No movies in your watchlist yet.</div>
      ) : (
        <div className="grid gap-8 movie-grid">
          {watchlist.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Watchlist 