<?php

namespace App\Http\Controllers;

use App\Models\Contract;
use Illuminate\Http\Request;

class ContractController extends Controller
{
    public function sign(Request $request)
    {
        try {
            $contract = Contract::create([
                'user_id' => auth()->id(),
                'type' => $request->type,
                'is_signed' => true,
                'signed_at' => now()
            ]);

            if ($request->type === 'partner') {
                $user = auth()->user();
                $user->role = 'partner';
                $user->save();
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Contract signed successfully',
                'data' => $contract
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to sign contract: ' . $e->getMessage()
            ], 500);
        }
    }
}
