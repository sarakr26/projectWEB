"use client"

import { useState, useEffect } from 'react'
import { Route, Routes, useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Calendar, Clock, Tool, AlertCircle, Home, Heart, Bell, Settings, User, Phone, Mail, MapPin, Camera, Check, Award } from 'react-feather'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import { getUserReservations, Reservation } from '../../app/services/reservationService'
import EditProfile from './EditProfile'; // Adjust path if needed
import { getUserLikedListings, Listing } from '../../app/services/listingService';
import ToolCard from '../components/tools/ToolCard'; // adjust path if needed
import ListingLikeButton from './ListingLikedButton'; // adjust path if needed

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'reservations', label: 'Reservations', icon: Calendar },
  { id: 'favorites', label: 'Favorites', icon: Heart },
  { id: 'notifications', label: 'Notification', icon: Bell },

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
const initialStatistics = {
  activeAnnounces: 0,
  totalReservations: 0,
  averageRating: 0,
  totalRevenue: "$0"
}



const DashboardPage = () => {
  const { user, isAuthenticated, becomePartner } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [selectedSection, setSelectedSection] = useState('dashboard')
  const [selectedTab, setSelectedTab] = useState('current')
  const [isEditing, setIsEditing] = useState(false)
  const [isUpgrading, setIsUpgrading] = useState(false)
  const [upgradeSuccess, setUpgradeSuccess] = useState(false)
  const [statistics, setStatistics] = useState(initialStatistics)
  
  // Add state for reservations
  const [currentReservations, setCurrentReservations] = useState<Reservation[]>([])
  const [pastReservations, setPastReservations] = useState<Reservation[]>([])
  const [reservationsLoading, setReservationsLoading] = useState(false)
  const [reservationsError, setReservationsError] = useState<string | null>(null)

  const [likedListings, setLikedListings] = useState<Listing[]>([]);
  const [likedLoading, setLikedLoading] = useState(false);
  const [likedError, setLikedError] = useState<string | null>(null);

  // state for active tools and displayed tools
  const [activeTools, setActiveTools] = useState<Listing[]>([]);
  const [displayedTools, setDisplayedTools] = useState<Listing[]>([]);

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

  // Function to handle partner upgrade
  const handlePartnerUpgrade = async () => {
    if (isUpgrading) return
    
    setIsUpgrading(true)
    try {
      const success = await becomePartner()
      if (success) {
        setUpgradeSuccess(true)
        setTimeout(() => {
          // Navigate to partner dashboard after showing success message
          navigate('/partner-dashboard')
        }, 2000)
      } else {
        alert("Failed to upgrade to partner. Please try again later.")
      }
    } catch (error) {
      console.error("Error upgrading to partner:", error)
      alert("An unexpected error occurred. Please try again later.")
    } finally {
      setIsUpgrading(false)
    }
  }
  useEffect(() => {
    if (selectedSection === 'favorites') {
      setLikedLoading(true);
      getUserLikedListings()
        .then(res => {
          if (res.status === 'success' && res.data) {
            setLikedListings(res.data);
          } else {
            setLikedError(res.message || 'Failed to load favorites');
          }
        })
        .catch(() => setLikedError('Failed to load favorites'))
        .finally(() => setLikedLoading(false));
    }
  }, [selectedSection]);

  // Function to fetch reservations
  const fetchReservations = async () => {
  setReservationsLoading(true);
  try {
    // Get the current user ID
    const userId = user?.id;
    
    // Create custom parameters to filter by partner_id
    const params = { as_partner: 'true' };
    
    const response = await getUserReservations();
    if (response.status === 'success' && response.data) {
      // Handle possible pagination in the response
      const allReservationData = Array.isArray(response.data) 
        ? response.data 
        : (typeof response.data === 'object' && response.data !== null && 'data' in response.data && Array.isArray((response.data as any).data)
            ? (response.data as { data: Reservation[] }).data
            : []);
      
      // Filter reservations where the current user is the partner (not the client)
      const partnerReservations = allReservationData.filter(
        reservation => String(reservation.partner_id) === String(userId)
      );
      
      setPastReservations(partnerReservations);
      
      // Update statistics based on filtered data
      const totalRevenue = partnerReservations
        .filter((r: Reservation) => r.status === 'completed')
        .reduce((sum: number, r: Reservation) => sum + (r.total_price || 0), 0);
        
      setStatistics(prev => ({
        ...prev,
        totalReservations: partnerReservations.length,
        totalRevenue: `$${totalRevenue.toFixed(2)}`
      }));
    }
  } catch (error) {
    console.error('Error fetching reservations:', error);
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

  const handleFilterChange = (filterType: string, value: string) => {
    switch (filterType) {
      case 'category':
        // Filtrer par catégorie
        const filteredByCategory = activeTools.filter(tool => 
          value ? tool.category === value : true
        );
        setDisplayedTools(filteredByCategory);
        break;
        
      case 'price':
        // Filtrer par gamme de prix
        let [min, max] = value.split('-').map(Number);
        const filteredByPrice = activeTools.filter(tool => {
          if (!value) return true;
          if (value.includes('+')) {
            return tool.price_per_day >= min;
          }
          return tool.price_per_day >= min && tool.price_per_day <= max;
        });
        setDisplayedTools(filteredByPrice);
        break;
        
      case 'availability':
        // Filtrer par disponibilité
        const filteredByAvailability = activeTools.filter(tool => 
          value ? tool.status === value : true
        );
        setDisplayedTools(filteredByAvailability);
        break;
    }
  };

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
              {/* Partner Upgrade Card - Show only for clients */}
              {user?.role === 'client' && !upgradeSuccess && (
                <div className="tn-card p-6 mb-6 bg-gradient-to-br from-blue-50 to-green-50 border border-green-100">
                  <div className="flex items-center space-x-2 mb-3">
                    <Award size={24} className="text-green-600" />
                    <h2 className="font-bold text-lg text-gray-800">Become a Partner</h2>
                  </div>
                  <p className="text-gray-600 mb-4">
                    List your tools and earn money by renting them to others in your community.
                  </p>
                  <button
                    onClick={handlePartnerUpgrade}
                    disabled={isUpgrading}
                    className="w-full tn-button tn-button-primary flex items-center justify-center space-x-2"
                  >
                    {isUpgrading ? (
                      <>
                        <LoadingSpinner size="small" color="white" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <Tool size={16} />
                        <span>Upgrade to Partner</span>
                      </>
                    )}
                  </button>
                </div>
              )}
              
              {/* Success message after upgrade */}
              {upgradeSuccess && (
                <div className="tn-card p-6 mb-6 bg-green-50 border border-green-200">
                  <div className="flex items-center space-x-2 mb-3 text-green-600">
                    <Check size={24} className="text-green-600" />
                    <h2 className="font-bold text-lg">Partner Upgrade Successful!</h2>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Congratulations! You're now a partner. Redirecting to your partner dashboard...
                  </p>
                  <div className="flex justify-center">
                    <LoadingSpinner size="small" color="primary" />
                  </div>
                </div>
              )}
              
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
              <EditProfile />
            </div>
          </div>
        );
      case 'reservations':
        return renderReservations();
      case 'favorites':
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">Your Favorite Listings</h2>
            {likedLoading ? (
              <LoadingSpinner />
            ) : likedError ? (
              <div className="text-red-500">{likedError}</div>
            ) : likedListings.length === 0 ? (
              <div className="text-gray-500">You have no favorite listings yet.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {likedListings.map(listing => (
                  <ToolCard
                    key={listing.id}
                    tool={{
                      id: listing.id.toString(),
                      name: listing.title,
                      price: listing.price_per_day,
                      rating: listing.avg_rating,
                      reviewCount: listing.review_count,
                      location: listing.city?.name || 'Unknown',
                      image: listing.images && listing.images.length > 0
                        ? listing.images[0].url
                        : 'https://images.unsplash.com/photo-1504148455328-c376907d081c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                      isPremium: listing.is_premium,
                      owner: {
                        id: listing.partner?.id.toString() || '0',
                        name: listing.partner?.name || 'Unknown',
                        avatar: listing.partner?.avatar_url || '/placeholder.svg',
                        rating: listing.partner?.avg_rating_as_partner || 0
                      }
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        );
      case 'notifications':
        return <div>Notification Center</div>;
      case 'settings':
        return <div>Account Settings</div>;
      case 'tools':
        return (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700 mb-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Tool Management</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Manage your tools, check statistics, and update listings
                </p>
              </div>
              
              {/* Filtres de recherche */}
              <div className="flex gap-4 mb-6">
                {/* Filtre de catégorie */}
                <select 
                  className="form-select rounded-md border-gray-300 focus:border-primary-500 focus:ring-primary-500"
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                >
                  <option value="">All Categories</option>
                  <option value="power-tools">Power Tools</option>
                  <option value="hand-tools">Hand Tools</option>
                  <option value="garden-tools">Garden Tools</option>
                </select>

                {/* Filtre de prix */}
                <select
                  className="form-select rounded-md border-gray-300 focus:border-primary-500 focus:ring-primary-500"
                  onChange={(e) => handleFilterChange('price', e.target.value)}
                >
                  <option value="">Any Price</option>
                  <option value="0-50">$0 - $50</option>
                  <option value="51-100">$51 - $100</option>
                  <option value="101+">$101+</option>
                </select>

                {/* Filtre de disponibilité */}
                <select
                  className="form-select rounded-md border-gray-300 focus:border-primary-500 focus:ring-primary-500"
                  onChange={(e) => handleFilterChange('availability', e.target.value)}
                >
                  <option value="">Any Availability</option>
                  <option value="available">Available Now</option>
                  <option value="rented">Currently Rented</option>
                </select>
              </div>
            </div>

            {/* Liste des outils (existante) */}
          </div>
        );
      default:
        return null;
    }
  };

  // Mettre à jour displayedTools quand activeTools change
  useEffect(() => {
    setDisplayedTools(activeTools);
  }, [activeTools]);

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
              {user?.role === 'partner' ? (
                <Link 
                  to="/partner-dashboard"
                  className="tn-button tn-button-secondary flex items-center gap-2"
                >
                  <Tool size={16} className="mr-1" />
                  Partner Dashboard
                </Link>
              ) : !upgradeSuccess ? (
                <button
                  onClick={handlePartnerUpgrade}
                  disabled={isUpgrading}
                  className="tn-button tn-button-secondary flex items-center gap-2"
                >
                  <Tool size={16} className="mr-1" />
                  {isUpgrading ? 'Processing...' : 'Become a Partner'}
                </button>
              ) : null}
              
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


