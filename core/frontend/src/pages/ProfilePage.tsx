"use client"

import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { User } from '../types/User'
import { Tool } from '../types/Tool'
import ToolCard from '../components/tools/ToolCard'
import LoadingSpinner from '../components/ui/LoadingSpinner'

const ProfilePage = () => {
  const { id } = useParams()
  const [profile, setProfile] = useState<User | null>(null)
  const [userTools, setUserTools] = useState<Tool[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true)
      try {
        // In a real app, you would call your API with the profile ID
        // For now, let's simulate a delay
        await new Promise(resolve => setTimeout(resolve, 800))
        
        // Mock data - replace with actual API call
        setProfile({
          id: id || '1',
          name: 'Sample User',
          email: 'user@example.com',
          avatar: 'https://via.placeholder.com/150',
          bio: 'This is a sample user profile for demonstration purposes.',
          rating: 4.5,
          memberSince: '2023-01-15'
        })
        
        setUserTools([])
      } catch (error) {
        console.error('Error fetching profile:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [id])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">User not found</h1>
        <p>The requested profile does not exist or has been removed.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
          <img 
            src={profile.avatar} 
            alt={profile.name} 
            className="w-32 h-32 rounded-full object-cover"
          />
          
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{profile.name}</h1>
            <div className="flex items-center mb-2">
              <span className="text-yellow-500 mr-1">★</span>
              <span>{profile.rating} • Member since {new Date(profile.memberSince).toLocaleDateString()}</span>
            </div>
            <p className="text-gray-700 mb-4">{profile.bio}</p>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-4">Tools Listed by {profile.name}</h2>
      
      {userTools.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userTools.map(tool => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">No tools listed yet</h3>
          <p className="text-gray-600">
            This user hasn't listed any tools for sharing.
          </p>
        </div>
      )}
    </div>
  )
}

export default ProfilePage 