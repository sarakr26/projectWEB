"use client"

import React from 'react'
import { Sliders, ChevronDown, X } from 'react-feather'

interface FilterOption {
  label: string
  options?: string[]
  min?: number
  max?: number
  step?: number
  type: 'select' | 'range' | 'checkbox' | 'radio'
}

interface FilterSettings {
  category: string[]
  priceRange: [number, number]
  rating: number | null
  availability: string[]
  distance: number | null
}

interface SearchFiltersProps {
  isVisible: boolean
  onClose: () => void
  filters: FilterSettings
  onFilterChange: (filters: FilterSettings) => void
  className?: string
}

const SearchFilters: React.FC<SearchFiltersProps> = ({ 
  isVisible,
  onClose,
  filters,
  onFilterChange,
  className = ''
}) => {
  const filterOptions: Record<string, FilterOption> = {
    category: {
      label: 'Category',
      options: ['Power Tools', 'Hand Tools', 'Garden Equipment', 'Plumbing', 'Electrical', 'Automotive', 'Painting', 'Moving & Storage'],
      type: 'checkbox'
    },
    priceRange: {
      label: 'Price Range',
      min: 0,
      max: 200,
      step: 5,
      type: 'range'
    },
    rating: {
      label: 'Minimum Rating',
      options: ['Any', '3+', '4+', '4.5+'],
      type: 'radio'
    },
    availability: {
      label: 'Availability',
      options: ['Available Now', 'Available This Week', 'Available This Month'],
      type: 'checkbox'
    },
    distance: {
      label: 'Maximum Distance',
      options: ['Any', '5 miles', '10 miles', '20 miles', '50 miles'],
      type: 'radio'
    }
  }

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      onFilterChange({
        ...filters,
        category: [...filters.category, category]
      })
    } else {
      onFilterChange({
        ...filters,
        category: filters.category.filter(c => c !== category)
      })
    }
  }

  const handleAvailabilityChange = (availability: string, checked: boolean) => {
    if (checked) {
      onFilterChange({
        ...filters,
        availability: [...filters.availability, availability]
      })
    } else {
      onFilterChange({
        ...filters,
        availability: filters.availability.filter(a => a !== availability)
      })
    }
  }

  const handleRatingChange = (rating: string) => {
    const ratingValue = rating === 'Any' ? null : parseFloat(rating.replace('+', ''))
    onFilterChange({
      ...filters,
      rating: ratingValue
    })
  }

  const handleDistanceChange = (distance: string) => {
    const distanceValue = distance === 'Any' ? null : parseInt(distance.split(' ')[0])
    onFilterChange({
      ...filters,
      distance: distanceValue
    })
  }

  const handlePriceRangeChange = (value: string, isMin: boolean) => {
    const numValue = parseInt(value)
    onFilterChange({
      ...filters,
      priceRange: isMin 
        ? [numValue, filters.priceRange[1]] 
        : [filters.priceRange[0], numValue]
    })
  }

  const clearFilters = () => {
    onFilterChange({
      category: [],
      priceRange: [0, 200],
      rating: null,
      availability: [],
      distance: null
    })
  }

  const mobileClass = isVisible ? 'translate-x-0' : '-translate-x-full'

  return (
    <>
      {/* Mobile Filters */}
      <div className={`fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden ${isVisible ? 'block' : 'hidden'}`} onClick={onClose}></div>
      <div className={`fixed top-0 left-0 bottom-0 w-80 max-w-full bg-white dark:bg-[var(--toolnest-gray-900)] z-50 transform transition-transform duration-300 ease-in-out p-5 overflow-y-auto lg:hidden ${mobileClass}`}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Sliders size={18} className="mr-2 text-[var(--toolnest-primary-500)]" />
            <h2 className="text-lg font-semibold">Filters</h2>
          </div>
          <button onClick={onClose} className="text-[var(--toolnest-gray-500)] hover:text-[var(--toolnest-gray-700)] dark:hover:text-white">
            <X size={20} />
          </button>
        </div>

        <FilterContent 
          filterOptions={filterOptions}
          filters={filters}
          handleCategoryChange={handleCategoryChange}
          handleAvailabilityChange={handleAvailabilityChange}
          handleRatingChange={handleRatingChange}
          handleDistanceChange={handleDistanceChange}
          handlePriceRangeChange={handlePriceRangeChange}
        />

        <div className="mt-8 flex space-x-4">
          <button 
            onClick={clearFilters}
            className="tn-button tn-button-outline flex-1"
          >
            Clear All
          </button>
          <button 
            onClick={onClose}
            className="tn-button tn-button-primary flex-1"
          >
            Apply Filters
          </button>
        </div>
      </div>

      {/* Desktop Filters */}
      <div className={`hidden lg:block bg-white dark:bg-[var(--toolnest-gray-800)] rounded-lg shadow-sm p-5 ${className}`}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Sliders size={18} className="mr-2 text-[var(--toolnest-primary-500)]" />
            <h2 className="text-lg font-semibold">Filters</h2>
          </div>
          <button 
            onClick={clearFilters}
            className="text-sm text-[var(--toolnest-gray-500)] hover:text-[var(--toolnest-primary-500)] dark:hover:text-white"
          >
            Clear All
          </button>
        </div>

        <FilterContent 
          filterOptions={filterOptions}
          filters={filters}
          handleCategoryChange={handleCategoryChange}
          handleAvailabilityChange={handleAvailabilityChange}
          handleRatingChange={handleRatingChange}
          handleDistanceChange={handleDistanceChange}
          handlePriceRangeChange={handlePriceRangeChange}
        />
      </div>
    </>
  )
}

