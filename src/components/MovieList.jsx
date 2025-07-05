import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useMovieContext } from '../context/MovieContext'
import { movieAPI, buildDiscoverQuery, formatMovieData, testAPI } from '../services/api'
import MovieCard from './MovieCard'
import Filters from './Filters'
import Pagination from './Pagination'

const MovieList = () => {
  const { movies, setMovies, setLoading, setError, filters, setFilters, loading, error, currentPage, totalPages } = useMovieContext()
  const [genres, setGenres] = useState([])
  const [apiTestResult, setApiTestResult] = useState(null)
  const [testLoading, setTestLoading] = useState(false)
  const location = useLocation()

  // Parse search query from URL
  const searchParams = new URLSearchParams(location.search)
  const searchQuery = searchParams.get('search') || ''

  // Debug logging
  console.log('MovieList render:', { movies, loading, error, searchQuery, filters })

  // Test API on mount
  useEffect(() => {
    const runApiTest = async () => {
      const result = await testAPI()
      setApiTestResult(result)
    }
    runApiTest()
  }, [])

  // Manual API test function
  const handleManualTest = async () => {
    setTestLoading(true)
    try {
      console.log('Manual API test...')
      const response = await movieAPI.getPopularMovies(1)
      console.log('Manual test response:', response.data)
      alert(`API Test Successful! Found ${response.data.results.length} movies.`)
    } catch (err) {
      console.error('Manual test failed:', err)
      alert(`API Test Failed: ${err.message}`)
    } finally {
      setTestLoading(false)
    }
  }

  // Fetch genres on mount
  useEffect(() => {
    movieAPI.getGenres().then(res => {
      setGenres(res.data.genres)
      console.log('Genres loaded:', res.data.genres)
    }).catch(err => {
      console.error('Failed to fetch genres:', err)
    })
  }, [])

  // Fetch movies when filters or search change
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true)
      setError(null)
      try {
        let response
        if (searchQuery) {
          console.log('Searching for:', searchQuery)
          response = await movieAPI.searchMovies(searchQuery, currentPage)
        } else if (filters.genre || filters.year || filters.rating) {
          // Use discover only when filters are applied
          const params = buildDiscoverQuery({ ...filters, page: currentPage })
          console.log('Discovering movies with params:', params)
          response = await movieAPI.discoverMovies(params)
        } else {
          // Default to popular movies when no search or filters
          console.log('Fetching popular movies')
          response = await movieAPI.getPopularMovies(currentPage)
        }
        console.log('API response:', response.data)
        // Format movie data for consistent card rendering
        const formatted = {
          ...response.data,
          results: response.data.results.map(formatMovieData)
        }
        console.log('Formatted movies:', formatted)
        setMovies(formatted)
      } catch (err) {
        console.error('Failed to fetch movies:', err)
        setError('Failed to fetch movies. Please try again.')
      } finally {
        setLoading(false)
      }
    }
    fetchMovies()
    // eslint-disable-next-line
  }, [filters, searchQuery, currentPage])

  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters })
  }

  return (
    <div>
      {/* API Test Status */}
      {apiTestResult === false && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
          <div className="flex items-center justify-between">
            <div>
              <strong>📺 Demo Mode:</strong> Using sample movies. 
              <div className="text-sm mt-1">
                To get real movie data, get your free API key from{' '}
                <a href="https://www.themoviedb.org/settings/api" target="_blank" rel="noopener noreferrer" className="underline font-medium">
                  TMDB API Settings
                </a>
              </div>
            </div>
            <button 
              onClick={handleManualTest}
              disabled={testLoading}
              className="btn-secondary text-sm"
            >
              {testLoading ? 'Testing...' : 'Test API'}
            </button>
          </div>
        </div>
      )}
      
      <Filters genres={genres} filters={filters} onChange={handleFilterChange} />
      {loading ? (
        <div className="flex justify-center items-center py-16">
          <div className="loading-spinner" />
        </div>
      ) : error ? (
        <div className="text-center text-red-500 py-8">{error}</div>
      ) : (
        <>
          {!movies || movies.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              No movies found. 
              {movies && movies.length === 0 && <div className="text-sm mt-2">Try adjusting your filters or search terms.</div>}
              <div className="text-sm mt-2">Debug: movies array length = {movies ? movies.length : 'undefined'}</div>
              <button 
                onClick={handleManualTest}
                disabled={testLoading}
                className="mt-4 btn-primary"
              >
                {testLoading ? 'Testing...' : 'Test API Connection'}
              </button>
            </div>
          ) : (
            <div className="grid gap-8 movie-grid">
              {movies.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          )}
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </>
      )}
    </div>
  )
}

export default MovieList 