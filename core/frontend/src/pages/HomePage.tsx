"use client"

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Tool } from '../types/Tool'
import ToolCard from '../components/tools/ToolCard'
import LoadingSpinner from '../components/ui/LoadingSpinner'

const categories = [
  { id: 'power-tools', name: 'Power Tools', icon: '🔌' },
  { id: 'hand-tools', name: 'Hand Tools', icon: '🔨' },
  { id: 'garden-tools', name: 'Garden Tools', icon: '🌱' },
  { id: 'ladders', name: 'Ladders & Scaffolding', icon: '🪜' },
  { id: 'plumbing', name: 'Plumbing Tools', icon: '🚿' },
  { id: 'electrical', name: 'Electrical Tools', icon: '⚡' }
]

const HomePage = () => {
  const [featuredTools, setFeaturedTools] = useState<Tool[]>([])
  const [popularTools, setPopularTools] = useState<Tool[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchHomeData = async () => {
      setLoading(true)
      try {
        // In a real app, you would call your API to get this data
        // For now, simulate a delay
        await new Promise(resolve => setTimeout(resolve, 800))
        
        // Mock data - replace with actual API calls
        setFeaturedTools([])
        setPopularTools([])
      } catch (error) {
        console.error('Error fetching home data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchHomeData()
  }, [])

  return (
    <div className="animate-fadeIn">
      {/* Hero Section */}
      <section className="bg-hero-gradient py-20 text-white">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-8 drop-shadow-lg">Share Tools, Build Community</h1>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto opacity-90">
            Access the tools you need without buying them. Share your own tools to earn extra income.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link 
              to="/search" 
              className="btn-primary inline-block"
            >
              Find Tools
            </Link>
            <Link 
              to="/signin?redirect=/dashboard" 
              className="btn-secondary inline-block"
            >
              List Your Tools
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="section-padding bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gradient">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {categories.map(category => (
              <Link 
                key={category.id}
                to={`/category/${category.id}`} 
                className="category-item"
              >
                <div className="category-icon">{category.icon}</div>
                <h3 className="font-semibold text-lg">{category.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tools Section */}
      <section className="section-padding py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gradient">Featured Tools</h2>
          
          {loading ? (
            <div className="flex justify-center py-16">
              <LoadingSpinner size="large" />
            </div>
          ) : featuredTools.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredTools.map(tool => (
                <div key={tool.id} className="tool-card">
                  <ToolCard tool={tool} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-gray-50 rounded-xl shadow-md">
              <p className="text-gray-600 text-lg">No featured tools available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section-padding bg-gray-50 py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-gradient">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="bg-blue-500 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">1</div>
              <h3 className="text-2xl font-semibold mb-4">Find a Tool</h3>
              <p className="text-gray-600 text-lg">Browse our extensive selection of tools available in your area.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="bg-blue-500 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">2</div>
              <h3 className="text-2xl font-semibold mb-4">Book It</h3>
              <p className="text-gray-600 text-lg">Reserve your tools for the dates you need them and arrange for pickup.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="bg-blue-500 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">3</div>
              <h3 className="text-2xl font-semibold mb-4">Get to Work</h3>
              <p className="text-gray-600 text-lg">Complete your project and return the tool when you're done.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Tools Section */}
      <section className="section-padding py-20">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gradient">Popular Tools</h2>
            <Link to="/search" className="text-blue-600 hover:text-blue-800 font-semibold text-lg underline">View All</Link>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-16">
              <LoadingSpinner size="large" />
            </div>
          ) : popularTools.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {popularTools.map(tool => (
                <div key={tool.id} className="tool-card">
                  <ToolCard tool={tool} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-gray-50 rounded-xl shadow-md">
              <p className="text-gray-600 text-lg">No popular tools available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-hero-gradient py-20 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 drop-shadow-lg">Ready to share your tools?</h2>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto opacity-90">
            Join our community today and start earning money from your idle tools.
          </p>
          <Link 
            to="/signup" 
            className="btn-primary inline-block"
          >
            Get Started
          </Link>
        </div>
      </section>
    </div>
  )
}

export default HomePage
