<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Reservation;
use App\Models\User;
use App\Models\Listing;
use Carbon\Carbon;
use App\Models\Availability; 

class ReservationSeeder extends Seeder
{
    public function run()
    {
        // Find user "issam" or create if doesn't exist
        $client = User::where('username', 'issam')->first();
        if (!$client) {
            $client = User::create([
                'name' => 'issam', 
                'username' => 'issam', 
                'email' => 'issam@example.com',
                'password' => bcrypt('password123'),
                'role' => 'client',
                'city_id' => 5 // Make sure this city exists
            ]);
            
            echo "Created user 'issam' since it didn't exist\n";
        } else {
            echo "Found existing user 'issam'\n";
        }
        
        // Get partners (tool owners)
        $partners = User::where('role', 'partner')->take(3)->get();
        
        // If we don't have any partners, create a few
        if ($partners->isEmpty()) {
            $partners = collect();
            for ($i = 0; $i < 3; $i++) {
                // Don't use factory - create directly to avoid missing columns
                $partner = User::create([
                    'name' => 'Partner ' . ($i + 1),
                    'username' => 'partner' . ($i + 1),
                    'email' => 'partner' . ($i + 1) . '@example.com',
                    'password' => bcrypt('password123'),
                    'role' => 'partner',
                    'city_id' => rand(1, 10) // Make sure this city exists
                ]);
                $partners->push($partner);
            }
            echo "Created 3 partners since none existed\n";
        }

        

        // Rest of your seeder code remains the same
        // Get some listings or create them if needed
        $listings = [];
        foreach ($partners as $partner) {
            $partnerListings = Listing::where('partner_id', $partner->id)->take(2)->get();
            
            if ($partnerListings->isEmpty()) {
                // Create listings for this partner
                for ($i = 0; $i < 2; $i++) {
                    $listing = Listing::create([
                        'title' => 'Tool ' . $i . ' for Partner ' . $partner->id,
                        'description' => 'This is a sample tool created by the seeder',
                        'price_per_day' => rand(10, 50),
                        'status' => 'active',
                        'partner_id' => $partner->id,
                        'category_id' => rand(1, 6), // Make sure categories exist
                        'city_id' => rand(1, 10),    // Make sure cities exist
                    ]);
                    $listings[] = $listing;
                }
            } else {
                foreach ($partnerListings as $listing) {
                    $listings[] = $listing;
                }
            }
        }

        foreach ($listings as $listing) {
            // First delete any existing availability records
            Availability::where('listing_id', $listing->id)->delete();
            
            // Create availability for the next 90 days
            Availability::create([
                'listing_id' => $listing->id,
                'start_date' => Carbon::now()->subDays(30), // Include past dates for completed reservations
                'end_date' => Carbon::now()->addDays(60),
            ]);
            echo "Created availability for listing '{$listing->title}'\n";
        }

        // Clear any existing reservations for this user
        Reservation::where('client_id', $client->id)->delete();
        echo "Deleted any existing reservations for user 'issam'\n";

        // Define reservation statuses
        $statuses = ['pending', 'confirmed', 'ongoing', 'completed', 'canceled'];
        
        // Create one reservation with each status for issam
        foreach ($listings as $index => $listing) {
            if ($index >= count($statuses)) break; // Only create one of each status
            
            $status = $statuses[$index];
            
            // Generate dates based on status
            switch ($status) {
                case 'pending':
                    $startDate = Carbon::now()->addDays(rand(5, 15));
                    $endDate = (clone $startDate)->addDays(rand(1, 7));
                    break;
                case 'confirmed':
                    $startDate = Carbon::now()->addDays(rand(2, 10));
                    $endDate = (clone $startDate)->addDays(rand(1, 7));
                    break;
                case 'ongoing':
                    $startDate = Carbon::now()->subDays(rand(1, 3));
                    $endDate = Carbon::now()->addDays(rand(1, 7));
                    break;
                case 'completed':
                    $startDate = Carbon::now()->subDays(rand(10, 30));
                    $endDate = (clone $startDate)->addDays(rand(1, 7));
                    break;
                case 'canceled':
                    $startDate = Carbon::now()->addDays(rand(5, 15));
                    $endDate = (clone $startDate)->addDays(rand(1, 7));
                    break;
            }
            
            // Create the reservation
            Reservation::create([
                'client_id' => $client->id,
                'partner_id' => $listing->partner_id,
                'listing_id' => $listing->id,
                'status' => $status,
                'start_date' => $startDate,
                'end_date' => $endDate,
                'delivery_option' => (bool) rand(0, 1),
            ]);
            
            echo "Created a '{$status}' reservation for user 'issam' with listing '{$listing->title}'\n";
        }
    }
}