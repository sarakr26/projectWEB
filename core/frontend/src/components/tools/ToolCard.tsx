"use client"

import type React from "react"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Heart } from "react-feather"
import { useAuth } from "../../contexts/AuthContext"
import { Tool } from '../../types/Tool'

interface ToolCardProps {
  tool: Tool;
}

const ToolCard = ({ tool }: ToolCardProps) => {
  const { isAuthenticated } = useAuth()
  const [saved, setSaved] = useState(false)

  const handleSaveClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!isAuthenticated) {
      // Redirect to login or show login modal
      return
    }

    setSaved(!saved)
  }

  return (
    <Link 
      to={`/tools/${tool.id}`} 
      className="block bg-white rounded-xl shadow-lg overflow-hidden transition transform hover:-translate-y-2 hover:shadow-xl"
    >
      <div className="relative">
        <img 
          src={tool.images[0] || 'https://via.placeholder.com/400x300?text=No+Image'} 
          alt={tool.name}
          className="tool-image"
        />
        <span className={`absolute top-3 left-3 px-3 py-1 text-xs font-semibold rounded-full ${tool.available ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
          {tool.available ? 'Available' : 'Unavailable'}
        </span>
        <button
          onClick={handleSaveClick}
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md text-gray-500 hover:text-red-500 transition-all transform hover:scale-110"
        >
          <Heart className={`h-5 w-5 ${saved ? 'text-red-500 fill-current' : ''}`} />
        </button>
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-bold mb-2 truncate text-gray-800">{tool.name}</h3>
        
        <div className="flex items-center mb-3">
          <span className="text-yellow-500 mr-1">★</span>
          <span className="text-sm text-gray-600">
            {tool.rating || 'No ratings'} 
            {tool.numReviews ? ` (${tool.numReviews})` : ''}
          </span>
        </div>
        
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">{tool.description}</p>
        
        <div className="border-t pt-3 flex justify-between items-center">
          <span className="font-bold text-xl text-blue-600">${tool.price}<span className="text-sm text-gray-500">/{tool.priceUnit}</span></span>
          <span className="text-sm bg-gray-100 text-gray-700 px-2 py-1 rounded-full">{tool.location}</span>
        </div>
      </div>
    </Link>
  )
}

export default ToolCard
