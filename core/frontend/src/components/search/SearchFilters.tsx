"use client"

import { useState, useEffect } from 'react'

interface SearchFiltersProps {
  filters: {
    category: string;
    priceRange: string;
    availability: boolean;
  };
  onFilterChange: (filters: any) => void;
}

const SearchFilters = ({ filters, onFilterChange }: SearchFiltersProps) => {
  const [categories, setCategories] = useState<string[]>([
    'Power Tools',
    'Hand Tools',
    'Garden Tools',
    'Cleaning Equipment',
    'Ladders & Scaffolding',
    'Plumbing Tools',
    'Electrical Tools',
    'Automotive Tools',
    'Painting Tools',
    'Outdoor Equipment'
  ])

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ category: e.target.value })
  }

  const handlePriceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ priceRange: e.target.value })
  }

  const handleAvailabilityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ availability: e.target.checked })
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-bold mb-6 text-gradient">Filters</h2>
      
      <div className="mb-6">
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
          Category
        </label>
        <select
          id="category"
          value={filters.category}
          onChange={handleCategoryChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category.toLowerCase().replace(/\s+/g, '-')}>
              {category}
            </option>
          ))}
        </select>
      </div>
      
      <div className="mb-6">
        <label htmlFor="priceRange" className="block text-sm font-medium text-gray-700 mb-2">
          Price Range
        </label>
        <select
          id="priceRange"
          value={filters.priceRange}
          onChange={handlePriceChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="all">All Prices</option>
          <option value="0-25">Under $25/day</option>
          <option value="25-50">$25 - $50/day</option>
          <option value="50-100">$50 - $100/day</option>
          <option value="100+">Over $100/day</option>
        </select>
      </div>
      
      <div className="flex items-center mb-6">
        <input
          id="availability"
          type="checkbox"
          checked={filters.availability}
          onChange={handleAvailabilityChange}
          className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor="availability" className="ml-3 block text-sm text-gray-700">
          Available Now
        </label>
      </div>
      
      <button
        onClick={() => onFilterChange({ category: '', priceRange: 'all', availability: false })}
        className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-4 rounded-lg font-medium transition-all transform hover:scale-105"
      >
        Reset Filters
      </button>
    </div>
  )
}

export default SearchFilters 