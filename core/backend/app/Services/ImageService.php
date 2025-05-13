<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ImageService
{
    public function uploadImage(UploadedFile $file, string $path = 'listings'): string
    {
        // Generate a unique filename
        $filename = Str::uuid() . '.' . $file->getClientOriginalExtension();
        
        // Store the file in the public disk under the specified path
        $file->storeAs($path, $filename, 'public');
        
        // Return the public URL for the stored file
        return Storage::disk('public')->url($path . '/' . $filename);
    }

    public function deleteImage(string $url): bool
    {
        // Extract the path from the URL
        $path = str_replace(Storage::disk('public')->url(''), '', $url);
        
        // Delete the file if it exists
        if (Storage::disk('public')->exists($path)) {
            return Storage::disk('public')->delete($path);
        }
        
        return false;
    }
} 