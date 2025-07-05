import axios from 'axios'

// TMDB API Configuration
const API_BASE_URL = 'https://api.themoviedb.org/3'

// 🔑 Your real TMDB API key
const API_KEY = '28803155e2b5f6a780922185fc4aa739'

const api = axios.create({
  baseURL: API_BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'en-US'
  },
  timeout: 10000 // 10 second timeout
})

// Mock data for when API is not available
const mockMovies = [
  {
    id: 1,
    title: "The Shawshank Redemption",
    overview: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    poster_path: "/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    release_date: "1994-09-23",
    vote_average: 9.3,
    vote_count: 24000,
    popularity: 100,
    genre_ids: [18, 80],
    adult: false,
    video: false
  },
  {
    id: 2,
    title: "The Godfather",
    overview: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    poster_path: "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    release_date: "1972-03-14",
    vote_average: 9.2,
    vote_count: 18000,
    popularity: 95,
    genre_ids: [18, 80],
    adult: false,
    video: false
  },
  {
    id: 3,
    title: "The Dark Knight",
    overview: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    release_date: "2008-07-18",
    vote_average: 9.0,
    vote_count: 29000,
    popularity: 120,
    genre_ids: [18, 28, 80],
    adult: false,
    video: false
  },
  {
    id: 4,
    title: "Pulp Fiction",
    overview: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    poster_path: "/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    release_date: "1994-09-10",
    vote_average: 8.9,
    vote_count: 20000,
    popularity: 85,
    genre_ids: [18, 80],
    adult: false,
    video: false
  },
  {
    id: 5,
    title: "Fight Club",
    overview: "An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more.",
    poster_path: "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
    release_date: "1999-10-15",
    vote_average: 8.8,
    vote_count: 25000,
    popularity: 90,
    genre_ids: [18],
    adult: false,
    video: false
  },
  {
    id: 6,
    title: "Inception",
    overview: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    poster_path: "/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    release_date: "2010-07-16",
    vote_average: 8.8,
    vote_count: 32000,
    popularity: 110,
    genre_ids: [28, 878, 12],
    adult: false,
    video: false
  }
]

const mockGenres = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" }
]

// Test API connectivity
export const testAPI = async () => {
  try {
    console.log('Testing API connection...')
    const response = await api.get('/movie/popular', { params: { page: 1 } })
    console.log('API Test successful:', response.data)
    return true
  } catch (error) {
    console.error('API Test failed:', error.response || error)
    if (error.response?.status === 401) {
      console.error('❌ API Key is invalid or missing. Please get your API key from https://www.themoviedb.org/settings/api')
    } else if (error.response?.status === 429) {
      console.error('❌ API rate limit exceeded')
    } else {
      console.error('❌ Network error or API unavailable')
    }
    console.log('📺 Using mock data instead...')
    return false
  }
}

// API endpoints with fallback to mock data
export const movieAPI = {
  // Get popular movies
  getPopularMovies: async (page = 1) => {
    try {
      return await api.get('/movie/popular', { params: { page } })
    } catch (error) {
      console.log('📺 Using mock popular movies...')
      return {
        data: {
          results: mockMovies,
          page: page,
          total_pages: 1,
          total_results: mockMovies.length
        }
      }
    }
  },

  // Get top rated movies
  getTopRatedMovies: async (page = 1) => {
    try {
      return await api.get('/movie/top_rated', { params: { page } })
    } catch (error) {
      return {
        data: {
          results: mockMovies,
          page: page,
          total_pages: 1,
          total_results: mockMovies.length
        }
      }
    }
  },

  // Get now playing movies
  getNowPlayingMovies: async (page = 1) => {
    try {
      return await api.get('/movie/now_playing', { params: { page } })
    } catch (error) {
      return {
        data: {
          results: mockMovies,
          page: page,
          total_pages: 1,
          total_results: mockMovies.length
        }
      }
    }
  },

  // Get upcoming movies
  getUpcomingMovies: async (page = 1) => {
    try {
      return await api.get('/movie/upcoming', { params: { page } })
    } catch (error) {
      return {
        data: {
          results: mockMovies,
          page: page,
          total_pages: 1,
          total_results: mockMovies.length
        }
      }
    }
  },

  // Search movies
  searchMovies: async (query, page = 1) => {
    try {
      return await api.get('/search/movie', { params: { query, page } })
    } catch (error) {
      const filteredMovies = mockMovies.filter(movie => 
        movie.title.toLowerCase().includes(query.toLowerCase())
      )
      return {
        data: {
          results: filteredMovies,
          page: page,
          total_pages: 1,
          total_results: filteredMovies.length
        }
      }
    }
  },

  // Get movie details
  getMovieDetails: async (movieId) => {
    try {
      return await api.get(`/movie/${movieId}`, { 
        params: { 
          append_to_response: 'credits,videos,images,recommendations' 
        } 
      })
    } catch (error) {
      const movie = mockMovies.find(m => m.id === parseInt(movieId))
      return {
        data: {
          ...movie,
          credits: { cast: [] },
          recommendations: { results: mockMovies.filter(m => m.id !== parseInt(movieId)).slice(0, 6) }
        }
      }
    }
  },

  // Get genres
  getGenres: async () => {
    try {
      return await api.get('/genre/movie/list')
    } catch (error) {
      console.log('📺 Using mock genres...')
      return {
        data: {
          genres: mockGenres
        }
      }
    }
  },

  // Discover movies with filters
  discoverMovies: async (params) => {
    try {
      return await api.get('/discover/movie', { params })
    } catch (error) {
      return {
        data: {
          results: mockMovies,
          page: params.page || 1,
          total_pages: 1,
          total_results: mockMovies.length
        }
      }
    }
  }
}

// Default fallback image URLs
const DEFAULT_POSTER = 'https://via.placeholder.com/500x750/cccccc/666666?text=No+Poster'
const DEFAULT_BACKDROP = 'https://via.placeholder.com/1280x720/cccccc/666666?text=No+Backdrop'

// Helper function to build image URLs
export const getImageUrl = (path, size = 'w500') => {
  if (!path) return DEFAULT_POSTER
  return `https://image.tmdb.org/t/p/${size}${path}`
}

// Helper function to get backdrop URL
export const getBackdropUrl = (path, size = 'w1280') => {
  if (!path) return DEFAULT_BACKDROP
  return `https://image.tmdb.org/t/p/${size}${path}`
}

// Helper function to get poster URL
export const getPosterUrl = (path, size = 'w500') => {
  if (!path) return DEFAULT_POSTER
  return `https://image.tmdb.org/t/p/${size}${path}`
}

// Helper function to format movie data
export const formatMovieData = (movie) => ({
  id: movie.id,
  title: movie.title,
  original_title: movie.original_title,
  overview: movie.overview,
  poster_path: movie.poster_path,
  backdrop_path: movie.backdrop_path,
  release_date: movie.release_date,
  vote_average: movie.vote_average,
  vote_count: movie.vote_count,
  popularity: movie.popularity,
  genre_ids: movie.genre_ids,
  adult: movie.adult,
  video: movie.video,
  poster_url: getPosterUrl(movie.poster_path),
  backdrop_url: getBackdropUrl(movie.backdrop_path)
})

// Helper function to build discover query
export const buildDiscoverQuery = (filters) => {
  const params = {
    sort_by: filters.sortBy || 'popularity.desc',
    page: filters.page || 1
  }

  if (filters.genre) {
    params.with_genres = filters.genre
  }

  if (filters.year) {
    params.primary_release_year = filters.year
  }

  if (filters.rating) {
    params['vote_average.gte'] = filters.rating
  }

  return params
}

export default api 