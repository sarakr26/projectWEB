<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Listing;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminDashboardController extends Controller
{
    public function getStats()
    {
        try {
            $stats = [
                'totalUsers' => User::count(),
                'clients' => User::where('role', 'client')->count(),
                'partners' => User::where('role', 'partner')->count(),
                'listings' => Listing::count(),
                'clientManagement' => [
                    [
                        'name' => 'Active Clients',
                        'value' => User::where('role', 'client')->where('status', 'active')->count(),
                        'color' => 'rgb(10, 197, 178)'
                    ],
                    [
                        'name' => 'Archived Clients',
                        'value' => User::where('role', 'client')->where('status', 'archived')->count(),
                        'color' => '#9E9E9E'
                    ]
                ],
                'partnerManagement' => [
                    [
                        'name' => 'Active Partners',
                        'value' => User::where('role', 'partner')->where('status', 'active')->count(),
                        'color' => 'rgb(10, 197, 178)'
                    ],
                    [
                        'name' => 'Archived Partners',
                        'value' => User::where('role', 'partner')->where('status', 'archived')->count(),
                        'color' => '#9E9E9E'
                    ]
                ]
            ];

            return response()->json([
                'status' => 'success',
                'data' => $stats
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to fetch dashboard statistics',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}