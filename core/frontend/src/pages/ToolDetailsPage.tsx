"use client"

import { useState, useEffect, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal } from "react"
import { useParams, Link } from "react-router-dom"
import { useQuery } from "react-query"
import { Star, Heart, MapPin, Calendar, Clock, ChevronLeft, ChevronRight, Check } from "react-feather"
import { useAuth } from "../contexts/AuthContext"
import { getListing, Listing } from "@/app/services/listingService"
import LoadingSpinner from "../components/ui/LoadingSpinner"
import { createReservation } from "@/app/services/reservationService"
import ListingLikeButton from "./ListingLikedButton";

// Custom hook for fetching tool details
const useToolDetails = (id: string | undefined) => {
  return useQuery(
    ["tool", id], 
    async () => {
      if (!id) throw new Error("Tool ID is required");
      const listingId = parseInt(id);
      const response = await getListing(listingId);
      
      if (response.status !== 'success' || !response.data) {
        throw new Error(response.message || "Failed to fetch tool details");
      }
      
      return response.data;
    },
    {
      enabled: !!id,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );
}

export default function ToolDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated } = useAuth();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [timeSlot, setTimeSlot] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reservationError, setReservationError] = useState<string | null>(null);
  const [reservationSuccess, setReservationSuccess] = useState(false);
  const [tool, setTool] = useState<Listing | null>(null);

  const { data: listing, isLoading, error } = useToolDetails(id);

  // Reset image index when listing changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [listing?.id]);

  // Fetch tool details
  useEffect(() => {
    const fetchTool = async () => {
      try {
        const response = await getListing(id);
        if (response.status === 'success' && response.data) {
          setTool(response.data);
        }
      } catch (error) {
        console.error('Error fetching tool:', error);
      }
    };
    
    fetchTool();
  }, [id]);

  const handlePrevImage = () => {
    if (listing?.images && listing.images.length > 0) {
      setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? listing.images!.length - 1 : prevIndex - 1));
    }
  }

  const handleNextImage = () => {
    if (listing?.images && listing.images.length > 0) {
      setCurrentImageIndex((prevIndex) => (prevIndex === listing.images!.length - 1 ? 0 : prevIndex + 1));
    }
  }


  const handleRentRequest = async () => {
  if (!isAuthenticated) {
    alert("Please login to rent this tool");
    return;
  }

  if (!listing || !startDate || !endDate || !timeSlot) {
    return; // Form validation - all fields required
  }

  setIsSubmitting(true);
  setReservationError(null);
  
  try {
    // Format dates for the API - YYYY-MM-DD format
    const formattedStartDate = startDate.toISOString().split('T')[0];
    const formattedEndDate = endDate.toISOString().split('T')[0];
    
    // Call the API to create the reservation
    const response = await createReservation(
      listing.id,
      formattedStartDate, 
      formattedEndDate, 
      false  // Set delivery_option to false or make it configurable
    );
    
    // Handle the response
    if (response.status === 'success') {
      setReservationSuccess(true);
      // Optionally: Redirect to the user's dashboard
      // navigate('/dashboard');
    } else {
      setReservationError(response.message || 'Failed to create reservation. Please try again.');
    }
  } catch (error) {
    console.error('Error creating reservation:', error);
    setReservationError('An unexpected error occurred. Please try again later.');
  } finally {
    setIsSubmitting(false);
  }
};

  // Calculate rental cost
  const calculateRentalCost = () => {
    if (!listing || !startDate || !endDate) return 0;

    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    return days * listing.price_per_day;
  }

  const rentalCost = calculateRentalCost();
  const serviceFee = rentalCost * 0.1; // 10% service fee
  const securityDeposit = 50; // Default to 50, or update if Listing type has a different property
  const totalCost = rentalCost + serviceFee;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !listing) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg text-red-600 dark:text-red-400">
          {error instanceof Error ? error.message : "Failed to load tool details. Please try again."}
        </div>
        <div className="mt-4">
          <Link 
            to="/search"
            className="inline-flex items-center text-green-600 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300"
          >
            <ChevronLeft className="h-5 w-5 mr-1" />
            Back to search results
          </Link>
        </div>
      </div>
    );
  }

  // Get default image if none available
  const getDefaultImage = () => "/placeholder.svg?height=600&width=600";
  
  // Get image at current index or default
  const getCurrentImage = () => {
    if (!listing.images || listing.images.length === 0) return getDefaultImage();
    return listing.images[currentImageIndex]?.url || getDefaultImage();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <Link
          to="/search"
          className="inline-flex items-center text-green-600 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300"
        >
          <ChevronLeft className="h-5 w-5 mr-1" />
          Back to search results
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column: Images and details */}
        <div className="lg:col-span-2 space-y-8">
          {/* Image gallery */}
          <div className="relative rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
            <div className="aspect-w-4 aspect-h-3 relative">
              <img
                src={`http://localhost:8000${tool?.images?.[0]?.url}`}
                alt={tool?.title}
                className="w-full h-full object-cover"
              />

              {listing.images && listing.images.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-900 p-2 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-800"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                  </button>

                  <button
                    onClick={handleNextImage}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-900 p-2 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-800"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                  </button>
                </>
              )}

              {/* Like button */}
              <button
                className="absolute top-2 right-2 p-2 bg-white dark:bg-gray-900 rounded-full shadow-md"
                aria-label="Like tool"
              >
                <ListingLikeButton listingId={listing.id} />
              </button>
            </div>

            {listing.images && listing.images.length > 1 && (
              <div className="flex justify-center mt-2 space-x-2 p-2 overflow-x-auto">
                {listing.images.map((image, index) => (
                  <button
                    key={image.id || index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-16 h-12 rounded overflow-hidden border-2 ${
                      index === currentImageIndex ? "border-green-500 dark:border-green-400" : "border-transparent"
                    }`}
                  >
                    <img
                      src={`http://localhost:8000${image.url}`}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Tool details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{listing.title}</h1>

              <div className="flex flex-wrap items-center mt-2">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400" />
                  <span className="ml-1 text-gray-700 dark:text-gray-300">
                    {listing.avg_rating > 0 ? listing.avg_rating.toFixed(1) : 'New'}
                  </span>
                </div>
                <span className="mx-1 text-gray-500 dark:text-gray-400">·</span>
                <span className="text-gray-500 dark:text-gray-400">{listing.review_count} reviews</span>
                <span className="mx-1 text-gray-500 dark:text-gray-400">·</span>
                <div className="flex items-center text-gray-500 dark:text-gray-400">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>
                    {listing.city?.name || 'Unknown location'}
                  </span>
                </div>
                {listing.category && (
                  <>
                    <span className="mx-1 text-gray-500 dark:text-gray-400">·</span>
                    <span className="text-gray-500 dark:text-gray-400">{listing.category.name}</span>
                  </>
                )}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Description</h2>
              <p className="text-gray-700 dark:text-gray-300">{listing.description}</p>
            </div>

            {/* We don't have specifications from API, so let's create some from the data we have */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex">
                  <span className="font-medium text-gray-900 dark:text-white w-1/3">Price:</span>
                  <span className="text-gray-700 dark:text-gray-300">${listing.price_per_day} per day</span>
                </div>
                <div className="flex">
                  <span className="font-medium text-gray-900 dark:text-white w-1/3">Category:</span>
                  <span className="text-gray-700 dark:text-gray-300">{listing.category?.name || 'Uncategorized'}</span>
                </div>
                <div className="flex">
                  <span className="font-medium text-gray-900 dark:text-white w-1/3">Location:</span>
                  <span className="text-gray-700 dark:text-gray-300">{listing.city?.name || 'Unknown'}</span>
                </div>
                <div className="flex">
                  <span className="font-medium text-gray-900 dark:text-white w-1/3">Status:</span>
                  <span className="text-gray-700 dark:text-gray-300 capitalize">{listing.status || 'Active'}</span>
                </div>
                <div className="flex">
                  <span className="font-medium text-gray-900 dark:text-white w-1/3">Delivery:</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    {listing.delivery_option ? 'Available' : 'Pickup only'}
                  </span>
                </div>
                <div className="flex">
                  <span className="font-medium text-gray-900 dark:text-white w-1/3">Rating:</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    {listing.avg_rating > 0 ? `${listing.avg_rating.toFixed(1)} (${listing.review_count} reviews)` : 'No ratings yet'}
                  </span>
                </div>
              </div>
            </div>

            {/* We might not have features from API, so conditionally render */}
            {listing.features && listing.features.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Features</h2>
                <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                  {listing.features.map((feature: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined, index: Key | null | undefined) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Reviews section - this would need to be fetched from a separate API endpoint */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Reviews</h2>
              {listing.review_count > 0 ? (
                <div className="space-y-6">
                  <p className="text-gray-700 dark:text-gray-300">
                    This listing has {listing.review_count} reviews with an average rating of {listing.avg_rating.toFixed(1)}.
                  </p>
                  {/* If you have actual reviews data, you would map through them here */}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400">No reviews yet for this tool.</p>
              )}
            </div>
          </div>
        </div>

        {/* Right column: Booking and owner info */}
        <div className="space-y-8">
          {/* Booking card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700 sticky top-20">
            <div className="flex justify-between items-center mb-4">
              <div>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">${listing.price_per_day}</span>
                <span className="text-gray-500 dark:text-gray-400"> / day</span>
              </div>
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-400" />
                <span className="ml-1 text-gray-700 dark:text-gray-300">
                  {listing.avg_rating > 0 ? listing.avg_rating.toFixed(1) : 'New'}
                </span>
                <span className="ml-1 text-gray-500 dark:text-gray-400">({listing.review_count})</span>
              </div>
            </div>

            <div className="border border-gray-200 dark:border-gray-700 rounded-lg mb-4">
              <div className="flex">
                <div className="w-1/2 p-3 border-r border-gray-200 dark:border-gray-700">
                  <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">START DATE</label>
                  <input
                    type="date"
                    className="w-full bg-transparent text-gray-900 dark:text-white focus:outline-none"
                    onChange={(e) => setStartDate(e.target.value ? new Date(e.target.value) : null)}
                    min={new Date().toISOString().split('T')[0]} // Cannot select past dates
                  />
                </div>
                <div className="w-1/2 p-3">
                  <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">END DATE</label>
                  <input
                    type="date"
                    className="w-full bg-transparent text-gray-900 dark:text-white focus:outline-none"
                    onChange={(e) => setEndDate(e.target.value ? new Date(e.target.value) : null)}
                    min={startDate ? new Date(startDate.getTime() + 86400000).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 p-3">
                <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">TIME SLOT</label>
                <select
                  className="w-full bg-transparent text-gray-900 dark:text-white focus:outline-none"
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                >
                  <option value="">Select a time slot</option>
                  <option value="morning">Morning (8am - 12pm)</option>
                  <option value="afternoon">Afternoon (12pm - 5pm)</option>
                  <option value="evening">Evening (5pm - 9pm)</option>
                </select>
              </div>
            </div>

            {startDate && endDate && timeSlot && (
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-700 dark:text-gray-300">
                    ${listing.price_per_day} x {Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1} days
                  </span>
                  <span className="text-gray-700 dark:text-gray-300">${rentalCost}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700 dark:text-gray-300">Service fee</span>
                  <span className="text-gray-700 dark:text-gray-300">${serviceFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700 dark:text-gray-300">Security deposit (refundable)</span>
                  <span className="text-gray-700 dark:text-gray-300">${securityDeposit}</span>
                </div>
                <div className="flex justify-between font-semibold border-t border-gray-200 dark:border-gray-700 pt-2">
                  <span className="text-gray-900 dark:text-white">Total</span>
                  <span className="text-gray-900 dark:text-white">${totalCost.toFixed(2)}</span>
                </div>
              </div>
            )}

            {reservationSuccess ? (
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-green-800 dark:text-green-300 mb-4">
              <div className="flex items-center">
                <Check size={20} className="mr-2 flex-shrink-0" />
                <p>Reservation requested successfully! The owner will review your request.</p>
              </div>
              <div className="mt-4">
                <Link 
                  to="/dashboard"
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium text-center block"
                >
                  View My Reservations
                </Link>
              </div>
            </div>
          ) : (
            <>
              {reservationError && (
                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg text-red-600 dark:text-red-400 mb-4">
                  {reservationError}
                </div>
              )}
              
              <button
                onClick={handleRentRequest}
                disabled={!startDate || !endDate || !timeSlot || isSubmitting}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <span className="mr-2">Processing...</span>
                    <LoadingSpinner size="small" color="white" />
                  </div>
                ) : (
                  "Request to Rent"
                )}
              </button>
            </>
          )}

            <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-3">You won't be charged yet</p>
          </div>

          {/* Owner info */}
          {listing.partner && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <img
                  src={listing.partner.avatar_url || "/placeholder.svg?height=100&width=100"}
                  alt={listing.partner.name || listing.partner.username}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    Owned by {listing.partner.name || listing.partner.username}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {listing.partner.member_since ? `Member since ${listing.partner.member_since}` : ''}
                  </p>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 mr-2" />
                  <span className="text-gray-700 dark:text-gray-300">
                  {typeof listing.partner.avg_rating_as_partner === 'number' 
                    ? listing.partner.avg_rating_as_partner.toFixed(1)
                    : (listing.partner.avg_rating_as_partner 
                        ? Number(listing.partner.avg_rating_as_partner).toFixed(1) 
                        : 'New')
                  }
                  {typeof listing.partner.review_count_as_partner !== 'undefined' && 
                    ` · ${listing.partner.review_count_as_partner} reviews`}
                </span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Quick responses
                  </span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {listing.partner.response_rate ? `${listing.partner.response_rate}% response rate` : 'Active listing'}
                  </span>
                </div>
              </div>

              <Link
                to={`/profile/${listing.partner.id}`}
                className="block w-full text-center border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                View Profile
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}