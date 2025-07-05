import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import MovieList from './components/MovieList'
import MovieDetail from './components/MovieDetail'
import Favorites from './components/Favorites'
import Watchlist from './components/Watchlist'
import { MovieProvider } from './context/MovieContext'
import './App.css'

function App() {
  return (
    <MovieProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<MovieList />} />
              <Route path="/movie/:id" element={<MovieDetail />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/watchlist" element={<Watchlist />} />
            </Routes>
          </main>
        </div>
      </Router>
    </MovieProvider>
  )
}

export default App 