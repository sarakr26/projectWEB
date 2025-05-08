"use client"

import { useState, useEffect } from 'react'
import { Route, Routes, useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Calendar, Clock, Tool, AlertCircle } from 'react-feather'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import DashboardNav from '../components/navigation/DashboardNav'

// Mock data for example
const currentReservations = [
  {
    id: 1,
    toolName: "Bosch Hammer Drill",
    location: "Casablanca, Morocco",
    startDate: "Apr 20, 2024",
    endDate: "Apr 25, 2024",
    status: "active"
  }
]

const pastReservations = [
  {
    id: 2,
    toolName: "Makita Circular Saw",
    location: "Rabat, Morocco", 
    date: "Mar 15, 2024",
    status: "completed"
  }
]

const notifications = [
  {
    id: 1,
    title: "Reservation Confirmed",
    message: "Your reservation for Bosch Hammer Drill has been confirmed",
    time: "2 hours ago"
  },
  {
    id: 2,
    title: "Return Reminder",
    message: "The Makita Circular Saw is due in 2 days",
    time: "2 days ago"
  }
]

const DashboardPage = () => {
  const { user, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [selectedSection, setSelectedSection] = useState('current')

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
    <div className="container mx-auto px-4 py-24"> {/* Changed py-8 to py-24 for 6rem padding */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Client Dashboard</h1>
        <button className="tn-button tn-button-primary">Find Tools</button>
      </div>
      
      <DashboardNav />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Tabs */}
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setSelectedSection('current')}
              className={`tn-nav-item ${selectedSection === 'current' ? 'active' : ''}`}
            >
              Current Reservations
            </button>
            <button
              onClick={() => setSelectedSection('past')}
              className={`tn-nav-item ${selectedSection === 'past' ? 'active' : ''}`}
            >
              Past Reservations
            </button>
          </div>

          {/* Reservations List */}
          <div className="space-y-4">
            {selectedSection === 'current' ? (
              currentReservations.map(reservation => (
                <div key={reservation.id} className="tn-card p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex space-x-4">
                      <div className="w-20 h-20 bg-gray-200 rounded-lg"></div>
                      <div>
                        <h3 className="font-semibold">{reservation.toolName}</h3>
                        <p className="text-sm text-gray-500">{reservation.location}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <Calendar size={14} className="text-gray-400" />
                          <span className="text-sm text-gray-600">
                            {reservation.startDate} - {reservation.endDate}
                          </span>
                        </div>
                      </div>
                    </div>
                    <span className="tn-tag tn-tag-primary">{reservation.status}</span>
                  </div>
                  <div className="flex justify-end space-x-2 mt-4">
                    <button className="tn-button tn-button-outline">Report Issue</button>
                    <button className="tn-button tn-button-primary">View Details</button>
                  </div>
                </div>
              ))
            ) : (
              pastReservations.map(reservation => (
                <div key={reservation.id} className="tn-card p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex space-x-4">
                      <div className="w-20 h-20 bg-gray-200 rounded-lg"></div>
                      <div>
                        <h3 className="font-semibold">{reservation.toolName}</h3>
                        <p className="text-sm text-gray-500">{reservation.location}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <Clock size={14} className="text-gray-400" />
                          <span className="text-sm text-gray-600">{reservation.date}</span>
                        </div>
                      </div>
                    </div>
                    <span className="tn-tag tn-tag-gray">{reservation.status}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Notifications Panel */}
        <div className="lg:col-span-1">
          <div className="tn-card p-4">
            <h2 className="font-semibold mb-4">Notifications</h2>
            <div className="space-y-4">
              {notifications.map(notification => (
                <div key={notification.id} className="p-3 bg-gray-50 rounded-lg">
                  <h3 className="text-sm font-medium">{notification.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                  <span className="text-xs text-gray-400 mt-2 block">{notification.time}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <button className="text-sm text-primary-600 hover:underline">
                View All Notifications
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage