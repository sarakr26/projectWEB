<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Enum;
use Illuminate\Validation\ValidationException;
use Illuminate\Validation\Rule;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        try {
            \Log::info('Register request data:', $request->all());
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:8',
                'username' => 'nullable|string|max:255|unique:users',
                'phone_number' => 'nullable|string|max:20',
                'address' => 'nullable|string',
                'city_id' => 'required|exists:cities,id',
            ]);
    
            
    
            $user = User::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'password' => Hash::make($validated['password']),
                'username' => $validated['username'],
                'phone_number' => $validated['phone_number'],
                'address' => $validated['address'],
                'city_id' => $validated['city_id'],
                'role' => 'client',
            ]);
    
            $token = $user->createToken('auth_token')->plainTextToken;
    
            return response()->json([
                'status' => 'success',
                'message' => 'User registered successfully',
                'data' => [
                    'user' => $user,
                    'token' => $token
                ]
            ], 201);
        } catch (\Exception $e) {
            \Log::error('Registration error: ' . $e->getMessage());
            return response()->json([
                'status' => 'error',
                'message' => 'Registration failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function login(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required|email',
                'password' => 'required',
            ]);

            if (!Auth::attempt($request->only('email', 'password'))) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Invalid credentials'
                ], 401);
            }

            $user = User::where('email', $request->email)->firstOrFail();
            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'status' => 'success',
                'message' => 'Login successful',
                'data' => [
                    'user' => $user,
                    'token' => $token
                ]
            ]);

        } catch (ValidationException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Login failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function logout(Request $request)
    {
        try {
            $request->user()->currentAccessToken()->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Logged out successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Logout failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function becomePartner(Request $request)
    {
        try {
            $user = $request->user();

            // Check if user is already a partner
            if ($user->role === 'partner') {
                return response()->json([
                    'status' => 'error',
                    'message' => 'User is already a partner'
                ], 400);
            }

            // Update user role to partner
            $user->update([
                'role' => 'partner'
            ]);

            return response()->json([
                'status' => 'success',
                'message' => 'Role updated to partner successfully',
                'data' => [
                    'user' => $user
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to update role',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function adminLogin(Request $request)
    {
        try {
            $validated = $request->validate([
                'email' => 'required|string|email',
                'password' => 'required|string',
            ]);

            // Find admin by email
            $admin = Admin::where('email', $validated['email'])->first();

            if (!$admin || !Hash::check($validated['password'], $admin->password)) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Invalid admin credentials'
                ], 401);
            }

            // Create token for admin with admin abilities
            $token = $admin->createToken('admin_token', ['admin'])->plainTextToken;

            return response()->json([
                'status' => 'success',
                'message' => 'Admin logged in successfully',
                'data' => [
                    'admin' => [
                        'id' => $admin->id,
                        'email' => $admin->email
                    ],
                    'token' => $token
                ]
            ]);

        } catch (ValidationException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Login failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }

 
// Profile update method

public function updateProfile(Request $request)
{
    $user = $request->user();

    $validated = $request->validate([
        'name' => 'required|string|max:191',
        'email' => [
            'required', 'email', 'max:191',
            Rule::unique('users')->ignore($user->id),
        ],
        'username' => [
            'nullable', 'string', 'max:191',
            Rule::unique('users')->ignore($user->id),
        ],
        'city_id' => 'required|exists:cities,id',
        'phone_number' => 'nullable|string|max:20',
        'address' => 'nullable|string|max:255',
        'role' => 'required|in:client,partner',
        'password' => 'nullable|string|min:8|confirmed',
    ]);

    $user->name = $validated['name'];
    $user->email = $validated['email'];
    $user->username = $validated['username'] ?? $user->username;
    $user->city_id = $validated['city_id'];
    $user->phone_number = $validated['phone_number'] ?? null;
    $user->address = $validated['address'] ?? null;
    $user->role = $validated['role'];

    if ($request->filled('password')) {
        $user->password = \Hash::make($validated['password']);
    }

    $user->save();

    return response()->json([
        'status' => 'success',
        'message' => 'Profile updated successfully.',
        'user' => $user->fresh('city'),
    ]);
    }
}

