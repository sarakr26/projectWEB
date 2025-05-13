<?php

namespace App\Jobs;

use App\Models\Reservation;
use App\Models\Availability;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class CancelUnpaidReservation implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $reservation;

    public function __construct(Reservation $reservation)
    {
        $this->reservation = $reservation;
    }

    public function handle()
    {
        // Check if the reservation is still confirmed and has no payment
        $reservation = Reservation::with('listing')->find($this->reservation->id);
        
        if ($reservation && $reservation->status === 'confirmed') {
            DB::beginTransaction();
            try {
                // Update reservation status to canceled
                $reservation->update(['status' => 'canceled']);

                // Get the dates for the canceled reservation
                $startDate = Carbon::parse($reservation->start_date);
                $endDate = Carbon::parse($reservation->end_date);

                // Find all availability records for this listing
                $allAvailabilities = Availability::where('listing_id', $reservation->listing_id)
                    ->orderBy('start_date')
                    ->get();

                // Find records that are adjacent to the canceled period
                $adjacentRecords = $allAvailabilities->filter(function ($availability) use ($startDate, $endDate) {
                    // Check if this record ends exactly one day before the canceled period
                    $endsBefore = Carbon::parse($availability->end_date)->addDay()->eq($startDate);
                    // Check if this record starts exactly one day after the canceled period
                    $startsAfter = Carbon::parse($availability->start_date)->subDay()->eq($endDate);
                    
                    return $endsBefore || $startsAfter;
                });

                if ($adjacentRecords->isNotEmpty()) {
                    // Delete all adjacent records
                    $adjacentRecords->each->delete();

                    // Find the earliest start date and latest end date
                    $newStartDate = min(
                        $startDate,
                        $adjacentRecords->min('start_date')
                    );
                    $newEndDate = max(
                        $endDate,
                        $adjacentRecords->max('end_date')
                    );

                    // Create a single merged availability record
                    Availability::create([
                        'listing_id' => $reservation->listing_id,
                        'start_date' => $newStartDate,
                        'end_date' => $newEndDate,
                    ]);
                } else {
                    // If no adjacent records, just create a new availability record
                    Availability::create([
                        'listing_id' => $reservation->listing_id,
                        'start_date' => $startDate,
                        'end_date' => $endDate,
                    ]);
                }

                DB::commit();
            } catch (\Exception $e) {
                DB::rollBack();
                throw $e;
            }
        }
    }
} 