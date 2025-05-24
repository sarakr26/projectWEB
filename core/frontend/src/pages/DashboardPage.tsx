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
import ClientReviewSection from '../components/reviews/ClientReviewSection';
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
      console.log('Fetching reservations...');
      const response = await getUserReservations();
      console.log('Reservations response:', response);
      
      if (response.status === 'success' && response.data) {
        // Handle possible pagination in the response
        const allReservationData = Array.isArray(response.data) 
          ? response.data 
          : (typeof response.data === 'object' && response.data !== null && 'data' in response.data && Array.isArray((response.data as any).data)
              ? (response.data as { data: Reservation[] }).data
              : []);
        
        console.log('Processed reservations:', allReservationData);
        
        // Split reservations into current and past
        const now = new Date();
        const current = allReservationData.filter(reservation => 
          new Date(reservation.end_date) >= now && 
          reservation.status !== 'canceled' && 
          reservation.status !== 'completed'
        );
        const past = allReservationData.filter(reservation => 
          new Date(reservation.end_date) < now || 
          reservation.status === 'canceled' || 
          reservation.status === 'completed'
        );
        
        setCurrentReservations(current);
        setPastReservations(past);
        
        // Update statistics
        const totalRevenue = past
          .filter((r: Reservation) => r.status === 'completed')
          .reduce((sum: number, r: Reservation) => sum + (r.total_price || 0), 0);
          
        setStatistics(prev => ({
          ...prev,
          totalReservations: allReservationData.length,
          totalRevenue: `$${totalRevenue.toFixed(2)}`
        }));
      }
    } catch (error) {
      console.error('Error fetching reservations:', error);
      setReservationsError('Failed to load reservations');
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
        {reservations.map(reservation => (
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
                  <div className="mt-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${reservation.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                        reservation.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                        reservation.status === 'completed' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'}`}>
                      {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end space-y-2">
                {reservation.status === 'confirmed' && (
                  <button 
                    onClick={() => handlePayment(reservation.id)}
                    className="tn-button tn-button-primary"
                  >
                    Pay Now
                  </button>
                )}
                <button 
                  onClick={() => navigate(`/tools/${reservation.listing_id}`)}
                  className="tn-button tn-button-outline"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  const handlePayment = async (reservationId: number) => {
    try {
      console.log('Processing payment for reservation:', reservationId);
      const response = await fetch(`http://localhost:8000/api/reservations/${reservationId}/pay`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        }
      });

      const data = await response.json();
      console.log('Payment response:', data);

      if (data.status === 'success') {
        // Refresh reservations after successful payment
        await fetchReservations();
        // Show success message
        alert('Payment successful!');
      } else {
        throw new Error(data.message || 'Payment failed');
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    }
  };

  const handleFilterChange = (filterType: string, value: string) => {
    switch (filterType) {
      case 'category':
        // Filtrer par catégorie
        const filteredByCategory = activeTools.filter(tool => 
          value ? (tool.category && (tool.category.id?.toString() === value || tool.category.name === value)) : true
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
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-64 lg:shrink-0">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-200 dark:border-gray-700">
            {/* Profile section */}
            <div className="text-center p-4 border-b border-gray-200 dark:border-gray-700 mb-4">
              
              <h3 className="font-semibold text-gray-900 dark:text-white mt-2">{user?.name || 'User'}</h3>
              <span className="text-sm text-gray-500 dark:text-gray-400">User Account</span>
            </div>
            
            {/* Menu items */}
            <div className="space-y-2">
              {menuItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => setSelectedSection(item.id)}
                  className={`w-full flex items-center space-x-2 p-3 rounded-lg transition-colors
                    ${selectedSection === item.id 
                      ? 'bg-[#0ac5b2]/10 text-[#0ac5b2] dark:bg-[#0ac5b2]/20 dark:text-[#0ac5b2]' 
                      : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800/50'}`}
                >
                  <item.icon size={18} />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main content area */}
        <div className="flex-1">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {menuItems.find(item => item.id === selectedSection)?.label || 'Dashboard'}
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                {selectedSection === 'dashboard' 
                  ? 'Welcome back! Here\'s an overview of your rentals.' 
                  : selectedSection === 'profile'
                    ? 'Manage your profile and settings.'
                    : selectedSection === 'reservations'
                      ? 'View and manage your tool rentals.'
                      : 'Stay updated with your activity.'}
              </p>
            </div>
            
            <div className="mt-4 md:mt-0 flex gap-4">
              {user?.role === 'client' && !upgradeSuccess && (
                <button
                  onClick={handlePartnerUpgrade}
                  disabled={isUpgrading}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#0ac5b2] hover:bg-[#09b3a2] dark:bg-[#0ac5b2] dark:hover:bg-[#09b3a2] shadow-sm"
                >
                  <Tool size={16} className="mr-2" />
                  {isUpgrading ? 'Processing...' : 'Become a Partner'}
                </button>
              )}
              
              <Link to="/search" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#0ac5b2] hover:bg-[#09b3a2] dark:bg-[#0ac5b2] dark:hover:bg-[#09b3a2]">
                Find Tools
              </Link>
            </div>
          </div>

          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;


