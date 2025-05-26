"use client"

import { useState, useEffect, Key, useCallback } from "react"
import { useParams, Link } from "react-router-dom" // Assuming react-router-dom v6+
import { useQuery } from "react-query"
import { Star, MapPin, Calendar, Clock, ChevronLeft, ChevronRight, CheckCircle, ChevronDown, ChevronUp, AlertTriangle } from "react-feather"
import { useAuth } from "../contexts/AuthContext"
import { getListing, Listing } from "@/app/services/listingService" // Adjusted path
import LoadingSpinner from "../components/ui/LoadingSpinner" // Adjusted path
import { createReservation } from "@/app/services/reservationService" // Adjusted path
import ListingLikeButton from "./ListingLikedButton";

// Import review service and types
import { getReviewsForListing, Review as ReviewType, LaravelPaginatedResponse } from "@/app/services/reviewService"; // Adjusted path
import ReviewItem from '../components/reviews/ReviewItem'; // Adjusted path

// Custom hook for fetching tool details
const useToolDetails = (id: string | undefined) => {
  return useQuery<Listing, Error>( // Added explicit types for useQuery
    ["tool", id],
    async () => {
      if (!id) throw new Error("Tool ID is required");
      const listingId = parseInt(id);
      if (isNaN(listingId)) throw new Error("Invalid Tool ID format");
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
  const { isAuthenticated } = useAuth(); // Assuming useAuth provides isAuthenticated
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reservationError, setReservationError] = useState<string | null>(null);
  const [reservationSuccess, setReservationSuccess] = useState(false);

  const { data: listing, isLoading, error } = useToolDetails(id);

  // State for reviews section
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [reviewsError, setReviewsError] = useState<string | null>(null);
  const [showReviewsSection, setShowReviewsSection] = useState(false);
  const [currentReviewPage, setCurrentReviewPage] = useState(1);
  const [totalReviewPages, setTotalReviewPages] = useState(1);
  const [hasFetchedInitialReviews, setHasFetchedInitialReviews] = useState(false);


  // Helper function to format rating for display (e.g., "4.5" or "New")
  const displayRating = (ratingInput: any): string => {
    const rating = Number(ratingInput);
    if (isNaN(rating) || rating <= 0) {
      return 'New';
    }
    return rating.toFixed(1);
  };

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [listing?.id]);

  const fetchListingReviews = useCallback(async (listingId: number, page: number) => {
    setReviewsLoading(true);
    setReviewsError(null);
    try {
      const response = await getReviewsForListing(listingId, page);
      if (response.status === 'success' && response.data) {
        const paginatedData = response.data as LaravelPaginatedResponse<ReviewType>; // Type assertion
        setReviews(prevReviews => page === 1 ? paginatedData.data : [...prevReviews, ...paginatedData.data]);
        setCurrentReviewPage(paginatedData.current_page);
        setTotalReviewPages(paginatedData.last_page);
        if (page === 1) setHasFetchedInitialReviews(true);
      } else {
        setReviewsError(response.message || 'Failed to load reviews.');
        if (page === 1) setReviews([]); // Clear reviews on initial fetch error
      }
    } catch (err) {
      console.error("Error fetching reviews:", err);
      setReviewsError('An error occurred while fetching reviews.');
      if (page === 1) setReviews([]);
    } finally {
      setReviewsLoading(false);
    }
  }, []);

  const handleToggleReviewsSection = () => {
    const newShowState = !showReviewsSection;
    setShowReviewsSection(newShowState);
    if (newShowState && listing && !hasFetchedInitialReviews && (listing.review_count || 0) > 0) {
      fetchListingReviews(listing.id, 1);
    }
  };
  
  const handleLoadMoreReviews = () => {
    if (listing && currentReviewPage < totalReviewPages && !reviewsLoading) {
      fetchListingReviews(listing.id, currentReviewPage + 1);
    }
  };


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
      // Consider redirecting to login page or showing a modal
      // navigate('/login'); 
      return;
    }

    if (!listing || !startDate || !endDate) {
      setReservationError("Please select a start and end date.");
      return;
    }
    if (endDate < startDate) {
      setReservationError("End date cannot be before start date.");
      return;
    }

    setIsSubmitting(true);
    setReservationError(null);
    setReservationSuccess(false);

    try {
      const formattedStartDate = startDate.toISOString().split('T')[0];
      const formattedEndDate = endDate.toISOString().split('T')[0];

      const response = await createReservation(
        listing.id,
        formattedStartDate,
        formattedEndDate,
        false // Set delivery_option to false or make it configurable
      );

      if (response.status === 'success') {
        setReservationSuccess(true);
      } else {
        setReservationError(response.message || 'Failed to create reservation. Please try again.');
      }
    } catch (err: any) {
      console.error('Error creating reservation:', err);
      setReservationError(err?.response?.data?.message || err?.message || 'An unexpected error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateRentalCost = () => {
    if (!listing || !listing.price_per_day || !startDate || !endDate) return 0;
    if (endDate < startDate) return 0; // Prevent negative days

    const price = parseFloat(listing.price_per_day as any); // Ensure price_per_day is a number
    if (isNaN(price)) {
      console.error("Invalid price_per_day for calculation:", listing.price_per_day);
      return 0; 
    }

    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    return days * price;
  }

  const rentalCost = calculateRentalCost();
  const serviceFee = rentalCost * 0.1; // Assuming 10% service fee
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
          <AlertTriangle className="inline-block h-5 w-5 mr-2" />
          {error instanceof Error ? error.message : "Failed to load tool details. Please try again."}
        </div>
        <div className="mt-4">
          <Link
            to="/search" // Or your relevant search/listing page
            className="inline-flex items-center text-green-600 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300"
          >
            <ChevronLeft className="h-5 w-5 mr-1" />
            Back to search results
          </Link>
        </div>
      </div>
    );
  }

  const getImageUrl = (imageUrl: string) => {
    if (!imageUrl) return '/placeholder.jpg';
    if (imageUrl.startsWith('http')) return imageUrl;
    return `http://localhost:8000${imageUrl}`;
  };

  const getDefaultImage = () => "/placeholder.svg?height=600&width=600";

  const getCurrentImageUrl = () => {
    if (!listing.images || listing.images.length === 0) return '/placeholder.jpg';
    return getImageUrl(listing.images[currentImageIndex]?.url);
  };
  
  const getThumbnailUrl = (url: string | undefined) => {
    if (!url) return getDefaultImage();
    if (!url.startsWith('http') && !url.startsWith('/')) {
        return `${process.env.REACT_APP_API_BASE_URL || ''}${url}`;
    }
    return url;
  }

  // Ensure price_per_day is valid for display, parse if it's a string
  const displayPricePerDay = listing.price_per_day != null ? parseFloat(listing.price_per_day as any) : NaN;


  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <Link
          to="/search" // Or your relevant search/listing page
          className="inline-flex items-center text-green-600 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300"
        >
          <ChevronLeft className="h-5 w-5 mr-1" />
          Back to search results
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Image Gallery */}
          <div className="relative rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
            <div className="aspect-w-4 aspect-h-3 relative"> {/* Adjust aspect ratio as needed */}
              <img
                src={getCurrentImageUrl()}
                alt={listing.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/placeholder.jpg';
                }}
              />
              {listing.images && listing.images.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-900 p-2 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-900 p-2 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                  </button>
                </>
              )}
              <div className="absolute top-2 right-2">
                <ListingLikeButton listingId={listing.id} />
              </div>
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
                      src={getImageUrl(image.url)}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/placeholder.jpg';
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Listing Info Section */}
          <div className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{listing.title}</h1>
              <div className="flex flex-wrap items-center mt-2 text-sm">
                <div className="flex items-center mr-3">
                  <Star className="h-5 w-5 text-yellow-400" />
                  <span className="ml-1 text-gray-700 dark:text-gray-300">
                    {displayRating(listing.avg_rating)}
                  </span>
                  <span className="ml-1 text-gray-500 dark:text-gray-400">({listing.review_count || 0} reviews)</span>
                </div>
                <div className="flex items-center mr-3 text-gray-500 dark:text-gray-400">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{listing.city?.name || 'Unknown location'}</span>
                </div>
                {listing.category && (
                  <div className="flex items-center text-gray-500 dark:text-gray-400">
                    {/* <Tag className="h-4 w-4 mr-1" /> You might need a Tag icon or use text */}
                    <span>{listing.category.name}</span>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Description</h2>
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{listing.description}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm">
                <div className="flex"><strong className="font-medium text-gray-900 dark:text-white w-28">Price:</strong> <span className="text-gray-700 dark:text-gray-300">${!isNaN(displayPricePerDay) ? displayPricePerDay.toFixed(2) : 'N/A'} / day</span></div>
                <div className="flex"><strong className="font-medium text-gray-900 dark:text-white w-28">Category:</strong> <span className="text-gray-700 dark:text-gray-300">{listing.category?.name || 'Uncategorized'}</span></div>
                <div className="flex"><strong className="font-medium text-gray-900 dark:text-white w-28">Location:</strong> <span className="text-gray-700 dark:text-gray-300">{listing.city?.name || 'Unknown'}</span></div>
                <div className="flex"><strong className="font-medium text-gray-900 dark:text-white w-28">Status:</strong> <span className="text-gray-700 dark:text-gray-300 capitalize">{listing.status || 'Active'}</span></div>
                <div className="flex"><strong className="font-medium text-gray-900 dark:text-white w-28">Delivery:</strong> <span className="text-gray-700 dark:text-gray-300">{listing.delivery_option ? 'Available' : 'Pickup only'}</span></div>
              </div>
            </div>

            {Array.isArray(listing.features) && listing.features.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Features</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  {listing.features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Reviews Section - Enhanced */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Reviews ({listing.review_count || 0})
                </h2>
                {(listing.review_count || 0) > 0 && (
                  <button 
                    onClick={handleToggleReviewsSection} 
                    className="inline-flex items-center text-sm text-green-600 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300 font-medium"
                  >
                    {showReviewsSection ? 'Hide Reviews' : 'View All Reviews'}
                    {showReviewsSection ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />}
                  </button>
                )}
              </div>

              {(listing.review_count || 0) > 0 ? (
                <>
                  <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm">
                    Average rating: {displayRating(listing.avg_rating)}
                  </p>
                  {showReviewsSection && (
                    <div className="mt-4 space-y-4">
                      {reviewsLoading && reviews.length === 0 && (
                        <div className="flex justify-center py-4"><LoadingSpinner /></div>
                      )}
                      {reviewsError && (
                        <div className="p-3 text-sm text-red-700 bg-red-100 dark:bg-red-900/30 dark:text-red-400 rounded-lg flex items-center">
                          <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0" /> {reviewsError}
                        </div>
                      )}
                      {!reviewsLoading && !reviewsError && reviews.length === 0 && hasFetchedInitialReviews && (
                        <p className="text-gray-500 dark:text-gray-400 py-4 text-center">No detailed reviews available for this tool yet.</p>
                      )}
                      {reviews.map(review => (
                        <ReviewItem key={review.id} review={review} />
                      ))}
                      {!reviewsLoading && currentReviewPage < totalReviewPages && (
                        <div className="mt-6 text-center">
                          <button 
                            onClick={handleLoadMoreReviews} 
                            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            disabled={reviewsLoading}
                          >
                            Load More Reviews
                          </button>
                        </div>
                      )}
                       {reviewsLoading && reviews.length > 0 && ( // Show spinner at bottom when loading more
                        <div className="flex justify-center py-4"><LoadingSpinner /></div>
                      )}
                    </div>
                  )}
                </>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-sm">No reviews yet for this tool.</p>
              )}
            </div>


            {Array.isArray(listing.availabilities) && listing.availabilities.length > 0 && (
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Available Dates</h3>
                <div className="space-y-2 text-sm">
                  {listing.availabilities.map((availability: { start_date: string | number | Date; end_date: string | number | Date }, index: Key | null | undefined) => (
                    <div key={index} className="flex items-center text-gray-700 dark:text-gray-300">
                      <Calendar className="h-5 w-5 mr-2 text-green-600 dark:text-green-500 flex-shrink-0" />
                      <span>
                        From {new Date(availability.start_date).toLocaleDateString()} to {new Date(availability.end_date).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Booking Widget Column */}
        <div className="space-y-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700 sticky top-24"> {/* Adjusted sticky top */}
            <div className="flex justify-between items-center mb-4">
              <div>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">${!isNaN(displayPricePerDay) ? displayPricePerDay.toFixed(2) : 'N/A'}</span>
                <span className="text-gray-500 dark:text-gray-400"> / day</span>
              </div>
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-400" />
                <span className="ml-1 text-gray-700 dark:text-gray-300">
                  {displayRating(listing.avg_rating)}
                </span>
                <span className="ml-1 text-gray-500 dark:text-gray-400">({listing.review_count || 0})</span>
              </div>
            </div>

            <div className="border border-gray-200 dark:border-gray-700 rounded-lg mb-4">
              <div className="flex">
                <div className="w-1/2 p-3 border-r border-gray-200 dark:border-gray-700">
                  <label htmlFor="start-date" className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wider">Start Date</label>
                  <input
                    id="start-date"
                    type="date"
                    className="w-full bg-transparent text-gray-900 dark:text-white focus:outline-none text-sm p-0"
                    onChange={(e) => setStartDate(e.target.value ? new Date(e.target.value) : null)}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div className="w-1/2 p-3">
                  <label htmlFor="end-date" className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wider">End Date</label>
                  <input
                    id="end-date"
                    type="date"
                    className="w-full bg-transparent text-gray-900 dark:text-white focus:outline-none text-sm p-0"
                    onChange={(e) => setEndDate(e.target.value ? new Date(e.target.value) : null)}
                    min={startDate ? new Date(new Date(startDate).setDate(startDate.getDate())).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]} // Allow same day for end date initially
                    disabled={!startDate}
                  />
                </div>
              </div>
            </div>

            {startDate && endDate && endDate >= startDate && (
              <div className="space-y-2 mb-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-700 dark:text-gray-300">
                    ${!isNaN(displayPricePerDay) ? displayPricePerDay.toFixed(2) : 'N/A'} x {Math.max(1, Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) +1 )} days
                  </span>
                  <span className="text-gray-700 dark:text-gray-300">${rentalCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700 dark:text-gray-300">Platform fee (10%)</span>
                  <span className="text-gray-700 dark:text-gray-300">${serviceFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
                  <span className="text-gray-900 dark:text-white">Total</span>
                  <span className="text-gray-900 dark:text-white">${totalCost.toFixed(2)}</span>
                </div>
              </div>
            )}

            {reservationSuccess ? (
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-green-800 dark:text-green-300 mb-4">
                <div className="flex items-center">
                  <CheckCircle size={20} className="mr-2 flex-shrink-0 text-green-600 dark:text-green-500" />
                  <p className="text-sm">Reservation requested successfully! The owner will review your request.</p>
                </div>
                <div className="mt-4">
                  <Link
                    to="/dashboard/reservations" // Or your relevant reservations page
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-2.5 px-4 rounded-lg font-medium text-center block text-sm"
                  >
                    View My Reservations
                  </Link>
                </div>
              </div>
            ) : (
              <>
                {reservationError && (
                  <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg text-red-600 dark:text-red-400 mb-4 text-sm flex items-center">
                    <AlertTriangle size={18} className="mr-2 flex-shrink-0" />
                    {reservationError}
                  </div>
                )}
                <button
                  onClick={handleRentRequest}
                  disabled={!startDate || !endDate || endDate < startDate || isSubmitting || isNaN(displayPricePerDay)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-2.5 px-4 rounded-lg font-medium disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-150 text-sm"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <LoadingSpinner size="small" color="white" />
                      <span className="ml-2">Processing...</span>
                    </div>
                  ) : (
                    "Request to Rent"
                  )}
                </button>
              </>
            )}
            <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-3">You won't be charged yet</p>
          </div>

          {listing.partner && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <img
                  src={listing.partner.avatar_url || getDefaultImage()}
                  alt={listing.partner.name || listing.partner.username}
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                  onError={(e) => (e.currentTarget.src = getDefaultImage())}
                />
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    Owned by {listing.partner.name || listing.partner.username}
                  </h3>
                  {listing.partner.member_since && (
                     <p className="text-sm text-gray-500 dark:text-gray-400">
                       Member since {new Date(listing.partner.member_since).toLocaleDateString()}
                     </p>
                  )}
                </div>
              </div>

              <div className="space-y-2 mb-4 text-sm">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 mr-2 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {displayRating(listing.partner.avg_rating_as_partner)}
                    {typeof listing.partner.review_count_as_partner !== 'undefined' &&
                      ` · ${listing.partner.review_count_as_partner} reviews`}
                  </span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Usually responds quickly {/* Placeholder */}
                  </span>
                </div>
                {listing.partner.response_rate != null && ( // Check for null or undefined
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2 flex-shrink-0" /> {/* Using Calendar as a generic icon */}
                    <span className="text-gray-700 dark:text-gray-300">
                      {listing.partner.response_rate}% response rate
                    </span>
                  </div>
                )}
              </div>

              <Link
                to={`/profile/${listing.partner.id}`}
                className="block w-full text-center border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 text-sm font-medium"
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