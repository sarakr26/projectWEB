<?php

namespace App\Services;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ImageService
{
    public function uploadImage($image)
    {
        try {
            // Generate unique filename with timestamp and random string
            $timestamp = time();
            $random = Str::random(12);
            $extension = $image->getClientOriginalExtension();
            $filename = "{$timestamp}_{$random}.{$extension}";
            
            // Store in public/storage/tool-images directory
            $path = $image->storeAs('tool-images', $filename, 'public');
            
            // Return the full URL path
            return '/storage/' . $path;
        } catch (\Exception $e) {
            \Log::error('Image upload failed: ' . $e->getMessage());
            throw $e;
        }
    }
}