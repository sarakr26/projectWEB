<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use App\Models\Listing;
use App\Models\Availability;
use Illuminate\Http\Request;
use App\Models\Payment;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Support\Facades\Mail;
use App\Mail\ReservationAccepted;
use App\Mail\ReservationAcceptedPartner;
use App\Mail\PaymentConfirmed;
use App\Jobs\CancelUnpaidReservation;
use App\Mail\ReservationDeclined;

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

            // Check if there are any overlapping confirmed reservations
            $hasOverlap = Reservation::where('listing_id', $listing->id)
                ->where('status', 'confirmed')
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

            return response()->json([
                'status' => 'success',
                'message' => 'Reservation request created successfully',
                'data' => $reservation->load(['listing', 'client', 'partner'])
            ], 201);

        } catch (\Exception $e) {
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

    public function userReservations(Request $request)
    {
        try {
            $query = Reservation::with(['listing', 'partner'])
                ->where('client_id', $request->user()->id);
            
            // Optional filtering
            if ($request->has('status')) {
                $query->where('status', $request->status);
            }
            
            // Sort by creation date (newest first)
            $reservations = $query->orderBy('created_at', 'desc')->paginate(10);

            return response()->json([
                'status' => 'success',
                'data' => $reservations
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to fetch reservations',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function acceptReservation(Request $request, $id)
    {
        try {
            $reservation = Reservation::with(['client', 'listing'])->findOrFail($id);

            // Check if the user is the partner of the listing
            if ($reservation->partner_id !== $request->user()->id) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Unauthorized to accept this reservation'
                ], 403);
            }

            // Check if the reservation is pending
            if ($reservation->status !== 'pending') {
                return response()->json([
                    'status' => 'error',
                    'message' => 'This reservation cannot be accepted'
                ], 400);
            }

            DB::beginTransaction();

            // Find and decline overlapping reservations
            $overlappingReservations = Reservation::where('listing_id', $reservation->listing_id)
                ->where('id', '!=', $reservation->id) // Exclude the current reservation
                ->where('status', 'pending') // Only consider pending reservations
                ->where(function ($query) use ($reservation) {
                    $query->whereBetween('start_date', [$reservation->start_date, $reservation->end_date])
                        ->orWhereBetween('end_date', [$reservation->start_date, $reservation->end_date])
                        ->orWhere(function ($q) use ($reservation) {
                            $q->where('start_date', '<=', $reservation->start_date)
                                ->where('end_date', '>=', $reservation->end_date);
                        });
                })
                ->get();

            // Decline overlapping reservations
            foreach ($overlappingReservations as $overlappingReservation) {
                $overlappingReservation->update(['status' => 'canceled']);
                
                // Send email to clients about declined reservations
                Mail::to($overlappingReservation->client->email)
                    ->send(new ReservationDeclined($overlappingReservation, true));
            }

            // Update reservation status to confirmed
            $reservation->update(['status' => 'confirmed']);

            // Handle availability
            $availability = Availability::where('listing_id', $reservation->listing_id)
                ->where('start_date', '<=', $reservation->start_date)
                ->where('end_date', '>=', $reservation->end_date)
                ->first();

            if ($availability) {
                $originalStartDate = Carbon::parse($availability->start_date);
                $originalEndDate = Carbon::parse($availability->end_date);
                $reservationStartDate = Carbon::parse($reservation->start_date);
                $reservationEndDate = Carbon::parse($reservation->end_date);

                // Delete the original availability
                $availability->delete();

                // Create new availability records for remaining dates
                if ($originalStartDate->lt($reservationStartDate)) {
                    Availability::create([
                        'listing_id' => $reservation->listing_id,
                        'start_date' => $originalStartDate,
                        'end_date' => $reservationStartDate->subDay(),
                    ]);
                }

                if ($originalEndDate->gt($reservationEndDate)) {
                    Availability::create([
                        'listing_id' => $reservation->listing_id,
                        'start_date' => $reservationEndDate->addDay(),
                        'end_date' => $originalEndDate,
                    ]);
                }
            }

            // Send email to client
            $client = $reservation->client;
            $listing = $reservation->listing;
            
            // Calculate total amount
            $startDate = Carbon::parse($reservation->start_date);
            $endDate = Carbon::parse($reservation->end_date);
            $days = $startDate->diffInDays($endDate);
            $totalAmount = $days * $listing->price_per_day;

            // Send email to client
            Mail::to($client->email)->send(new ReservationAccepted($reservation, $totalAmount));

            // Send email to partner with client details
            $partner = $reservation->partner;
            Mail::to($partner->email)->send(new ReservationAcceptedPartner($reservation));

            // Schedule automatic cancellation if payment is not made within 24 hours
            $cancelJob = new CancelUnpaidReservation($reservation);
            dispatch($cancelJob)->delay(now()->addHours(24));

            DB::commit();

            return response()->json([
                'status' => 'success',
                'message' => 'Reservation accepted successfully. ' . 
                    ($overlappingReservations->count() > 0 ? 
                    $overlappingReservations->count() . ' overlapping reservations were automatically declined.' : ''),
                'data' => [
                    'reservation' => $reservation,
                    'payment_deadline' => now()->addHours(24),
                    'total_amount' => $totalAmount,
                    'declined_overlapping' => $overlappingReservations->count()
                ]
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to accept reservation',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function declineReservation(Request $request, $id)
    {
        try {
            $reservation = Reservation::with(['client', 'listing'])->findOrFail($id);

            // Check if the user is the partner of the listing
            if ($reservation->partner_id !== $request->user()->id) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Unauthorized to decline this reservation'
                ], 403);
            }

            // Check if the reservation is pending
            if ($reservation->status !== 'pending') {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Only pending reservations can be declined'
                ], 400);
            }

            // Update reservation status to canceled
            $reservation->update(['status' => 'canceled']);

            // Send email to client about the declined reservation
            Mail::to($reservation->client->email)
                ->send(new ReservationDeclined($reservation));
            
            return response()->json([
                'status' => 'success',
                'message' => 'Reservation declined successfully',
                'data' => $reservation->fresh(['client', 'listing'])
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to decline reservation',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function partnerReservations(Request $request)
    {
        try {
            $query = Reservation::with(['client', 'listing'])
                ->where('partner_id', $request->user()->id);
            
            // Optional filtering
            if ($request->has('status')) {
                $query->where('status', $request->status);
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
                'message' => 'Failed to fetch partner reservations',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function pay(Request $request, $id)
    {
        try {
            $reservation = Reservation::where('id', $id)
                ->where('client_id', $request->user()->id)
                ->where('status', 'confirmed')
                ->first();

            if (!$reservation) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Reservation not found or not eligible for payment.'
                ], 404);
            }

            // Calculate total amount
            $days = $reservation->start_date->diffInDays($reservation->end_date);
            $totalAmount = $days * $reservation->listing->price_per_day;

            DB::beginTransaction();

            // Update reservation status to completed
            $reservation->status = 'completed';
            $reservation->save();

            // Create payment record
            $payment = Payment::create([
                'amount' => $totalAmount,
                'status' => 'completed',
                'client_id' => $reservation->client_id,
                'reservation_id' => $reservation->id,
            ]);

            DB::commit();

            // Send payment confirmation email
            Mail::to($reservation->client->email)->send(new PaymentConfirmed($reservation, $payment));

            return response()->json([
                'status' => 'success',
                'message' => 'Payment successful. Reservation completed.',
                'data' => [
                    'reservation' => $reservation,
                    'payment' => $payment
                ]
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => 'error',
                'message' => 'Payment failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}