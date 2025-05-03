<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ListingController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Auth Routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/admin/login', [AuthController::class, 'adminLogin']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::post('/become-partner', [AuthController::class, 'becomePartner'])->middleware('auth:sanctum');

// Listing routes
Route::get('/listings', [ListingController::class, 'index']);
Route::get('/listings/search', [ListingController::class, 'search']);//use exemple (http://localhost:8000/api/listings/search?city_id=1&category_id=2&min_rating=4&min_price=10&max_price=50&sort_by=price_per_day&sort_order=asc)
Route::get('/listings/{id}', [ListingController::class, 'show']);
Route::post('/listings', [ListingController::class, 'store'])->middleware('auth:sanctum'); 