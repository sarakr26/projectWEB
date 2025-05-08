<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\Listing;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class ReviewController extends Controller
{
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

            // Update listing's average rating and review count
            $listing = $review->listing;
            $listing->update([
                'avg_rating' => Review::where('listing_id', $listing->id)
                    ->where('is_visible', true)
                    ->avg('rating') ?? 0,
                'review_count' => Review::where('listing_id', $listing->id)
                    ->where('is_visible', true)
                    ->count()
            ]);

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

    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'listing_id' => 'required|exists:listings,id',
                'rating' => 'required|integer|between:1,5',
                'comment' => 'nullable|string|max:1000',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            // Get the listing
            $listing = Listing::findOrFail($request->listing_id);

            DB::beginTransaction();

            // Create the review
            $review = Review::create([
                'rating' => $request->rating,
                'comment' => $request->comment,
                'is_visible' => false, // Set to false by default as requested
                'type' => 'forObject',
                'reviewer_id' => $request->user()->id,
                'reviewee_id' => $listing->partner_id,
                'listing_id' => $listing->id,
                'reservation_id' => null
            ]);

            // Update listing's average rating and review count
            $listing->update([
                'avg_rating' => Review::where('listing_id', $listing->id)
                    ->where('is_visible', true)
                    ->avg('rating') ?? 0,
                'review_count' => Review::where('listing_id', $listing->id)
                    ->where('is_visible', true)
                    ->count()
            ]);

            DB::commit();

            return response()->json([
                'status' => 'success',
                'message' => 'Review created successfully and pending approval',
                'data' => $review
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to create review',
                'error' => $e->getMessage()
            ], 500);
        }
    }
} 