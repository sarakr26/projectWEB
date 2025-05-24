<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;

    protected $fillable = [
        'rating',
        'comment',
        'is_visible',
        'type',
        'reviewer_id',
        'reviewee_id',
        'reservation_id',
        'listing_id'
    ];

    protected $casts = [
        'rating' => 'integer',
        'is_visible' => 'boolean',
        'reservation_id' => 'integer',
        'listing_id' => 'integer'
    ];

    public function reviewer()
    {
        return $this->belongsTo(User::class, 'reviewer_id');
    }

    public function reviewee()
    {
        return $this->belongsTo(User::class, 'reviewee_id');
    }

    public function listing()
    {
        return $this->belongsTo(Listing::class);
    }

    public function reservation()
    {
        return $this->belongsTo(Reservation::class);
    }
} 