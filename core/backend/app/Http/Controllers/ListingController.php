<?php

namespace App\Http\Controllers;

use App\Models\Listing;
use Illuminate\Http\Request;

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
} 