<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Listing extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'price_per_day',
        'status',
        'is_premium',
        'premium_start_date',
        'premium_end_date',
        'longitude',
        'latitude',
        'avg_rating',
        'review_count',
        'delivery_option',
        'category_id',
        'city_id',
        'partner_id',
        'priority'
    ];

    protected $casts = [
        'price_per_day' => 'decimal:2',
        'is_premium' => 'boolean',
        'premium_start_date' => 'datetime',
        'premium_end_date' => 'datetime',
        'longitude' => 'double',
        'latitude' => 'double',
        'avg_rating' => 'decimal:2',
        'delivery_option' => 'boolean',
        'priority' => 'integer'
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function city()
    {
        return $this->belongsTo(City::class);
    }

    public function partner()
    {
        return $this->belongsTo(User::class, 'partner_id');
    }

    public function images()
    {
        return $this->hasMany(ListingImage::class);
    }

    public function availabilities()
    {
        return $this->hasMany(Availability::class);
    }

    public function updatePriority()
{
    // Set priority based on premium status and duration
    if ($this->is_premium) {
        // Check premium duration (value 1, 2, or 3)
        if ($this->premium_duration == '1') { // 1 month
            $this->priority = 1; // Highest priority
        } else if ($this->premium_duration == '2') { // 2 weeks
            $this->priority = 2;
        } else if ($this->premium_duration == '3') { // 1 week
            $this->priority = 3;
        } else {
            $this->priority = 4; // Default if premium but no valid duration
        }
    } else {
        $this->priority = 4; // Lowest priority for non-premium
    }
    
    $this->save();
}
} 