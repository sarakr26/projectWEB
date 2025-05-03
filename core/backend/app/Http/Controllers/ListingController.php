<?php

namespace App\Http\Controllers;

use App\Models\Listing;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class ListingController extends Controller
{
    public function index(Request $request)
    {
        $query = Listing::with(['category', 'city', 'partner', 'images'])
            ->where('status', 'active');

        // Apply filters if provided
        if ($request->has('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        if ($request->has('city_id')) {
            $query->where('city_id', $request->city_id);
        }

        if ($request->has('min_price')) {
            $query->where('price_per_day', '>=', $request->min_price);
        }

        if ($request->has('max_price')) {
            $query->where('price_per_day', '<=', $request->max_price);
        }

        // Sort by premium first, then by creation date
        $listings = $query->orderBy('is_premium', 'desc')
            ->orderBy('created_at', 'desc')
            ->paginate(12);

        return response()->json([
            'status' => 'success',
            'data' => $listings
        ]);
    }

    public function show($id)
    {
        $listing = Listing::with(['category', 'city', 'partner', 'images'])
            ->where('status', 'active')
            ->findOrFail($id);

        return response()->json([
            'status' => 'success',
            'data' => $listing
        ]);
    }

    public function store(Request $request)
    {
        // Validate that the user is a partner
        if ($request->user()->role !== 'partner') {
            return response()->json([
                'status' => 'error',
                'message' => 'Only partners can create listings'
            ], 403);
        }

        // Validate the request data
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'category_id' => 'required|exists:categories,id',
            'city_id' => 'required|exists:cities,id',
            'price_per_day' => 'required|numeric|min:0',
            'is_premium' => 'boolean',
            'images' => 'array',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        // Create the listing
        $listing = Listing::create([
            'title' => $request->title,
            'description' => $request->description,
            'category_id' => $request->category_id,
            'city_id' => $request->city_id,
            'price_per_day' => $request->price_per_day,
            'is_premium' => $request->is_premium ?? false,
            'partner_id' => $request->user()->id,
            'status' => 'active'
        ]);

        // Handle image uploads if provided
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('listing_images', 'public');
                $listing->images()->create([
                    'url' => $path
                ]);
            }
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Listing created successfully',
            'data' => $listing->load(['category', 'city', 'partner', 'images'])
        ], 201);
    }

    public function search(Request $request)
    {
        try {
            $query = Listing::query()
                ->with(['category', 'city', 'partner'])
                ->where('status', 'active');

            // Filter by city
            if ($request->has('city_id')) {
                $query->where('city_id', $request->city_id);
            }

            // Filter by category
            if ($request->has('category_id')) {
                $query->where('category_id', $request->category_id);
            }

            // Filter by minimum rating
            if ($request->has('min_rating')) {
                $query->where('avg_rating', '>=', $request->min_rating);
            }

            // Filter by price range
            if ($request->has('min_price')) {
                $query->where('price_per_day', '>=', $request->min_price);
            }
            if ($request->has('max_price')) {
                $query->where('price_per_day', '<=', $request->max_price);
            }

            // Sort by
            $sortBy = $request->get('sort_by', 'created_at');
            $sortOrder = $request->get('sort_order', 'desc');
            $query->orderBy($sortBy, $sortOrder);

            $listings = $query->paginate(10);

            return response()->json([
                'status' => 'success',
                'message' => 'Listings retrieved successfully',
                'data' => $listings
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to search listings',
                'error' => $e->getMessage()
            ], 500);
        }
    }
} 