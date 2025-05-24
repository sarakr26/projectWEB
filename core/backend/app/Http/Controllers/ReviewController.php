<?php


namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\User;
use App\Models\Listing;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ReviewController extends Controller
{
    /**
     * List reviews with optional filters
     */
    public function index(Request $request)
    {
        try {
            $query = Review::with(['reviewer', 'reviewee', 'listing'])
                ->where('is_visible', true);

            // Filter by listing if provided
            if ($request->has('listing_id')) {
                $query->where('listing_id', $request->listing_id);
            }

            // Filter by reviewer if provided
            if ($request->has('reviewer_id')) {
                $query->where('reviewer_id', $request->reviewer_id);
            }

            // Filter by reviewee if provided
            if ($request->has('reviewee_id')) {
                $query->where('reviewee_id', $request->reviewee_id);
            }

            // Filter by rating if provided
            if ($request->has('rating')) {
                $query->where('rating', $request->rating);
            }

            // Filter by reservation if provided
            if ($request->has('reservation_id')) {
                $query->where('reservation_id', $request->reservation_id);
            }

            // Sort by created_at in descending order
            $reviews = $query->orderBy('created_at', 'desc')
                ->paginate(10);

            return response()->json([
                'status' => 'success',
                'data' => $reviews
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to fetch reviews',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Show a specific review
     */
    public function show($id)
    {
        try {
            $review = Review::with(['reviewer', 'reviewee', 'listing'])
                ->findOrFail($id);

            // Only show visible reviews to non-owners
            if (!$review->is_visible && $review->reviewer_id !== auth()->id()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Review not found'
                ], 404);
            }

            return response()->json([
                'status' => 'success',
                'data' => $review
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to fetch review',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update an existing review
     */
    public function update(Request $request, $id)
    {
        try {
            $review = Review::findOrFail($id);

            // Check if user is authorized to update the review
            if ($review->reviewer_id !== auth()->id()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Unauthorized to update this review'
                ], 403);
            }

            $validator = Validator::make($request->all(), [
                'rating' => 'sometimes|required|integer|between:1,5',
                'comment' => 'sometimes|nullable|string|max:1000',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            DB::beginTransaction();

            // Update the review
            $review->update($request->only(['rating', 'comment']));

            // Update appropriate ratings based on review type
            if ($review->type === 'forObject' && $review->listing) {
                $this->updateListingRatings($review->listing);
            } elseif (($review->type === 'forPartner' || $review->type === 'forClient') && $review->reviewee) {
                $this->updateUserRatings($review->reviewee, $review->type);
            }

            DB::commit();

            return response()->json([
                'status' => 'success',
                'message' => 'Review updated successfully',
                'data' => $review
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to update review',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created review
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'rating' => 'required|integer|min:1|max:5',
                'comment' => 'nullable|string|max:1000',
                'reservation_id' => 'required|exists:reservations,id',
                'type' => 'required|in:forObject,forClient,forPartner',
                'listing_id' => 'required_if:type,forObject|exists:listings,id',
                'reviewee_id' => 'required_if:type,forClient,forPartner|exists:users,id',
            ]);
            
            $user = auth()->user();
            $reservation = Reservation::findOrFail($validated['reservation_id']);
            
            // Validate that reservation is completed
            if ($reservation->status !== 'completed') {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Cannot review an incomplete reservation'
                ], 400);
            }
            
            // Validate that the user is part of this reservation
            if ($user->id !== $reservation->client_id && $user->id !== $reservation->partner_id) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'You are not authorized to review this reservation'
                ], 403);
            }
            
            // Validate review type against user role in reservation
            if ($validated['type'] === 'forClient' && $user->id !== $reservation->partner_id) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Only the partner can review the client'
                ], 403);
            }
            
            if (($validated['type'] === 'forPartner' || $validated['type'] === 'forObject') && $user->id !== $reservation->client_id) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Only the client can review the partner or the listing'
                ], 403);
            }
            
            // Check for existing review of the same type by this user
            $existingReview = Review::where('reservation_id', $validated['reservation_id'])
                ->where('reviewer_id', $user->id)
                ->where('type', $validated['type'])
                ->first();
                
            if ($existingReview) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'You have already submitted this type of review for this reservation'
                ], 400);
            }
            
            DB::beginTransaction();
            
            // Create the review
            $review = new Review();
            $review->rating = $validated['rating'];
            $review->comment = $validated['comment'];
            $review->reservation_id = $validated['reservation_id'];
            $review->type = $validated['type'];
            $review->is_visible = true;
            $review->reviewer_id = $user->id;
            
            if ($validated['type'] === 'forObject') {
                $review->listing_id = $validated['listing_id'];
                
                // Update listing average rating
                $listing = Listing::findOrFail($validated['listing_id']);
                $review->save();
                $this->updateListingRatings($listing);
                
            } elseif ($validated['type'] === 'forClient' || $validated['type'] === 'forPartner') {
                $review->reviewee_id = $validated['reviewee_id'];
                
                // Update user average rating
                $reviewee = User::findOrFail($validated['reviewee_id']);
                $review->save();
                $this->updateUserRatings($reviewee, $validated['type']);
            }
            
            DB::commit();
            
            return response()->json([
                'status' => 'success',
                'message' => 'Review submitted successfully',
                'data' => $review
            ]);
            
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to submit review',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Check pending reviews for a reservation
     */
    public function checkPendingReviews($reservationId)
    {
        try {
            $reservation = Reservation::findOrFail($reservationId);
            $user = auth()->user();
            
            // Check if reservation is completed
            if ($reservation->status !== 'completed') {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Reservation is not completed yet'
                ], 400);
            }
            
            // Check existing reviews
            $existingReviews = Review::where('reservation_id', $reservationId)->get();
            
            $pendingReviews = [
                'forListing' => true,
                'forPartner' => true,
                'forClient' => true
            ];
            
            foreach ($existingReviews as $review) {
                if ($review->type === 'forObject' && $review->reviewer_id === $user->id) {
                    $pendingReviews['forListing'] = false;
                }
                
                if ($review->type === 'forPartner' && $review->reviewer_id === $user->id) {
                    $pendingReviews['forPartner'] = false;
                }
                
                if ($review->type === 'forClient' && $review->reviewer_id === $user->id) {
                    $pendingReviews['forClient'] = false;
                }
            }
            
            // If user is partner, they can only review the client
            if ($user->id === $reservation->partner_id) {
                $pendingReviews['forListing'] = false;
                $pendingReviews['forPartner'] = false;
            }
            
            // If user is client, they can only review the listing and partner
            if ($user->id === $reservation->client_id) {
                $pendingReviews['forClient'] = false;
            }
            
            return response()->json([
                'status' => 'success',
                'data' => [
                    'pendingReviews' => $pendingReviews
                ]
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to check pending reviews',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    
    /**
     * Helper method to update listing ratings
     */
    private function updateListingRatings(Listing $listing)
    {
        $avgRating = Review::where('listing_id', $listing->id)
            ->where('type', 'forObject')
            ->where('is_visible', true)
            ->avg('rating') ?? 0;
            
        $reviewCount = Review::where('listing_id', $listing->id)
            ->where('type', 'forObject')
            ->where('is_visible', true)
            ->count();
            
        $listing->avg_rating = $avgRating;
        $listing->review_count = $reviewCount;
        $listing->save();
    }
    
    /**
     * Helper method to update user ratings
     */
    private function updateUserRatings(User $user, $reviewType)
    {
        if ($reviewType === 'forClient') {
            $avgRating = Review::where('reviewee_id', $user->id)
                ->where('type', 'forClient')
                ->where('is_visible', true)
                ->avg('rating') ?? 0;
                
            $reviewCount = Review::where('reviewee_id', $user->id)
                ->where('type', 'forClient')
                ->where('is_visible', true)
                ->count();
                
            $user->avg_rating_as_client = $avgRating;
            $user->review_count_as_client = $reviewCount;
            
        } elseif ($reviewType === 'forPartner') {
            $avgRating = Review::where('reviewee_id', $user->id)
                ->where('type', 'forPartner')
                ->where('is_visible', true)
                ->avg('rating') ?? 0;
                
            $reviewCount = Review::where('reviewee_id', $user->id)
                ->where('type', 'forPartner')
                ->where('is_visible', true)
                ->count();
                
            $user->avg_rating_as_partner = $avgRating;
            $user->review_count_as_partner = $reviewCount;
        }
        
        $user->save();
    }
}