"use client"

import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ToolCard from '../components/tools/ToolCard'
import SearchFilters from '../components/search/SearchFilters'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import { Tool, ToolSearchParams } from '../types/Tool'
import { 
  Grid, 
  List, 
  Sliders, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight, 
  Search as SearchIcon 
} from 'react-feather'

const SearchResultsPage: React.FC = () => {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  
  // State for tools and loading
  const [tools, setTools] = useState<Tool[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [isFilterVisible, setIsFilterVisible] = useState(false)
  
  // State for filters
  const [filters, setFilters] = useState({
    category: [],
    priceRange: [0, 200],
    rating: null,
    availability: [],
    distance: null
  })
  
  // State for sorting and pagination
  const [sortBy, setSortBy] = useState('featured')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  
  // Fetch tools based on search query and filters
  useEffect(() => {
    fetchSearchResults()
  }, [query, filters, sortBy, currentPage])
  
  const fetchSearchResults = async () => {
    setLoading(true)
    try {
      // In a real app, this would be an API call
      // For demo purposes, we'll simulate a delay and return mock data
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Generate 12 sample tools
      const mockTools = Array.from({ length: 12 }, (_, i) => ({
        id: `tool-${i + 1}`,
        name: `Professional Tool ${i + 1}`,
        description: 'High-quality tool for professional use.',
        price: Math.floor(Math.random() * 100) + 10,
        priceUnit: 'day' as const,
        category: ['Power Tools', 'Hand Tools', 'Garden Equipment'][Math.floor(Math.random() * 3)],
        condition: 'Good' as const,
        available: Math.random() > 0.2,
        availability: Math.random() > 0.7 ? 'Available Now' : 'Available This Week',
        location: 'San Francisco, CA',
        distance: `${Math.floor(Math.random() * 10) + 1} miles away`,
        rating: Math.floor(Math.random() * 10) / 2 + 2.5,
        reviewCount: Math.floor(Math.random() * 100) + 5,
        ownerId: `user-${i}`,
        ownerName: `User ${i}`,
        ownerAvatar: 'https://i.pravatar.cc/100',
        image: `https://images.unsplash.com/photo-1504148455328-c376907d081c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`,
        images: [
          `https://images.unsplash.com/photo-1504148455328-c376907d081c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`,
          `https://images.unsplash.com/photo-1504148455328-c376907d081c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }))
      
      setTools(mockTools)
      setTotalPages(3) // For demo purposes
    } catch (error) {
      console.error('Error fetching search results:', error)
      setTools([])
    } finally {
      setLoading(false)
    }
  }
  
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
    setCurrentPage(1) // Reset to first page when filters change
  }
  
  const handleSortChange = (e) => {
    setSortBy(e.target.value)
    setCurrentPage(1) // Reset to first page when sorting changes
  }
  
  const handlePageChange = (page) => {
    setCurrentPage(page)
    // Scroll to top of results
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  
  // Render functions
  const renderSearchHeader = () => (
    <div className="bg-white dark:bg-[var(--toolnest-gray-900)] py-10 pb-12 px-4 md:px-8 animate-fade-in sticky top-[60px] z-10 shadow-sm border-b border-[var(--toolnest-gray-200)] dark:border-[var(--toolnest-gray-800)] pt-14 relative overflow-hidden">
      <div className="container mx-auto relative z-10">
        <div className="max-w-3xl">
          <div className="mb-2 text-sm font-medium text-[var(--toolnest-primary-700)] dark:text-[var(--toolnest-primary-300)] animate-slide-in-left">
            <span className="inline-flex items-center">
              <SearchIcon size={14} className="mr-2" />
              Browse our collection
            </span>
          </div>
          <div className="tn-section-title-container">
            <h1 className="tn-section-title tn-section-title-bg text-3xl md:text-4xl text-[var(--toolnest-gray-900)] dark:text-white animate-slide-up">
              {query 
                ? <>Search Results for <span className="tn-section-title-accent">"{query}"</span></>
                : <>Discover Our <span className="tn-section-title-accent">Tool Collection</span></>
              }
            </h1>
          </div>
          <p className="text-[var(--toolnest-gray-600)] dark:text-[var(--toolnest-gray-300)] mb-8 max-w-2xl animate-slide-up delay-1">
            {query 
              ? "Find the perfect tools that match your needs with our extensive collection of high-quality equipment."
              : "Browse our entire catalog of well-maintained tools available for rent. From power tools to gardening equipment, we have everything you need for your next project."}
          </p>
          
          <div className="relative animate-slide-up delay-2">
            <div className="absolute inset-y-0 left-3 flex items-center text-[var(--toolnest-gray-500)]">
              <SearchIcon size={20} />
            </div>
            <input
              type="text"
              defaultValue={query}
              placeholder="Search for tools by name, category, or purpose..."
              className="tn-input w-full h-14 pl-10 pr-4 text-base rounded-lg shadow-sm focus:ring-2 focus:ring-[var(--toolnest-primary-500)] border border-[var(--toolnest-gray-300)] dark:border-[var(--toolnest-gray-700)]"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  const input = e.target as HTMLInputElement
                  window.location.href = `/search?q=${encodeURIComponent(input.value)}`
                }
              }}
            />
            <button 
              className="absolute inset-y-0 right-0 flex items-center justify-center px-4 font-medium text-[var(--toolnest-primary-700)] dark:text-[var(--toolnest-primary-300)] bg-transparent hover:text-[var(--toolnest-primary-900)] dark:hover:text-white transition-colors" 
              onClick={() => {
                const input = document.querySelector('input[type="text"]') as HTMLInputElement
                if (input && input.value.trim()) {
                  window.location.href = `/search?q=${encodeURIComponent(input.value)}`
                }
              }}
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  )
  
  const renderResultsHeader = () => (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 animate-fade-in">
      <div className="mb-4 sm:mb-0">
        <h2 className="text-xl md:text-2xl font-bold text-[var(--toolnest-gray-900)] dark:text-white">
          {loading ? (
            <span className="flex items-center">
              <span className="mr-3">Searching</span>
              <span className="flex space-x-1">
                <span className="animate-pulse">.</span>
                <span className="animate-pulse" style={{ animationDelay: '0.2s' }}>.</span>
                <span className="animate-pulse" style={{ animationDelay: '0.4s' }}>.</span>
              </span>
            </span>
          ) : (
            <>
              <span className="text-[var(--toolnest-primary-600)] dark:text-[var(--toolnest-primary-400)]">{tools.length}</span> tools found
            </>
          )}
        </h2>
        <p className="text-sm text-[var(--toolnest-gray-500)] dark:text-[var(--toolnest-gray-400)]">
          Browse our selection of quality tools available for rent
        </p>
      </div>
      
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <button
          className="tn-button tn-button-outline sm:hidden flex-1"
          onClick={() => setIsFilterVisible(true)}
        >
          <Sliders size={16} className="mr-2" />
          Filters
        </button>
        
        <div className="relative flex-1 sm:flex-none">
          <select
            value={sortBy}
            onChange={handleSortChange}
            className="tn-input appearance-none pr-10 py-2 w-full"
          >
            <option value="featured">Featured</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="newest">Newest</option>
          </select>
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <ChevronDown size={16} />
          </div>
        </div>
        
        <div className="hidden sm:flex items-center border border-[var(--toolnest-gray-300)] dark:border-[var(--toolnest-gray-700)] rounded-lg overflow-hidden">
          <button
            className={`p-2 transition-colors ${
              viewMode === 'grid'
                ? 'bg-[var(--toolnest-primary-100)] text-[var(--toolnest-primary-600)] dark:bg-[var(--toolnest-primary-900)] dark:text-[var(--toolnest-primary-300)]'
                : 'bg-transparent hover:bg-[var(--toolnest-gray-100)] dark:hover:bg-[var(--toolnest-gray-800)]'
            }`}
            onClick={() => setViewMode('grid')}
          >
            <Grid size={18} />
          </button>
          <button
            className={`p-2 transition-colors ${
              viewMode === 'list'
                ? 'bg-[var(--toolnest-primary-100)] text-[var(--toolnest-primary-600)] dark:bg-[var(--toolnest-primary-900)] dark:text-[var(--toolnest-primary-300)]'
                : 'bg-transparent hover:bg-[var(--toolnest-gray-100)] dark:hover:bg-[var(--toolnest-gray-800)]'
            }`}
            onClick={() => setViewMode('list')}
          >
            <List size={18} />
          </button>
        </div>
      </div>
    </div>
  )
  
  const renderToolGrid = () => (
    <div className={`grid grid-cols-1 ${
      viewMode === 'grid' 
        ? 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4' 
        : ''
      } gap-6 animate-fade-in`}>
      {tools.map((tool, index) => (
        <div 
          key={tool.id} 
          className="animate-slide-up" 
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          <ToolCard tool={tool} view={viewMode} />
        </div>
      ))}
    </div>
  )
  
  const renderEmptyState = () => (
    <div className="bg-white dark:bg-[var(--toolnest-gray-800)] rounded-lg p-8 text-center animate-fade-in">
      <div className="mx-auto w-16 h-16 bg-[var(--toolnest-gray-100)] dark:bg-[var(--toolnest-gray-700)] rounded-full flex items-center justify-center mb-4">
        <SearchIcon size={24} className="text-[var(--toolnest-gray-500)]" />
      </div>
      <h3 className="text-xl font-semibold mb-2">No tools found</h3>
      <p className="text-[var(--toolnest-gray-500)] dark:text-[var(--toolnest-gray-400)] mb-6">
        We couldn't find any tools matching your search criteria.
      </p>
      <button
        onClick={() => {
          setFilters({
            category: [],
            priceRange: [0, 200],
            rating: null,
            availability: [],
            distance: null
          })
        }}
        className="tn-button tn-button-primary"
      >
        Clear Filters
      </button>
    </div>
  )
  
  const renderPagination = () => (
    <div className="flex justify-center items-center mt-12">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="tn-button tn-button-outline p-2"
      >
        <ChevronLeft size={18} />
      </button>
      
      <div className="mx-4 flex space-x-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={`h-10 w-10 rounded-full flex items-center justify-center transition-colors ${
              currentPage === i + 1
                ? 'bg-[var(--toolnest-primary-500)] text-white'
                : 'tn-button-outline'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
      
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="tn-button tn-button-outline p-2"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  )
  
  return (
    <div className="min-h-screen bg-[var(--toolnest-gray-50)] dark:bg-[var(--toolnest-gray-950)] pt-[60px]">
      {/* Search Header */}
      {renderSearchHeader()}
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 mt-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar / Filters */}
          <div className="lg:w-1/4">
            <SearchFilters
              isVisible={isFilterVisible}
              onClose={() => setIsFilterVisible(false)}
              filters={filters}
              onFilterChange={handleFilterChange}
              className="sticky top-[calc(16rem+4.5rem)] lg:top-[calc(14rem+4.5rem)]"
            />
          </div>
          
          {/* Search Results */}
          <div className="lg:w-3/4">
            {renderResultsHeader()}
            
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <LoadingSpinner size="large" color="primary" />
              </div>
            ) : tools.length > 0 ? (
              <>
                {renderToolGrid()}
                {renderPagination()}
              </>
            ) : (
              renderEmptyState()
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchResultsPage 