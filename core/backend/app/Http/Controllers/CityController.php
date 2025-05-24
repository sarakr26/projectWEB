<?php

namespace App\Http\Controllers;

use App\Models\City;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class CityController extends Controller
{
    public function index()
    {
        try {
            $cities = Cache::remember('cities', 60*24, function () {
                return City::select('id', 'name', 'latitude', 'longitude')
                    ->orderBy('name')
                    ->get();
            });
            
            return response()->json([
                'status' => 'success',
                'data' => $cities
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to retrieve cities',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}