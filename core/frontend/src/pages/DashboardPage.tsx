"use client"

import { useState, useEffect } from 'react'
import { Route, Routes, useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import LoadingSpinner from '../components/ui/LoadingSpinner'

// Dashboard sub-components
const MyTools = () => <div className="p-4">My Tools Content</div>
const Requests = () => <div className="p-4">Requests Content</div>
const Messages = () => <div className="p-4">Messages Content</div>
const Settings = () => <div className="p-4">Settings Content</div>

const DashboardPage = () => {
  const { user, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Redirect if not logged in
    if (!isAuthenticated) {
      navigate('/signin?redirect=/dashboard')
      return
    }

    // Simulate loading dashboard data
    const loadDashboard = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 800))
      } catch (error) {
        console.error('Error loading dashboard:', error)
      } finally {
        setLoading(false)
      }
    }

    loadDashboard()
  }, [isAuthenticated, navigate])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 mb-6 md:mb-0">
          <nav className="bg-white rounded-lg shadow-md p-4">
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/dashboard" 
                  className="block py-2 px-4 hover:bg-gray-100 rounded-md transition"
                >
                  My Tools
                </Link>
              </li>
              <li>
                <Link 
                  to="/dashboard/requests" 
                  className="block py-2 px-4 hover:bg-gray-100 rounded-md transition"
                >
                  Requests
                </Link>
              </li>
              <li>
                <Link 
                  to="/dashboard/messages" 
                  className="block py-2 px-4 hover:bg-gray-100 rounded-md transition"
                >
                  Messages
                </Link>
              </li>
              <li>
                <Link 
                  to="/dashboard/settings" 
                  className="block py-2 px-4 hover:bg-gray-100 rounded-md transition"
                >
                  Settings
                </Link>
              </li>
            </ul>
          </nav>
        </aside>
        
        {/* Main Content Area */}
        <div className="flex-1 bg-white rounded-lg shadow-md">
          <Routes>
            <Route index element={<MyTools />} />
            <Route path="requests" element={<Requests />} />
            <Route path="messages" element={<Messages />} />
            <Route path="settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage 