import React from 'react'

const Filters = ({ genres, filters, onChange }) => {
  const years = Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i)
  const ratings = [9, 8, 7, 6, 5, 4, 3, 2, 1]

  return (
    <div className="flex flex-wrap gap-4 mb-8 items-end">
      {/* Genre Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Genre</label>
        <select
          className="input-field"
          value={filters.genre}
          onChange={e => onChange({ genre: e.target.value })}
        >
          <option value="">All Genres</option>
          {genres.map(genre => (
            <option key={genre.id} value={genre.id}>{genre.name}</option>
          ))}
        </select>
      </div>
      {/* Year Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
        <select
          className="input-field"
          value={filters.year}
          onChange={e => onChange({ year: e.target.value })}
        >
          <option value="">All Years</option>
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>
      {/* Rating Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Min Rating</label>
        <select
          className="input-field"
          value={filters.rating}
          onChange={e => onChange({ rating: e.target.value })}
        >
          <option value="">Any</option>
          {ratings.map(rating => (
            <option key={rating} value={rating}>{rating}+</option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default Filters 