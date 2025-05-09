<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use App\Models\Listing;
use App\Models\Availability;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class ReservationController extends Controller
{
    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'listing_id' => 'required|exists:listings,id',
                'start_date' => 'required|date|after_or_equal:today',
                'end_date' => 'required|date|after:start_date',
                'delivery_option' => 'boolean',
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

            // Check if the listing is available for the requested dates
            $availability = Availability::where('listing_id', $listing->id)
                ->where('start_date', '<=', $request->start_date)
                ->where('end_date', '>=', $request->end_date)
                ->first();

            if (!$availability) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'The listing is not available for the selected dates'
                ], 400);
            }

            // Check if there are any overlapping reservations
            $hasOverlap = Reservation::where('listing_id', $listing->id)
                ->where('status', '!=', 'canceled')
                ->where(function ($query) use ($request) {
                    $query->whereBetween('start_date', [$request->start_date, $request->end_date])
                        ->orWhereBetween('end_date', [$request->start_date, $request->end_date])
                        ->orWhere(function ($q) use ($request) {
                            $q->where('start_date', '<=', $request->start_date)
                                ->where('end_date', '>=', $request->end_date);
                        });
                })
                ->exists();

            if ($hasOverlap) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'The listing is already reserved for some of the selected dates'
                ], 400);
            }

            DB::beginTransaction();

            // Create the reservation
            $reservation = Reservation::create([
                'listing_id' => $listing->id,
                'client_id' => $request->user()->id,
                'partner_id' => $listing->partner_id,
                'start_date' => $request->start_date,
                'end_date' => $request->end_date,
                'delivery_option' => $request->delivery_option ?? false,
                'status' => 'pending'
            ]);

            // Handle availability splitting
            $originalStartDate = Carbon::parse($availability->start_date);
            $originalEndDate = Carbon::parse($availability->end_date);
            $reservationStartDate = Carbon::parse($request->start_date);
            $reservationEndDate = Carbon::parse($request->end_date);

            // Delete the original availability using the composite key
            Availability::where('listing_id', $listing->id)
                ->where('start_date', $availability->start_date)
                ->where('end_date', $availability->end_date)
                ->delete();

            // Create new availability records for remaining dates
            if ($originalStartDate->lt($reservationStartDate)) {
                // Create availability for the period before the reservation
                Availability::create([
                    'listing_id' => $listing->id,
                    'start_date' => $originalStartDate,
                    'end_date' => $reservationStartDate->subDay(),
                ]);
            }

            if ($originalEndDate->gt($reservationEndDate)) {
                // Create availability for the period after the reservation
                Availability::create([
                    'listing_id' => $listing->id,
                    'start_date' => $reservationEndDate->addDay(),
                    'end_date' => $originalEndDate,
                ]);
            }

            DB::commit();

            return response()->json([
                'status' => 'success',
                'message' => 'Reservation created successfully',
                'data' => $reservation->load(['listing', 'client', 'partner'])
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to create reservation',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function checkAvailability(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'listing_id' => 'required|exists:listings,id',
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

            $listing = Listing::findOrFail($request->listing_id);

            // Check if the listing is available for the requested dates
            $isAvailable = Availability::where('listing_id', $listing->id)
                ->where('start_date', '<=', $request->start_date)
                ->where('end_date', '>=', $request->end_date)
                ->exists();

            if (!$isAvailable) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'The listing is not available for the selected dates',
                    'available' => false
                ], 200);
            }

            // Check if there are any overlapping reservations
            $hasOverlap = Reservation::where('listing_id', $listing->id)
                ->where('status', '!=', 'canceled')
                ->where(function ($query) use ($request) {
                    $query->whereBetween('start_date', [$request->start_date, $request->end_date])
                        ->orWhereBetween('end_date', [$request->start_date, $request->end_date])
                        ->orWhere(function ($q) use ($request) {
                            $q->where('start_date', '<=', $request->start_date)
                                ->where('end_date', '>=', $request->end_date);
                        });
                })
                ->exists();

            return response()->json([
                'status' => 'success',
                'message' => $hasOverlap ? 'The listing is already reserved for some of the selected dates' : 'The listing is available for the selected dates',
                'available' => !$hasOverlap
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to check availability',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function pendingReservations(Request $request)
    {
        try {
            $query = Reservation::with(['client', 'listing'])
                ->where('status', 'pending')
                ->where('partner_id', $request->user()->id);

            // Filter by date range if provided
            if ($request->has('start_date')) {
                $query->where('start_date', '>=', $request->start_date);
            }
            if ($request->has('end_date')) {
                $query->where('end_date', '<=', $request->end_date);
            }

            // Sort by creation date (newest first)
            $reservations = $query->orderBy('created_at', 'desc')
                ->paginate(10);

            return response()->json([
                'status' => 'success',
                'data' => $reservations
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to fetch pending reservations',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function getClientDetails(Request $request, $id)
    {
        try {
            $reservation = Reservation::with(['client' => function($query) {
                    $query->select('id', 'username', 'avg_rating_as_client', 'review_count', 'avatar_url');
                }])
                ->where('id', $id)
                ->where('partner_id', $request->user()->id)
                ->where('status', 'pending')
                ->first();

            if (!$reservation) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Reservation not found or unauthorized'
                ], 404);
            }

            // Format the response
            $clientDetails = [
                'username' => $reservation->client->username,
                'rating' => number_format($reservation->client->avg_rating_as_client, 2),
                'review_count' => $reservation->client->review_count,
                'avatar_url' => $reservation->client->avatar_url,
                'reservation_details' => [
                    'start_date' => $reservation->start_date,
                    'end_date' => $reservation->end_date,
                    'delivery_option' => $reservation->delivery_option,
                    'created_at' => $reservation->created_at
                ]
            ];

            return response()->json([
                'status' => 'success',
                'data' => $clientDetails
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to fetch client details',
                'error' => $e->getMessage()
            ], 500);
        }
    }
} 