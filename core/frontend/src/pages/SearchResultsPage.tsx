"use client"

import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Tool } from '../types/Tool'
import ToolCard from '../components/tools/ToolCard'
import SearchFilters from '../components/search/SearchFilters'
import LoadingSpinner from '../components/ui/LoadingSpinner'

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  
  const [tools, setTools] = useState<Tool[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    category: '',
    priceRange: 'all',
    availability: false
  })

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true)
      try {
        // In a real app, you would call your API with the search query and filters
        // For now, let's simulate a delay
        await new Promise(resolve => setTimeout(resolve, 800))
        
        // Mock data - replace with actual API call
        const results: Tool[] = []
        setTools(results)
      } catch (error) {
        console.error('Error fetching search results:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSearchResults()
  }, [query, filters])

  const handleFilterChange = (newFilters: any) => {
    setFilters({...filters, ...newFilters})
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Search Results: {query}</h1>
      
      <div className="flex flex-col md:flex-row gap-6">
        <aside className="w-full md:w-64 mb-6 md:mb-0">
          <SearchFilters filters={filters} onFilterChange={handleFilterChange} />
        </aside>
        
        <div className="flex-1">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <LoadingSpinner />
            </div>
          ) : tools.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map(tool => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-xl font-semibold mb-2">No results found</h2>
              <p className="text-gray-600">
                Try adjusting your search terms or filters
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchResultsPage 