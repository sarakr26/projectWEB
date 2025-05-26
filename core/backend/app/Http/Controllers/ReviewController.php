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
use Illuminate\Support\Facades\Log; // Added for logging

class ReviewController extends Controller
{
    /**
     * List reviews with optional filters.
     * Specifically handles fetching reviews for a listing (public view)
     * and other contexts like fetching reviews for a reservation.
     */
    public function index(Request $request)
    {
        try {
            $query = Review::with(['reviewer' => function ($query) {
                $query->select('id', 'name', 'avatar_url'); // Select only necessary reviewer fields
            }]);

            $isPublicListingView = false;

            // Filter by listing_id for public tool details page
            if ($request->has('listing_id')) {
                $query->where('listing_id', $request->listing_id);
                $query->where('type', 'forObject'); // Only reviews for the listing object itself
                $query->where('is_visible', true);   // Only publicly visible reviews
                $isPublicListingView = true;
            }

            // Filter by reservation_id (e.g., for dashboard or specific contexts)
            // This should not override listing_id filter if both are somehow passed for public view.
            if ($request->has('reservation_id') && !$isPublicListingView) {
                $query->where('reservation_id', $request->reservation_id);
                // For reservation-specific reviews, you might want to see all related reviews.
                // Add other filters like type if needed for this context.
            }
            
            // Filter by reviewer_id (can be combined with other filters)
            if ($request->has('reviewer_id')) {
                $query->where('reviewer_id', $request->reviewer_id);
            }

            // Filter by reviewee_id (can be combined with other filters)
            if ($request->has('reviewee_id')) {
                $query->where('reviewee_id', $request->reviewee_id);
            }
            
            // Filter by type (if not already set by listing_id context for public view)
            if ($request->has('type') && !$isPublicListingView) {
                $query->where('type', $request->type);
            }

            // Filter by rating if provided
            if ($request->has('rating')) {
                $query->where('rating', $request->rating);
            }

            // Sort by created_at in descending order (latest reviews first)
            $reviews = $query->orderBy('created_at', 'desc')
                ->paginate($request->get('per_page', 10)); // Default to 10 per page, allow override

            return response()->json([
                'status' => 'success',
                'data' => $reviews // This will be a Laravel paginator object
            ]);

        } catch (\Exception $e) {
            Log::error('Failed to fetch reviews: ' . $e->getMessage() . ' Stack: ' . $e->getTraceAsString());
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to fetch reviews.',
                // 'error_details' => $e->getMessage() // Optionally include for dev, remove for prod
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

            // Basic visibility check, can be enhanced based on roles
            if (!$review->is_visible) {
                 // Allow reviewer to see their own non-visible review
                if (!auth()->check() || (auth()->check() && $review->reviewer_id !== auth()->id())) {
                     return response()->json([
                        'status' => 'error',
                        'message' => 'Review not found or not visible.'
                    ], 404);
                }
            }

            return response()->json([
                'status' => 'success',
                'data' => $review
            ]);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Review not found.'
            ], 404);
        } catch (\Exception $e) {
            Log::error('Failed to fetch review ' . $id . ': ' . $e->getMessage());
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to fetch review.',
                // 'error_details' => $e->getMessage()
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
                    'message' => 'Unauthorized to update this review.'
                ], 403);
            }

            $validator = Validator::make($request->all(), [
                'rating' => 'sometimes|required|integer|between:1,5',
                'comment' => 'sometimes|nullable|string|max:1000',
                'is_visible' => 'sometimes|boolean', // Allow updating visibility if needed
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Validation failed.',
                    'errors' => $validator->errors()
                ], 422);
            }

            DB::beginTransaction();

            $review->update($validator->validated()); // Use validated data

            // Recalculate ratings if rating or visibility changed
            if ($request->has('rating') || $request->has('is_visible')) {
                if ($review->type === 'forObject' && $review->listing_id) {
                    $listing = Listing::find($review->listing_id);
                    if ($listing) $this->updateListingRatings($listing);
                } elseif (($review->type === 'forPartner' || $review->type === 'forClient') && $review->reviewee_id) {
                    $reviewee = User::find($review->reviewee_id);
                    if ($reviewee) $this->updateUserRatings($reviewee, $review->type);
                }
            }

            DB::commit();

            return response()->json([
                'status' => 'success',
                'message' => 'Review updated successfully.',
                'data' => $review->fresh(['reviewer', 'reviewee', 'listing']) // Return fresh data
            ]);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            DB::rollBack();
            return response()->json([
                'status' => 'error',
                'message' => 'Review not found.'
            ], 404);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Failed to update review ' . $id . ': ' . $e->getMessage());
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to update review.',
                // 'error_details' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created review
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string|max:1000',
            'reservation_id' => 'required|exists:reservations,id',
            'type' => 'required|in:forObject,forClient,forPartner',
            'listing_id' => 'required_if:type,forObject|exists:listings,id',
            'reviewee_id' => 'required_if:type,forClient,forPartner|exists:users,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed.',
                'errors' => $validator->errors()
            ], 422);
        }
        
        $validated = $validator->validated();
        $user = auth()->user();

        try {
            $reservation = Reservation::with(['listing.partner'])->findOrFail($validated['reservation_id']);
            
            // Validate that reservation is completed
            if ($reservation->status !== 'completed') {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Cannot review an incomplete reservation.'
                ], 400);
            }
            
            // Validate that the user is part of this reservation
            $isClient = $user->id === $reservation->client_id;
            $isPartner = $user->id === $reservation->listing->partner_id; // Assuming partner_id is on listing

            if (!$isClient && !$isPartner) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'You are not authorized to review this reservation.'
                ], 403);
            }
            
            // Validate review type against user role in reservation
            if ($validated['type'] === 'forClient' && !$isPartner) { // Partner reviews client
                return response()->json([
                    'status' => 'error',
                    'message' => 'Only the partner can review the client.'
                ], 403);
            }
            
            if (($validated['type'] === 'forPartner' || $validated['type'] === 'forObject') && !$isClient) { // Client reviews partner or listing
                return response()->json([
                    'status' => 'error',
                    'message' => 'Only the client can review the partner or the listing.'
                ], 403);
            }

            // Ensure reviewee_id matches the other party in the reservation
            if ($validated['type'] === 'forClient' && $validated['reviewee_id'] != $reservation->client_id) {
                return response()->json(['status' => 'error', 'message' => 'Reviewee ID does not match the client of the reservation.'], 400);
            }
            if ($validated['type'] === 'forPartner' && $validated['reviewee_id'] != $reservation->listing->partner_id) {
                return response()->json(['status' => 'error', 'message' => 'Reviewee ID does not match the partner of the reservation.'], 400);
            }
            if ($validated['type'] === 'forObject' && $validated['listing_id'] != $reservation->listing_id) {
                 return response()->json(['status' => 'error', 'message' => 'Listing ID does not match the listing of the reservation.'], 400);
            }
            
            // Check for existing review of the same type by this user for this reservation
            $existingReview = Review::where('reservation_id', $validated['reservation_id'])
                ->where('reviewer_id', $user->id)
                ->where('type', $validated['type'])
                // Add specific target if applicable (e.g. for a specific listing or reviewee)
                ->when($validated['type'] === 'forObject', function ($q) use ($validated) {
                    return $q->where('listing_id', $validated['listing_id']);
                })
                ->when(in_array($validated['type'], ['forClient', 'forPartner']), function ($q) use ($validated) {
                    return $q->where('reviewee_id', $validated['reviewee_id']);
                })
                ->first();
                
            if ($existingReview) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'You have already submitted this type of review for this reservation.'
                ], 409); // 409 Conflict is more appropriate
            }
            
            DB::beginTransaction();
            
            $review = new Review();
            $review->fill($validated); // Mass assign validated data
            $review->reviewer_id = $user->id;
            $review->is_visible = true; // Default to visible, can be changed by admin/user later
            $review->save();
            
            // Update aggregate ratings
            if ($review->type === 'forObject') {
                $listing = Listing::find($review->listing_id); // Already validated existence
                if ($listing) $this->updateListingRatings($listing);
            } elseif ($review->type === 'forClient' || $review->type === 'forPartner') {
                $reviewee = User::find($review->reviewee_id); // Already validated existence
                if ($reviewee) $this->updateUserRatings($reviewee, $review->type);
            }
            
            DB::commit();
            
            return response()->json([
                'status' => 'success',
                'message' => 'Review submitted successfully.',
                'data' => $review->load(['reviewer', 'reviewee', 'listing'])
            ], 201); // 201 Created
            
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            DB::rollBack();
            return response()->json(['status' => 'error', 'message' => 'Reservation not found.'], 404);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Failed to submit review: ' . $e->getMessage() . ' Stack: ' . $e->getTraceAsString());
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to submit review.',
                // 'error_details' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Check pending reviews for a reservation for the authenticated user.
     */
    public function checkPendingReviews($reservationId)
    {
        try {
            $user = auth()->user();
            if (!$user) {
                return response()->json(['status' => 'error', 'message' => 'Unauthenticated.'], 401);
            }

            $reservation = Reservation::with('listing')->findOrFail($reservationId);
            
            if ($reservation->status !== 'completed') {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Reservation is not completed yet.'
                ], 400);
            }
            
            $isClient = $user->id === $reservation->client_id;
            $isPartner = $user->id === $reservation->listing->partner_id;

            if (!$isClient && !$isPartner) {
                 return response()->json(['status' => 'error', 'message' => 'User not part of this reservation.'], 403);
            }

            $existingReviewsByUser = Review::where('reservation_id', $reservationId)
                                        ->where('reviewer_id', $user->id)
                                        ->get()->keyBy('type');
            
            $pendingReviews = [
                'forListing' => $isClient ? !$existingReviewsByUser->has('forObject') : false,
                'forPartner' => $isClient ? !$existingReviewsByUser->has('forPartner') : false,
                'forClient'  => $isPartner ? !$existingReviewsByUser->has('forClient') : false,
            ];
            
            return response()->json([
                'status' => 'success',
                'data' => [
                    'pendingReviews' => $pendingReviews,
                    'reservation_id' => $reservation->id,
                    'listing_id' => $reservation->listing_id,
                    'client_id' => $reservation->client_id,
                    'partner_id' => $reservation->listing->partner_id,
                ]
            ]);
            
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['status' => 'error', 'message' => 'Reservation not found.'], 404);
        } catch (\Exception $e) {
            Log::error('Failed to check pending reviews for reservation ' . $reservationId . ': ' . $e->getMessage());
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to check pending reviews.',
                // 'error_details' => $e->getMessage()
            ], 500);
        }
    }
    
    /**
     * Helper method to update listing ratings
     */
    private function updateListingRatings(Listing $listing)
    {
        $stats = Review::where('listing_id', $listing->id)
            ->where('type', 'forObject')
            ->where('is_visible', true)
            ->selectRaw('AVG(rating) as avg_rating, COUNT(id) as review_count')
            ->first();
            
        $listing->avg_rating = $stats->avg_rating ?? 0;
        $listing->review_count = $stats->review_count ?? 0;
        $listing->save();
    }
    
    /**
     * Helper method to update user ratings
     */
    private function updateUserRatings(User $user, $reviewType)
    {
        $stats = Review::where('reviewee_id', $user->id)
            ->where('type', $reviewType) // $reviewType will be 'forClient' or 'forPartner'
            ->where('is_visible', true)
            ->selectRaw('AVG(rating) as avg_rating, COUNT(id) as review_count')
            ->first();

        if ($reviewType === 'forClient') {
            $user->avg_rating_as_client = $stats->avg_rating ?? 0;
            $user->review_count_as_client = $stats->review_count ?? 0;
        } elseif ($reviewType === 'forPartner') {
            $user->avg_rating_as_partner = $stats->avg_rating ?? 0;
            $user->review_count_as_partner = $stats->review_count ?? 0;
        }
        
        $user->save();
    }

    /**
     * Delete a review.
     * Only the reviewer or an admin should be able to delete.
     */
    public function destroy($id)
    {
        try {
            $review = Review::findOrFail($id);
            $user = auth()->user();

            // Authorization: User must be the reviewer or an admin (implement admin check if needed)
            // For now, only reviewer can delete.
            if ($review->reviewer_id !== $user->id /* && !$user->isAdmin() */) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Unauthorized to delete this review.'
                ], 403);
            }

            DB::beginTransaction();
            
            $listingToUpdate = $review->type === 'forObject' ? $review->listing : null;
            $userToUpdate = in_array($review->type, ['forClient', 'forPartner']) ? $review->reviewee : null;
            $typeForUserUpdate = $review->type;

            $review->delete();

            // Recalculate ratings
            if ($listingToUpdate) {
                $this->updateListingRatings($listingToUpdate);
            }
            if ($userToUpdate) {
                $this->updateUserRatings($userToUpdate, $typeForUserUpdate);
            }

            DB::commit();

            return response()->json([
                'status' => 'success',
                'message' => 'Review deleted successfully.'
            ]);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            DB::rollBack();
            return response()->json([
                'status' => 'error',
                'message' => 'Review not found.'
            ], 404);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Failed to delete review ' . $id . ': ' . $e->getMessage());
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to delete review.',
                // 'error_details' => $e->getMessage()
            ], 500);
        }
    }
}