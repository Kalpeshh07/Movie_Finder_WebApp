import React from 'react'
import { useMovieContext } from '../context/MovieContext'

const Pagination = ({ currentPage, totalPages }) => {
  const { setFilters } = useMovieContext()

  const handlePageChange = (page) => {
    setFilters({ page })
  }

  if (totalPages <= 1) return null

  const getPages = () => {
    const pages = []
    const maxPages = 5
    let start = Math.max(1, currentPage - 2)
    let end = Math.min(totalPages, start + maxPages - 1)
    if (end - start < maxPages - 1) {
      start = Math.max(1, end - maxPages + 1)
    }
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
    return pages
  }

  return (
    <div className="flex justify-center mt-8">
      <nav className="inline-flex rounded-md shadow-sm" aria-label="Pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="btn-secondary rounded-l-md disabled:opacity-50"
        >
          Prev
        </button>
        {getPages().map(page => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`btn-secondary ${page === currentPage ? 'bg-primary-600 text-white' : ''}`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="btn-secondary rounded-r-md disabled:opacity-50"
        >
          Next
        </button>
      </nav>
    </div>
  )
}

export default Pagination 