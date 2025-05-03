<?php

namespace App\Http\Controllers;

use App\Models\Listing;
use App\Models\Availability;
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
        try {
            $validator = Validator::make($request->all(), [
                'title' => 'required|string|max:255',
                'description' => 'required|string',
                'price_per_day' => 'required|numeric|min:0',
                'category_id' => 'required|exists:categories,id',
                'city_id' => 'required|exists:cities,id',
                'delivery_option' => 'boolean',
                'start_date' => 'required|date|after_or_equal:today',
                'end_date' => 'required|date|after:start_date',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            DB::beginTransaction();

            $listing = Listing::create([
                'title' => $request->title,
                'description' => $request->description,
                'price_per_day' => $request->price_per_day,
                'category_id' => $request->category_id,
                'city_id' => $request->city_id,
                'partner_id' => $request->user()->id,
                'delivery_option' => $request->delivery_option ?? false,
                'status' => 'active',
            ]);

            // Create availability record
            Availability::create([
                'listing_id' => $listing->id,
                'start_date' => $request->start_date,
                'end_date' => $request->end_date,
            ]);

            DB::commit();

            return response()->json([
                'status' => 'success',
                'message' => 'Listing created successfully',
                'data' => $listing->load(['category', 'city', 'partner', 'availabilities'])
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to create listing',
                'error' => $e->getMessage()
            ], 500);
        }
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