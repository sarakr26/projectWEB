<?php


namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Listing;
use App\Models\Reservation;
use Carbon\Carbon;
use Illuminate\Support\Str;

class TestReservationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Generate unique suffix to avoid email duplicates
        $uniqueSuffix = Str::random(6);
        
        // Create a new partner user with correct fields based on your schema
        $partner = User::create([
            'name' => 'Test Partner',
            'username' => 'testpartner' . $uniqueSuffix,
            'email' => "partner.{$uniqueSuffix}@test.com",
            'password' => bcrypt('password123'),
            'role' => 'partner',
            'city_id' => 1, // Make sure this city exists in your database
        ]);
        $this->command->info('Created new partner user: ' . $partner->email);

        // Create a new client user with correct fields
        $client = User::create([
            'name' => 'Test Client',
            'username' => 'testclient' . $uniqueSuffix,
            'email' => "client.{$uniqueSuffix}@test.com",
            'password' => bcrypt('password123'),
            'role' => 'client',
            'city_id' => 1, // Make sure this city exists in your database
        ]);
        $this->command->info('Created new client user: ' . $client->email);

        // Create a listing owned by the partner
        $listing = Listing::create([
            'title' => "Test Tool for Review {$uniqueSuffix}",
            'description' => 'A tool to test the review system',
            'price_per_day' => 25.00,
            'partner_id' => $partner->id,
            'category_id' => 1, // Make sure this category exists in your database
            'city_id' => 1, // Make sure this city exists in your database
            'status' => 'active', // Changed from 'available' to 'active'
        ]);
        $this->command->info('Created new listing: ' . $listing->title);
        
        // Create a completed reservation between the client and partner
        $startDate = Carbon::now()->subDays(10);
        $endDate = Carbon::now()->subDays(5);
        
        // Create reservation using only the fields that exist in your schema
        $reservation = Reservation::create([
            'client_id' => $client->id,
            'partner_id' => $partner->id,
            'listing_id' => $listing->id,
            'status' => 'completed',
            'start_date' => $startDate,
            'end_date' => $endDate,
            'delivery_option' => false,
        ]);

        $this->command->info('Created completed reservation #' . $reservation->id);
        $this->command->info('You can now test reviews with:');
        $this->command->info('- Client: ' . $client->email . ' (password: password123)');
        $this->command->info('- Partner: ' . $partner->email . ' (password: password123)');
    }
}