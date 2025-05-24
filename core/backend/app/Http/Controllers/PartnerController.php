<?php
namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PartnerController extends Controller
{
    public function signalee(Request $request, $partnerId)
    {
        $user = $request->user();

        // Prevent self-reporting
        if ($user->id == $partnerId) {
            return response()->json(['message' => 'You cannot report yourself.'], 403);
        }

        // Check if partner exists and is a partner
        $partner = User::where('id', $partnerId)->where('role', 'partner')->first();
        if (!$partner) {
            return response()->json(['message' => 'Partner not found.'], 404);
        }

        // Prevent duplicate reporting
        $alreadyReported = DB::table('partner_signalees')
            ->where('reporter_id', $user->id)
            ->where('partner_id', $partnerId)
            ->exists();

        if ($alreadyReported) {
            return response()->json(['message' => 'You have already reported this partner.'], 409);
        }

        // Add report
        DB::table('partner_signalees')->insert([
            'reporter_id' => $user->id,
            'partner_id' => $partnerId,
            'created_at' => now(),
        ]);

        // Increment partner's signalee_count
        $partner->increment('signalee_count');

        return response()->json(['message' => 'Partner reported successfully.']);
    }
}