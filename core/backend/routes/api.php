<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ListingController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\ContractController;


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Auth Routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/admin/login', [AuthController::class, 'adminLogin']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::post('/become-partner', [AuthController::class, 'becomePartner'])->middleware('auth:sanctum');
Route::get('/cities', [App\Http\Controllers\CityController::class, 'index']);
// Listing routes
Route::get('/listings', [ListingController::class, 'index']);
Route::get('/listings/search', [ListingController::class, 'search']);//use exemple (http://localhost:8000/api/listings/search?city_id=1&category_id=2&min_rating=4&min_price=10&max_price=50&sort_by=price_per_day&sort_order=asc)
Route::get('/listings/{id}', [ListingController::class, 'show']);
Route::post('/listings', [ListingController::class, 'store'])->middleware('auth:sanctum');
Route::put('/listings/{id}', [ListingController::class, 'update'])->middleware('auth:sanctum'); // Update listing
Route::patch('/listings/{id}/archive', [ListingController::class, 'archive'])->middleware('auth:sanctum'); // Archive listing
Route::middleware('auth:sanctum')->get('/listings', [ListingController::class, 'index']);
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/users/{id}/listings', [UserController::class, 'listings']);

// Reservation routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/reservations', [ReservationController::class, 'store']);
    Route::get('/reservations/check-availability', [ReservationController::class, 'checkAvailability']);
    Route::get('/reservations/pending', [ReservationController::class, 'pendingReservations']); // Get pending reservations for partner
    Route::get('/reservations/{id}/client-details', [ReservationController::class, 'getClientDetails']); // Get client details for a specific reservation
    Route::post('/reservations/{id}/accept', [ReservationController::class, 'acceptReservation']); // Accept a reservation
    Route::post('/reservations/{id}/decline', [ReservationController::class, 'declineReservation']);
    Route::get('/reservations/user', [ReservationController::class, 'userReservations']); // Get all reservations for logged-in user
    Route::get('/reservations/partner', [ReservationController::class, 'partnerReservations']);
    Route::post('/reservations/{id}/pay', [ReservationController::class, 'pay']);
});

// Review routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/reviews', [ReviewController::class, 'store']);//create a review for a listing
    Route::get('/reviews', [ReviewController::class, 'index']);//show all reviews with filters
    Route::get('/reviews/pending/{reservationId}', [ReviewController::class, 'checkPendingReviews']);
    Route::get('/reviews/{id}', [ReviewController::class, 'show']);//show a review by id
    Route::put('/reviews/{id}', [ReviewController::class, 'update']);//update a review by id
}); 

// Profile routes
Route::middleware('auth:sanctum')->put('/profile', [AuthController::class, 'updateProfile']);

//liked listings
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/listings/{listing}/like', [ListingController::class, 'like']);
    Route::delete('/listings/{listing}/like', [ListingController::class, 'unlike']);
    Route::get('/listings/{listing}/liked', [ListingController::class, 'isLiked']);
});
// list of liked listings
Route::middleware('auth:sanctum')->get('/user/liked-listings', [App\Http\Controllers\ListingController::class, 'likedListings']);

// signalee
Route::middleware('auth:sanctum')->post('/partners/{partner}/signalee', [App\Http\Controllers\PartnerController::class, 'signalee']);
// view profile
Route::get('/users/{id}', [UserController::class, 'show']);


// Add this line with your other admin routes
Route::get('/admin/stats', [AdminDashboardController::class, 'getStats'])->middleware('auth:sanctum');
// Contract routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/contracts/sign', [ContractController::class, 'sign']);
});