interface FilterContentProps {
  filterOptions: Record<string, FilterOption>
  filters: FilterSettings
  handleCategoryChange: (category: string, checked: boolean) => void
  handleAvailabilityChange: (availability: string, checked: boolean) => void
  handleRatingChange: (rating: string) => void
  handleDistanceChange: (distance: string) => void
  handlePriceRangeChange: (value: string, isMin: boolean) => void
}

const FilterContent: React.FC<FilterContentProps> = ({
  filterOptions,
  filters,
  handleCategoryChange,
  handleAvailabilityChange,
  handleRatingChange,
  handleDistanceChange,
  handlePriceRangeChange
}) => {
  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <FilterSection title={filterOptions.category.label}>
        <div className="space-y-2">
          {filterOptions.category.options?.map(category => (
            <label key={category} className="flex items-center cursor-pointer">
              <input 
                type="checkbox"
                className="form-checkbox rounded text-[var(--toolnest-primary-500)]"
                checked={filters.category.includes(category)}
                onChange={(e) => handleCategoryChange(category, e.target.checked)}
              />
              <span className="ml-2 text-sm">{category}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Price Range Filter */}
      <FilterSection title={filterOptions.priceRange.label}>
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span>${filters.priceRange[0]}</span>
            <span>${filters.priceRange[1]}</span>
          </div>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min={filterOptions.priceRange.min}
              max={filterOptions.priceRange.max}
              step={filterOptions.priceRange.step}
              value={filters.priceRange[0]}
              onChange={(e) => handlePriceRangeChange(e.target.value, true)}
              className="w-full"
            />
            <input
              type="range"
              min={filterOptions.priceRange.min}
              max={filterOptions.priceRange.max}
              step={filterOptions.priceRange.step}
              value={filters.priceRange[1]}
              onChange={(e) => handlePriceRangeChange(e.target.value, false)}
              className="w-full"
            />
          </div>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <span className="absolute inset-y-0 left-3 flex items-center text-[var(--toolnest-gray-500)]">$</span>
              <input
                type="number"
                value={filters.priceRange[0]}
                onChange={(e) => handlePriceRangeChange(e.target.value, true)}
                min={filterOptions.priceRange.min}
                max={filters.priceRange[1]}
                className="pl-8 w-full tn-input text-sm py-1.5"
              />
            </div>
            <div className="relative flex-1">
              <span className="absolute inset-y-0 left-3 flex items-center text-[var(--toolnest-gray-500)]">$</span>
              <input
                type="number"
                value={filters.priceRange[1]}
                onChange={(e) => handlePriceRangeChange(e.target.value, false)}
                min={filters.priceRange[0]}
                max={filterOptions.priceRange.max}
                className="pl-8 w-full tn-input text-sm py-1.5"
              />
            </div>
          </div>
        </div>
      </FilterSection>

      {/* Rating Filter */}
      <FilterSection title={filterOptions.rating.label}>
        <div className="space-y-2">
          {filterOptions.rating.options?.map(rating => (
            <label key={rating} className="flex items-center cursor-pointer">
              <input 
                type="radio"
                className="form-radio text-[var(--toolnest-primary-500)]"
                checked={filters.rating === (rating === 'Any' ? null : parseFloat(rating.replace('+', '')))}
                onChange={() => handleRatingChange(rating)}
                name="rating"
              />
              <span className="ml-2 text-sm">{rating}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Availability Filter */}
      <FilterSection title={filterOptions.availability.label}>
        <div className="space-y-2">
          {filterOptions.availability.options?.map(availability => (
            <label key={availability} className="flex items-center cursor-pointer">
              <input 
                type="checkbox"
                className="form-checkbox rounded text-[var(--toolnest-primary-500)]"
                checked={filters.availability.includes(availability)}
                onChange={(e) => handleAvailabilityChange(availability, e.target.checked)}
              />
              <span className="ml-2 text-sm">{availability}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Distance Filter */}
      <FilterSection title={filterOptions.distance.label}>
        <div className="space-y-2">
          {filterOptions.distance.options?.map(distance => (
            <label key={distance} className="flex items-center cursor-pointer">
              <input 
                type="radio"
                className="form-radio text-[var(--toolnest-primary-500)]"
                checked={filters.distance === (distance === 'Any' ? null : parseInt(distance.split(' ')[0]))}
                onChange={() => handleDistanceChange(distance)}
                name="distance"
              />
              <span className="ml-2 text-sm">{distance}</span>
            </label>
          ))}
        </div>
      </FilterSection>
    </div>
  )
}

interface FilterSectionProps {
  title: string
  children: React.ReactNode
}

const FilterSection: React.FC<FilterSectionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = React.useState(true)

  return (
    <div className="border-b border-[var(--toolnest-gray-200)] dark:border-[var(--toolnest-gray-700)] pb-4">
      <button
        className="flex items-center justify-between w-full text-left mb-3"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="font-medium">{title}</h3>
        <ChevronDown 
          size={16} 
          className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>
      <div className={`transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
        {children}
      </div>
    </div>
  )
}

export default SearchFilters 