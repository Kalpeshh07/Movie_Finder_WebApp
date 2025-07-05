import React, { createContext, useContext, useReducer, useEffect } from 'react'

const MovieContext = createContext()

const initialState = {
  favorites: [],
  watchlist: [],
  movies: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 0,
  filters: {
    genre: '',
    year: '',
    rating: '',
    sortBy: 'popularity.desc'
  }
}

const movieReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false }
    
    case 'SET_MOVIES':
      return { 
        ...state, 
        movies: action.payload.results || action.payload,
        totalPages: action.payload.total_pages || 0,
        currentPage: action.payload.page || 1,
        loading: false,
        error: null
      }
    
    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload } }
    
    case 'ADD_TO_FAVORITES':
      const newFavorites = [...state.favorites, action.payload]
      localStorage.setItem('movieFavorites', JSON.stringify(newFavorites))
      return { ...state, favorites: newFavorites }
    
    case 'REMOVE_FROM_FAVORITES':
      const updatedFavorites = state.favorites.filter(movie => movie.id !== action.payload)
      localStorage.setItem('movieFavorites', JSON.stringify(updatedFavorites))
      return { ...state, favorites: updatedFavorites }
    
    case 'ADD_TO_WATCHLIST':
      const newWatchlist = [...state.watchlist, action.payload]
      localStorage.setItem('movieWatchlist', JSON.stringify(newWatchlist))
      return { ...state, watchlist: newWatchlist }
    
    case 'REMOVE_FROM_WATCHLIST':
      const updatedWatchlist = state.watchlist.filter(movie => movie.id !== action.payload)
      localStorage.setItem('movieWatchlist', JSON.stringify(updatedWatchlist))
      return { ...state, watchlist: updatedWatchlist }
    
    case 'LOAD_STORED_DATA':
      return { 
        ...state, 
        favorites: action.payload.favorites || [],
        watchlist: action.payload.watchlist || []
      }
    
    default:
      return state
  }
}

export const MovieProvider = ({ children }) => {
  const [state, dispatch] = useReducer(movieReducer, initialState)

  // Load stored data from localStorage on mount
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('movieFavorites') || '[]')
    const watchlist = JSON.parse(localStorage.getItem('movieWatchlist') || '[]')
    
    dispatch({
      type: 'LOAD_STORED_DATA',
      payload: { favorites, watchlist }
    })
  }, [])

  const value = {
    ...state,
    dispatch,
    addToFavorites: (movie) => dispatch({ type: 'ADD_TO_FAVORITES', payload: movie }),
    removeFromFavorites: (movieId) => dispatch({ type: 'REMOVE_FROM_FAVORITES', payload: movieId }),
    addToWatchlist: (movie) => dispatch({ type: 'ADD_TO_WATCHLIST', payload: movie }),
    removeFromWatchlist: (movieId) => dispatch({ type: 'REMOVE_FROM_WATCHLIST', payload: movieId }),
    setMovies: (movies) => dispatch({ type: 'SET_MOVIES', payload: movies }),
    setLoading: (loading) => dispatch({ type: 'SET_LOADING', payload: loading }),
    setError: (error) => dispatch({ type: 'SET_ERROR', payload: error }),
    setFilters: (filters) => dispatch({ type: 'SET_FILTERS', payload: filters }),
    isFavorite: (movieId) => state.favorites.some(movie => movie.id === movieId),
    isInWatchlist: (movieId) => state.watchlist.some(movie => movie.id === movieId)
  }

  return (
    <MovieContext.Provider value={value}>
      {children}
    </MovieContext.Provider>
  )
}

export const useMovieContext = () => {
  const context = useContext(MovieContext)
  if (!context) {
    throw new Error('useMovieContext must be used within a MovieProvider')
  }
  return context
} 