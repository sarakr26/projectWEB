import api from './api';

export interface ReviewSubmission {
  rating: number;
  comment: string;
  reservation_id: number;
  type: 'forObject' | 'forClient' | 'forPartner';
  listing_id?: number;
  reviewee_id?: number;
}

export interface Review {
  id: number;
  rating: number;
  comment: string;
  type: 'forObject' | 'forClient' | 'forPartner';
  is_visible: boolean;
  created_at: string;
  reviewer_id: number;
  reviewee_id?: number;
  reservation_id: number;
  listing_id?: number;
  reviewer?: {
    id: number;
    name: string;
    avatar_url?: string;
  };
  listing?: { // Optional, if backend includes it
    id: number;
    title: string;
  };
  reviewee?: { // Optional, if backend includes it
    id: number;
    name: string;
    avatar_url?: string;
  };
}

export interface ApiResponse<T> {
  status: string;
  message?: string;
  data?: T;
}

// Interface for Laravel's paginated response structure
export interface LaravelPaginatedResponse<T> {
  current_page: number;
  data: T[];
  first_page_url: string | null;
  from: number | null;
  last_page: number;
  last_page_url: string | null;
  links: Array<{ url: string | null; label: string; active: boolean }>;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number | null;
  total: number;
}

export async function submitReview(reviewData: ReviewSubmission): Promise<ApiResponse<Review>> {
  try {
    const response = await api.post<ApiResponse<Review>>('/reviews', reviewData);
    return response.data;
  } catch (error: any) {
    console.error('Error submitting review:', error);
    return {
      status: 'error',
      message: error.response?.data?.message || 'Failed to submit review'
    };
  }
}

export async function getReviewsForReservation(reservationId: number): Promise<ApiResponse<Review[]>> {
  try {
    // Note: If this endpoint also paginates, its return type and call need adjustment.
    const response = await api.get<ApiResponse<Review[]>>(`/reviews`, {
      params: { reservation_id: reservationId }
    });
    return response.data;
  } catch (error: any) {
    console.error('Error fetching reviews for reservation:', error);
    return {
      status: 'error',
      message: error.response?.data?.message || 'Failed to fetch reviews for reservation'
    };
  }
}

// New function to get reviews for a specific listing
export async function getReviewsForListing(
  listingId: number, 
  page: number = 1, 
  perPage: number = 10
): Promise<ApiResponse<LaravelPaginatedResponse<Review>>> {
  try {
    const response = await api.get<ApiResponse<LaravelPaginatedResponse<Review>>>(`/reviews`, {
      params: { 
        listing_id: listingId,
        page: page,
        per_page: perPage
      }
    });
    return response.data;
  } catch (error: any) {
    console.error('Error fetching listing reviews:', error);
    if (error.response && error.response.data) {
      return error.response.data; // Return API's error response if available
    }
    return {
      status: 'error',
      message: 'An unexpected error occurred while fetching listing reviews.',
      // Ensure the 'data' field is undefined or structured as expected by consumers on error
      data: undefined 
    };
  }
}

export async function checkPendingReviews(reservationId: number): Promise<ApiResponse<{
  pendingReviews: {
    forListing: boolean;
    forPartner: boolean;
    forClient: boolean;
  }
}>> {
  try {
    const response = await api.get<ApiResponse<{
      pendingReviews: {
        forListing: boolean;
        forPartner: boolean;
        forClient: boolean;
      }
    }>>(`/reviews/pending/${reservationId}`);
    return response.data;
  } catch (error: any) {
    console.error('Error checking pending reviews:', error);
    return {
      status: 'error',
      message: error.response?.data?.message || 'Failed to check pending reviews'
    };
  }
}