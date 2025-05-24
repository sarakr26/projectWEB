<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ListingImage extends Model
{
    use HasFactory;

    protected $table = 'images';

    protected $fillable = [
        'listing_id',
        'url'
    ];

    public function listing()
    {
        return $this->belongsTo(Listing::class);
    }
} 