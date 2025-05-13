import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Tool, Archive, Star, FileText, Settings, Home, Package, Calendar, Bell, Users } from 'react-feather'
import LoadingSpinner from '../components/ui/LoadingSpinner'

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'tools', label: 'My Tools', icon: Tool },
  { id: 'reservations', label: 'Reservations', icon: Calendar },
  { id: 'clients', label: 'Clients', icon: Users },
  { id: 'notifications', label: 'Notifications', icon: Bell }
]

// Mock data for active tools
const activeTools = [
  {
    id: 1,
    name: "Bosch Impact Drill",
    price: "$15/day",
    stars: "4.5",
    observations: "23 rentals",
    status: "Available"
  },
  {
    id: 2,
    name: "Makita Circular Saw",
    price: "$20/day",
    stars: "4.8",
    observations: "15 rentals",
    status: "Rented"
  }
]

// Mock statistics
const statistics = {
  activeAnnounces: 2,
  totalReservations: 44,
  averageRating: 4.8,
  totalRevenue: "$2,445"
}

const PartnerDashboardPage = () => {
  const { user, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [selectedSection, setSelectedSection] = useState('dashboard')

  useEffect(() => {
    const checkAuth = async () => {
      if (!isAuthenticated) {
        navigate('/signin?redirect=/partner-dashboard')
        return
      }
      
      try {
        // Simulate API call to check partner status
        await new Promise(resolve => setTimeout(resolve, 800))
        setLoading(false)
      } catch (error) {
        console.error('Error loading partner dashboard:', error)
        navigate('/dashboard')
      }
    }

    checkAuth()
  }, [isAuthenticated, navigate])

  const renderContent = () => {
    switch (selectedSection) {
      case 'dashboard':
        return (
          <>
            {/* Statistics Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="tn-card p-6">
                <h3 className="text-gray-500 text-sm">Active Listings</h3>
                <p className="text-2xl font-bold mt-2">{statistics.activeAnnounces}</p>
              </div>
              <div className="tn-card p-6">
                <h3 className="text-gray-500 text-sm">Total Reservations</h3>
                <p className="text-2xl font-bold mt-2">{statistics.totalReservations}</p>
              </div>
              <div className="tn-card p-6">
                <h3 className="text-gray-500 text-sm">Average Rating</h3>
                <div className="flex items-center mt-2">
                  <p className="text-2xl font-bold">{statistics.averageRating}</p>
                  <Star size={20} className="text-yellow-400 ml-2" />
                </div>
              </div>
              <div className="tn-card p-6">
                <h3 className="text-gray-500 text-sm">Total Revenue</h3>
                <p className="text-2xl font-bold mt-2">{statistics.totalRevenue}</p>
              </div>
            </div>

            {/* Tools Section */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Active Listings</h2>
                <div className="flex space-x-2">
                  <button className="tn-button tn-button-outline flex items-center">
                    <Settings size={16} className="mr-2" />
                    Manage
                  </button>
                  <button className="tn-button tn-button-outline flex items-center">
                    <Archive size={16} className="mr-2" />
                    Archives
                  </button>
                </div>
              </div>

              {/* Tools List */}
              <div className="space-y-4">
                {activeTools.map(tool => (
                  <div key={tool.id} className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg mr-4"></div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{tool.name}</h3>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <Star size={14} className="text-yellow-500 mr-1" />
                        <span className="mr-3">{tool.stars}</span>
                        <span className="mr-3">•</span>
                        <span>{tool.observations}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{tool.price}</div>
                      <div className="text-sm text-gray-500 mt-1">{tool.status}</div>
                    </div>
                    <button className="ml-4 tn-button tn-button-outline">
                      <FileText size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )
      case 'tools':
        return (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Tool Management</h2>
            <div className="space-y-4">
              {activeTools.map(tool => (
                <div key={tool.id} className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg mr-4"></div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{tool.name}</h3>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <Star size={14} className="text-yellow-500 mr-1" />
                      <span className="mr-3">{tool.stars}</span>
                      <span className="mr-3">•</span>
                      <span>{tool.observations}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{tool.price}</div>
                    <div className="text-sm text-gray-500 mt-1">{tool.status}</div>
                  </div>
                  <button className="ml-4 tn-button tn-button-outline">
                    <FileText size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )
      case 'reservations':
        return (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Reservations</h2>
            {/* Add reservations content */}
          </div>
        )
      // Add other cases for different sections
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
            <Link to="/create-listing" className="tn-button tn-button-primary">
              Créer une Nouvelle Annonce
            </Link>
          </div>

          {renderContent()}
        </div>
      </div>
    </div>
  )
}

export default PartnerDashboardPage
