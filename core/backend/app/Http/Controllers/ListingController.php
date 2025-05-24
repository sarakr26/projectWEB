<?php


namespace App\Http\Controllers;

use App\Models\Listing;
use App\Models\Availability;
use App\Services\ImageService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class ListingController extends Controller
{
    protected $imageService;

    public function __construct(ImageService $imageService)
    {
        $this->imageService = $imageService;
    }

    public function index(Request $request)
    {
        $query = Listing::with(['category', 'city', 'partner', 'images'])
            ->where('status', 'active');

            if ($request->has('partner') && $request->partner === 'self') {
            // Make sure user is authenticated and a partner
            if (!$request->user() || $request->user()->role !== 'partner') {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Unauthorized or not a partner'
                ], 401);
            }
            
            $query->where('partner_id', $request->user()->id);
        }

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

        // Update priorities for all listings
        $listings = $query->get();
        foreach ($listings as $listing) {
            $listing->updatePriority();
        }

        // Sort by priority first, then by creation date
        $listings = $query->orderBy('priority', 'asc')
            ->orderBy('created_at', 'desc')
            ->paginate(12);

        return response()->json([
            'status' => 'success',
            'data' => $listings
        ]);
    }

    public function show($id)
    {
        $listing = Listing::with(['category', 'city', 'partner', 'images', 'availabilities'])
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
                'is_premium' => 'boolean',
                'premium_duration' => 'required_if:is_premium,true|in:1,2,3', // 1 = 1 month, 2 = 2 weeks, 3 = 1 week
                'images' => 'required|array|min:1|max:5',
                'images.*' => 'required|image|mimes:jpeg,png,jpg|max:2048', // max 2MB per image
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            DB::beginTransaction();

            // Get city coordinates
            $city = \App\Models\City::findOrFail($request->city_id);

            $listing = new Listing([
                'title' => $request->title,
                'description' => $request->description,
                'price_per_day' => $request->price_per_day,
                'category_id' => $request->category_id,
                'city_id' => $request->city_id,
                'partner_id' => $request->user()->id,
                'delivery_option' => $request->delivery_option ?? false,
                'status' => 'active',
                'priority' => 4, // Default priority
                'is_premium' => $request->boolean('is_premium', false),
                'latitude' => $city->latitude,
                'longitude' => $city->longitude,
            ]);
            $listing->updatePriority();

            if ($request->is_premium) {
                $listing->premium_start_date = now();
                
                switch ($request->premium_duration) {
                    case 1: // 1 month
                        $listing->premium_end_date = now()->addMonth();
                        $listing->priority = 1;
                        break;
                    case 2: // 2 weeks
                        $listing->premium_end_date = now()->addWeeks(2);
                        $listing->priority = 2;
                        break;
                    case 3: // 1 week
                        $listing->premium_end_date = now()->addWeek();
                        $listing->priority = 3;
                        break;
                }
                
                $listing->save();
            }

            // Create availability record
            Availability::create([
                'listing_id' => $listing->id,
                'start_date' => $request->start_date,
                'end_date' => $request->end_date,
            ]);

            // Handle image uploads
            foreach ($request->file('images') as $image) {
                $imageUrl = $this->imageService->uploadImage($image);
                $listing->images()->create([
                    'url' => $imageUrl
                ]);
            }

            DB::commit();

            return response()->json([
                'status' => 'success',
                'message' => 'Listing created successfully',
                'data' => $listing->load(['category', 'city', 'partner', 'availabilities', 'images'])
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
                ->with(['category', 'city', 'partner', 'images'])
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

            // Search by query string if provided - FIX: changed $request->query to $request->input('query')
            if ($request->has('query') && !empty($request->input('query'))) {
                $searchTerm = '%' . $request->input('query') . '%';
                $query->where(function($q) use ($searchTerm) {
                    $q->where('title', 'like', $searchTerm)
                      ->orWhere('description', 'like', $searchTerm);
                });
            }

            // Update priorities for all listings
            $allListings = $query->get();
            foreach ($allListings as $listing) {
                $listing->updatePriority();
            }

            // Determine sorting method
            if ($request->get('sort_by') === 'priority' || !$request->has('sort_by')) {
                // Priority sorting (default) - premium listings first
                $query->orderBy('priority', 'asc')
                      ->orderBy('created_at', 'desc');
            } else {
                // Sort by other fields if specified
                $sortBy = $request->get('sort_by', 'created_at');
                $sortOrder = $request->get('sort_order', 'desc');
                $query->orderBy($sortBy, $sortOrder);
            }

            $listings = $query->paginate(12);

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

    public function update(Request $request, $id)
    {
        try {
            $listing = Listing::findOrFail($id);

            // Check if user is authorized to update the listing
            if ($listing->partner_id !== $request->user()->id) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Unauthorized to update this listing'
                ], 403);
            }

            $validator = Validator::make($request->all(), [
                'title' => 'sometimes|required|string|max:255',
                'description' => 'sometimes|required|string',
                'price_per_day' => 'sometimes|required|numeric|min:0',
                'category_id' => 'sometimes|required|exists:categories,id',
                'city_id' => 'sometimes|required|exists:cities,id',
                'delivery_option' => 'sometimes|boolean',
                'is_premium' => 'sometimes|boolean',
                'premium_duration' => 'required_if:is_premium,true|in:1,2,3',
                'start_date' => 'sometimes|required|date|after_or_equal:today',
                'end_date' => 'sometimes|required|date|after:start_date',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            DB::beginTransaction();

            // Update basic listing information
            $listing->update($request->only([
                'title',
                'description',
                'price_per_day',
                'category_id',
                'city_id',
                'delivery_option',
                'is_premium'
            ]));

            // Handle premium status update
            if ($request->has('is_premium') && $request->is_premium) {
                $listing->premium_start_date = now();
                
                switch ($request->premium_duration) {
                    case 1: // 1 month
                        $listing->premium_end_date = now()->addMonth();
                        $listing->priority = 1;
                        break;
                    case 2: // 2 weeks
                        $listing->premium_end_date = now()->addWeeks(2);
                        $listing->priority = 2;
                        break;
                    case 3: // 1 week
                        $listing->premium_end_date = now()->addWeek();
                        $listing->priority = 3;
                        break;
                }
            } elseif ($request->has('is_premium') && !$request->is_premium) {
                $listing->premium_start_date = null;
                $listing->premium_end_date = null;
                $listing->priority = 4;
            }

            $listing->save();
            $listing->updatePriority();

            // Handle availability update if provided
            if ($request->has('start_date') && $request->has('end_date')) {
                // Delete existing availability records
                $listing->availabilities()->delete();

                // Create new availability record
                $listing->availabilities()->create([
                    'start_date' => $request->start_date,
                    'end_date' => $request->end_date,
                ]);
            }

            DB::commit();

            return response()->json([
                'status' => 'success',
                'message' => 'Listing updated successfully',
                'data' => $listing->load(['category', 'city', 'partner', 'availabilities'])
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to update listing',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function archive(Request $request, $id)
    {
        try {
            $listing = Listing::findOrFail($id);

            // Check if user is authorized to archive the listing
            if ($listing->partner_id !== $request->user()->id) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Unauthorized to archive this listing'
                ], 403);
            }

            $listing->status = 'archived';
            $listing->save();

            return response()->json([
                'status' => 'success',
                'message' => 'Listing archived successfully',
                'data' => $listing
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to archive listing',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function like($listingId)
    {
        $user = auth()->user();
        DB::table('liked_listings')->updateOrInsert([
            'user_id' => $user->id,
            'listing_id' => $listingId,
        ]);
        return response()->json(['status' => 'liked']);
    }

    public function unlike($listingId)
    {
        $user = auth()->user();
        DB::table('liked_listings')
            ->where('user_id', $user->id)
            ->where('listing_id', $listingId)
            ->delete();
        return response()->json(['status' => 'unliked']);
    }

    public function isLiked($listingId)
    {
        $user = auth()->user();
        $liked = DB::table('liked_listings')
            ->where('user_id', $user->id)
            ->where('listing_id', $listingId)
            ->exists();
        return response()->json(['liked' => $liked]);
    }

    public function likedListings(Request $request)
    {
        $user = $request->user();

        $likedListings = \DB::table('liked_listings')
            ->where('user_id', $user->id)
            ->pluck('listing_id');

        $listings = \App\Models\Listing::with(['category', 'city', 'partner', 'images'])
            ->whereIn('id', $likedListings)
            ->get();

        return response()->json([
            'status' => 'success',
            'data' => $listings
        ]);
    }
}