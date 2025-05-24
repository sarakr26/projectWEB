<?php
namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function show($id)
    {
        $user = User::select('id', 'name', 'email')->find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found.'], 404);
        }

        return response()->json($user);
    }

    public function listings($id)
    {
        // Fetch all listings where partner_id = $id
        $listings = \App\Models\Listing::where('partner_id', $id)
            ->with(['category', 'city', 'images']) // eager load relations if needed
            ->get();

        return response()->json($listings);
    }
}