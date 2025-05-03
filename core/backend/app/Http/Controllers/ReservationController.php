<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use App\Models\Listing;
use App\Models\Availability;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

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
            $isAvailable = Availability::where('listing_id', $listing->id)
                ->where('start_date', '<=', $request->start_date)
                ->where('end_date', '>=', $request->end_date)
                ->exists();

            if (!$isAvailable) {
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
} 