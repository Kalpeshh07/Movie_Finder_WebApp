import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { FaSearch, FaHeart, FaBookmark, FaBars, FaTimes } from 'react-icons/fa'
import { useMovieContext } from '../context/MovieContext'

const AnimatedLogo = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="animate-spin-slow"
  >
    <circle cx="20" cy="20" r="18" stroke="#0ea5e9" strokeWidth="4" fill="#fff" />
    <circle cx="20" cy="20" r="8" stroke="#0ea5e9" strokeWidth="2" fill="#e0f2fe" />
    <circle cx="20" cy="8" r="2" fill="#0ea5e9" />
    <circle cx="32" cy="20" r="2" fill="#0ea5e9" />
    <circle cx="20" cy="32" r="2" fill="#0ea5e9" />
    <circle cx="8" cy="20" r="2" fill="#0ea5e9" />
    <polygon points="20,14 28,20 20,26" fill="#0ea5e9" opacity="0.7" />
  </svg>
)

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { favorites, watchlist } = useMovieContext()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
      setIsMobileMenuOpen(false)
    }
  }

  const isActive = (path) => location.pathname === path

  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="w-10 h-10 flex items-center justify-center">
              <AnimatedLogo />
            </span>
            <span className="text-xl font-bold text-gray-900">FilmHunt</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`font-medium transition-colors ${
                isActive('/') 
                  ? 'text-primary-600' 
                  : 'text-gray-600 hover:text-primary-600'
              }`}
            >
              Home
            </Link>
            <Link
              to="/favorites"
              className="flex items-center space-x-1 font-medium text-gray-600 hover:text-primary-600 transition-colors"
            >
              <FaHeart className="text-red-500" />
              <span>Favorites</span>
              {favorites.length > 0 && (
                <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                  {favorites.length}
                </span>
              )}
            </Link>
            <Link
              to="/watchlist"
              className="flex items-center space-x-1 font-medium text-gray-600 hover:text-primary-600 transition-colors"
            >
              <FaBookmark className="text-blue-500" />
              <span>Watchlist</span>
              {watchlist.length > 0 && (
                <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                  {watchlist.length}
                </span>
              )}
            </Link>
          </nav>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pr-10"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary-600 transition-colors"
              >
                <FaSearch />
              </button>
            </div>
          </form>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 animate-slide-up">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`font-medium transition-colors ${
                  isActive('/') 
                    ? 'text-primary-600' 
                    : 'text-gray-600 hover:text-primary-600'
                }`}
              >
                Home
              </Link>
              <Link
                to="/favorites"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between font-medium text-gray-600 hover:text-primary-600 transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <FaHeart className="text-red-500" />
                  <span>Favorites</span>
                </div>
                {favorites.length > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1">
                    {favorites.length}
                  </span>
                )}
              </Link>
              <Link
                to="/watchlist"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between font-medium text-gray-600 hover:text-primary-600 transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <FaBookmark className="text-blue-500" />
                  <span>Watchlist</span>
                </div>
                {watchlist.length > 0 && (
                  <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-1">
                    {watchlist.length}
                  </span>
                )}
              </Link>
              
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="pt-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search movies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input-field pr-10"
                  />
                  <button
                    type="submit"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary-600 transition-colors"
                  >
                    <FaSearch />
                  </button>
                </div>
              </form>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header 