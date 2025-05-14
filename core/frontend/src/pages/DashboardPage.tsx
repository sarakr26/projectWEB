"use client"

import { useState, useEffect } from 'react'
import { Route, Routes, useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Calendar, Clock, Tool, AlertCircle, Home, Heart, Bell, Settings, User, Phone, Mail, MapPin, Camera } from 'react-feather'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import { getUserReservations, Reservation } from '../../app/services/reservationService'

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'reservations', label: 'Reservations', icon: Calendar },
  { id: 'favorites', label: 'Favorites', icon: Heart },
  { id: 'notifications', label: 'Settings', icon: Bell },
  { id: 'settings', label: 'Account', icon: Settings }
]

// Notifications - consider replacing with API data in the future
const notifications = [
  {
    id: 1,
    title: "Reservation Confirmed",
    message: "Your reservation for Bosch Impact Drill has been confirmed",
    time: "2 hours ago"
  },
  {
    id: 2,
    title: "Return Reminder",
    message: "Makita Circular Saw needs to be returned in 2 days",
    time: "2 days ago"
  }
]

const DashboardPage = () => {
  const { user, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [selectedSection, setSelectedSection] = useState('dashboard')
  const [selectedTab, setSelectedTab] = useState('current')
  const [isEditing, setIsEditing] = useState(false)
  
  // Add state for reservations
  const [currentReservations, setCurrentReservations] = useState<Reservation[]>([])
  const [pastReservations, setPastReservations] = useState<Reservation[]>([])
  const [reservationsLoading, setReservationsLoading] = useState(false)
  const [reservationsError, setReservationsError] = useState<string | null>(null)

  useEffect(() => {
    // Redirect if not logged in
    if (!isAuthenticated) {
      navigate('/signin?redirect=/dashboard')
      return
    }

    // Load dashboard data
    const loadDashboard = async () => {
      try {
        await fetchReservations()
      } catch (error) {
        console.error('Error loading dashboard:', error)
      } finally {
        setLoading(false)
      }
    }

    loadDashboard()
  }, [isAuthenticated, navigate])

  // Function to fetch reservations
  const fetchReservations = async () => {
  setReservationsLoading(true);
  setReservationsError(null);
  
  try {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      setReservationsError('Authentication required. Please log in again.');
      navigate('/signin?redirect=/dashboard');
      return;
    }
    
    // Fetch active/current reservations (confirmed, pending, ongoing)
    const activeResponse = await getUserReservations('confirmed');
    console.log('API Response:', activeResponse);
    if (activeResponse.status === 'success' && activeResponse.data) {
      // FIX: Access the data array inside the paginated response
      if (Array.isArray(activeResponse.data)) {
        setCurrentReservations(activeResponse.data);
      } else if (
        typeof activeResponse.data === 'object' &&
        activeResponse.data !== null &&
        'data' in activeResponse.data &&
        Array.isArray((activeResponse.data as { data: Reservation[] }).data)
      ) {
        setCurrentReservations((activeResponse.data as { data: Reservation[] }).data);
      } else {
        setCurrentReservations([]);
      }
    }
    
    // Fetch completed reservations
    const completedResponse = await getUserReservations('completed');
    if (completedResponse.status === 'success' && completedResponse.data) {
      // FIX: Access the data array inside the paginated response
      if (Array.isArray(completedResponse.data)) {
        setPastReservations(completedResponse.data);
      } else if (
        typeof completedResponse.data === 'object' &&
        completedResponse.data !== null &&
        'data' in completedResponse.data &&
        Array.isArray((completedResponse.data as { data: Reservation[] }).data)
      ) {
        setPastReservations((completedResponse.data as { data: Reservation[] }).data);
      } else {
        setPastReservations([]);
      }
    }
  } catch (err) {
    console.error('Failed to fetch reservations:', err);
    setReservationsError('Failed to load your reservations. Please try again later.');
  } finally {
    setReservationsLoading(false);
  }
};

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement API call to update profile
    setIsEditing(false)
  }

  const renderReservations = () => {
    if (reservationsLoading) {
      return <div className="flex justify-center py-8"><LoadingSpinner /></div>
    }
    
    if (reservationsError) {
      return (
        <div className="p-4 text-red-500 bg-red-50 rounded-lg">
          {reservationsError}
        </div>
      )
    }
    
    const reservations = selectedTab === 'current' ? currentReservations : pastReservations
    
    if (reservations.length === 0) {
      return (
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No {selectedTab} reservations found.</p>
          {selectedTab === 'current' && (
            <button 
              onClick={() => navigate('/search')}
              className="mt-4 tn-button tn-button-outline"
            >
              Find Tools to Rent
            </button>
          )}
        </div>
      )
    }
    
    return (
      <div className="space-y-4">
        {selectedTab === 'current' ? (
          currentReservations.map(reservation => (
            <div key={reservation.id} className="tn-card p-4">
              <div className="flex justify-between items-start">
                <div className="flex space-x-4">
                  <div className="w-20 h-20 bg-gray-200 rounded-lg">
                    {reservation.listing?.image_url && (
                      <img 
                        src={reservation.listing.image_url} 
                        alt={reservation.listing?.title || "Tool"} 
                        className="w-full h-full object-cover rounded-lg"
                      />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold">{reservation.listing?.title || "Tool Reservation"}</h3>
                    <p className="text-sm text-gray-500">{reservation.listing?.address || "No location available"}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Calendar size={14} className="text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {new Date(reservation.start_date).toLocaleDateString()} - {new Date(reservation.end_date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <span className={`tn-tag ${reservation.status === 'confirmed' ? 'tn-tag-primary' : 'tn-tag-warning'}`}>
                  {reservation.status}
                </span>
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
                  <div className="w-20 h-20 bg-gray-200 rounded-lg">
                    {reservation.listing?.image_url && (
                      <img 
                        src={reservation.listing.image_url} 
                        alt={reservation.listing?.title || "Tool"} 
                        className="w-full h-full object-cover rounded-lg"
                      />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold">{reservation.listing?.title || "Tool Reservation"}</h3>
                    <p className="text-sm text-gray-500">{reservation.listing?.address || "No location available"}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Clock size={14} className="text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {new Date(reservation.start_date).toLocaleDateString()} - {new Date(reservation.end_date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <span className="tn-tag tn-tag-gray">{reservation.status}</span>
              </div>
              {reservation.status === 'completed' && (
                <div className="flex justify-end mt-4">
                  <button className="tn-button tn-button-outline">Write a Review</button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    )
  }

  const renderContent = () => {
    switch (selectedSection) {
      case 'dashboard':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex space-x-4 mb-6">
                <button
                  onClick={() => setSelectedTab('current')}
                  className={`tn-nav-item ${selectedTab === 'current' ? 'active' : ''}`}
                >
                  Current Reservations
                </button>
                <button
                  onClick={() => setSelectedTab('past')}
                  className={`tn-nav-item ${selectedTab === 'past' ? 'active' : ''}`}
                >
                  Past Reservations
                </button>
              </div>
              {renderReservations()}
            </div>
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
        )
      case 'profile':
        return (
          <div className="max-w-3xl mx-auto">
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-lg shadow p-6 mb-6">
              {!isEditing ? (
                <>
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center">
                      <User size={40} className="text-gray-400" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold">{user?.username || 'testuser'}</h2>
                      <p className="text-gray-500">{user?.email || 'test@example.com'}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <Phone size={16} className="text-gray-400 mr-2" />
                          <span>{user?.phone_number || "123456789"}</span>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <Mail size={16} className="text-gray-400 mr-2" />
                          <span>{user?.email || "test@example.com"}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <MapPin size={16} className="text-gray-400 mr-2" />
                          <span>{user?.address || "123 Test Street"}</span>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <Home size={16} className="text-gray-400 mr-2" />
                          <span>City #{user?.city_id || "1"}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <button 
                      className="tn-button tn-button-primary"
                      onClick={() => setIsEditing(true)}
                    >
                      Edit Profile
                    </button>
                  </div>
                </>
              ) : (
                <form onSubmit={handleProfileUpdate} className="space-y-6">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center relative group cursor-pointer">
                      <User size={40} className="text-gray-400" />
                      <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Camera size={20} className="text-white" />
                      </div>
                    </div>
                    <div>
                      <input
                        type="text"
                        defaultValue={user?.username || 'testuser'}
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <div className="relative">
                          <Phone size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="tel"
                            defaultValue={user?.phone_number || "123456789"}
                            className="block w-full pl-10 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <div className="relative">
                          <Mail size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="email"
                            defaultValue={user?.email || "test@example.com"}
                            className="block w-full pl-10 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                        <div className="relative">
                          <MapPin size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="text"
                            defaultValue={user?.address || "123 Test Street"}
                            className="block w-full pl-10 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                        <div className="relative">
                          <Home size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <select
                            defaultValue={user?.city_id || "1"}
                            className="block w-full pl-10 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
                          >
                            <option value="1">City #1</option>
                            <option value="2">City #2</option>
                            <option value="3">City #3</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end space-x-3">
                    <button 
                      type="button"
                      className="tn-button tn-button-outline"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="tn-button tn-button-primary"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )
      case 'reservations':
        return renderReservations()
      case 'favorites':
        return <div>Favorites Content</div>
      case 'notifications':
        return <div>Notification Center</div>
      case 'settings':
        return <div>Account Settings</div>
      default:
        return null
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="flex gap-8">
        {/* Sidebar Navigation */}
        <div className="w-64 shrink-0">
          <div className="tn-card p-4">
            <div className="space-y-2">
              {menuItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => setSelectedSection(item.id)}
                  className={`w-full flex items-center space-x-2 p-2 rounded-lg transition-colors
                    ${selectedSection === item.id 
                      ? 'bg-primary-50 text-primary-600' 
                      : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  <item.icon size={18} />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">
              {menuItems.find(item => item.id === selectedSection)?.label || 'Dashboard'}
            </h1>
            <div className="flex gap-4">
              <button
                className="tn-button tn-button-primary"
                onClick={() => navigate('/search')}
              >
                Find Tools
              </button>
            </div>
          </div>

          {renderContent()}
        </div>
      </div>
    </div>
  )
}

export default DashboardPage